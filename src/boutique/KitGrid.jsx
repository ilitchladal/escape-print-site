// KitGrid — homepage product grid with a universe filter row.
import React from 'react';
import { KitCard } from '../components';
import { KITS } from './data.js';
import { useWidth } from './useViewport.js';

export function KitGrid({ onOpen, onAdd }) {
  const shown = KITS;
  const w = useWidth();
  // 3-up desktop, 2-up tablet, single column on phones. minmax(0, 1fr) lets the
  // columns shrink below the cards' min-content (avoids horizontal overflow).
  const count = w >= 900 ? 3 : w >= 600 ? 2 : 1;

  return (
    <section style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: 'var(--sp-8) var(--container-pad)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--sp-4)', marginBottom: 'var(--sp-5)' }}>
        <div>
          <h2 style={{ fontSize: 'var(--fs-h1)', color: 'var(--ink)' }}>Choisis ton univers</h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: 'var(--fs-body-lg)', marginTop: 4 }}>Six aventures, une seule promesse : 15 minutes de prépa, des heures de jeu.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))`, gridAutoRows: count === 1 ? 'auto' : '1fr', gap: 'var(--sp-5)' }}>
        {shown.map((k) => (
          <div key={k.id} style={{ cursor: k.soon ? 'default' : 'pointer', display: 'flex', flexDirection: 'column' }} onClick={() => { if (!k.soon) onOpen(k); }}>
            <KitCard {...k} style={{ height: '100%' }} onOpen={() => onOpen(k)} onAdd={(e) => { if (e && e.stopPropagation) e.stopPropagation(); onAdd(k); }} />
          </div>
        ))}
      </div>
    </section>
  );
}
