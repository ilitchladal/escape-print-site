import React from 'react';

/**
 * Badge — small status pill keyed to a feedback tone (Layer 1 colors).
 * For kit keyword chips use Tag instead.
 */
export function Badge({ tone = 'neutral', style = {}, children, ...rest }) {
  const tones = {
    neutral: { background: 'var(--surface-sunken)', color: 'var(--ink-soft)' },
    brand:   { background: 'var(--brand-soft)', color: 'var(--brand-ink)' },
    gold:    { background: 'var(--gold-soft)', color: 'var(--gold-deep)' },
    success: { background: 'var(--success-soft)', color: 'var(--support-text)' },
    error:   { background: 'var(--error-soft)', color: 'var(--error)' },
    info:    { background: 'var(--info-soft)', color: 'var(--info)' },
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: 'var(--fs-caption)',
    padding: '4px var(--sp-3)',
    borderRadius: 'var(--r-pill)',
    whiteSpace: 'nowrap',
    lineHeight: 1.2,
  };
  return <span style={{ ...base, ...tones[tone], ...style }} {...rest}>{children}</span>;
}
