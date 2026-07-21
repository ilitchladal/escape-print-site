// GET /api/download?session_id=…&kit=…&file=… — sert un fichier de kit.
// Le lien n'est valide que si la session est payée ET contient bien ce kit.
// Fichier factice pour l'instant : on branchera le vrai stockage privé plus tard.
import Stripe from 'stripe';
import { KITS } from '../src/boutique/data.js';

export default async function download(request, env) {
  const url = new URL(request.url);
  const session_id = url.searchParams.get('session_id');
  const kitId = url.searchParams.get('kit');
  const file = url.searchParams.get('file');
  if (!session_id) return Response.json({ error: 'session_id manquant' }, { status: 400 });

  const stripe = new Stripe(env.STRIPE_SECRET_KEY, { httpClient: Stripe.createFetchHttpClient() });
  const session = await stripe.checkout.sessions.retrieve(session_id);
  const ids = (session.metadata?.kits || '').split(',').filter(Boolean);
  if (session.payment_status !== 'paid' || !ids.includes(kitId)) {
    return Response.json({ error: 'Paiement requis pour accéder à ce fichier' }, { status: 402 });
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
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Disposition': `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(download)}`,
    },
  });
}
