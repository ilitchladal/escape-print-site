// POST /api/webhook — endpoint appelé par Stripe. On vérifie la signature, puis
// sur `checkout.session.completed` (paiement finalisé) on déclenche l'envoi de
// l'email de téléchargement (voie B) en POSTant la commande au workflow n8n.
// Tous les autres types d'événement : 200 sans rien faire.
import Stripe from 'stripe';
import { orderItems } from './order-items.js';

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
    if (session.payment_status === 'paid' && env.N8N_WEBHOOK_URL) {
      const items = orderItems(session, new URL(request.url).origin);
      // n8n envoie l'email de téléchargement au client. On n'échoue jamais le
      // webhook sur une erreur n8n : Stripe ne doit pas rejouer pour ça.
      await fetch(env.N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: session.id,
          email: session.customer_details?.email || null,
          items,
        }),
      }).catch(() => {});
    }
  }

  // Événement reçu et traité (ou ignoré) : on accuse réception.
  return new Response('ok', { status: 200 });
}
