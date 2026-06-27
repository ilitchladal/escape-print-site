import React from 'react';

const STAR = "M0,-1 L0.225,-0.309 L0.951,-0.309 L0.363,0.118 L0.588,0.809 L0,0.382 L-0.588,0.809 L-0.363,0.118 L-0.951,-0.309 L-0.225,-0.309 Z";

/**
 * Seal — the round "Tampon Officiel" trust mark (Escape Print).
 * Curved Fredoka text sits in the gold band; orange central star.
 * Keep it round — never distort or recolor. Uses a unique id per
 * instance so multiple seals on one page don't collide.
 */
export function Seal({ size = 120, disc = true, style = {}, ...rest }) {
  const uid = React.useId().replace(/[:]/g, '');
  const gold = '#D4A847', goldText = '#B8902F';
  return (
    <svg viewBox="-15 -15 430 430" width={size} height={size} role="img"
      aria-label="Tampon officiel Escape Print" style={style} {...rest}>
      <defs>
        <path id={`t${uid}`} d="M 84.1,183.7 A 117,117 0 0 1 315.9,183.7" fill="none" />
        <path id={`b${uid}`} d="M 75.3,277.9 A 147,147 0 0 0 324.7,277.9" fill="none" />
      </defs>
      {disc && <circle cx="200" cy="200" r="200" fill="#F7EDCF" />}
      <circle cx="200" cy="200" r="182" fill="none" stroke={gold} strokeWidth="9" strokeLinecap="round" strokeDasharray="2 18" />
      <circle cx="200" cy="18" r="11" fill={gold} />
      <circle cx="382" cy="200" r="11" fill={gold} />
      <circle cx="200" cy="382" r="11" fill={gold} />
      <circle cx="18" cy="200" r="11" fill={gold} />
      <circle cx="200" cy="200" r="150" fill="none" stroke={gold} strokeWidth="2.5" />
      <circle cx="200" cy="200" r="110" fill="none" stroke={gold} strokeWidth="4" strokeDasharray="1 11" strokeLinecap="round" />
      <text fill={goldText} fontFamily="Fredoka, sans-serif" fontWeight="700" fontSize="42" letterSpacing="0" style={{ textTransform: 'uppercase' }}>
        <textPath href={`#t${uid}`} startOffset="50%" textAnchor="middle">ESCAPE PRINT</textPath>
      </text>
      <text fill={goldText} fontFamily="Fredoka, sans-serif" fontWeight="700" fontSize="42" letterSpacing="2" style={{ textTransform: 'uppercase' }}>
        <textPath href={`#b${uid}`} startOffset="50%" textAnchor="middle">OFFICIEL</textPath>
      </text>
      <path d={STAR} transform="translate(65 200) scale(13)" fill={gold} />
      <path d={STAR} transform="translate(335 200) scale(13)" fill={gold} />
      <path d={STAR} transform="translate(200 202) scale(40)" fill="#F2A65A" stroke={goldText} strokeWidth="0.125" strokeLinejoin="round" />
    </svg>
  );
}
