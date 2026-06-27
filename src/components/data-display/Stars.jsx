import React from 'react';

/**
 * Stars — gold review rating (0–5, supports halves). Decorative gold tint.
 */
export function Stars({ value = 5, count = null, size = 'var(--fs-body-lg)', style = {}, ...rest }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const glyphs = [];
  for (let i = 0; i < 5; i++) {
    if (i < full) glyphs.push('★');
    else if (i === full && half) glyphs.push('⯨');
    else glyphs.push('☆');
  }
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--sp-2)', ...style }} {...rest}>
      <span aria-label={`${value} sur 5`} style={{ color: 'var(--gold)', letterSpacing: '2px', fontSize: size, lineHeight: 1 }}>
        {glyphs.join('')}
      </span>
      {count != null && (
        <span style={{ fontSize: 'var(--fs-small)', color: 'var(--ink-soft)', fontFamily: 'var(--font-body)' }}>
          {count} avis
        </span>
      )}
    </span>
  );
}
