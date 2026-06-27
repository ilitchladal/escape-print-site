# Assets publics

Les fichiers ici sont servis à la racine du site
(ex. `public/assets/mascotte-renard-tete.webp` → `/assets/mascotte-renard-tete.webp`).

## Mascotte (en place)

Le site utilise **`mascotte-renard-tete.webp`** (tête du renard détective) dans
le header, le hero et la fiche produit.

Elle a été générée à partir du PNG d'origine (1545×1999, ~1,9 Mo), redimensionnée
à 384 px max et compressée en WebP → **~13 Ko** (-99 %). Le PNG source n'est pas
conservé dans `public/` pour ne pas alourdir le build ; garde ton original ailleurs.

### Régénérer (si tu remplaces la mascotte)

Dépose le nouveau PNG, installe sharp puis convertis :

```
npm install --no-save sharp
node -e "import('sharp').then(s=>s.default('public/assets/SOURCE.png').resize({width:384,height:384,fit:'inside',withoutEnlargement:true}).webp({quality:82,effort:6}).toFile('public/assets/mascotte-renard-tete.webp'))"
```

## Autres images

Dépose ici tes autres mascottes / illustrations d'univers et dis-moi où les
afficher.
