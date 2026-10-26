# Entrez dans nos fermes — prototype LNA

Prototype cliquable (web app responsive, mobile-first) du programme de fidélité imaginé pour **La Nouvelle Agriculture** :
*« Vos achats LNA vous rapprochent de ceux qui les produisent. »*
Projet étudiant non officiel : données, ferme et personnes fictives, aucun backend.

## Lancer le projet

```bash
npm install
npm run dev        # http://localhost:5173 (ajouter --host pour tester sur smartphone en Wi-Fi)
npm run build      # vérifie les types + build statique dans dist/
npm run preview    # sert le build
```

Node 20+ requis. Le build (`dist/`) est statique et fonctionne hors ligne (polices et illustrations embarquées).

## Structure

```
src/
  data/mock.ts        toutes les données fictives (Claire, Ferme de la Vallée, Sophie Martin, actualités, récompenses…)
  state/AppState.tsx  état global (React context + localStorage)
  components/         UI réutilisable, layout + navigation, mode démo, illustrations SVG
  pages/              un fichier par écran
  styles/index.css    thème Tailwind (couleurs et polices inspirées du site LNA)
  assets/photos/      emplacement pour de vraies photos (renseigner `image` dans mock.ts)
```

Stack : React 19 · TypeScript · Vite · Tailwind CSS 4 · React Router (HashRouter) · Lucide.
Polices libres proches de l'identité LNA : Jost (≈ Futura), Lobster Two (≈ titres script), Neucha (manuscrite).

## Écrans

| Écran | Route |
|---|---|
| Landing (après scan du QR code) | `#/` |
| Présentation du programme | `#/programme` |
| Inscription (pré-remplie avec Claire) | `#/inscription` |
| Tableau de bord : progression, avantage, ferme, actualité, expérience, autres catégories | `#/accueil` |
| Ajout d'achat : scan ticket ou QR code simulé | `#/achat` |
| Mon avantage (bon de réduction) | `#/avantage` |
| Ma ferme : aujourd'hui, nouvelles, vidéo membres, alimentation, engagements, parrainage « Ma poule » | `#/ferme` |
| Actualité de Sophie | `#/ferme/actualites/:id` |
| Récompenses (expériences + avantages : débloquées / en cours / verrouillées) | `#/recompenses` |
| Visite de ferme (tirage au sort) | `#/experiences/visite` |
| Satisfaction | `#/avis/avantage`, `#/avis/visite` |
| Profil | `#/profil` |

## Mode démo

Bouton discret **« Mode démo »** en bas à gauche (« Démo » sur mobile), disponible partout. Il permet de :
remettre le compte à 3 achats · simuler un achat · passer à 5 achats (ouvre la récompense) · afficher la ferme ·
afficher la visite · simuler une expérience terminée (écran de satisfaction) · revenir à l'écran QR code.

Parcours de soutenance (≈ 2-3 min) :
1. Landing → « Découvrir le programme » → « Créer mon espace » → valider (champs pré-remplis).
2. Tableau de bord à 3 achats → « Ajouter un achat » → « Scanner mon ticket » → « Simuler la validation » → 4 achats.
3. Mode démo → « Passer directement à 5 achats » → modale de félicitations → « Découvrir ma ferme ».
4. Ouvrir une actualité de Sophie, puis « Participer au tirage au sort » pour la visite.
5. Mode démo → « Simuler une expérience terminée » → écran de satisfaction.

L'état est conservé dans le `localStorage` ; « Remettre le compte à 3 achats » (ou Profil → Réinitialiser) repart de zéro.
