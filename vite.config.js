import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

// Escape Print boutique — Vite + React.
// Les composants du design-system vivent dans src/components ; les écrans
// boutique les composent dans src/boutique.

// Pont dev : sert les fonctions serverless de /api/*.js (format Vercel) pendant
// `npm run dev`, sans avoir à installer la CLI Vercel. En prod, Vercel exécute
// ces mêmes fichiers nativement.
function apiDevServer(env) {
  return {
    name: 'escape-api-dev',
    configureServer(server) {
      Object.assign(process.env, env); // expose STRIPE_SECRET_KEY aux handlers
      server.middlewares.use(async (req, res, next) => {
        if (!req.url.startsWith('/api/')) return next();
        const [pathname, qs] = req.url.split('?');
        const file = path.join(process.cwd(), pathname + '.js');
        if (!fs.existsSync(file)) return next();
        try {
          const mod = await import(pathToFileURL(file).href + '?t=' + Date.now());
          req.query = Object.fromEntries(new URLSearchParams(qs));
          req.body = await readBody(req);
          res.status = (code) => { res.statusCode = code; return res; };
          res.json = (obj) => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(obj)); return res; };
          await mod.default(req, res);
        } catch (e) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: e.message }));
        }
      });
    },
  };
}

function readBody(req) {
  return new Promise((resolve) => {
    if (req.method !== 'POST') return resolve(undefined);
    let data = '';
    req.on('data', (c) => (data += c));
    req.on('end', () => { try { resolve(data ? JSON.parse(data) : {}); } catch { resolve({}); } });
  });
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), apiDevServer(loadEnv(mode, process.cwd(), ''))],
  server: { open: true },
}));
