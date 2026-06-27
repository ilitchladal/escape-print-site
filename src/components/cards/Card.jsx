import React from 'react';

/**
 * Card — warm raised surface. Variants:
 *  · 'raised' (default) — soft warm shadow, lifts on hover
 *  · 'clue' — 2px ink outline + offset gold shadow ("fiche indice" print look)
 */
export function Card({ variant = 'raised', interactive = true, style = {}, children, ...rest }) {
  const [hover, setHover] = React.useState(false);

  const base = {
    background: 'var(--surface-raised)',
    borderRadius: 'var(--r-lg)',
    overflow: 'hidden',
    transition: 'transform var(--d-base) var(--e-out), box-shadow var(--d-base)',
  };

  const variants = {
    raised: {
      boxShadow: 'var(--sh-md)',
      ...(interactive && hover ? { transform: 'translateY(-4px)', boxShadow: 'var(--sh-lg)' } : {}),
    },
    clue: {
      border: 'var(--bw-card) solid var(--border-ink)',
      borderRadius: 'var(--r-lg)',
      boxShadow: 'var(--sh-clue)',
      ...(interactive && hover ? { transform: 'translateY(-2px) rotate(-0.4deg)', boxShadow: 'var(--sh-clue-hover)' } : {}),
    },
  };

  return (
    <div
      style={{ ...base, ...variants[variant], ...style }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...rest}
    >
      {children}
    </div>
  );
}
