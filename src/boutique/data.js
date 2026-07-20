// Shared kit catalog data for the boutique.
export const KITS = [
  { id: 'mystere', theme: 'pirates', detective: true, available: true, title: 'Mystère au Musée', meta: 'enquête · 45-60 min · 7-10 ans · 4-8 joueurs',
    tags: ['Suspects', 'Indices', 'Malle'],
    blurb: 'Cette nuit, le tableau le plus précieux du Musée des Merveilles a disparu. Le renard détective recrute ta brigade : démasquez le coupable parmi les suspects et retrouvez le tableau avant l\'ouverture des portes.',
    rating: null, reviews: null, price: '12,90 €', priceCents: 1290, launch: true, regularPrice: '17,90 €', launchUntil: '1ᵉʳ septembre',
    // Un kit = plusieurs fichiers, livrés en stockage privé après paiement.
    files: [
      { name: 'Mystère au Musée — Livret de jeu.pdf' },
      { name: 'Mystère au Musée — Cartes indices.pdf' },
      { name: 'Mystère au Musée — Guide de l\'animateur.pdf' },
    ] },
  { id: 'pixel', theme: 'pirates', soon: true, title: 'Pixel Pirates — La Carte des 7 Fruits', meta: 'aventure pixel · 7-10 ans',
    tags: ['Pixel', 'Carte', 'Fruits'], blurb: 'Une chasse au trésor en pixel art : reconstitue la carte des 7 fruits avant l\'équipage rival.' },
  { id: 'sorciers', theme: 'sorciers', soon: true, title: 'École des Petits Sorciers', meta: 'magie · 7-10 ans',
    tags: ['Potion', 'Grimoire', 'Sort'], blurb: 'Prépare ta potion et réussis ton examen de magie.' },
  { id: 'spatiale', theme: 'spatiale', soon: true, title: 'Expédition Spatiale', meta: 'science · 8-10 ans',
    tags: ['Orbite', 'Comète', 'Code'], blurb: 'Répare le vaisseau avant de rentrer sur Terre.' },
  { id: 'halloween', theme: 'halloween', soon: true, title: 'Halloween — Manoir Mystère', meta: 'saison · 7-10 ans',
    tags: ['Citrouille', 'Lune', 'Manoir'], blurb: 'Une enquête de fête, frissonnante mais jamais effrayante.' },
  { id: 'noel', theme: 'noel', soon: true, title: 'Mission Père Noël', meta: 'saison · 6-9 ans',
    tags: ['Hotte', 'Flocon', 'Liste'], blurb: 'Aide le Père Noël à retrouver sa liste avant le grand soir.' },
];
