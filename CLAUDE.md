# CLAUDE.md — Escape Print

Repère pour Claude Code et toute personne qui travaille sur ce projet.

## Principes de code

À respecter partout dans le projet :

- **Simplicité d'abord** : le code le plus léger, lisible et peu verbeux possible. Minimum de dépendances, de couches et d'abstractions.
- **Maintenabilité** : la maintenance sera faite par un agent (Claude Code) → un code simple = moins de tokens, moins d'erreurs, plus robuste.
- **Pas de sur-ingénierie** : n'ajoute pas d'abstraction, de bibliothèque ou de config tant que le besoin n'est pas réel (YAGNI).
- **« Simple » ≠ cryptique** : vise le minimum de pièces mobiles et de la clarté, pas des one-liners astucieux illisibles.
- **Ne sacrifie pas pour autant** : l'accessibilité, le design system (tokens/composants) et la lisibilité du code.
