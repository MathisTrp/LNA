/**
 * Photos officielles La Nouvelle Agriculture, téléchargées localement (public/images/lna/).
 * Usage autorisé pour ce prototype étudiant ; détail des sources dans public/images/lna/SOURCES.md.
 *
 * Règle : une vraie personne n'est montrée qu'avec sa vraie identité publiée par LNA.
 * Les zones fictives (Ferme de la Vallée, Sophie) n'utilisent que des photos sans portrait nominatif.
 */
const base = `${import.meta.env.BASE_URL}images/lna/`

export type Photo = { src: string; alt: string; credit: string }

export const LOGO_LNA = `${base}logo-lna.png`

export const PHOTOS = {
  amelieHero: {
    src: `${base}amelie-poule.webp`,
    alt: 'Amélie, éleveuse de poules plein air, accroupie dans son élevage, une poule dans les bras',
    credit: 'Amélie, éleveuse de poules plein air à Moncoutant (79) · Photo La Nouvelle Agriculture',
  },
  amelieEggs: {
    src: `${base}amelie-oeufs-fils.webp`,
    alt: 'Amélie et son fils au tri des œufs dans leur ferme',
    credit: 'Amélie, éleveuse de poules plein air à Moncoutant (79), et son fils · Photo LNA',
  },
  amelieFamily: {
    src: `${base}amelie-famille.webp`,
    alt: 'Amélie et sa famille accroupis dans leur parcours, au milieu des poules',
    credit: 'Amélie, éleveuse de poules plein air à Moncoutant (79), et sa famille · Photo LNA',
  },
  hensMeadow: {
    src: `${base}poules-prairie.webp`,
    alt: 'Poules rousses dans une prairie verte',
    credit: 'Photo La Nouvelle Agriculture · illustration',
  },
  outdoorFlock: {
    src: `${base}elevage-plein-air.webp`,
    alt: 'Groupe de poules sur un vaste parcours herbeux bordé d’arbres',
    credit: 'Photo La Nouvelle Agriculture · illustration',
  },
  henHeld: {
    src: `${base}poule-tenue.webp`,
    alt: 'Une poule tenue dans les bras par un éleveur',
    credit: 'Photo La Nouvelle Agriculture · illustration',
  },
  henGrass: {
    src: `${base}poule-herbe.webp`,
    alt: 'Une poule dans les hautes herbes du parcours',
    credit: 'Photo La Nouvelle Agriculture · illustration',
  },
  eggBox: {
    src: `${base}oeufs-plein-air-boite.webp`,
    alt: 'Boîte d’œufs Plein Air Bleu-Blanc-Cœur La Nouvelle Agriculture',
    credit: 'Produit La Nouvelle Agriculture',
  },
  angelique: {
    src: `${base}angelique-poulet.webp`,
    alt: 'Angélique, éleveuse de poulets Label Rouge, devant une haie',
    credit: 'Angélique, éleveuse de poulets Label Rouge à Chemillé (49) · Photo LNA',
  },
  cows: {
    src: `${base}vaches-prairie.webp`,
    alt: 'Troupeau de vaches dans une prairie',
    credit: 'Photo La Nouvelle Agriculture',
  },
} satisfies Record<string, Photo>
