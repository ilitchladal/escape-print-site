# Escape Print — Design System

**Escape Print** is a French e-commerce brand selling **printable escape-game kits for children aged 7–10**. Each kit is a downloadable PDF a parent prints at home: a full game plus invitations, decor, an animator guide, detective badges and a diploma — *« Prêt en 10 minutes, sans écran »*. The universe is **warm, joyful and gentle**: a soft, funny investigation — never scary, with no menacing villain, and **victory is always possible**.

The brand mascot is a **fox detective with a magnifying glass (loupe)**. → *No mascot/logo image asset was supplied — see Caveats.*

## Sources

- **`design-system/design-tokens.json`** (mounted, read-only) — W3C DTCG token file; the authoritative source for colors, type, spacing, radius, shadow, focus, motion. Mirrored into `tokens/*.css`.
- **`design-system/escape-print-styleguide.html`** (mounted, read-only) — a hand-built HTML styleguide showing the two-layer color system, type specimens, buttons, cards, forms, alerts, an interactive theme switcher, and the anti-slop do/don't list. The component recreations here follow its CSS exactly.
- **`uploads/`** — Fredoka & Nunito font binaries (the brand typefaces), copied into `fonts/`.

---

## The two-layer color system (the core idea)

- **Layer 1 — permanent identity.** Cream surface · warm ink · signature gold · action orange · forest-green support. This **never changes** — it's what makes every kit recognizable as "Escape Print". The site chrome (header, buttons, footer) is always orange + gold on cream.
- **Layer 2 — per-kit palette.** Each of the 6 kits (Pirates, Forêt, Sorciers, Spatiale, Halloween, Noël) carries one themed palette (`--kit-primary / -deep / -light / -accent`) applied via `[data-theme="…"]`. It colors banners, chips and accents only — the cream/ink/gold around it stays put.

Apply a kit theme by setting `data-theme` on any wrapping element; the `--kit-*` variables cascade to children (see `KitCard`, `ProductDetail`).

---

## CONTENT FUNDAMENTALS

The voice is **warm, playful and reassuring — a grown-up letting a child in on a fun secret.** Written in **French**.

- **Address the reader with informal "tu"**, not "vous" — *« Ton kit PDF est dans ta boîte mail »*, *« Termine ta commande »*. The brand speaks directly to the parent (and the child through them) like a friendly accomplice.
- **Tone: ludique, chaleureux, rassurant.** Every line lowers the stakes and promises success: *« Jamais effrayant »*, *« La victoire est toujours possible »*, *« Prêt en 10 min »*. Reassurance is a content pillar, not decoration — lead with what the parent worries about (time, screens, fear) and resolve it.
- **Concrete, sensory, benefit-first.** Name the tangible contents — *« Jeu + invitations + déco + guide + badges + diplôme + playlist »* — rather than abstract features. Verbs of play: *décode, ouvre, trouve, réveille, prépare, répare, aide*.
- **Casing.** Sentence case for body and headings. **Eyebrows & keyword chips are UPPERCASE** with wide letter-spacing: `CARTE · CODE · INDICE · TRÉSOR`. Titles use Fredoka; they read as friendly, not shouty.
- **Numbers stay human.** French formatting with comma decimals and the euro after: `17,90 €`. Durations as ranges: *« 60-90 min »*. Ages as ranges: *« 7-10 ans »*.
- **Punctuation & symbols.** The `✦` star prefixes the gold "Officiel" stamp; `★` for review ratings; `·` (middle dot) separates metadata. **No emoji** as brand iconography.
- **Micro-copy is encouraging, never cold.** Errors are gentle and actionable — *« Adresse e-mail incomplète. »*, *« Vérifie ta carte et réessaie. »* — never a bare "Error".
- **Examples of voice:** hero — *« Une enquête rigolote, prête en 10 minutes. »*; reassurance — *« Sans écran. On joue avec ses mains. »*; CTA — *« Découvrir les kits »*, *« Recevoir le mini-jeu gratuit »*, *« Ajouter au panier »*.

---

## VISUAL FOUNDATIONS

**Overall vibe:** round, warm, legible above all. Paper/print personality, no cold "tech/SaaS" gloss.

- **Color.** Backgrounds are **cream `#FFF8E7`, never pure white**; text is **warm ink `#2C2C2C`, never pure black**; secondary text is a **warm** grey (`#5A554C`/`#8A8377`), never cold grey. **Orange `#F2A65A` = the primary action**, always paired with **ink text, never white** (the signature anti-slop rule). **Gold `#D4A847` = signature accent** used in *small touches only* — the stamp, friezes, review stars. For colored *text* on cream, use the **deep AA-safe shades** (`--brand-ink #8A4B1A`, `--gold-deep #9C7518`, `--support-text #2E5E44`) — the light tints are decorative only.
- **Type.** **Fredoka** (rounded, playful) for all headings, hero, stamps, UI labels; **Nunito** (warm, legible) for body and form copy. Never default to Inter/Roboto. Modular ~1.2 scale, 16px base; display 3.5rem → caption 0.75rem. Line-height 1.6 body / 1.25 heading / 1.1 display. Tight tracking on big Fredoka titles (`-0.01em`), wide tracking on uppercase keywords (`+0.08em`).
- **Spacing.** 8px base with a 4px half-step (`--sp-1…10`). Container max 1200px, 24px side padding.
- **Corners.** Consistently rounded = warmth: fields 6px, buttons/small cards 12px, product cards 20px, hero/modals 28px, pills 999px.
- **Backgrounds.** Flat cream with two warm tints for depth (`--surface-raised` slightly lighter to lift cards, `--surface-sunken` for wells/inputs/bands). **No loud gradients in the chrome.** The *only* gradient is inside a kit banner: `linear-gradient(150deg, --kit-primary, --kit-deep)` — diagonal, themed, contained. No glassmorphism, no neon. One subtle blur is allowed: the sticky header uses a light `backdrop-filter` over translucent cream.
- **Shadows.** **Warm brown-tinted** (`rgba(74,58,30,…)`), never pure black: `sm` 1px, `md` 4/12px, `lg` 12/28px. The **signature "fiche indice" shadow** is a hard offset gold drop — `6px 6px 0 var(--gold)` paired with a 2px ink border — evoking a printed clue card; it grows to `8px 8px 0` and rotates ~−0.4° on hover. Reserve it for highlight moments (lead magnets, hero card, clue cards), not everywhere.
- **Borders.** Hairlines are a **warm tan `#E8DCC0`**, never cold grey. The signature heavy border is **2px ink** (the play-card / clue-sheet look). Gold borders mark premium/stamp elements.
- **Cards.** Raised cards: cream-raised fill, `--r-lg` corners, soft warm `md` shadow, lift `translateY(-4px)` to `lg` shadow on hover. Clue cards: 2px ink border + offset gold shadow + slight rotate on hover. Product (Kit) cards: themed gradient banner up top with a rotated gold "✦ Officiel" stamp, cream body below with tags, rating, price and an orange Ajouter button.
- **Buttons.** Primary = orange fill + ink text + soft shadow; hover darkens to `--brand-hover` and lifts shadow; **press translates 1px down** and deepens to `--brand-press`. Gold (premium), secondary (2px ink outline that inverts to ink-fill on hover), ghost (orange-ink text on transparent, brand-soft wash on hover).
- **Focus.** Always a **3px gold ring** (`0 0 0 3px rgba(212,168,71,.65)`) — visible, on-brand, keyboard-accessible. Inputs additionally switch their border to orange on focus.
- **Motion.** Durations 120ms (hover/micro) / 200ms (base) / 320ms (card & modal entrances). Two easings: **`--e-out` cubic-bezier(.22,1,.36,1)** for soft entrances, and **`--e-pop` cubic-bezier(.34,1.56,.64,1)** — a playful overshoot/bounce reserved for the mascot, badges, and add-to-cart moments. Hover = darken + small lift; press = shrink/translate. Nothing harsh or fast.
- **Imagery vibe.** Warm, in-situation depictions of the kit world (a treasure map, a potion table) over generic stock "smiling team" photos. When real imagery is absent, the themed gradient banner + a single lucide line icon + the gold stamp stand in.
- **Layout rules.** Sticky translucent header with hairline bottom; centered 1200px content column; reassurance band (cream-sunken, hairline top/bottom) directly under the hero; 3-up product grid; heavy 2px ink top border on the footer.

---

## ICONOGRAPHY

The source styleguide has **no icon font or SVG set** — it uses a few **Unicode glyphs as light iconography**, set in Fredoka so they feel rounded and on-brand:

- **`✦`** — prefixes the gold "Officiel" / stamp marks.
- **`★ / ☆`** — review ratings (gold).
- **`✓ ✕ ! ℹ`** — alert/status glyphs, colored to the feedback tone.
- **`·`** — metadata separator.

For richer **UI icons** (search, cart, printer, lock, arrows, etc.) the UI kit links **[Lucide](https://lucide.dev) via CDN** — chosen because its **rounded caps and even ~2px stroke** match Fredoka's warmth far better than sharp/technical sets. → *This is a substitution: the brand had no defined UI icon set. See Caveats.* Use line icons at 18–22px, inheriting `currentColor`; never mix in filled/sharp icon families, and **never use emoji as brand icons**.

**`assets/` ships the official seal** — `tampon-officiel-escape-print.svg` is the retained **variante D** (« Tampon Officiel »: all-gold rings + gold cardinal dots + larger curved Fredoka text + orange central star on a cream disc that wraps the full mark). `-grand.svg` is identical; `-classique` (all-gold star) and `-medaillon` are earlier alternates. The reusable **`Seal`** component renders this mark (unique ids per instance); `KitCard` exposes a `seal` prop and `ProductDetail` shows it on the kit visual. **Keep it round; never distort or recolor.** Its text is Fredoka, so use it where the webfont loads (or outline the text before exporting standalone). The mascot fox/loupe, a full logo, and product photography are still needed (see Caveats).

---

## Index / manifest

Root:
- **`styles.css`** — global entry; `@import`s the token + base files (this is the only file consumers link).
- **`tokens/`** — `fonts.css` (`@font-face`), `colors.css` (Layer 1 + the 6 Layer-2 themes), `typography.css`, `spacing.css`, `effects.css` (shadow/focus/motion), `base.css` (reset).
- **`fonts/`** — Fredoka (5 weights) + Nunito (Regular/SemiBold/Bold/ExtraBold + italics).
- **`guidelines/`** — foundation specimen cards (Colors, Type, Spacing, Brand groups).
- **`SKILL.md`** — Agent-Skills-compatible entry point.

Components (`window.EscapePrintDesignSystem_16db62.*`):
- **buttons/** — `Button`
- **forms/** — `Input`, `Field`, `Checkbox`
- **feedback/** — `Alert`
- **data-display/** — `Tag`, `Badge`, `Stamp`, `Stars`, `Seal`
- **cards/** — `Card`, `KitCard`

UI kits:
- **ui_kits/boutique/** — the Escape Print storefront: interactive homepage (hero, reassurance band, themed kit grid), product detail page, and slide-over cart. Composes the components above; icons via Lucide.

---

## CAVEATS — help me make this perfect

I built the full token system, components, foundation cards and a storefront UI kit from your token file + styleguide. A few things I need from you:

- **No logo or mascot art was supplied.** The header uses a **Fredoka wordmark + a loupe glyph placeholder**, and product/hero visuals use themed gradient panels with a lucide icon. **Please upload the real Escape Print logo and the fox-detective/loupe mascot** (SVG/PNG) so I can replace these.
- **UI icons are a Lucide substitution.** Your brand defines only Unicode glyphs (`✦ ★ ✓`). If you have a preferred icon set (or want me to commission a rounded custom set), tell me and I'll swap it in.
- **No product photography.** Kit banners are gradient placeholders. If you have illustration/photography for each universe, I'll wire it into `KitCard` and `ProductDetail`.
- **Scope check:** the storefront covers homepage → product → cart. Want me to add **checkout, account, an "anniversaire" landing page, or the gift-card flow** next? And should I build a **slide/deck kit** for marketing?

---

## ROADMAP — pages futures

Pages identifiées comme à construire plus tard (pas encore dans la maquette) :

- **Notre histoire** — page éditoriale racontant l'univers du renard détective et la genèse d'Escape Print. Forte valeur de marque.
- **Affiliation** — programme d'affiliation / partenaires.
