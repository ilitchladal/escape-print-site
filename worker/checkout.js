// POST /api/checkout — crée une session Stripe Checkout depuis le panier.
// Le montant est recalculé côté serveur depuis le catalogue : on ne fait
// jamais confiance au prix envoyé par le navigateur.
import Stripe from 'stripe';
import { KITS } from '../src/boutique/data.js';

export default async function checkout(request, env) {
  if (request.method !== 'POST') return Response.json({ error: 'Méthode non autorisée' }, { status: 405 });

  const { items = [] } = await request.json().catch(() => ({}));
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
  if (!line_items.length) return Response.json({ error: 'Panier vide ou invalide' }, { status: 400 });

  const stripe = new Stripe(env.STRIPE_SECRET_KEY, { httpClient: Stripe.createFetchHttpClient() });
  const origin = request.headers.get('origin') || new URL(request.url).origin;
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      // Les ids achetés voyagent dans la session : ils débloquent les fichiers après paiement.
      metadata: { kits: [...new Set(ids)].join(',') },
      success_url: `${origin}/?merci={CHECKOUT_SESSION_ID}`,
      cancel_url: origin,
    });
    return Response.json({ url: session.url });
  } catch (e) {
    // Erreur Stripe (clé invalide, API indisponible…) : message propre, pas un crash 500.
    return Response.json({ error: 'Le service de paiement est momentanément indisponible.' }, { status: 502 });
  }
}
