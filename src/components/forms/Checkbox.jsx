import React from 'react';

/**
 * Checkbox — custom cream/ink check with brand fill when selected.
 */
export function Checkbox({ checked = false, onChange = () => {}, label, disabled = false, style = {}, ...rest }) {
  return (
    <label style={{
      display: 'inline-flex', alignItems: 'center', gap: 'var(--sp-3)',
      cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1,
      fontSize: 'var(--fs-body)', color: 'var(--ink)', ...style,
    }}>
      <span style={{
        width: '22px', height: '22px', flexShrink: 0,
        borderRadius: 'var(--r-sm)',
        border: `2px solid ${checked ? 'var(--brand-press)' : 'var(--border-hairline)'}`,
        background: checked ? 'var(--brand)' : 'var(--surface-sunken)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--ink)', fontWeight: 700, fontSize: '14px', lineHeight: 1,
        transition: 'background var(--d-fast), border-color var(--d-fast)',
      }}>
        {checked ? '✓' : ''}
      </span>
      <input
        type="checkbox" checked={checked} disabled={disabled}
        onChange={(e) => onChange(e.target.checked, e)}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
        {...rest}
      />
      {label && <span>{label}</span>}
    </label>
  );
}
