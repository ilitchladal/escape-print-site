// Footer — newsletter capture + link columns.
// Responsive: on narrow screens the columns stack vertically (no overlap) and
// the newsletter form switches to a single column so the email field keeps its
// full width (placeholder no longer truncated).
import React from 'react';
import { Button, Input } from '../components';
import { useWidth } from './useViewport.js';

export function Footer() {
  const w = useWidth();
  const stack = w < 640;
  const cols = [
    { h: 'Aide', links: ['Comment ça marche', 'FAQ', 'Nous écrire'] },
  ];
  return (
    <footer style={{ background: 'var(--surface-sunken)', borderTop: '2px solid var(--ink)', marginTop: 'var(--sp-8)' }}>
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: 'var(--sp-8) var(--container-pad)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: stack ? '1fr' : 'minmax(0, 380px) max-content', justifyContent: stack ? 'stretch' : 'space-between', gap: stack ? 'var(--sp-6)' : 'var(--sp-7)' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--fs-h3)', color: 'var(--ink)', marginBottom: 'var(--sp-3)' }}>Reçois le mini-jeu gratuit</div>
            <p style={{ color: 'var(--ink-soft)', fontSize: 'var(--fs-small)', marginBottom: 'var(--sp-4)' }}>Une mini-enquête de 15 min, offerte. Plus nos nouveautés (pas de spam).</p>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: stack ? 'column' : 'row', gap: 'var(--sp-2)' }}>
              <Input type="email" name="email-minijeu" id="email-minijeu" autoComplete="email-minijeu" placeholder="prénom@exemple.fr" style={{ flex: 1, minWidth: 0 }} />
              <Button variant="primary" type="submit" style={{ width: stack ? '100%' : 'auto' }}>Recevoir</Button>
            </form>
          </div>
          {cols.map((c) => (
            <div key={c.h} style={{ transform: stack ? 'none' : 'translateX(-80px)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--fs-body)', color: 'var(--ink)', marginBottom: 'var(--sp-3)' }}>{c.h}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
                {c.links.map((l) => (
                  <li key={l}><a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'var(--ink-soft)', fontSize: 'var(--fs-small)', textDecoration: 'none' }}>{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 'var(--sp-7)', paddingTop: 'var(--sp-4)', borderTop: '1px solid var(--border-hairline)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--sp-3)', color: 'var(--ink-faint)', fontSize: 'var(--fs-caption)' }}>
          <span>© 2026 Escape Print · Enquêtes douces pour les 5-13 ans</span>
          <span style={{ display: 'inline-flex', gap: 'var(--sp-4)' }}>
            <a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'var(--ink-faint)', textDecoration: 'none' }}>Mentions légales</a>
            <a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'var(--ink-faint)', textDecoration: 'none' }}>CGV</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
