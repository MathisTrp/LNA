/**
 * DEMO_DATA — données FICTIVES nécessaires à la démonstration (catégorie C).
 *
 * Tout ce fichier est inventé : Claire, la Ferme de la Vallée, Sophie Martin, ses actualités,
 * les seuils, montants, dates et codes. Aucun élément ici ne doit être présenté comme un fait LNA.
 * Les informations LNA réelles sont dans lna.ts (avec sources dans sources.ts).
 * Les photos d'illustration sont des photos LNA sans personne identifiable (voir images.ts).
 */
import type { SceneName } from '../components/Illustration'
import { PHOTOS, type Photo } from './images'

export type User = {
  firstName: string
  email: string
  householdSize: number
  hasChildren: boolean
}

export const DEMO_USER: User = {
  firstName: 'Claire',
  email: 'claire@exemple.fr',
  householdSize: 4,
  hasChildren: true,
}

/** Nombre d'achats au démarrage de la démo */
export const INITIAL_PURCHASES = 3

/** Paliers de progression proposés : un palier = une nouvelle expérience */
export const MILESTONES = [
  { purchases: 5, label: 'Visite de ferme en famille', short: 'votre prochaine expérience' },
  { purchases: 10, label: 'Rencontre avec un agriculteur', short: 'une rencontre avec un agriculteur' },
] as const

/** Ferme et agricultrice FICTIVES (aucun vrai agriculteur ne s'exprime dans ce prototype) */
export const FARM = {
  name: 'Ferme de la Vallée',
  farmer: 'Sophie Martin',
  farmerFirstName: 'Sophie',
  location: 'Deux-Sèvres (79)',
  fictionNote: 'Profil fictif utilisé pour illustrer le programme',
  today: {
    date: 'Lundi 26 octobre',
    text: 'Avec les matinées plus fraîches, Sophie ouvre les trappes un peu plus tard, une fois la rosée tombée.',
  },
} as const

/** Codes saisis dans la simulation de traçabilité (fictifs) */
export const DEMO_TRACE = {
  barcode: '3 760 000 000 184',
  lot: 'L2610',
  dcr: '23/11/2026',
}

export type NewsItem = {
  id: string
  title: string
  date: string
  excerpt: string
  body: string[]
  scene: SceneName
  /** Photo LNA d'illustration (aucune personne identifiable) */
  photo?: Photo
  /** Contenu réservé aux membres ayant atteint 5 achats */
  membersOnly?: boolean
  video?: boolean
}

/** Actualités FICTIVES écrites pour illustrer le type de contenu proposé */
export const NEWS: NewsItem[] = [
  {
    id: 'journees-ensoleillees',
    title: 'Les poules profitent des dernières journées ensoleillées',
    date: '22 octobre 2026',
    excerpt: 'Encore quelques après-midi doux cette semaine. Les poules restent dehors plus longtemps, surtout à l’ombre des arbres.',
    body: [
      'Encore quelques après-midi doux cette semaine. Les poules restent dehors plus longtemps, surtout à l’ombre des arbres du parcours.',
      'On en profite pour vérifier les clôtures avant l’hiver.',
    ],
    scene: 'hens',
    photo: PHOTOS.hensMeadow,
  },
  {
    id: 'sortie-plein-air',
    title: 'Première sortie sur le parcours pour le nouveau groupe',
    date: '12 octobre 2026',
    excerpt: 'Les poules arrivées le mois dernier ont découvert le parcours. Les plus curieuses sont sorties en premier.',
    body: [
      'Les poules arrivées le mois dernier ont découvert le parcours. Les plus curieuses sont sorties en premier, les autres ont suivi.',
      'Les premiers jours, elles restent près du bâtiment ; il leur faut un peu de temps pour s’aventurer vers les arbres.',
    ],
    scene: 'landscape',
    photo: PHOTOS.outdoorFlock,
    membersOnly: true,
    video: true,
  },
  {
    id: 'arrivee-nouvelles-poules',
    title: 'Arrivée de nouvelles poules',
    date: '21 septembre 2026',
    excerpt: 'Un nouveau groupe de poules est arrivé à la ferme. Les premiers jours servent surtout à les laisser s’installer au calme.',
    body: [
      'Un nouveau groupe de poules est arrivé à la ferme.',
      'Les premiers jours servent surtout à les laisser s’installer au calme. On observe beaucoup.',
    ],
    scene: 'barn',
    photo: PHOTOS.henHeld,
  },
  {
    id: 'entretien-parcours',
    title: 'Entretien des espaces extérieurs',
    date: '8 septembre 2026',
    excerpt: 'Avant l’automne, nous avons ressemé les zones abîmées du parcours et planté quelques arbres de plus.',
    body: [
      'Avant l’automne, nous avons ressemé les zones les plus abîmées du parcours, près des trappes : c’est là que les poules passent le plus de temps.',
      'Nous avons aussi planté quelques arbres de plus. Dans quelques années, ils donneront de l’ombre.',
    ],
    scene: 'trees',
    photo: PHOTOS.henGrass,
  },
]

export type RewardStatus = 'unlocked' | 'progress' | 'locked' | 'used'

export type Reward = {
  id: string
  kind: 'immediate' | 'experience'
  title: string
  description: string
  /** Nombre d'achats nécessaires (montants et seuils fictifs) */
  threshold: number
  /** Débloqué en suivant une ferme plutôt qu'avec des achats */
  requiresFollow?: boolean
  icon: 'coupon' | 'gift' | 'drumstick' | 'farm' | 'visit' | 'meet' | 'family' | 'season'
  link?: string
}

/** Récompenses PROPOSÉES par notre programme, montants et seuils fictifs */
export const REWARDS: Reward[] = [
  { id: 'reduction-1e', kind: 'immediate', title: '1 € de réduction', description: 'Sur un prochain achat de produits La Nouvelle Agriculture®.', threshold: 3, icon: 'coupon' },
  {
    id: 'decouverte-volaille',
    kind: 'immediate',
    title: 'Offre découverte volaille',
    description: 'Une réduction sur un produit de volaille LNA, pour découvrir une autre filière.',
    threshold: 5,
    icon: 'drumstick',
  },
  { id: 'oeufs-offerts', kind: 'immediate', title: 'Une boîte d’œufs offerte', description: 'Une boîte d’œufs Plein Air LNA.', threshold: 10, icon: 'gift' },
  {
    id: 'suivre-ferme',
    kind: 'experience',
    title: 'Suivre la ferme de mon produit',
    description: 'Ajoutée depuis la traçabilité : ses nouvelles et ses contenus dans votre espace.',
    threshold: 0,
    requiresFollow: true,
    icon: 'farm',
    link: '/ferme',
  },
  {
    id: 'visite-ferme',
    kind: 'experience',
    title: 'Visite de ferme en famille',
    description: 'Tirage au sort pour une matinée dans une ferme LNA.',
    threshold: 5,
    icon: 'visit',
    link: '/experiences/visite',
  },
  {
    id: 'rencontre',
    kind: 'experience',
    title: 'Rencontre avec un agriculteur',
    description: 'Un échange en petit groupe avec des agriculteurs LNA.',
    threshold: 10,
    icon: 'meet',
  },
  {
    id: 'journee-famille',
    kind: 'experience',
    title: 'Événement de saison',
    description: 'Une journée dans une ferme, ouverte aux membres et à leur famille.',
    threshold: 15,
    icon: 'season',
  },
]

/** Visite PROPOSÉE (date et nombre de places fictifs) */
export const VISIT = {
  title: 'Visite de la Ferme de la Vallée',
  date: 'Samedi 21 novembre 2026',
  time: '10 h – 12 h',
  duration: '2 h',
  place: 'Ferme de la Vallée (fictive)',
  seats: 12,
  drawDate: '10 novembre 2026',
  program: [
    { title: 'Découverte de la ferme', text: 'Le tour de l’exploitation et des parcours.' },
    { title: 'Rencontre avec l’éleveuse', text: 'Son métier, ses choix, et toutes vos questions.' },
    { title: 'Découverte de l’élevage', text: 'Voir les poules sur le parcours, comprendre une journée type.' },
    { title: 'Un moment pour les enfants', text: 'Un atelier simple autour de l’alimentation des poules.' },
  ],
}

/** Suivi d'un élevage (proposition) : un groupe d'animaux, jamais un animal « possédé » */
export const FLOCK_FOLLOW = {
  group: 'Groupe de poules plein air · Ferme de la Vallée',
  since: '2 octobre 2026',
  updates: [
    { date: '22 oct.', text: 'Le groupe sort sur le parcours tous les jours.' },
    { date: '12 oct.', text: 'Première sortie sur le parcours.' },
    { date: '21 sept.', text: 'Arrivée du groupe à la ferme.' },
  ],
}

export const PURCHASE_HISTORY = [
  { date: '18 oct. 2026', product: 'Œufs Plein Air', store: 'Supermarché · Niort' },
  { date: '4 oct. 2026', product: 'Œufs Plein Air', store: 'Supermarché · Niort' },
  { date: '20 sept. 2026', product: 'Poulet', store: 'Hypermarché · Chauray' },
]

/** Produit « reconnu » sur le ticket lors de la simulation */
export const SCANNED_PRODUCT = { product: 'Œufs Plein Air', store: 'Supermarché · Niort' }

export const FEEDBACK_CHOICES = [
  'L’avantage',
  'Les informations',
  'La proximité avec l’agriculteur',
  'La découverte de la ferme',
  'La simplicité du programme',
]

/** Regroupement de toutes les données fictives, pour les repérer d'un coup d'œil */
export const DEMO_DATA = {
  user: DEMO_USER,
  initialPurchases: INITIAL_PURCHASES,
  milestones: MILESTONES,
  farm: FARM,
  trace: DEMO_TRACE,
  news: NEWS,
  rewards: REWARDS,
  visit: VISIT,
  flock: FLOCK_FOLLOW,
  purchaseHistory: PURCHASE_HISTORY,
  scannedProduct: SCANNED_PRODUCT,
}
