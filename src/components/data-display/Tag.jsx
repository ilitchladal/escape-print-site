import React from 'react';

/**
 * Tag — uppercase keyword chip (CARTE · CODE · INDICE).
 * Uses the active kit palette (Layer 2). `accent` fills with the kit accent.
 */
export function Tag({ accent = false, style = {}, children, ...rest }) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: 'var(--font-display)',
    fontWeight: 500,
    fontSize: 'var(--fs-caption)',
    letterSpacing: 'var(--ls-wide)',
    textTransform: 'uppercase',
    padding: '6px var(--sp-3)',
    borderRadius: 'var(--r-pill)',
    background: accent ? 'var(--kit-accent)' : 'var(--kit-light)',
    color: accent ? 'var(--ink-on-color)' : 'var(--kit-deep)',
    whiteSpace: 'nowrap',
  };
  return <span style={{ ...base, ...style }} {...rest}>{children}</span>;
}
