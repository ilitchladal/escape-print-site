// GET /api/download?session_id=…&kit=…&file=… — sert un fichier de kit.
// Le lien n'est valide que si la session est payée ET contient bien ce kit.
// Fichier factice pour l'instant : on branchera le vrai stockage privé plus tard.
import Stripe from 'stripe';
import { KITS } from '../src/boutique/data.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { session_id, kit: kitId, file } = req.query;
  if (!session_id) return res.status(400).json({ error: 'session_id manquant' });

  const session = await stripe.checkout.sessions.retrieve(session_id);
  const ids = (session.metadata?.kits || '').split(',').filter(Boolean);
  if (session.payment_status !== 'paid' || !ids.includes(kitId)) {
    return res.status(402).json({ error: 'Paiement requis pour accéder à ce fichier' });
  }

  const kit = KITS.find((k) => k.id === kitId);
  const name = file || kit?.files?.[0]?.name || 'fichier.pdf';
  const download = name.replace(/\.pdf$/i, '') + '.txt';
  const body =
    `FICHIER FACTICE — ${name}\n\n` +
    `Merci pour ton achat de « ${kit?.title} ».\n` +
    `Le vrai PDF sera servi ici depuis le stockage privé une fois branché.\n`;

  // Un en-tête HTTP est ASCII-only : nom de secours ASCII + filename* en UTF-8.
  const ascii = download.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^\x20-\x7E]/g, '_').replace(/"/g, '');
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(download)}`);
  res.status(200);
  res.end(body);
}
