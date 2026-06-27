import React from 'react';
import { Header } from './boutique/Header.jsx';
import { Hero, ReassuranceBand } from './boutique/Hero.jsx';
import { KitGrid } from './boutique/KitGrid.jsx';
import { ProductDetail } from './boutique/ProductDetail.jsx';
import { CartDrawer } from './boutique/CartDrawer.jsx';
import { Footer } from './boutique/Footer.jsx';
import { KITS } from './boutique/data.js';

// Deep-link: ?kit=<id> opens that product directly (shareable product URLs).
function initialView() {
  const id = new URLSearchParams(window.location.search).get('kit');
  const kit = id && KITS.find((k) => k.id === id);
  return kit ? { name: 'product', kit } : { name: 'home', kit: null };
}

export default function App() {
  const [view, setView] = React.useState(initialView);
  const [cart, setCart] = React.useState([]);
  const [cartOpen, setCartOpen] = React.useState(false);

  const addToCart = (kit) => {
    setCart((c) => {
      const found = c.find((x) => x.id === kit.id);
      if (found) return c.map((x) => x.id === kit.id ? { ...x, qty: x.qty + 1 } : x);
      return [...c, { id: kit.id, title: kit.title, price: kit.price, theme: kit.theme, qty: 1 }];
    });
    setCartOpen(true);
  };
  const removeFromCart = (id) => setCart((c) => c.filter((x) => x.id !== id));
  const openKit = (kit) => { setView({ name: 'product', kit }); window.scrollTo(0, 0); };
  const goHome = () => { setView({ name: 'home', kit: null }); };
  const scrollToKits = () => { const el = document.getElementById('kits'); if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' }); };
  const goKits = () => { if (view.name !== 'home') { setView({ name: 'home', kit: null }); setTimeout(scrollToKits, 60); } else { scrollToKits(); } };

  // Lucide replaces <i data-lucide="…"> with SVGs; re-run after every render.
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

  const count = cart.reduce((s, x) => s + x.qty, 0);

  return (
    <div>
      <Header cartCount={count} onCart={() => setCartOpen(true)} onHome={goHome} onKits={goKits} />
      {view.name === 'home' && (
        <main>
          <Hero
            onOpen={openKit}
            onShop={() => { const el = document.getElementById('kits'); if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' }); }}
          />
          <ReassuranceBand />
          <div id="kits"><KitGrid onOpen={openKit} onAdd={addToCart} /></div>
        </main>
      )}
      {view.name === 'product' && (
        <main><ProductDetail kit={view.kit} onBack={goHome} onAdd={addToCart} /></main>
      )}
      <Footer />
      <CartDrawer open={cartOpen} items={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} />
    </div>
  );
}
