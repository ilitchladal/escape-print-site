// GET /api/order?session_id=… — renvoie les fichiers d'une commande,
// UNIQUEMENT si Stripe confirme que le paiement est bien passé.
import Stripe from 'stripe';
import { KITS } from '../src/boutique/data.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const sessionId = req.query.session_id;
  if (!sessionId) return res.status(400).json({ error: 'session_id manquant' });

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (session.payment_status !== 'paid') return res.status(200).json({ paid: false });

  // Liens absolus : utilisables tels quels dans un e-mail (n8n) comme sur la page.
  const proto = req.headers['x-forwarded-proto'] || 'http';
  const base = `${proto}://${req.headers.host}`;
  const ids = (session.metadata?.kits || '').split(',').filter(Boolean);
  const items = ids
    .map((id) => KITS.find((k) => k.id === id))
    .filter(Boolean)
    .map((kit) => ({
      title: kit.title,
      files: (kit.files || []).map((f) => ({
        name: f.name,
        // Lien protégé : /api/download revérifie le paiement avant de servir.
        url: `${base}/api/download?session_id=${sessionId}&kit=${kit.id}&file=${encodeURIComponent(f.name)}`,
      })),
    }));

  res.status(200).json({ paid: true, email: session.customer_details?.email || null, items });
}
