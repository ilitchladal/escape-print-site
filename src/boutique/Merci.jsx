// Merci — page de confirmation après paiement Stripe.
// Interroge /api/order : les liens de téléchargement n'apparaissent que si payé.
import React from 'react';
import { Button } from '../components';

export function Merci({ sessionId, onHome }) {
  const [state, setState] = React.useState({ status: 'loading' });

  React.useEffect(() => {
    fetch(`/api/order?session_id=${encodeURIComponent(sessionId)}`)
      .then((r) => r.json())
      .then((d) => setState(d.paid ? { status: 'paid', ...d } : { status: 'pending' }))
      .catch(() => setState({ status: 'error' }));
  }, [sessionId]);

  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

  return (
    <section style={{ maxWidth: 620, margin: '0 auto', padding: 'var(--sp-8) var(--container-pad)', textAlign: 'center' }}>
      {state.status === 'loading' && (
        <p style={{ color: 'var(--ink-soft)' }}>Vérification du paiement…</p>
      )}

      {state.status === 'error' && (
        <p style={{ color: 'var(--error)' }}>Impossible de vérifier la commande. Réessaie ou contacte-nous.</p>
      )}

      {state.status === 'pending' && (
        <>
          <h1 style={{ fontSize: 'var(--fs-h1)', color: 'var(--ink)' }}>Paiement en cours de confirmation</h1>
          <p style={{ color: 'var(--ink-soft)', marginTop: 'var(--sp-3)' }}>
            Ton paiement n'est pas encore confirmé. Recharge la page dans un instant.
          </p>
        </>
      )}

      {state.status === 'paid' && (
        <>
          <div style={{ width: 64, height: 64, borderRadius: '50%', margin: '0 auto var(--sp-4)', background: 'var(--success)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <i data-lucide="check" style={{ width: 32, height: 32 }}></i>
          </div>
          <h1 style={{ fontSize: 'var(--fs-h1)', color: 'var(--ink)' }}>Merci pour ta commande&nbsp;!</h1>
          <p style={{ color: 'var(--ink-soft)', marginTop: 'var(--sp-3)' }}>
            Voici tes fichiers à télécharger. Garde ce lien : ils restent accessibles ici.
          </p>

          <div style={{ marginTop: 'var(--sp-6)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)', textAlign: 'left' }}>
            {state.items.map((it) => (
              <div key={it.title}>
                <h3 style={{ fontSize: 'var(--fs-h3)', color: 'var(--ink)', marginBottom: 'var(--sp-2)' }}>{it.title}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
                  {it.files.map((f) => (
                    <a key={f.name} href={f.url} style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', padding: 'var(--sp-3) var(--sp-4)', borderRadius: 'var(--r-md)', border: '1.5px solid var(--border-hairline)', background: 'var(--surface-raised)', color: 'var(--ink)', textDecoration: 'none' }}>
                      <i data-lucide="file-down" style={{ width: 18, height: 18, color: 'var(--kit-primary, var(--accent))' }}></i>
                      <span style={{ flex: 1 }}>{f.name}</span>
                      <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--ink-faint)' }}>Télécharger</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div style={{ marginTop: 'var(--sp-7)' }}>
        <Button variant="ghost" onClick={onHome}>Retour à la boutique</Button>
      </div>
    </section>
  );
}
