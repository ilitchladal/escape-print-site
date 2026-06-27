# Résumé de session — Claude Design × Claude Code

> **But de ce document :** servir de matière pédagogique à une autre session
> chargée de produire des cours sur l'utilisation de **Claude Design**
> (claude.ai/design) en lien avec **Claude Code**. Il est volontairement
> autoportant : il explique le contexte, les concepts, les erreurs de
> compréhension rencontrées, et les décisions prises.

---

## 1. Le contexte de départ

- **Projet métier :** « Escape Print », marque e-commerce française qui vend des
  kits d'escape-game imprimables pour enfants de 7–10 ans (PDF à imprimer).
- **Ce que l'utilisateur avait déjà fait :** il avait construit, **directement
  sur claude.ai/design**, un véritable **design system** : composants React
  (Button, Card, KitCard, Badge, Seal, Stamp, Stars, Tag, Alert, Checkbox,
  Field, Input), tokens CSS (couleurs, typo, espacement, effets), polices
  (Fredoka + Nunito), pages de guidelines de marque, et même un **kit de
  boutique** (Header, Hero, KitGrid, ProductDetail, CartDrawer, Footer + data).
- **Ce qu'il avait en local :** **rien**. Le dossier de travail
  `escape-print-site` était totalement vide.
- **Sa demande initiale :** lancer la commande `/design-sync` de Claude Code,
  en pensant qu'elle « synchroniserait » ce qu'il y a sur son ordinateur avec
  ce qu'il y a sur Claude Design.

---

## 2. Le concept clé à enseigner : le SENS du flux

C'est le cœur pédagogique de la session. Il y a eu un **contresens sur la
direction de la synchronisation**, et le lever est la leçon principale.

### Ce que fait réellement `/design-sync`

```
   ORDINATEUR (repo de design system codé)  ─────►  claude.ai/design
   composants compilés (dist/), tokens, fonts        (projet du design agent)
```

`/design-sync` est **unidirectionnel : du local VERS le cloud.** Il prend un
**repo de design system déjà codé sur l'ordinateur** (composants compilés dans
un `dist/`, tokens, fonts) et les **téléverse dans un projet claude.ai/design**.

**Objectif de cette commande :** faire en sorte que l'agent de design de
claude.ai/design construise les écrans avec **les vrais composants de
l'utilisateur** au lieu de composants génériques. Chaque design produit est
alors « on-brand » et correspond 1:1 à du code que les développeurs peuvent
expédier.

`/design-sync` n'est **PAS** une synchronisation bidirectionnelle. Il ne
redescend jamais vers l'ordinateur ce qui a été créé sur claude.ai/design.

### La situation de l'utilisateur était l'INVERSE

| | Pour `/design-sync` (l'outil) | Pour l'utilisateur (sa réalité) |
|---|---|---|
| Cloud | vide (à remplir) | **plein** (design system codé) |
| Local | **plein** (repo codé) | vide |
| Sens voulu | local → cloud | **cloud → local** |

Conclusion : **`/design-sync` ne pouvait pas répondre à son besoin.** Il voulait
un « hand-off » dans le sens **cloud → local** (récupérer le code du cloud).

> **Leçon transférable :** avant de lancer un outil de « sync », toujours
> identifier (a) où est la source de vérité, (b) où on veut qu'elle arrive,
> (c) si l'outil va dans ce sens-là. Un même mot (« sync », « hand-off »)
> recouvre des directions opposées.

---

## 3. Rappel — qu'est-ce que Claude Design ?

- **Claude Design (claude.ai/design)** est l'outil de design de Claude : on
  donne des instructions à un *agent de design*, et il construit de l'UI
  fonctionnelle (écrans, flux, prototypes) rendue en direct dans le navigateur
  à partir de **vrai code React**.
- Par défaut, l'agent dessine avec des composants génériques.
- Avec un design system synchronisé (via `/design-sync`), l'agent dessine avec
  **les composants réels de la marque**.
- Un projet Claude Design est de type `PROJECT_TYPE_DESIGN_SYSTEM` et contient
  une arborescence de fichiers : `components/`, `tokens/`, `styles.css`,
  `fonts/`, `guidelines/`, `ui_kits/`, un bundle `_ds_bundle.js`, etc.

---

## 4. Anatomie du design system trouvé sur le cloud

Inspection du projet « Escape Print Design System » (UUID
`16db623c-...`). Points pédagogiques sur la **structure type** d'un projet
Claude Design :

- `styles.css` — **seul fichier que les consommateurs lient** ; il ne contient
  QUE des `@import` vers les tokens. (Règle importante : tout CSS de composant
  doit être atteignable depuis la fermeture transitive des `@import` de
  `styles.css`, car les designs ne reçoivent que cette fermeture.)
- `tokens/*.css` — fonts, colors, typography, spacing, effects, base.
- `components/<groupe>/<Nom>.{jsx,d.ts,prompt.md}` + cartes d'aperçu `.card.html`.
  - `.jsx` = le composant ; `.d.ts` = le contrat d'API ; `.prompt.md` = doc
    d'usage pour l'agent ; `.card.html` = carte d'aperçu pour les humains.
- `_ds_bundle.js` — le **bundle compilé** des composants, exposés sur
  `window.EscapePrintDesignSystem_16db62.*`.
- `ui_kits/boutique/` — un storefront complet (homepage → produit → panier).
- `guidelines/*.html` — specimens de fondations (couleurs, typo, espacement,
  marque).
- `fonts/`, `assets/` (mascotte renard, tampons SVG).
- `uploads/`, `scraps/` — **brouillon / doublons** (variantes de polices,
  captures d'écran de travail). À écarter d'un repo propre.

**Détail technique notable** (utile pour un cours) : le kit boutique
(`ui_kits/boutique/index.html`) utilise **Babel standalone + React en CDN**
pour compiler le JSX **dans le navigateur**. C'est un mode « aperçu live »,
**pas un vrai build de production**. Les composants s'exportent sur des globals
(`window.EP*`) et consomment le DS via `window.EscapePrintDesignSystem_16db62.*`.
→ Pour en faire un vrai site déployable, il faut le re-structurer (Vite, modules
ES, etc.).

---

## 5. Les outils en jeu (côté Claude Code)

- **La commande `/design-sync`** : la *skill* qui orchestre l'import
  local → cloud (build du repo, vérification visuelle des composants, upload
  incrémental). Conçue pour la fidélité haute (peut prendre des heures sur un
  gros repo).
- **L'outil `DesignSync`** (différent de la skill) : un outil bas niveau qui
  sait **lire ET écrire** les projets claude.ai/design. Méthodes utiles :
  - `list_projects` — liste les projets accessibles.
  - `get_project` — métadonnées d'un projet (vérifier le type).
  - `list_files` — liste les chemins (sert à construire le diff).
  - `get_file` — lit **un** fichier (le contenu passe dans le contexte du
    modèle ; plafonné à 256 KiB).
  - `create_project`, `finalize_plan`, `write_files`, `delete_files` — pour
    écrire (upload).

> **Nuance importante pour le cours :** l'outil `DesignSync` peut techniquement
> faire un « hand-off inverse » (cloud → local) via `list_files` + `get_file`
> répétés, puis écriture sur disque. MAIS chaque `get_file` fait transiter le
> contenu par le contexte du modèle — coûteux en tokens, et lourd/limité pour
> les fichiers binaires (polices `.ttf`, images). Ce n'est pas l'usage prévu.

---

## 6. La décision finale (et pourquoi)

Deux options pour ramener le design system du cloud vers le local :

1. **Téléchargement assisté par Claude Code** (via `DesignSync.get_file` fichier
   par fichier, puis écriture locale + scaffolding Vite).
   - Avantage : Claude Code enchaîne directement sur la mise en place du repo.
   - Inconvénient : **coûteux en tokens** (chaque fichier traverse le contexte)
     et bancal pour les binaires.

2. **Hand-off manuel** : utiliser la fonction d'export/hand-off intégrée de
   claude.ai/design, récupérer l'archive, la décompresser en local.
   - Avantage : **tous les fichiers d'un coup, sans coût de contexte**, plus
     rapide, gère nativement les binaires.

➡️ **L'utilisateur a choisi le hand-off manuel** (option 2), explicitement
pour des raisons d'**économie de tokens et de rapidité**. Décision pertinente.

**Plan d'enchaînement convenu** : une fois les fichiers extraits dans le dossier
local, Claude Code prendra le relais pour :
1. Structurer un **vrai projet React buildable (Vite)** : `package.json`,
   config, `index.html`, point d'entrée montant le site boutique, wiring
   tokens/styles/fonts.
2. `git init` + `.gitignore` + premier commit.
3. Lancer le dev server pour vérifier le rendu.

---

## 7. Les leçons à transformer en cours

1. **Le sens du flux d'abord.** « Sync » et « hand-off » sont directionnels.
   `/design-sync` = local → cloud. Le besoin inverse (cloud → local) se fait
   par le hand-off/export intégré de claude.ai/design.
2. **`/design-sync` sert à un but précis :** apprendre à l'agent de design à
   utiliser les VRAIS composants de la marque. Ce n'est pas un gestionnaire de
   versions, ni un sync bidirectionnel.
3. **Skill ≠ outil.** La skill `/design-sync` (orchestration) est distincte de
   l'outil `DesignSync` (primitives lire/écrire). Bien les distinguer.
4. **Coût en tokens = critère de décision.** Faire transiter des fichiers par le
   contexte du modèle a un coût. Pour rapatrier en masse (surtout des
   binaires), l'export natif est supérieur. Savoir quand NE PAS utiliser
   l'agent.
5. **Aperçu live ≠ build de prod.** Un projet Claude Design rend le JSX via
   Babel/CDN dans le navigateur. Pour déployer un vrai site, il faut un vrai
   pipeline de build (Vite, modules ES) — c'est le travail naturel de
   Claude Code après le hand-off.
6. **Le bon découpage des rôles :**
   - **Claude Design** = concevoir l'UI et le design system, visuellement.
   - **Claude Code** = transformer ce design system en code de production
     buildable, le versionner, le déployer, le faire évoluer.
   - **`/design-sync`** = le pont qui renvoie les composants codés VERS Claude
     Design pour que les futurs designs restent on-brand.
7. **Toujours clarifier avant d'agir.** Plusieurs questions de clarification ont
   évité de partir dans la mauvaise direction (nature du contenu cloud,
   présence de code local, objectif final, périmètre des fichiers).

---

## 8. Schéma de synthèse du cycle complet (à illustrer dans le cours)

```
        ┌─────────────────────────────────────────────────────┐
        │                  CLAUDE DESIGN                        │
        │            (claude.ai/design)                         │
        │   Concevoir l'UI + le design system visuellement     │
        └───────────────┬──────────────────────▲───────────────┘
                        │                       │
          (1) hand-off / export                │  (3) /design-sync
              cloud → local                    │      local → cloud
              [fait par l'utilisateur          │      [fait par Claude Code :
               ou DesignSync.get_file]         │       renvoie les composants
                        │                       │       codés pour que les
                        ▼                       │       futurs designs soient
        ┌───────────────────────────────────────┴─────────────┐
        │                  CLAUDE CODE                          │
        │   (2) Structurer en repo buildable (Vite), git,      │
        │       déployer, faire évoluer le code de prod        │
        └──────────────────────────────────────────────────────┘
```

Le cycle vertueux : concevoir sur Design → rapatrier → industrialiser sur Code
→ resynchroniser les composants codés vers Design → les prochains designs
réutilisent le code réel.
