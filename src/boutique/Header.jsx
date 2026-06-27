// Header — boutique top bar: wordmark, universe nav, search, cart.
// The fox-head mark loads from /assets/mascotte-renard-tete.png (public/).
import React from 'react';

const FOX_HEAD = '/assets/mascotte-renard-tete.png';

export function Logo() {
  return (
    <a href="#" onClick={(e) => e.preventDefault()} style={{
      display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none',
    }}>
      <span style={{
        width: '48px', height: '48px', borderRadius: '50%',
        background: 'var(--brand)', color: 'var(--ink)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: 'var(--sh-sm)', overflow: 'hidden', flexShrink: 0,
      }}>
        <img src={FOX_HEAD} alt="Renard Escape Print" style={{ width: '94%', height: '94%', objectFit: 'contain' }} />
      </span>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '20px', color: 'var(--ink)', letterSpacing: '-0.01em' }}>
        Escape&nbsp;Print
      </span>
    </a>
  );
}

export function Header({ cartCount = 0, onCart, onHome, onKits }) {
  const nav = ['Tous les kits'];
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const searchRef = React.useRef(null);
  React.useEffect(() => { if (searchOpen && searchRef.current) searchRef.current.focus(); }, [searchOpen]);
  const goHome = () => { onHome && onHome(); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 20,
      background: 'rgba(255,248,231,0.92)', backdropFilter: 'saturate(140%) blur(8px)',
      borderBottom: '1px solid var(--border-hairline)',
    }}>
      <div style={{
        maxWidth: 'var(--container)', margin: '0 auto', padding: '12px var(--container-pad)',
        display: 'flex', alignItems: 'center', gap: 'var(--sp-5)',
      }}>
        <div onClick={goHome} style={{ cursor: 'pointer' }}><Logo /></div>
        <nav style={{ display: 'flex', gap: 'var(--sp-5)', marginLeft: 'var(--sp-4)', flex: 1 }}>
          {nav.map((n) => (
            <a key={n} href="#" onClick={(e) => { e.preventDefault(); onKits ? onKits() : (onHome && onHome()); }} style={{
              fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'var(--fs-small)',
              color: 'var(--ink)', textDecoration: 'none',
            }}>{n}</a>
          ))}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
          {searchOpen && (
            <form onSubmit={(e) => { e.preventDefault(); }} style={{ display: 'flex' }}>
              <input
                ref={searchRef} type="search" name="site-search" value={query}
                onChange={(e) => setQuery(e.target.value)}
                onBlur={() => { if (!query) setSearchOpen(false); }}
                placeholder="Rechercher un kit…" aria-label="Rechercher un kit"
                style={{
                  width: 180, fontFamily: 'var(--font-body)', fontSize: 'var(--fs-small)',
                  padding: '8px 12px', borderRadius: 'var(--r-md)',
                  border: '1.5px solid var(--border-hairline)', background: 'var(--surface-base)', color: 'var(--ink)',
                }}
              />
            </form>
          )}
          <button aria-label="Rechercher" aria-expanded={searchOpen} onClick={() => setSearchOpen((o) => !o)} style={iconBtn}>
            <i data-lucide="search" style={{ width: 18, height: 18 }}></i>
          </button>
        </div>
        <button aria-label="Panier" onClick={onCart} style={{ ...iconBtn, position: 'relative' }}>
          <i data-lucide="shopping-bag" style={{ width: 18, height: 18 }}></i>
          {cartCount > 0 && (
            <span style={{
              position: 'absolute', top: -6, right: -6, minWidth: 18, height: 18, padding: '0 5px',
              borderRadius: 999, background: 'var(--brand)', color: 'var(--ink)',
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: 'var(--sh-sm)',
            }}>{cartCount}</span>
          )}
        </button>
      </div>
    </header>
  );
}

const iconBtn = {
  width: 40, height: 40, borderRadius: 'var(--r-md)', border: '1.5px solid var(--border-hairline)',
  background: 'var(--surface-raised)', color: 'var(--ink)', cursor: 'pointer',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
};
