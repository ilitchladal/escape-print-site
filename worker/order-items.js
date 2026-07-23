// Construit la liste { title, files:[{ name, url }] } des kits d'une commande.
// Partagé par /api/order (page Merci) et /api/webhook (email n8n) pour que les
// liens de téléchargement soient rigoureusement identiques des deux côtés.
import { KITS } from '../src/boutique/data.js';

export function orderItems(session, base) {
  const ids = (session.metadata?.kits || '').split(',').filter(Boolean);
  return ids
    .map((id) => KITS.find((k) => k.id === id))
    .filter(Boolean)
    .map((kit) => ({
      title: kit.title,
      files: (kit.files || []).map((f) => ({
        name: f.name,
        // Lien protégé : /api/download revérifie le paiement avant de servir.
        url: `${base}/api/download?session_id=${session.id}&kit=${kit.id}&file=${encodeURIComponent(f.name)}`,
      })),
    }));
}
