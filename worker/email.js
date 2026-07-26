// Envoi de l'email de téléchargement via l'API Resend.
// From = @escape-print.fr (domaine vérifié chez Resend, envoi autorisé par
// SPF/DKIM). Les réponses des clients arrivent sur le Gmail via reply_to :
// aucune boîte @escape-print.fr n'a besoin d'exister pour l'envoi.
const FROM = 'Escape Print <contact@escape-print.fr>';
const REPLY_TO = 'escaprint.contact@gmail.com';

export async function sendDownloadEmail(env, { email, items }) {
  // Pas de clé, pas de destinataire ou pas de fichiers : on ne fait rien (le
  // webhook répond quand même 200, il n'y a juste pas d'email à envoyer).
  if (!env.RESEND_API_KEY || !email || !items?.length) return;

  // RESEND_API_URL surchargeable en test ; en prod on tape le vrai Resend.
  const res = await fetch(env.RESEND_API_URL || 'https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM,
      to: email,
      reply_to: REPLY_TO,
      subject: 'Tes fichiers Escape Print sont prêts 🦊',
      html: renderHtml(items),
    }),
  });
  // On n'échoue jamais le webhook sur une erreur d'email : Stripe ne doit pas rejouer.
  if (!res.ok) console.log('Resend a échoué :', res.status, await res.text().catch(() => ''));
}

function renderHtml(items) {
  const sections = items.map((kit) => {
    const links = kit.files.map((f) =>
      `<a href="${f.url}" style="display:block;padding:12px 16px;margin:6px 0;border:1.5px solid #e7e0d3;border-radius:10px;color:#2b2b2b;text-decoration:none;font-size:15px">📄 ${escapeHtml(f.name)} — <span style="color:#c8622d">Télécharger</span></a>`
    ).join('');
    return `<h2 style="font-size:18px;color:#2b2b2b;margin:24px 0 8px">${escapeHtml(kit.title)}</h2>${links}`;
  }).join('');

  return `<!doctype html><html lang="fr"><body style="margin:0;background:#faf6ef;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
  <div style="max-width:560px;margin:0 auto;padding:32px 24px">
    <div style="text-align:center;font-size:28px;margin-bottom:8px">🦊</div>
    <h1 style="font-size:24px;color:#2b2b2b;text-align:center;margin:0 0 8px">Merci pour ta commande&nbsp;!</h1>
    <p style="color:#6b6459;text-align:center;font-size:15px;margin:0 0 8px">
      Voici tes fichiers à imprimer. Garde cet email&nbsp;: tes liens restent accessibles.
    </p>
    ${sections}
    <p style="color:#9a9284;font-size:13px;margin-top:32px;text-align:center">
      Une question&nbsp;? Réponds simplement à cet email, on te lit. — L'équipe Escape Print
    </p>
  </div></body></html>`;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
