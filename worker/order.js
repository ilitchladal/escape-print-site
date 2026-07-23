// GET /api/order?session_id=… — renvoie les fichiers d'une commande,
// UNIQUEMENT si Stripe confirme que le paiement est bien passé.
import Stripe from 'stripe';
import { orderItems } from './order-items.js';

export default async function order(request, env) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get('session_id');
  if (!sessionId) return Response.json({ error: 'session_id manquant' }, { status: 400 });

  const stripe = new Stripe(env.STRIPE_SECRET_KEY, { httpClient: Stripe.createFetchHttpClient() });
  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch (e) {
    // Session inconnue/expirée : on répond proprement plutôt que de planter (500).
    return Response.json({ paid: false, error: 'Session introuvable' }, { status: 404 });
  }
  if (session.payment_status !== 'paid') return Response.json({ paid: false });

  // Liens absolus : utilisables tels quels dans un e-mail (n8n) comme sur la page.
  const items = orderItems(session, url.origin);
  return Response.json({ paid: true, email: session.customer_details?.email || null, items });
}
