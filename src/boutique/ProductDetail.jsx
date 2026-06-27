// ProductDetail — a single kit page: themed banner, what's inside, reviews, sticky buy.
import React from 'react';
import { Button, Stars, Alert } from '../components';
import { KITS } from './data.js';

const FOX_HEAD = '/assets/mascotte-renard-tete.png';

function Feature({ icon, children }) {
  return (
    <li style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'flex-start' }}>
      <span style={{ color: 'var(--support)', flexShrink: 0, marginTop: 1 }}>
        <i data-lucide={icon} style={{ width: 18, height: 18 }}></i>
      </span>
      <span style={{ fontSize: 'var(--fs-body)', color: 'var(--ink)' }}>{children}</span>
    </li>
  );
}

export function ProductDetail({ kit, onBack, onAdd }) {
  const k = kit || KITS[0];
  const det = k.detective;
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <div data-theme={k.theme} style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: 'var(--sp-6) var(--container-pad) var(--sp-8)' }}>
      <button onClick={onBack} style={{
        display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none',
        color: 'var(--ink-soft)', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 600,
        fontSize: 'var(--fs-small)', marginBottom: 'var(--sp-5)',
      }}>
        <i data-lucide="arrow-left" style={{ width: 16, height: 16 }}></i> Tous les kits
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.85fr', gap: 'var(--sp-7)', alignItems: 'start' }}>
        {/* Visual */}
        <div style={{
          borderRadius: 'var(--r-xl)', overflow: 'hidden', border: '2px solid var(--ink)',
          boxShadow: '10px 10px 0 var(--gold)',
          background: det
            ? 'linear-gradient(150deg, var(--brand), var(--brand-hover))'
            : 'linear-gradient(150deg, var(--kit-primary), var(--kit-deep))',
          color: det ? 'var(--ink)' : '#fff', minHeight: 420, padding: 'var(--sp-6)',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 'var(--sp-4)',
        }}>
          {!det && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              {k.best && <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11, letterSpacing: 'var(--ls-wide)', textTransform: 'uppercase', color: det ? 'var(--gold-deep)' : 'var(--gold)', border: '1.5px solid var(--gold)', borderRadius: 999, padding: '5px 12px' }}>✦ Best-seller</span>}
              <img src={FOX_HEAD} alt="Renard Escape Print" style={{ width: 78, height: 78, objectFit: 'contain', marginLeft: 'auto', filter: 'drop-shadow(0 5px 12px rgba(27,40,55,0.25))' }} />
            </div>
          )}

          {det && (
            <div style={{
              position: 'relative', flex: 1, borderRadius: 'var(--r-lg)', border: '2px dashed var(--gold)',
              background: 'repeating-linear-gradient(45deg, var(--surface-raised), var(--surface-raised) 11px, var(--gold-soft) 11px, var(--gold-soft) 22px)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, minHeight: 285,
            }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--fs-body-lg)', color: 'var(--gold-deep)' }}>Illustration du musée</span>
              <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 11, letterSpacing: '0.04em', color: 'var(--ink-soft)' }}>illustration · à fournir</span>
              <span style={{ position: 'absolute', top: -18, right: -18, width: 48, height: 48, borderRadius: '50%', background: 'var(--brand)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--sh-sm)', overflow: 'hidden', border: '2px solid var(--surface-base)' }}>
                <img src={FOX_HEAD} alt="Renard Escape Print" style={{ width: '94%', height: '94%', objectFit: 'contain' }} />
              </span>
            </div>
          )}

          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--fs-h1)', lineHeight: 1.1, color: det ? 'var(--ink)' : '#fff' }}>{k.title}</div>
            <p style={{ color: det ? 'rgba(44,44,44,0.82)' : 'rgba(255,255,255,0.85)', marginTop: 8 }}>{k.blurb}</p>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {k.tags.map((t) => {
              const malle = det && t.toLowerCase() === 'malle';
              return <span key={t} style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 11, letterSpacing: 'var(--ls-wide)', textTransform: 'uppercase', padding: '5px 11px', borderRadius: 999, background: !det ? 'rgba(255,255,255,0.18)' : (malle ? 'var(--brand-press)' : 'var(--surface-base)'), color: !det ? '#fff' : (malle ? '#fff' : 'var(--brand-ink)'), border: !det ? 'none' : (malle ? '1px solid var(--brand-press)' : '1px solid rgba(138,75,26,0.18)') }}>{t}</span>;
            })}
          </div>
        </div>

        {/* Buy panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: 'var(--ls-wide)', textTransform: 'uppercase', fontSize: 'var(--fs-small)', color: 'var(--gold-deep)' }}>{k.meta}</span>
          <h1 style={{ fontSize: 'var(--fs-h1)', color: 'var(--ink)' }}>{k.title}</h1>
          {k.rating != null && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', flexWrap: 'wrap' }}>
              <Stars value={k.rating} count={k.reviews} />
            </div>
          )}
          {k.launch ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
              <span style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--fs-small)', letterSpacing: 'var(--ls-wide)', textTransform: 'uppercase', color: 'var(--gold-deep)', background: 'var(--gold-soft)', border: '1px solid var(--gold)', borderRadius: 999, padding: '4px 11px' }}>
                <i data-lucide="clock" style={{ width: 14, height: 14 }}></i> Prix de lancement
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--fs-display)', color: 'var(--ink)', lineHeight: 1 }}>{k.price}</span>
              <span style={{ fontSize: 'var(--fs-body)', color: 'var(--ink-soft)' }}>puis {k.regularPrice} à partir du {k.launchUntil}</span>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--sp-3)' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--fs-display)', color: 'var(--ink)', lineHeight: 1 }}>{k.price}</span>
              {k.oldPrice && <s style={{ color: 'var(--ink-faint)', fontSize: 'var(--fs-h3)' }}>{k.oldPrice}</s>}
            </div>
          )}
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
            <Feature icon="file-text">PDF prêt à imprimer (A4, couleur ou éco N&amp;B)</Feature>
            <Feature icon="mail">Invitations + déco + playlist d'ambiance</Feature>
            <Feature icon="book-open">Guide animateur pas-à-pas pour les parents</Feature>
            <Feature icon="award">Badges détective + diplôme à remplir au prénom</Feature>
          </ul>
          <div style={{ display: 'flex', gap: 'var(--sp-3)', flexWrap: 'wrap', marginTop: 'var(--sp-2)' }}>
            <Button variant="primary" size="lg" style={{ flex: 1 }} iconLeft={<i data-lucide="shopping-bag" style={{ width: 18, height: 18 }}></i>} onClick={() => onAdd(k)}>Ajouter au panier — {k.price}</Button>
          </div>
          <Alert tone="info" title="Téléchargement immédiat.">Le lien PDF arrive par e-mail juste après le paiement.</Alert>
        </div>
      </div>

      <div style={{ marginTop: 'var(--sp-7)', background: 'var(--surface-sunken)', border: '1px solid var(--border-hairline)', borderRadius: 'var(--r-lg)', padding: 'var(--sp-5) var(--sp-6)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--sp-5)' }}>
        {[
          { icon: 'graduation-cap', t: 'Conçus par des enseignants-formateurs' },
          { icon: 'clock', t: 'Prêt à la maison en 15 min', nowrap: true },
          { icon: 'party-popper', t: '100 % fun et réussite garantie' },
        ].map((it) => (
          <div key={it.t} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 'var(--sp-3)' }}>
            <span style={{ width: 89, height: 89, borderRadius: 'var(--r-md)', background: 'var(--brand-soft)', color: 'var(--brand-ink)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <i data-lucide={it.icon} style={{ width: 43, height: 43 }}></i>
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '25px', lineHeight: 'var(--lh-tight)', color: 'var(--ink)', whiteSpace: it.nowrap ? 'nowrap' : 'normal' }}>{it.t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
