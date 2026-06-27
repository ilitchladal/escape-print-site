import React from 'react';
import { Tag } from '../data-display/Tag.jsx';
import { Stars } from '../data-display/Stars.jsx';
import { Seal } from '../data-display/Seal.jsx';
import { Button } from '../buttons/Button.jsx';

/**
 * KitCard — the e-commerce product card for a printable escape-game kit.
 * The banner uses Layer 2 (kit palette) via the `theme` prop, or the Layer-1
 * brand orange when `detective`. `available` marks the live flagship (shows
 * the official Seal + "Disponible" + a "Voir le kit" CTA); `soon` marks a
 * coming-soon kit (faded, "Bientôt disponible", no price/reviews, and a
 * "Préviens-moi" email capture instead of add-to-cart).
 */
export function KitCard({
  theme = 'pirates',
  title = 'Pirates du Trésor Perdu',
  meta = 'aventure · 60-90 min · 7-10 ans',
  tags = ['Carte', 'Code', 'Trésor'],
  blurb = 'Jeu + invitations + déco + guide + badges + diplôme.',
  rating = 5,
  reviews = 234,
  price = '17,90 €',
  oldPrice = null,
  launch = false,
  regularPrice = null,
  launchUntil = null,
  official = true,
  best = false,
  seal = false,
  detective = false,
  available = false,
  soon = false,
  id,
  onAdd = () => {},
  onOpen = () => {},
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [notifyOpen, setNotifyOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [sent, setSent] = React.useState(false);
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

  const stop = (e) => { if (e && e.stopPropagation) e.stopPropagation(); };

  const pillBase = {
    fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11,
    letterSpacing: 'var(--ls-wide)', textTransform: 'uppercase',
    borderRadius: 999, padding: '4px 11px', display: 'inline-flex', alignItems: 'center', gap: 5,
  };

  return (
    <div
      data-theme={theme}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: soon ? '#EFEBE0' : 'var(--surface-raised)',
        borderRadius: 'var(--r-lg)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        opacity: soon ? 0.9 : 1,
        boxShadow: (hover && !soon) ? 'var(--sh-lg)' : 'var(--sh-md)',
        transform: (hover && !soon) ? 'translateY(-4px)' : 'none',
        transition: 'transform var(--d-base) var(--e-out), box-shadow var(--d-base)',
        ...style,
      }}
      {...rest}
    >
      <div style={{
        background: detective
          ? 'linear-gradient(150deg, var(--brand), var(--brand-hover))'
          : 'linear-gradient(150deg, var(--kit-primary), var(--kit-deep))',
        color: detective ? 'var(--ink)' : '#fff',
        padding: 'var(--sp-5)',
        minHeight: '168px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: 'var(--sp-3)',
        filter: soon ? 'grayscale(0.5)' : 'none',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, minHeight: 24 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {available && (
              <span style={{ ...pillBase, color: '#fff', background: 'var(--support)', border: '1.5px solid var(--support)' }}>
                <i data-lucide="check" style={{ width: 13, height: 13 }}></i> Disponible
              </span>
            )}
            {soon && (
              <span style={{ ...pillBase, color: 'var(--ink)', background: 'var(--surface-base)', border: '1px solid rgba(0,0,0,0.08)' }}>
                <i data-lucide="clock" style={{ width: 13, height: 13 }}></i> Bientôt disponible
              </span>
            )}
            {best && (
              <span style={{ ...pillBase, color: 'var(--gold)', background: 'rgba(27,40,55,0.28)', border: '1.5px solid var(--gold)' }}>✦ Best-seller</span>
            )}
          </div>
          {available && (
            <Seal size={58} style={{ flexShrink: 0, marginTop: -2, filter: 'drop-shadow(0 3px 8px rgba(27,40,55,0.28))' }} />
          )}
        </div>
        <div>
          <h4 style={{ color: detective ? 'var(--ink)' : '#fff', fontSize: 'var(--fs-h3)', fontFamily: 'var(--font-display)', fontWeight: 600, margin: 0 }}>{title}</h4>
          <span style={{ color: detective ? 'rgba(44,44,44,0.8)' : 'rgba(255,255,255,.82)', fontSize: 'var(--fs-small)' }}>{meta}</span>
        </div>
      </div>

      <div style={{ padding: 'var(--sp-4)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)', flex: 1 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {tags.map((t, i) => {
            const malle = detective && t.toLowerCase() === 'malle';
            const detStyle = detective
              ? (malle
                  ? { background: 'var(--brand-press)', color: '#fff', border: '1px solid var(--brand-press)' }
                  : { background: 'var(--surface-base)', color: 'var(--brand-ink)', border: '1px solid rgba(138,75,26,0.18)' })
              : {};
            return <Tag key={t} accent={!detective && i === tags.length - 1} style={detStyle}>{t}</Tag>;
          })}
        </div>
        {blurb && <p style={{ fontSize: 'var(--fs-small)', color: 'var(--ink-soft)', margin: 0 }}>{blurb}</p>}

        {soon ? (
          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center', paddingBottom: '34px' }}>
            {sent ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--fs-small)', color: 'var(--support-text)' }}>
                <i data-lucide="check-circle" style={{ width: 16, height: 16 }}></i> Inscrit ! On te préviendra à la sortie.
              </span>
            ) : notifyOpen ? (
              <form onClick={stop} onSubmit={(e) => { e.preventDefault(); if (email.trim()) setSent(true); }} style={{ display: 'flex', gap: 6 }}>
                <input
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  name={'email-notify-' + (id || 'kit')} id={'email-notify-' + (id || 'kit')} autoComplete={'email-notify-' + (id || 'kit')}
                  placeholder="ton@email.fr" aria-label="Ton e-mail"
                  style={{ flex: 1, minWidth: 0, fontFamily: 'var(--font-body)', fontSize: 'var(--fs-small)', padding: '8px 10px', borderRadius: 'var(--r-md)', border: '1.5px solid var(--border-hairline)', background: 'var(--surface-base)', color: 'var(--ink)' }}
                />
                <Button variant="primary" size="sm" type="submit">OK</Button>
              </form>
            ) : (
              <Button variant="secondary" size="sm" style={{ padding: '20px 26px' }} iconLeft={<i data-lucide="bell" style={{ width: 16, height: 16 }}></i>} onClick={(e) => { stop(e); setNotifyOpen(true); }}>Préviens-moi</Button>
            )}
          </div>
        ) : (
          <React.Fragment>
            {rating != null
              ? <Stars value={rating} count={reviews} />
              : null}
            {launch ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 'var(--sp-1)' }}>
                <span style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11, letterSpacing: 'var(--ls-wide)', textTransform: 'uppercase', color: 'var(--gold-deep)', background: 'var(--gold-soft)', border: '1px solid var(--gold)', borderRadius: 999, padding: '3px 9px' }}>
                  <i data-lucide="clock" style={{ width: 12, height: 12 }}></i> Prix de lancement
                </span>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--sp-3)' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '28px', lineHeight: 1, color: 'var(--ink)' }}>{price}</span>
                  {available
                    ? <Button variant="primary" size="sm" style={{ padding: '13px 24px', fontSize: '16px', boxShadow: 'var(--sh-md)' }} onClick={(e) => { stop(e); onOpen(); }}>Voir le kit</Button>
                    : <Button variant="primary" size="sm" style={{ padding: '13px 24px', fontSize: '16px', boxShadow: 'var(--sh-md)' }} onClick={onAdd}>Ajouter</Button>}
                </div>
                <span style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>puis {regularPrice} à partir du {launchUntil}</span>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--sp-3)', marginTop: 'var(--sp-1)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: '6px', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--ink)' }}>
                  {oldPrice && <s style={{ color: 'var(--ink-faint)', fontWeight: 400, fontSize: '14px' }}>{oldPrice}</s>}
                  <span style={{ fontSize: '22px' }}>{price}</span>
                </span>
                {available
                  ? <Button variant="primary" size="sm" onClick={(e) => { stop(e); onOpen(); }}>Voir le kit</Button>
                  : <Button variant="primary" size="sm" onClick={onAdd}>Ajouter</Button>}
              </div>
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
