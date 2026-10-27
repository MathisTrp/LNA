/**
 * Informations LNA RÉELLES (catégorie A), reprises des pages officielles.
 * Chaque bloc renvoie à son entrée dans sources.ts. Ne rien ajouter ici sans source.
 * Attention au périmètre : les engagements « œufs » ci-dessous concernent les œufs Plein Air uniquement.
 */
import { URLS } from './sources'
import { PHOTOS, type Photo } from './images'

/** Fonctionnement de l'outil de traçabilité existant (sources : trace-steps, trace-inputs) */
export const TRACEABILITY = {
  url: URLS.tracabilite,
  steps: [
    'Scannez le code-barres et saisissez le numéro de lot',
    'Découvrez votre agriculteur et sa localisation',
    'Accédez à ses bonnes pratiques et à ses engagements',
  ],
  barcodeHint: 'Les 13 chiffres situés sous le code-barres',
  lotHint: 'Pour les œufs : le numéro de lot et la date de consommation recommandée (DCR) imprimés sur l’un de vos œufs',
  app: 'Monagriculteur.coop',
}

export type Commitment = { id: string; icon: 'trees' | 'wheat' | 'shield' | 'map' | 'coins' | 'check'; title: string; text: string; source: string }

/** Engagements publiés pour les œufs Plein Air LNA */
export const EGGS_PLEIN_AIR = {
  productName: 'Œufs Plein Air Bleu-Blanc-Cœur',
  production: 'Œufs Plein Air',
  feeding: {
    text: 'Les poules Plein Air sont nourries avec des céréales (essentiellement du blé et du maïs pour les poules pondeuses) et une alimentation diversifiée avec des graines de lin riches en oméga 3, conformément au cahier des charges Bleu-Blanc-Cœur.',
    points: ['Céréales : blé et maïs', 'Graines de lin (oméga 3)', 'Cahier des charges Bleu-Blanc-Cœur'],
    source: URLS.bienNourrir,
  },
  commitments: [
    {
      id: 'eggs-trees',
      icon: 'trees',
      title: 'Prairies arborées',
      text: 'Des poules élevées dans des prairies arborées, avec plus d’arbres que les normes CE minimales.',
      source: URLS.oeufsPleinAir,
    },
    {
      id: 'eggs-feed',
      icon: 'wheat',
      title: 'Alimentation Bleu-Blanc-Cœur',
      text: 'Céréales et graines de lin riches en oméga 3, selon le cahier des charges Bleu-Blanc-Cœur.',
      source: URLS.bienNourrir,
    },
    {
      id: 'eggs-antibio',
      icon: 'shield',
      title: 'Sans traitement antibiotique',
      text: 'Poules élevées sans traitement antibiotique dès la ponte des œufs.',
      source: URLS.oeufsPleinAir,
    },
    {
      id: 'local-origin',
      icon: 'map',
      title: 'Origine locale',
      text: 'Œufs de France, issus des fermes familiales du Grand Ouest.',
      source: URLS.origine,
    },
    {
      id: 'pay',
      icon: 'coins',
      title: 'Meilleure rémunération',
      text: 'Les agriculteurs sont payés à un prix supérieur à celui des productions classiques ou équivalentes.',
      source: URLS.remuneration,
    },
    {
      id: 'controls',
      icon: 'check',
      title: 'Engagements contrôlés',
      text: 'Cahiers des charges définis par les agriculteurs, contrôles internes de la coopérative et audits de Bureau Veritas.',
      source: URLS.demarche,
    },
  ] satisfies Commitment[],
}

export const BRAND = {
  since: 2008,
  sinceText: 'Agriculteurs engagés depuis 2008 dans La Nouvelle Agriculture®',
  payQuote: '« Quand vous choisissez nos produits, vous êtes sûr que cela nous bénéficie : nous sommes payés à un prix supérieur à celui des productions classiques ou équivalentes. »',
  paySource: URLS.remuneration,
}

export type CategoryId = 'oeufs' | 'volaille' | 'boucherie'

/** « Découvrez aussi LNA » : uniquement des faits publiés, avec le périmètre de chaque filière */
export const CATEGORIES: {
  id: CategoryId
  label: string
  facts: { text: string; scope: string; source: string }[]
  farmer?: { name: string; caption: string; source: string }
  scene: 'hens' | 'landscape' | 'pasture'
  photo: Photo
  /** Photo de produit : affichée entière, sans recadrage */
  contain?: boolean
}[] = [
  {
    id: 'oeufs',
    label: 'Œufs',
    facts: [],
    scene: 'hens',
    photo: PHOTOS.eggBox,
    contain: true,
  },
  {
    id: 'volaille',
    label: 'Volaille',
    facts: [
      { text: 'Plus de 400 éleveurs de poulet dans l’Ouest de la France.', scope: 'Poulet', source: URLS.questions },
      { text: 'Poulets élevés sans traitement antibiotique.', scope: 'Poulet', source: URLS.questions },
    ],
    farmer: { name: 'Angélique', caption: 'éleveuse de poulets Label Rouge à Chemillé (49)', source: URLS.agriculteurs },
    scene: 'landscape',
    photo: PHOTOS.angelique,
  },
  {
    id: 'boucherie',
    label: 'Boucherie',
    facts: [
      { text: 'Vaches avec un accès à volonté à l’herbe pendant 6 mois et plus si le temps le permet.', scope: 'Bœuf', source: URLS.questions },
      { text: '100 % des porcs sont entiers (non castrés).', scope: 'Porc', source: URLS.bienEtre },
    ],
    farmer: { name: 'Valérie', caption: 'éleveuse de vaches à Sainte-Pazanne (44)', source: URLS.agriculteurs },
    scene: 'pasture',
    photo: PHOTOS.cows,
  },
]
