// Hero + reassurance band + universe filter for the homepage.
import React from 'react';
import { Button } from '../components';
import { KITS } from './data.js';

const FOX_HEAD = '/assets/mascotte-renard-tete.webp';

export function Hero({ onShop, onOpen }) {
  const [hov, setHov] = React.useState(false);
  const [miniOpen, setMiniOpen] = React.useState(false);
  const [miniEmail, setMiniEmail] = React.useState('');
  const [miniSent, setMiniSent] = React.useState(false);
  const miniRef = React.useRef(null);
  React.useEffect(() => { if (miniOpen && miniRef.current) miniRef.current.focus(); }, [miniOpen]);
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [miniSent, miniOpen]);
  const featured = KITS.find((k) => k.detective) || KITS[0];
  return (
    <section style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: 'var(--sp-8) var(--container-pad) var(--sp-7)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 'var(--sp-8)', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: 'var(--ls-wide)', textTransform: 'uppercase', fontSize: 'var(--fs-small)', color: 'var(--gold-deep)' }}>
            Escape game à imprimer · 5-13 ans
          </span>
          <h1 style={{ fontSize: 'var(--fs-display)', fontWeight: 600, lineHeight: 'var(--lh-tight)', color: 'var(--ink)' }}>
            Les escape games <span style={{ color: 'var(--brand)', fontStyle: 'italic' }}>qu'on imprime</span> à la maison.
          </h1>
          <p style={{ fontSize: 'var(--fs-body-lg)', color: 'var(--ink)', maxWidth: '46ch' }}>
            Des escape games imprimables pour enfants de 5 à 13 ans. Conçus par des enseignants-formateurs, pensés pour le fun !
          </p>
          <div style={{ display: 'flex', gap: 'var(--sp-3)', flexWrap: 'wrap', marginTop: 'var(--sp-2)' }}>
            <Button variant="primary" size="lg" onClick={onShop}>Découvrir les kits</Button>
            <Button variant="secondary" size="lg" onClick={() => setMiniOpen(true)}>Recevoir le mini-jeu gratuit</Button>
          </div>
          {miniOpen && (
            miniSent ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 'var(--sp-2)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--fs-body)', color: 'var(--support-text)' }}>
                <i data-lucide="check-circle" style={{ width: 18, height: 18 }}></i> C'est parti ! Le mini-jeu arrive dans ta boîte mail.
              </span>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); if (miniEmail.trim()) setMiniSent(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 'var(--sp-2)', maxWidth: 420 }}>
                <label htmlFor="email-minijeu-hero" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--fs-small)', color: 'var(--ink)' }}>Saisis ton email pour recevoir le mini-jeu</label>
                <div style={{ display: 'flex', gap: 'var(--sp-2)' }}>
                  <input
                    ref={miniRef} type="email" required value={miniEmail} onChange={(e) => setMiniEmail(e.target.value)}
                    name="email-minijeu-hero" id="email-minijeu-hero" autoComplete="email-minijeu-hero"
                    placeholder="Saisis ton email…" aria-label="Saisis ton email"
                    style={{ flex: 1, minWidth: 0, fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)', padding: '12px 14px', borderRadius: 'var(--r-md)', border: '1.5px solid var(--border-hairline)', background: 'var(--surface-base)', color: 'var(--ink)' }}
                  />
                  <Button variant="primary" size="lg" type="submit">Recevoir</Button>
                </div>
              </form>
            )
          )}

        </div>

        <div onClick={() => featured && onOpen && onOpen(featured)} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} role="button" tabIndex={0} aria-label="Voir la fiche Mystère au Musée" style={{
          position: 'relative', borderRadius: 'var(--r-xl)', overflow: 'hidden', cursor: 'pointer',
          border: '2px solid var(--ink)', boxShadow: hov ? '14px 14px 0 var(--gold)' : '10px 10px 0 var(--gold)',
          background: 'linear-gradient(150deg, var(--brand), var(--brand-hover))',
          minHeight: 320, padding: 'var(--sp-6)', color: 'var(--ink)',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 'var(--sp-4)',
          transform: hov ? 'translate(-2px,-2px)' : 'none', transition: 'transform var(--d-base) var(--e-out), box-shadow var(--d-base)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11, letterSpacing: 'var(--ls-wide)', textTransform: 'uppercase', color: 'var(--brand-ink)', background: 'var(--surface-base)', border: '1.5px solid var(--surface-base)', borderRadius: 999, padding: '5px 12px' }}>✦ Nouveau</span>
            <span style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--brand)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--sh-sm)', overflow: 'hidden', flexShrink: 0 }}>
              <img src={FOX_HEAD} alt="Renard Escape Print" style={{ width: '94%', height: '94%', objectFit: 'contain' }} />
            </span>
          </div>
          <div style={{
            flex: 1, borderRadius: 'var(--r-lg)', border: '2px dashed var(--gold)',
            background: 'repeating-linear-gradient(45deg, var(--surface-raised), var(--surface-raised) 11px, var(--gold-soft) 11px, var(--gold-soft) 22px)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, minHeight: 120,
          }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--fs-body-lg)', color: 'var(--gold-deep)' }}>Illustration du musée</span>
            <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 11, letterSpacing: '0.04em', color: 'var(--ink-soft)' }}>illustration · à fournir</span>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--fs-h1)', lineHeight: 1.1, color: 'var(--ink)' }}>Mystère au Musée</div>
            <p style={{ color: 'rgba(44,44,44,0.82)', marginTop: 8, fontSize: 'var(--fs-body)' }}>
              Une nuit, un tableau disparaît, 6 suspects. Mène l'enquête et démasque le coupable avant l'ouverture des portes.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['Suspects', 'Indices', 'Malle'].map((t) => {
              const malle = t.toLowerCase() === 'malle';
              return (
                <span key={t} style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 11, letterSpacing: 'var(--ls-wide)', textTransform: 'uppercase', padding: '5px 11px', borderRadius: 999, background: malle ? 'var(--brand-press)' : 'var(--surface-base)', color: malle ? '#fff' : 'var(--brand-ink)', border: malle ? '1px solid var(--brand-press)' : '1px solid rgba(138,75,26,0.18)' }}>{t}</span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ReassuranceBand() {
  const items = [
    { icon: 'printer', t: 'Prêt en 15 min', d: 'Imprime, découpe, cache.' },
    { icon: 'monitor-off', t: 'Sans écran', d: 'On joue avec ses mains.' },
    { icon: 'smile', t: 'Succès garanti', d: 'Fun et victoire assurés.' },
    { icon: 'infinity', t: 'À réimprimer', d: 'Le PDF reste à toi.' },
  ];
  return (
    <div style={{ background: 'var(--surface-sunken)', borderTop: '1px solid var(--border-hairline)', borderBottom: '1px solid var(--border-hairline)' }}>
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: 'var(--sp-5) var(--container-pad)', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 'var(--sp-5)' }}>
        {items.map((it) => (
          <div key={it.t} style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'center' }}>
            <span style={{ width: 42, height: 42, borderRadius: 'var(--r-md)', background: 'var(--brand-soft)', color: 'var(--brand-ink)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <i data-lucide={it.icon} style={{ width: 20, height: 20 }}></i>
            </span>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--fs-body)', color: 'var(--ink)' }}>{it.t}</div>
              <div style={{ fontSize: 'var(--fs-small)', color: 'var(--ink-soft)' }}>{it.d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
