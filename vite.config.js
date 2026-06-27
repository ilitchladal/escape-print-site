import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Escape Print boutique — Vite + React.
// The design-system components live in src/components (plain ES modules);
// boutique screens compose them in src/boutique.
export default defineConfig({
  plugins: [react()],
  server: { open: true },
});
