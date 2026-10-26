import { Check, Receipt, ShoppingBasket, Sprout } from 'lucide-react'
import { BackButton, ButtonLink, Logo, SectionTitle } from '../components/ui'

const STEPS = [
  { icon: ShoppingBasket, title: 'Achetez LNA', text: 'Œufs, volaille ou boucherie, dans votre magasin habituel.' },
  { icon: Receipt, title: 'Ajoutez votre achat', text: 'Une photo de votre ticket suffit. Moins de 10 secondes.' },
  { icon: Sprout, title: 'Rapprochez-vous de la ferme', text: 'Des avantages concrets, et un accès de plus en plus proche des agriculteurs.' },
]

const PATH = [
  { at: 'Dès l’inscription', immediate: '—', relation: 'Vous suivez la ferme qui produit vos œufs' },
  { at: '3 achats', immediate: '1 € de réduction', relation: 'Les nouvelles de la ferme chaque semaine' },
  { at: '5 achats', immediate: 'Offre découverte volaille', relation: 'Vidéos de la ferme + tirage au sort pour une visite' },
  { at: '10 achats', immediate: '6 œufs offerts', relation: 'Rencontre avec un agriculteur' },
]

export function ProgramPage() {
  return (
    <div className="min-h-dvh pb-24">
      <header className="bg-white">
        <div className="mx-auto flex h-20 max-w-3xl items-center justify-between px-4">
          <div className="pt-3">
            <Logo compact />
          </div>
          <BackButton to="/" />
        </div>
        <div className="h-3 bg-forest" />
      </header>

      <main className="mx-auto max-w-3xl px-4 pt-8">
        <SectionTitle as="h1" kicker="Découvrez" title="le programme" />
        <p className="mt-3 text-lg">
          Une marque industrielle peut raconter l’agriculture. <strong>Nous, nous pouvons vous présenter ceux qui la font.</strong>
        </p>

        <ol className="mt-8 grid gap-3 sm:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="card">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-full bg-mint text-forest">
                  <Icon className="size-5" />
                </span>
                <span className="kicker text-olive">Étape {i + 1}</span>
              </div>
              <h2 className="mt-3 text-lg font-bold">{title}</h2>
              <p className="mt-1 text-[15px] text-brown-soft">{text}</p>
            </li>
          ))}
        </ol>

        <section className="mt-10 overflow-hidden rounded-[28px] bg-forest p-5 text-white sm:p-7">
          <SectionTitle light kicker="Ce que vous débloquez" title="au fil de vos achats" />
          <div className="mt-5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-0 text-[15px] sm:grid-cols-[8rem_1fr_1.4fr]">
            <span className="hidden sm:block" />
            <span className="kicker hidden pb-2 text-white/70 sm:block">Avantage</span>
            <span className="kicker hidden pb-2 text-lime sm:block">Accès à la ferme</span>
            {PATH.map((row) => (
              <div key={row.at} className="contents">
                <span className="border-t border-white/15 py-3 font-bold">{row.at}</span>
                <span className="border-t border-white/15 py-3 sm:col-start-2">
                  <span className="block text-white/80 sm:hidden">{row.immediate !== '—' && row.immediate}</span>
                  <span className="hidden text-white/80 sm:inline">{row.immediate}</span>
                  <span className="block font-semibold text-lime sm:hidden">{row.relation}</span>
                </span>
                <span className="hidden border-t border-white/15 py-3 font-semibold text-lime sm:block">{row.relation}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <SectionTitle kicker="Nos engagements" title="pour un programme honnête" />
          <ul className="mt-4 grid gap-3">
            {[
              'Pas de points à convertir, pas de niveaux compliqués : un compteur d’achats, c’est tout.',
              'Les nouvelles sont écrites par les agriculteurs, à leur rythme : environ une par semaine.',
              'Le même contenu est partagé à tous les membres qui suivent une ferme : nos agriculteurs restent dans leur ferme.',
              'Aucune obligation de partager quoi que ce soit sur les réseaux sociaux.',
            ].map((t) => (
              <li key={t} className="flex gap-3 text-[16px]">
                <Check className="mt-0.5 size-5 shrink-0 text-forest" />
                {t}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink to="/inscription" className="sm:flex-1">
            Créer mon espace
          </ButtonLink>
          <ButtonLink to="/" variant="ghost" className="sm:flex-1">
            Retour
          </ButtonLink>
        </div>
      </main>
    </div>
  )
}
