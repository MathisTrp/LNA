/**
 * Registre interne des sources (non affiché tel quel à l'utilisateur).
 * Sert à garder la trace de l'origine de chaque information du prototype.
 *
 * - official : information publiée par La Nouvelle Agriculture (citée ou reformulée au plus près)
 * - proposal : fonctionnalité imaginée dans notre recommandation (programme de fidélité)
 * - demo     : donnée fictive nécessaire à la démonstration
 *
 * Consultation des pages officielles : 26 octobre 2026.
 */
export type SourceType = 'official' | 'proposal' | 'demo'

export type Source = { id: string; claim: string; source?: string; type: SourceType; scope?: string }

export const URLS = {
  home: 'https://www.lanouvelleagriculture.coop/',
  tracabilite: 'https://www.lanouvelleagriculture.coop/tracabilite',
  agriculteurs: 'https://www.lanouvelleagriculture.coop/nous-agriculteurs',
  origine: 'https://www.lanouvelleagriculture.coop/nos-engagements/garantir-lorigine-locale-de-nos-produits',
  demarche: 'https://www.lanouvelleagriculture.coop/index.php/notre-histoire/notre-demarche-agricole',
  questions: 'https://www.lanouvelleagriculture.coop/vos-questions',
  oeufsPleinAir: 'https://www.lanouvelleagriculture.coop/nos-produits/oeufs-plein-air',
  bienNourrir: 'https://www.lanouvelleagriculture.coop/nos-engagements/bien-nourrir-nos-animaux',
  bienEtre: 'https://www.lanouvelleagriculture.coop/nos-engagements/veiller-au-bien-etre-de-nos-animaux',
  antibiotiques: 'https://www.lanouvelleagriculture.coop/nos-engagements/elever-nos-animaux-sans-traitement-antibiotique',
  remuneration: 'https://www.lanouvelleagriculture.coop/nos-engagements/mieux-nous-remunerer-nous-agriculteurs',
  mentionsLegales: 'https://tracabilite.lanouvelleagriculture.coop/mentions-legales',
} as const

export const SOURCES: Source[] = [
  // ---------- Traçabilité (official) ----------
  {
    id: 'trace-steps',
    claim:
      'Comment ça marche : 1) scannez le code-barres et saisissez le numéro de lot ; 2) découvrez votre agriculteur et sa localisation ; 3) accédez à ses bonnes pratiques et à ses engagements.',
    source: URLS.tracabilite,
    type: 'official',
  },
  {
    id: 'trace-inputs',
    claim:
      'Saisir les 13 chiffres sous le code-barres et le numéro de lot imprimé sur l’étiquette prix ou directement sur l’œuf ; pour les œufs, numéro de lot et date de consommation recommandée (DCR) figurant sur l’un des œufs.',
    source: URLS.origine,
    type: 'official',
  },
  {
    id: 'trace-info',
    claim:
      'L’outil fournit les informations principales (l’agriculteur, le lieu de production, l’alimentation des animaux, la manière de les élever…) et vise à « créer un lien direct de confiance et de proximité ».',
    source: URLS.origine,
    type: 'official',
  },
  { id: 'trace-app', claim: 'Application de traçabilité Monagriculteur.coop.', source: URLS.demarche, type: 'official' },

  // ---------- Marque / coopérative (official) ----------
  { id: 'since-2008', claim: 'Agriculteurs engagés depuis 2008 dans La Nouvelle Agriculture®.', source: URLS.agriculteurs, type: 'official' },
  {
    id: 'coop',
    claim: 'Agriculteurs de l’Ouest de la France, propriétaires de leurs exploitations familiales, réunis en coopérative (Terrena).',
    source: URLS.agriculteurs,
    type: 'official',
  },
  { id: 'local-origin', claim: 'Origine locale de l’ensemble des produits : fermes familiales du Grand Ouest.', source: URLS.origine, type: 'official' },
  {
    id: 'controls',
    claim:
      'Cahiers des charges définis par les agriculteurs ; contrôles internes organisés par la coopérative dans 100 % des élevages ; contrôles et audits par Bureau Veritas, organisme indépendant, dans les fermes de son choix.',
    source: URLS.demarche,
    type: 'official',
  },
  {
    id: 'pay',
    claim: '« Nous sommes payés à un prix supérieur à celui des productions classiques ou équivalentes. »',
    source: URLS.remuneration,
    type: 'official',
  },

  // ---------- Œufs Plein Air (official, périmètre : œufs Plein Air uniquement) ----------
  {
    id: 'eggs-trees',
    claim:
      'Œufs Plein Air : poules élevées dans des prairies arborées, plus d’arbres plantés que les normes CE minimales relatives à la protection des poules pondeuses.',
    source: URLS.oeufsPleinAir,
    type: 'official',
    scope: 'Œufs Plein Air',
  },
  {
    id: 'eggs-feed',
    claim:
      'Poules Plein Air nourries avec des céréales, alimentation diversifiée avec des graines de lin riches en oméga 3, conformément au cahier des charges Bleu-Blanc-Cœur. Poules pondeuses : céréales, essentiellement blé et maïs.',
    source: URLS.bienNourrir,
    type: 'official',
    scope: 'Œufs Plein Air / poules pondeuses',
  },
  {
    id: 'eggs-antibio',
    claim: 'Œufs Plein Air : poules élevées sans traitement antibiotique dès la ponte des œufs.',
    source: URLS.oeufsPleinAir,
    type: 'official',
    scope: 'Œufs Plein Air',
  },
  { id: 'eggs-france', claim: 'Œufs de France, en provenance des exploitations des agriculteurs.', source: URLS.oeufsPleinAir, type: 'official', scope: 'Œufs Plein Air' },
  {
    id: 'eggs-products',
    claim: 'Gamme Œufs Plein Air : « Œufs Plein Air Bleu-Blanc-Cœur » et « Œufs Plein Air Idéal Coque Bleu-Blanc-Cœur ».',
    source: URLS.oeufsPleinAir,
    type: 'official',
    scope: 'Œufs Plein Air',
  },

  // ---------- Autres filières (official, utilisées dans « Découvrez aussi LNA ») ----------
  { id: 'chicken-farmers', claim: 'Poulet : « plus de 400 éleveurs de l’Ouest de la France ».', source: URLS.questions, type: 'official', scope: 'Poulet' },
  {
    id: 'chicken-antibio',
    claim: 'Poulets La Nouvelle Agriculture® élevés sans traitement antibiotique (un animal soigné aux antibiotiques n’est pas vendu sous la marque).',
    source: URLS.questions,
    type: 'official',
    scope: 'Poulet',
  },
  { id: 'beef-grass', claim: 'Bœuf : accès à volonté à l’herbe pendant 6 mois et plus si le temps le permet.', source: URLS.questions, type: 'official', scope: 'Bœuf' },
  { id: 'pork-entire', claim: 'Porc : 100 % des porcs sont entiers (non castrés).', source: URLS.bienEtre, type: 'official', scope: 'Porc' },
  { id: 'farmer-angelique', claim: 'Angélique, éleveuse de poulets Label Rouge à Chemillé (49).', source: URLS.agriculteurs, type: 'official' },
  { id: 'farmer-valerie', claim: 'Valérie, éleveuse de vaches à Sainte-Pazanne (44).', source: URLS.agriculteurs, type: 'official' },

  // ---------- Notre recommandation (proposal) ----------
  { id: 'p-follow', claim: 'Ajouter la ferme retrouvée par la traçabilité à son espace et la suivre dans le temps.', type: 'proposal' },
  { id: 'p-validate', claim: 'Valider un achat (photo du ticket) pour progresser dans le programme.', type: 'proposal' },
  { id: 'p-news', claim: 'Nouvelles ponctuelles de la ferme, un même contenu partagé avec tous les membres qui la suivent.', type: 'proposal' },
  { id: 'p-rewards', claim: 'Avantages, paliers d’achats, expériences (visites, rencontres), suivi d’un élevage, « dire merci » groupé.', type: 'proposal' },

  // ---------- Démonstration (demo) ----------
  { id: 'd-farm', claim: 'Ferme de la Vallée, Sophie Martin : profil fictif, ses textes et actualités sont inventés.', type: 'demo' },
  { id: 'd-user', claim: 'Claire, 3 achats, réduction de 1 €, seuil de 5 achats, date de visite, codes produit : données fictives.', type: 'demo' },
]
