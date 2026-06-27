import React from 'react';

/**
 * Input — text field on a sunken cream surface. Focus = gold ring + orange border.
 * Wrap with Field for label + helper/error text.
 */
export function Input({ error = false, style = {}, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const base = {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--fs-body)',
    color: 'var(--ink)',
    background: 'var(--surface-sunken)',
    border: `1.5px solid ${error ? 'var(--error)' : 'var(--border-hairline)'}`,
    borderRadius: 'var(--r-sm)',
    padding: 'var(--sp-3) var(--sp-4)',
    width: '100%',
    transition: 'border var(--d-fast), box-shadow var(--d-fast)',
    outline: 'none',
    ...(focus ? {
      borderColor: error ? 'var(--error)' : 'var(--brand)',
      boxShadow: error ? '0 0 0 3px var(--error-soft)' : 'var(--focus-ring)',
    } : {}),
  };
  return (
    <input
      style={{ ...base, ...style }}
      onFocus={(e) => { setFocus(true); rest.onFocus && rest.onFocus(e); }}
      onBlur={(e) => { setFocus(false); rest.onBlur && rest.onBlur(e); }}
      {...rest}
    />
  );
}
