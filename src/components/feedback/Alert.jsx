import React from 'react';

/**
 * Alert — inline message banner keyed to a feedback tone.
 * Warm soft background + left accent bar; never harsh red/green.
 */
export function Alert({ tone = 'info', title, icon = null, style = {}, children, ...rest }) {
  const tones = {
    success: { bg: 'var(--success-soft)', bar: 'var(--success)', mark: '✓' },
    error:   { bg: 'var(--error-soft)', bar: 'var(--error)', mark: '✕' },
    warning: { bg: 'var(--warning-soft)', bar: 'var(--warning)', mark: '!' },
    info:    { bg: 'var(--info-soft)', bar: 'var(--info)', mark: 'ℹ' },
  };
  const t = tones[tone];
  return (
    <div
      role="status"
      style={{
        display: 'flex', gap: 'var(--sp-3)', padding: 'var(--sp-4)',
        borderRadius: 'var(--r-md)', borderLeft: `4px solid ${t.bar}`,
        background: t.bg, fontSize: 'var(--fs-small)', color: 'var(--ink)',
        alignItems: 'flex-start', ...style,
      }}
      {...rest}
    >
      <span aria-hidden="true" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: t.bar, lineHeight: 1.4 }}>
        {icon || t.mark}
      </span>
      <span>
        {title && <b style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>{title} </b>}
        {children}
      </span>
    </div>
  );
}
