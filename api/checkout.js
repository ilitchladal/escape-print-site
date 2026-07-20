// POST /api/checkout — crée une session Stripe Checkout depuis le panier.
// Le montant est recalculé côté serveur depuis le catalogue : on ne fait
// jamais confiance au prix envoyé par le navigateur.
import Stripe from 'stripe';
import { KITS } from '../src/boutique/data.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Méthode non autorisée' });

  const { items = [] } = req.body || {};
  const line_items = [];
  const ids = [];
  for (const { id, qty } of items) {
    const kit = KITS.find((k) => k.id === id);
    if (!kit || !kit.priceCents) continue; // ignore un id inconnu ou non vendable
    ids.push(kit.id);
    line_items.push({
      quantity: Math.max(1, qty | 0),
      price_data: {
        currency: 'eur',
        unit_amount: kit.priceCents,
        product_data: { name: kit.title },
      },
    });
  }
  if (!line_items.length) return res.status(400).json({ error: 'Panier vide ou invalide' });

  const origin = req.headers.origin || `http://${req.headers.host}`;
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items,
    // Les ids achetés voyagent dans la session : ils débloquent les fichiers après paiement.
    metadata: { kits: [...new Set(ids)].join(',') },
    success_url: `${origin}/?merci={CHECKOUT_SESSION_ID}`,
    cancel_url: origin,
  });

  res.status(200).json({ url: session.url });
}
