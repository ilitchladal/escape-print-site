// Footer — newsletter capture + link columns.
import React from 'react';
import { Button, Input } from '../components';

export function Footer() {
  const cols = [
    { h: 'Aide', links: ['Comment ça marche', 'FAQ', 'Nous écrire'] },
  ];
  return (
    <footer style={{ background: 'var(--surface-sunken)', borderTop: '2px solid var(--ink)', marginTop: 'var(--sp-8)' }}>
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: 'var(--sp-8) var(--container-pad)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 380px) max-content', justifyContent: 'space-between', gap: 'var(--sp-7)' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--fs-h3)', color: 'var(--ink)', marginBottom: 'var(--sp-3)' }}>Reçois le mini-jeu gratuit</div>
            <p style={{ color: 'var(--ink-soft)', fontSize: 'var(--fs-small)', marginBottom: 'var(--sp-4)' }}>Une mini-enquête de 15 min, offerte. Plus nos nouveautés (pas de spam).</p>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', gap: 'var(--sp-2)' }}>
              <Input type="email" name="email-minijeu" id="email-minijeu" autoComplete="email-minijeu" placeholder="prenom@exemple.fr" style={{ flex: 1 }} />
              <Button variant="primary" type="submit">Recevoir</Button>
            </form>
          </div>
          {cols.map((c) => (
            <div key={c.h} style={{ transform: 'translateX(-80px)' }}>
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
