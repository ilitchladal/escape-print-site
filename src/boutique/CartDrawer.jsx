// CartDrawer — slide-over cart with line items, totals, checkout CTA.
import React from 'react';
import { Button } from '../components';

export function CartDrawer({ open, items, onClose, onRemove, onCheckout }) {
  const parse = (p) => parseFloat(p.replace('€', '').replace(',', '.').trim());
  const total = items.reduce((s, it) => s + parse(it.price) * it.qty, 0);
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

  return (
    <div aria-hidden={!open} style={{
      position: 'fixed', inset: 0, zIndex: 40, pointerEvents: open ? 'auto' : 'none',
    }}>
      <div onClick={onClose} style={{
        position: 'absolute', inset: 0, background: 'var(--surface-overlay)',
        opacity: open ? 1 : 0, transition: 'opacity var(--d-base) var(--e-out)',
      }}></div>
      <aside style={{
        position: 'absolute', top: 0, right: 0, height: '100%', width: 'min(420px, 92vw)',
        background: 'var(--surface-base)', boxShadow: 'var(--sh-lg)',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform var(--d-slow) var(--e-out)',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--sp-5)', borderBottom: '1px solid var(--border-hairline)' }}>
          <h3 style={{ fontSize: 'var(--fs-h3)', color: 'var(--ink)' }}>Ton panier</h3>
          <button onClick={onClose} aria-label="Fermer" style={{ width: 36, height: 36, borderRadius: 'var(--r-md)', border: '1.5px solid var(--border-hairline)', background: 'var(--surface-raised)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink)' }}>
            <i data-lucide="x" style={{ width: 18, height: 18 }}></i>
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--sp-5)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
          {items.length === 0 && (
            <div style={{ textAlign: 'center', color: 'var(--ink-soft)', marginTop: 'var(--sp-7)' }}>
              <i data-lucide="shopping-bag" style={{ width: 40, height: 40, opacity: 0.4 }}></i>
              <p style={{ marginTop: 'var(--sp-3)' }}>Ton panier est vide pour l'instant.</p>
            </div>
          )}
          {items.map((it) => (
            <div key={it.id} data-theme={it.theme} style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'center' }}>
              <div style={{ width: 56, height: 56, borderRadius: 'var(--r-md)', flexShrink: 0, background: 'linear-gradient(150deg, var(--kit-primary), var(--kit-deep))', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <i data-lucide="puzzle" style={{ width: 22, height: 22 }}></i>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--fs-body)', color: 'var(--ink)' }}>{it.title}</div>
                <div style={{ fontSize: 'var(--fs-small)', color: 'var(--ink-soft)' }}>Qté {it.qty} · PDF</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--ink)' }}>{it.price}</div>
                <button onClick={() => onRemove(it.id)} style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer', fontSize: 'var(--fs-caption)', padding: 0 }}>Retirer</button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid var(--border-hairline)', padding: 'var(--sp-5)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ color: 'var(--ink-soft)' }}>Total</span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--fs-h2)', color: 'var(--ink)' }}>{total.toFixed(2).replace('.', ',')} €</span>
          </div>
          <Button variant="primary" size="lg" disabled={items.length === 0} onClick={onCheckout} style={{ width: '100%' }}>Payer ma commande</Button>
          <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--ink-faint)', textAlign: 'center', display: 'inline-flex', gap: 6, justifyContent: 'center', alignItems: 'center' }}>
            <i data-lucide="lock" style={{ width: 13, height: 13 }}></i> Paiement sécurisé · Téléchargement immédiat
          </span>
        </div>
      </aside>
    </div>
  );
}
