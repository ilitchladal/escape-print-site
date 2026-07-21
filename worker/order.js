// GET /api/order?session_id=… — renvoie les fichiers d'une commande,
// UNIQUEMENT si Stripe confirme que le paiement est bien passé.
import Stripe from 'stripe';
import { KITS } from '../src/boutique/data.js';

export default async function order(request, env) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get('session_id');
  if (!sessionId) return Response.json({ error: 'session_id manquant' }, { status: 400 });

  const stripe = new Stripe(env.STRIPE_SECRET_KEY, { httpClient: Stripe.createFetchHttpClient() });
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (session.payment_status !== 'paid') return Response.json({ paid: false });

  // Liens absolus : utilisables tels quels dans un e-mail (n8n) comme sur la page.
  const base = url.origin;
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

  return Response.json({ paid: true, email: session.customer_details?.email || null, items });
}
