import React from 'react';

/**
 * Button — Escape Print primary action control.
 * Signature rule: the primary variant is warm orange with INK text (never white).
 */
export function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  iconLeft = null,
  iconRight = null,
  style = {},
  children,
  ...rest
}) {
  const base = {
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    border: 'none',
    borderRadius: 'var(--r-md)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--sp-2)',
    lineHeight: 1.1,
    textDecoration: 'none',
    transition: 'transform var(--d-fast) var(--e-out), background var(--d-fast), box-shadow var(--d-fast)',
    opacity: disabled ? 0.45 : 1,
  };

  const sizes = {
    sm: { padding: 'var(--sp-2) var(--sp-4)', fontSize: 'var(--fs-small)' },
    md: { padding: 'var(--sp-3) var(--sp-5)', fontSize: 'var(--fs-body)' },
    lg: { padding: 'var(--sp-4) var(--sp-6)', fontSize: 'var(--fs-body-lg)' },
  };

  const variants = {
    primary: { background: 'var(--brand)', color: 'var(--ink)', boxShadow: disabled ? 'none' : 'var(--sh-sm)' },
    gold: { background: 'var(--gold)', color: 'var(--ink)', boxShadow: disabled ? 'none' : 'var(--sh-sm)' },
    secondary: { background: 'transparent', color: 'var(--ink)', boxShadow: 'inset 0 0 0 var(--bw-card) var(--ink)' },
    ghost: { background: 'transparent', color: 'var(--brand-ink)', boxShadow: 'none' },
  };

  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const hoverStyle = !disabled && hover ? {
    primary: { background: 'var(--brand-hover)', boxShadow: 'var(--sh-md)' },
    gold: { background: '#C79A33' },
    secondary: { background: 'var(--ink)', color: 'var(--ink-on-color)' },
    ghost: { background: 'var(--brand-soft)' },
  }[variant] : {};

  const activeStyle = !disabled && active ? {
    transform: 'translateY(1px)',
    background: variant === 'primary' ? 'var(--brand-press)' : undefined,
  } : {};

  return (
    <button
      type={type}
      disabled={disabled}
      style={{ ...base, ...sizes[size], ...variants[variant], ...hoverStyle, ...activeStyle, ...style }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
