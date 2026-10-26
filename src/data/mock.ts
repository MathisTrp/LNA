/**
 * Données fictives du prototype.
 * Tout le contenu affiché (ferme, agricultrice, actualités, récompenses…) se modifie ici.
 * Les champs `image` sont optionnels : déposez une photo dans src/assets/photos/,
 * importez-la et renseignez-la ici. Sans photo, une illustration est affichée.
 */
import type { SceneName } from '../components/Illustration'

export type User = {
  firstName: string
  email: string
  householdSize: number
  hasChildren: boolean
}

export const DEMO_USER: User = {
  firstName: 'Claire',
  email: 'claire.dupuis@exemple.fr',
  householdSize: 4,
  hasChildren: true,
}

/** Nombre d'achats au démarrage de la démo */
export const INITIAL_PURCHASES = 3

/** Paliers de progression : un palier = une nouvelle expérience */
export const MILESTONES = [
  { purchases: 5, label: 'Visite de ferme en famille', short: 'votre prochaine expérience' },
  { purchases: 10, label: 'Rencontre avec Sophie', short: 'la rencontre avec Sophie' },
] as const

export const FARM = {
  name: 'Ferme de la Vallée',
  farmer: 'Sophie Martin',
  farmerFirstName: 'Sophie',
  production: 'Œufs plein air',
  location: 'Deux-Sèvres, France',
  since: 2014,
  hens: '6 000 poules en 2 bâtiments',
  outdoorArea: '2,5 hectares de parcours',
  shortIntro:
    'Sophie élève ses poules en plein air et travaille avec La Nouvelle Agriculture depuis plusieurs années.',
  about: [
    'Sophie a repris l’exploitation familiale en 2011, après quelques années comme technicienne agricole. Ses parents y élevaient des vaches laitières ; elle a fait le choix des poules pondeuses en plein air.',
    'Aujourd’hui, la ferme compte deux bâtiments et des parcours enherbés, plantés de haies et d’arbres fruitiers pour que les poules aient de l’ombre et osent s’éloigner. Elle travaille avec son conjoint Marc et un salarié à mi-temps.',
  ],
  quote: '« Ce que j’aime, c’est voir les poules sortir le matin. Le reste, c’est beaucoup de surveillance et un peu de patience. »',
  today: {
    date: 'Lundi 26 octobre',
    text: 'Avec les températures plus fraîches, Sophie adapte les horaires de sortie des poules : les trappes s’ouvrent un peu plus tard le matin, une fois la rosée tombée.',
  },
  feeding: {
    title: 'Comment sont nourries les poules ?',
    text: 'Un aliment composé principalement de céréales (blé, maïs) et de graines de lin, sans OGM, suivant le cahier des charges défini par les agriculteurs LNA. Une partie des céréales vient d’exploitations voisines de la coopérative.',
    points: ['Céréales et graines de lin', 'Sans OGM', 'Eau et aliment à volonté', 'Cahier des charges contrôlé'],
  },
  commitments: [
    { icon: 'heart', title: 'Bien-être animal', text: 'Accès au plein air chaque jour, parcours arborés, densité limitée.' },
    { icon: 'wheat', title: 'Alimentation suivie', text: 'Aliment défini dans le cahier des charges, contrôlé régulièrement.' },
    { icon: 'qr', title: 'Traçabilité', text: 'Chaque boîte indique la ferme d’origine, consultable par QR code.' },
    { icon: 'leaf', title: 'Environnement', text: 'Haies replantées, prairies entretenues, fumier valorisé sur les cultures.' },
  ],
} as const

export type NewsItem = {
  id: string
  title: string
  date: string
  excerpt: string
  body: string[]
  scene: SceneName
  image?: string
  /** Contenu réservé aux membres ayant atteint 5 achats */
  membersOnly?: boolean
  video?: boolean
}

export const NEWS: NewsItem[] = [
  {
    id: 'journees-ensoleillees',
    title: 'Les poules profitent des dernières journées ensoleillées',
    date: '22 octobre 2026',
    excerpt:
      'Encore quelques après-midi doux cette semaine. Les poules restent dehors plus longtemps, surtout sous les pommiers au fond du parcours.',
    body: [
      'Encore quelques après-midi doux cette semaine. Les poules restent dehors plus longtemps, surtout sous les pommiers au fond du parcours, là où il reste des pommes tombées.',
      'On en profite pour vérifier les clôtures avant l’hiver. Il y a eu des traces de renard la semaine dernière, rien de grave, mais on préfère anticiper.',
      'D’ici deux semaines, on passera aux horaires d’hiver pour les sorties.',
    ],
    scene: 'hens',
  },
  {
    id: 'sortie-plein-air',
    title: 'Première sortie en plein air pour le nouveau groupe',
    date: '12 octobre 2026',
    excerpt:
      'Trois semaines après leur arrivée, les jeunes poules du bâtiment 2 ont découvert le parcours. Les plus curieuses sont sorties en premier.',
    body: [
      'Trois semaines après leur arrivée, les jeunes poules du bâtiment 2 ont découvert le parcours. On attend toujours qu’elles soient bien habituées au bâtiment avant d’ouvrir les trappes.',
      'Les plus curieuses sont sorties en premier, les autres ont suivi dans l’heure. Le premier jour, elles restent près du bâtiment ; il faut quelques jours pour qu’elles s’aventurent vers les arbres.',
    ],
    scene: 'landscape',
    membersOnly: true,
    video: true,
  },
  {
    id: 'arrivee-nouvelles-poules',
    title: 'Arrivée de nouvelles poules',
    date: '21 septembre 2026',
    excerpt:
      'Le bâtiment 2 accueille un nouveau groupe de poules de 18 semaines. Les premiers jours servent surtout à les laisser s’installer au calme.',
    body: [
      'Le bâtiment 2 accueille un nouveau groupe de poules, arrivées à l’âge de 18 semaines d’un élevage de poulettes partenaire, à une heure d’ici.',
      'Les premiers jours servent surtout à les laisser s’installer au calme : lumière, eau, aliment, on observe beaucoup. Les premiers œufs arrivent en général deux à trois semaines plus tard.',
      'Avant leur arrivée, le bâtiment a été entièrement nettoyé et désinfecté, puis laissé vide pendant plusieurs semaines. C’est ce qu’on appelle le vide sanitaire.',
    ],
    scene: 'barn',
  },
  {
    id: 'entretien-parcours',
    title: 'Entretien des espaces extérieurs',
    date: '8 septembre 2026',
    excerpt:
      'Avant l’automne, Marc a ressemé les zones les plus abîmées du parcours et nous avons planté 40 mètres de haie supplémentaires.',
    body: [
      'Avant l’automne, Marc a ressemé les zones les plus abîmées du parcours, près des trappes. C’est là que les poules passent le plus de temps, l’herbe a du mal à tenir.',
      'Nous avons aussi planté 40 mètres de haie supplémentaires côté ouest. Dans deux ou trois ans, elle donnera de l’ombre et protégera du vent.',
    ],
    scene: 'trees',
  },
]

export type RewardStatus = 'unlocked' | 'progress' | 'locked' | 'used'

export type Reward = {
  id: string
  kind: 'immediate' | 'experience'
  title: string
  description: string
  /** Nombre d'achats nécessaires */
  threshold: number
  icon: 'coupon' | 'gift' | 'drumstick' | 'farm' | 'visit' | 'meet' | 'family' | 'season'
  link?: string
}

export const REWARDS: Reward[] = [
  {
    id: 'reduction-1e',
    kind: 'immediate',
    title: '1 € de réduction',
    description: 'Sur votre prochain achat de produits La Nouvelle Agriculture.',
    threshold: 3,
    icon: 'coupon',
  },
  {
    id: 'decouverte-volaille',
    kind: 'immediate',
    title: 'Offre découverte volaille',
    description: '−20 % sur un produit de volaille LNA, pour découvrir nos éleveurs de poulets.',
    threshold: 5,
    icon: 'drumstick',
  },
  {
    id: 'oeufs-offerts',
    kind: 'immediate',
    title: 'Une boîte de 6 œufs offerte',
    description: 'Une boîte de 6 œufs plein air de la Ferme de la Vallée.',
    threshold: 10,
    icon: 'gift',
  },
  {
    id: 'suivre-ferme',
    kind: 'experience',
    title: 'Suivre la Ferme de la Vallée',
    description: 'Les nouvelles de la ferme, environ une fois par semaine.',
    threshold: 1,
    icon: 'farm',
    link: '/ferme',
  },
  {
    id: 'visite-ferme',
    kind: 'experience',
    title: 'Visite de ferme en famille',
    description: 'Tirage au sort pour une matinée à la Ferme de la Vallée avec Sophie.',
    threshold: 5,
    icon: 'visit',
    link: '/experiences/visite',
  },
  {
    id: 'rencontre',
    kind: 'experience',
    title: 'Rencontre avec un agriculteur',
    description: 'Un échange en petit groupe (en ligne ou en magasin) avec des agriculteurs LNA.',
    threshold: 10,
    icon: 'meet',
  },
  {
    id: 'journee-famille',
    kind: 'experience',
    title: 'Journée portes ouvertes de printemps',
    description: 'Événement saisonnier dans plusieurs fermes LNA, ouvert aux membres et à leur famille.',
    threshold: 15,
    icon: 'season',
  },
]

export const VISIT = {
  title: 'Visite de la Ferme de la Vallée',
  date: 'Samedi 21 novembre 2026',
  time: '10 h – 12 h',
  duration: '2 h',
  place: 'Ferme de la Vallée, Deux-Sèvres',
  seats: 12,
  drawDate: '10 novembre 2026',
  program: [
    { title: 'Découverte de la ferme', text: 'Le tour de l’exploitation, les bâtiments et les parcours.' },
    { title: 'Rencontre avec Sophie', text: 'Ses choix, son métier, et toutes vos questions.' },
    { title: 'Découverte de l’élevage', text: 'Voir les poules au parcours, comprendre une journée type.' },
    { title: 'Un moment pour les enfants', text: 'Ramassage des œufs accompagné et petit atelier sur l’alimentation des poules.' },
  ],
}

/** Parrainage : suivi d'un groupe d'animaux, pas d'un animal « possédé » */
export const SPONSORSHIP = {
  henNumber: 184,
  building: 'Bâtiment 2',
  group: 'Groupe arrivé en septembre 2026 · environ 3 000 poules',
  since: '2 octobre 2026',
  updates: [
    { date: '22 oct.', text: 'Le groupe sort désormais tous les jours, de 10 h à la tombée de la nuit.' },
    { date: '12 oct.', text: 'Première sortie sur le parcours, trois semaines après l’arrivée.' },
    { date: '5 oct.', text: 'Début de la ponte : les premiers œufs du groupe ont été ramassés.' },
  ],
}

export type Category = {
  id: 'oeufs' | 'volaille' | 'boucherie'
  label: string
  farmer: string
  farm: string
  text: string
  scene: SceneName
}

export const CATEGORIES: Category[] = [
  {
    id: 'oeufs',
    label: 'Œufs',
    farmer: 'Sophie Martin',
    farm: 'Ferme de la Vallée',
    text: 'Vous connaissez déjà nos œufs.',
    scene: 'hens',
  },
  {
    id: 'volaille',
    label: 'Volaille',
    farmer: 'Thomas Bernard',
    farm: 'Élevage des Grands Prés',
    text: 'Thomas élève des poulets avec accès à l’extérieur, nourris avec les céréales de la coopérative.',
    scene: 'landscape',
  },
  {
    id: 'boucherie',
    label: 'Boucherie',
    farmer: 'Julie et Marc Renaud',
    farm: 'GAEC du Bocage',
    text: 'Julie et Marc élèvent des bovins au pâturage, dans un bocage où les haies ont été préservées.',
    scene: 'pasture',
  },
]

export const PURCHASE_HISTORY = [
  { date: '18 oct. 2026', product: 'Œufs plein air ×12', store: 'Super U Niort' },
  { date: '4 oct. 2026', product: 'Œufs plein air ×6', store: 'Super U Niort' },
  { date: '20 sept. 2026', product: 'Filets de poulet ×2', store: 'Leclerc Chauray' },
]

/** Produit « trouvé » sur le ticket lors de la simulation de scan */
export const SCANNED_PRODUCT = { product: 'Œufs plein air ×12', store: 'Super U Niort' }

export const FEEDBACK_CHOICES = [
  'L’avantage',
  'Les informations',
  'La proximité avec l’agriculteur',
  'La découverte de la ferme',
  'La simplicité du programme',
]
