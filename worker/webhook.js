// POST /api/webhook — endpoint appelé par Stripe. On vérifie la signature, puis
// sur `checkout.session.completed` (paiement finalisé) on envoie au client
// l'email avec ses liens de téléchargement (via Resend).
// Tous les autres types d'événement : 200 sans rien faire.
import Stripe from 'stripe';
import { orderItems } from './order-items.js';
import { sendDownloadEmail } from './email.js';

export default async function webhook(request, env) {
  const stripe = new Stripe(env.STRIPE_SECRET_KEY, { httpClient: Stripe.createFetchHttpClient() });

  // Vérification de signature : sur le runtime Workers, il faut la variante
  // async + le fournisseur WebCrypto (la version synchrone utilise du crypto Node).
  const sig = request.headers.get('stripe-signature');
  const payload = await request.text();
  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      payload, sig, env.STRIPE_WEBHOOK_SECRET, undefined, Stripe.createSubtleCryptoProvider(),
    );
  } catch (e) {
    // Signature absente/invalide : on refuse (Stripe réessaiera si besoin).
    return new Response('Signature invalide', { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    if (session.payment_status === 'paid') {
      const items = orderItems(session, new URL(request.url).origin);
      await sendDownloadEmail(env, { email: session.customer_details?.email || null, items });
    }
  }

  // Événement reçu et traité (ou ignoré) : on accuse réception.
  return new Response('ok', { status: 200 });
}
