# Erreurs Claude à ne pas reproduire

Journal des erreurs commises par l'assistant (Claude) sur ce projet, à **ne pas répéter**.
Chaque entrée : ce qui s'est passé, la cause racine, et la règle à appliquer désormais.

> À Claude : lis ce fichier avant toute vérification ou livraison, et **ajoute une entrée** à chaque fois qu'une erreur évitable est identifiée.

---

## 1. Tester un flux utilisateur via `fetch` au lieu d'un vrai clic navigateur

**Date :** 2026-07-22 · **Contexte :** vérification du téléchargement des fichiers après paiement (Cloudflare Workers).

**Ce qui s'est passé :** le test automatisé « validait » le téléchargement en récupérant le fichier avec `page.request.get(href)` (une requête `fetch`, en-tête `Accept: */*`). Ce test passait au vert. Mais en usage réel, **cliquer** le lien déclenchait une **navigation** (`Accept: text/html`), et là Cloudflare servait le fallback SPA (`index.html`) au lieu d'exécuter le Worker → le fichier ne se téléchargeait pas, l'utilisateur était renvoyé sur la fiche produit. Bug invisible au test, découvert par l'utilisateur.

**Cause racine :** le test empruntait un **chemin de code différent** de celui de l'utilisateur. `fetch` et navigation n'envoient pas les mêmes en-têtes et ne déclenchent pas le même routage (ici, le fallback SPA ne se déclenche que sur `Accept: text/html`).

**Règle à appliquer :**
- Pour tout flux **visible par l'utilisateur**, tester **l'interaction réelle du navigateur** (`.click()`, navigation, événement `download`), **jamais** un `fetch`/`request.get` synthétique qui court-circuite le vrai chemin.
- Un test qui ne reproduit pas exactement le geste de l'utilisateur (clic, soumission de formulaire, navigation) n'est pas une preuve.
- Playwright/Chromium est disponible en global sur cette machine : s'en servir pour ces vérifications de bout en bout.
