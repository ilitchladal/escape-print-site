import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { cloudflare } from '@cloudflare/vite-plugin';

// Escape Print boutique — Vite + React, servi par un Worker Cloudflare.
// Le plugin cloudflare() fait tourner worker/index.js dans workerd (dev,
// preview et build) : les routes /api/* passent par le vrai runtime Workers.
// Les composants du design-system vivent dans src/components ; les écrans
// boutique les composent dans src/boutique.
export default defineConfig({
  plugins: [react(), cloudflare()],
  server: { open: true },
});
