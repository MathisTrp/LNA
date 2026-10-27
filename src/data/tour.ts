/**
 * Visite guidée du prototype (mode démo).
 * Chaque étape indique la page à ouvrir, l'état du compte attendu (pour pouvoir y sauter directement),
 * une explication courte et, si besoin, l'action à faire à l'écran.
 */
import type { DemoPatch } from '../state/AppState'
import type { ContentKind } from '../components/ui'

export type TourStep = {
  id: string
  /** Regroupement affiché dans la liste des étapes */
  part: 'Découverte' | 'Traçabilité → fidélité' | 'Récompenses et expériences'
  title: string
  kind: ContentKind
  explain: string
  /** Action à réaliser à l'écran (facultatif) */
  todo?: string
  /** Texte du bouton ou lien à mettre en évidence dans la page */
  target?: string
  route: string
  /** État passé à la page (ex. ouvrir directement le résultat de traçabilité) */
  routeState?: Record<string, unknown>
  patch: DemoPatch
}

const LOGGED_OUT: DemoPatch = { loggedIn: false }
const START: DemoPatch = { loggedIn: true, purchases: 3, followedFarm: false }
const AFTER_PURCHASE: DemoPatch = { loggedIn: true, purchases: 4, followedFarm: false }
const FOLLOWING: DemoPatch = { loggedIn: true, purchases: 4, followedFarm: true }
const UNLOCKED: DemoPatch = { loggedIn: true, purchases: 5, followedFarm: true }

export const TOUR: TourStep[] = [
  {
    id: 'landing',
    part: 'Découverte',
    title: 'La promesse du programme',
    kind: 'proposal',
    explain:
      'Claire a scanné le QR code du programme. Le schéma résume l’idée : la traçabilité LNA existe déjà, le programme permet de garder le lien avec la ferme.',
    route: '/',
    patch: LOGGED_OUT,
  },
  {
    id: 'programme',
    part: 'Découverte',
    title: 'Avant / avec le programme',
    kind: 'proposal',
    explain: 'Aujourd’hui : « Qui a produit ce que j’achète ? ». Avec le programme : « Comment garder le lien avec cette ferme ? ». Paliers et avantages sont des hypothèses.',
    route: '/programme',
    patch: LOGGED_OUT,
  },
  {
    id: 'inscription',
    part: 'Découverte',
    title: 'Créer son espace',
    kind: 'proposal',
    explain: 'Trois champs seulement, le reste est facultatif. Les données de Claire sont pré-remplies.',
    todo: 'Cliquez sur « Créer mon espace ».',
    target: 'Créer mon espace',
    route: '/inscription',
    patch: LOGGED_OUT,
  },
  {
    id: 'accueil',
    part: 'Découverte',
    title: 'L’espace de Claire : 3 achats',
    kind: 'proposal',
    explain:
      'En un coup d’œil : la progression, l’invitation à retrouver son agriculteur, la prochaine expérience. La réduction reste secondaire.',
    route: '/accueil',
    patch: START,
  },
  {
    id: 'achat',
    part: 'Traçabilité → fidélité',
    title: 'Valider un achat',
    kind: 'proposal',
    explain: 'Le ticket de caisse sert uniquement à compter l’achat dans le programme (simulation, pas de vraie lecture).',
    todo: '« Scanner mon ticket » puis « Simuler la validation » : Claire passe à 4 achats.',
    target: 'Scanner mon ticket',
    route: '/achat',
    patch: START,
  },
  {
    id: 'tracabilite',
    part: 'Traçabilité → fidélité',
    title: 'La traçabilité LNA (existante)',
    kind: 'lna',
    explain: 'Fonctionnement réel de l’outil LNA : code-barres + numéro de lot (et DCR pour les œufs). Ici, les codes sont fictifs et pré-remplis.',
    todo: 'Cliquez sur « Retrouver mon agriculteur ».',
    target: 'Retrouver mon agriculteur',
    route: '/tracabilite',
    routeState: { traceStep: 'form' },
    patch: AFTER_PURCHASE,
  },
  {
    id: 'suivre',
    part: 'Traçabilité → fidélité',
    title: 'Suivre cette ferme',
    kind: 'proposal',
    explain:
      'Le cœur de notre recommandation : la traçabilité ponctuelle devient une relation suivie. Le bloc vert est notre proposition, le bloc blanc ce que LNA montre déjà.',
    todo: 'Cliquez sur « Suivre cette ferme ».',
    target: 'Suivre cette ferme',
    route: '/tracabilite',
    routeState: { traceStep: 'result' },
    patch: AFTER_PURCHASE,
  },
  {
    id: 'ferme',
    part: 'Traçabilité → fidélité',
    title: 'Ma ferme',
    kind: 'proposal',
    explain:
      'Deux zones bien distinctes : « Votre produit vient de cette ferme » (informations LNA réelles) et « Garder le lien » (notre programme). La ferme et Sophie sont fictives.',
    route: '/ferme',
    patch: FOLLOWING,
  },
  {
    id: 'actualite',
    part: 'Traçabilité → fidélité',
    title: 'Une nouvelle de la ferme',
    kind: 'proposal',
    explain: 'Un même contenu est partagé avec tous les membres qui suivent la ferme. « Dire merci » est groupé : aucune sollicitation individuelle.',
    todo: 'Cliquez sur « Dire merci à Sophie ».',
    target: 'Dire merci',
    route: '/ferme/actualites/journees-ensoleillees',
    patch: FOLLOWING,
  },
  {
    id: 'deblocage',
    part: 'Récompenses et expériences',
    title: '5 achats : une expérience se débloque',
    kind: 'proposal',
    explain: 'Au 5ᵉ achat, Claire débloque une expérience (tirage au sort pour une visite) et des contenus membres. Le seuil est une hypothèse.',
    todo: 'Fermez la fenêtre ou cliquez sur « Découvrir ma ferme », puis « Suivant ».',
    route: '/accueil',
    patch: { ...UNLOCKED, showUnlock: true },
  },
  {
    id: 'recompenses',
    part: 'Récompenses et expériences',
    title: 'Mes récompenses',
    kind: 'proposal',
    explain: 'Les expériences passent avant les avantages : c’est ce qu’une marque industrielle ne peut pas offrir. Statuts : débloquée, en cours, verrouillée.',
    route: '/recompenses',
    patch: UNLOCKED,
  },
  {
    id: 'avantage',
    part: 'Récompenses et expériences',
    title: 'L’avantage immédiat',
    kind: 'demo',
    explain: 'Un bon de réduction, présenté comme un exemple de mécanique (montant fictif). Utile, mais jamais la proposition centrale.',
    route: '/avantage',
    patch: UNLOCKED,
  },
  {
    id: 'visite',
    part: 'Récompenses et expériences',
    title: 'La visite de ferme',
    kind: 'proposal',
    explain: 'Places limitées, tirage au sort, programme pensé pour les familles. Date et ferme fictives.',
    todo: 'Cliquez sur « Participer au tirage au sort ».',
    target: 'Participer au tirage au sort',
    route: '/experiences/visite',
    patch: UNLOCKED,
  },
  {
    id: 'avis',
    part: 'Récompenses et expériences',
    title: 'Après la visite : votre avis',
    kind: 'proposal',
    explain: 'Le parcours va jusqu’à la satisfaction : une note de 1 à 5 et ce qui a été le plus apprécié.',
    todo: 'Choisissez une note, puis « Envoyer mon avis ».',
    target: 'Comment avez-vous trouvé',
    route: '/avis/visite',
    patch: { ...UNLOCKED, visitStatus: 'done' },
  },
]
