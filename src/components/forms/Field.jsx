import React from 'react';

/**
 * Field — label + control + helper/error text wrapper.
 */
export function Field({ label, htmlFor, hint = null, error = null, style = {}, children, ...rest }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', ...style }} {...rest}>
      {label && (
        <label htmlFor={htmlFor} style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'var(--fs-small)', color: 'var(--ink)' }}>
          {label}
        </label>
      )}
      {children}
      {error
        ? <span style={{ fontSize: 'var(--fs-small)', color: 'var(--error)' }}>{error}</span>
        : hint && <span style={{ fontSize: 'var(--fs-small)', color: 'var(--ink-faint)' }}>{hint}</span>}
    </div>
  );
}
