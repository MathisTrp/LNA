# Entrez dans nos fermes — prototype LNA

Prototype cliquable (web app responsive, mobile-first) du programme de fidélité imaginé pour **La Nouvelle Agriculture** :
*« Vos achats LNA vous rapprochent de ceux qui les produisent. »*
Projet étudiant non officiel, sans backend.

**Idée centrale :** LNA possède déjà une traçabilité (code-barres + numéro de lot → agriculteur → pratiques et engagements).
Le programme ne la remplace pas : il la prolonge dans le temps
(produit → traçabilité → *suivre cette ferme* → réachat → avantages → expériences).

## Trois types de contenu

| Type | Où dans le code | Affichage |
|---|---|---|
| A. Informations LNA réelles | `src/data/lna.ts` (sources dans `src/data/sources.ts`) | étiquette « Information LNA » + lien source |
| B. Fonctionnalités proposées par notre recommandation | pages (suivre une ferme, nouvelles, paliers, récompenses, visites, parrainage, « dire merci ») | étiquette « Notre proposition » |
| C. Données de démonstration (fictives) | `src/data/demo.ts` (`DEMO_DATA`) | étiquette « Donnée fictive / Profil fictif » |

Les photos et le logo proviennent du site officiel LNA (usage autorisé pour ce prototype étudiant), stockés localement :
voir `public/images/lna/SOURCES.md`. Une vraie personne n'apparaît qu'avec sa vraie identité (Amélie, Angélique) ;
les zones fictives n'utilisent que des photos de poules, d'élevage ou de prairie.

La Ferme de la Vallée et Sophie Martin sont **fictives** : aucun vrai agriculteur ne s'exprime dans le prototype.
Ses engagements affichés sont ceux publiés par LNA pour les **œufs Plein Air** uniquement.

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
  data/lna.ts         informations LNA réelles (traçabilité, engagements œufs Plein Air, filières)
  data/sources.ts     registre interne des sources (official / proposal / demo)
  data/demo.ts        DEMO_DATA : données fictives (Claire, Ferme de la Vallée, actualités, récompenses…)
  state/AppState.tsx  état global (React context + localStorage)
  components/         UI réutilisable, layout + navigation, mode démo, illustrations SVG
  pages/              un fichier par écran
  styles/index.css    thème Tailwind (couleurs et polices inspirées du site LNA)
  data/images.ts      registre des photos officielles LNA (chemins, alt, légendes)
public/images/lna/    photos et logo officiels LNA téléchargés localement + SOURCES.md
```

Stack : React 19 · TypeScript · Vite · Tailwind CSS 4 · React Router (HashRouter) · Lucide.
Polices libres proches de l'identité LNA : Jost (≈ Futura), Lobster Two (≈ titres script), Neucha (manuscrite).

## Écrans

| Écran | Route |
|---|---|
| Landing (après scan du QR code du programme) | `#/` |
| Présentation du programme | `#/programme` |
| Inscription (pré-remplie avec Claire) | `#/inscription` |
| Tableau de bord : progression, ferme suivie (ou invitation à la traçabilité), expérience, avantage, autres filières | `#/accueil` |
| Valider mon achat (ticket simulé, proposition du programme) | `#/achat` |
| Retrouver mon agriculteur (simulation de la traçabilité LNA) → « Suivre cette ferme » | `#/tracabilite` |
| Mon avantage (bon de réduction) | `#/avantage` |
| Ma ferme : ① « Votre produit vient de cette ferme » (traçabilité) ② « Garder le lien » (programme), suivi de l'élevage | `#/ferme` |
| Actualité de Sophie | `#/ferme/actualites/:id` |
| Récompenses (expériences + avantages : débloquées / en cours / verrouillées) | `#/recompenses` |
| Visite de ferme (tirage au sort) | `#/experiences/visite` |
| Satisfaction | `#/avis/avantage`, `#/avis/visite` |
| Profil | `#/profil` |

## Mode démo

Bouton discret **« Mode démo »** en bas à gauche (« Démo » sur mobile), disponible partout. Il permet de :
remettre le compte à 3 achats · valider un achat · simuler la traçabilité · passer à 5 achats (ouvre la récompense) ·
afficher la ferme · afficher la visite · simuler une expérience terminée (écran de satisfaction) · revenir à la landing page.

Parcours de soutenance (≈ 2-3 min) :
1. Landing (promesse + schéma traçabilité → espace) → « Créer mon espace » → valider (champs pré-remplis).
2. Tableau de bord à 3 achats → « Valider un achat » → « Scanner mon ticket » → « Simuler la validation » → 4 achats.
3. « Retrouver mon agriculteur » → « Retrouver mon agriculteur » (codes pré-remplis) → résultat de traçabilité → « Suivre cette ferme ».
4. « Voir ma ferme » : la ferme apparaît dans l'espace (traçabilité d'un côté, « Garder le lien » de l'autre).
5. Mode démo → « Passer directement à 5 achats » → modale → « Découvrir ma ferme » → visite → « Participer au tirage au sort ».
6. Mode démo → « Simuler une expérience terminée » → écran de satisfaction.

L'état est conservé dans le `localStorage` ; « Remettre le compte à 3 achats » (ou Profil → Réinitialiser) repart de zéro.
