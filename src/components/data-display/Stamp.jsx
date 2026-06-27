import React from 'react';

/**
 * Stamp — the gold "Officiel" seal. Pill with gold border on a pale gold field.
 */
export function Stamp({ children = 'Officiel Escape Print', style = {}, ...rest }) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    letterSpacing: 'var(--ls-wide)',
    textTransform: 'uppercase',
    fontSize: 'var(--fs-caption)',
    color: 'var(--gold-deep)',
    border: '1.5px solid var(--gold)',
    borderRadius: 'var(--r-pill)',
    padding: '6px var(--sp-3)',
    background: 'var(--gold-soft)',
  };
  return <span style={{ ...base, ...style }} {...rest}><span aria-hidden="true">✦</span>{children}</span>;
}
