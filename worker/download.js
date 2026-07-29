// GET /api/download?session_id=…&kit=…&file=… — sert un fichier de kit.
// Le lien n'est valide que si la session est payée ET contient bien ce kit.
// Le vrai PDF est servi depuis le bucket R2 privé (binding KITS_BUCKET).
import Stripe from 'stripe';
import { KITS } from '../src/boutique/data.js';

export default async function download(request, env) {
  const url = new URL(request.url);
  const session_id = url.searchParams.get('session_id');
  const kitId = url.searchParams.get('kit');
  const file = url.searchParams.get('file');
  if (!session_id) return Response.json({ error: 'session_id manquant' }, { status: 400 });

  const stripe = new Stripe(env.STRIPE_SECRET_KEY, { httpClient: Stripe.createFetchHttpClient() });
  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(session_id);
  } catch (e) {
    // Session inconnue/expirée : message propre plutôt qu'un crash 500.
    return Response.json({ error: 'Session introuvable ou expirée' }, { status: 404 });
  }
  const ids = (session.metadata?.kits || '').split(',').filter(Boolean);
  if (session.payment_status !== 'paid' || !ids.includes(kitId)) {
    return Response.json({ error: 'Paiement requis pour accéder à ce fichier' }, { status: 402 });
  }

  const kit = KITS.find((k) => k.id === kitId);
  // On ne sert que les fichiers réellement déclarés pour ce kit (le nom vient
  // du client, on ne fait donc jamais confiance à `file` pour la clé R2).
  const entry = kit?.files?.find((f) => f.name === file) || kit?.files?.[0];
  if (!entry) return Response.json({ error: 'Fichier introuvable' }, { status: 404 });

  const object = await env.KITS_BUCKET.get(entry.key);
  if (!object) return Response.json({ error: 'Fichier indisponible' }, { status: 404 });

  // Un en-tête HTTP est ASCII-only : nom de secours ASCII + filename* en UTF-8.
  const ascii = entry.name.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^\x20-\x7E]/g, '_').replace(/"/g, '');
  return new Response(object.body, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(entry.name)}`,
    },
  });
}
