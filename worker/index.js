// Entrée du Worker Cloudflare : route /api/* vers les handlers, sinon sert
// le site statique (build Vite) via le binding ASSETS.
import checkout from './checkout.js';
import order from './order.js';
import download from './download.js';
import webhook from './webhook.js';

const routes = {
  '/api/checkout': checkout,
  '/api/order': order,
  '/api/download': download,
  '/api/webhook': webhook,
};

export default {
  fetch(request, env) {
    const handler = routes[new URL(request.url).pathname];
    if (handler) return handler(request, env);
    return env.ASSETS.fetch(request); // fichiers statiques + fallback SPA
  },
};
