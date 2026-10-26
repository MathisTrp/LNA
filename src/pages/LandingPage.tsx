import { useNavigate } from 'react-router-dom'
import { QrCode, Tag, Tractor } from 'lucide-react'
import { useAppState } from '../state/AppState'
import { DEMO_USER, FARM } from '../data/mock'
import { ButtonLink, ImageSlot, Logo, PatternBand } from '../components/ui'

export function LandingPage() {
  const { login, loggedIn } = useAppState()
  const navigate = useNavigate()

  return (
    <div className="min-h-dvh pb-20">
      <header className="bg-white">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 md:px-6">
          <div className="pt-3">
            <Logo />
          </div>
          {loggedIn && (
            <ButtonLink to="/accueil" variant="ghost" className="min-h-10 px-4">
              Mon espace
            </ButtonLink>
          )}
        </div>
        <div className="h-3 bg-forest" />
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 pt-6 md:grid-cols-[1.05fr_1fr] md:gap-12 md:px-6 md:pt-14">
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-brown-soft ring-1 ring-brown/10">
            <QrCode className="size-4 text-forest" />
            Vous venez de scanner votre boîte d’œufs
          </p>
          <p className="kicker mt-6 text-brown">Le programme des membres LNA</p>
          <h1 className="script-title mt-1 text-[2.8rem] text-forest sm:text-[3.4rem]">Entrez dans nos fermes</h1>
          <p className="mt-4 text-[1.35rem] font-medium leading-snug sm:text-2xl">
            Vos achats LNA vous rapprochent de ceux qui les produisent.
          </p>
          <p className="mt-3 font-hand text-xl text-olive">Derrière chaque produit, une ferme à découvrir.</p>
        </div>

        <div className="relative">
          <ImageSlot scene="farmer" alt={`${FARM.farmer}, agricultrice`} className="aspect-[4/3] rounded-[32px] md:aspect-[5/4]" />
          <p className="absolute bottom-3 left-3 right-3 rounded-2xl bg-white/90 px-4 py-2 text-sm font-semibold backdrop-blur sm:left-auto sm:right-4">
            {FARM.farmer}, {FARM.production.toLowerCase()} · {FARM.location}
          </p>
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-6xl gap-4 px-4 sm:grid-cols-2 md:px-6">
        <Benefit
          icon={<Tag className="size-6" />}
          title="Des avantages sur vos achats"
          text="Une réduction dès votre 3ᵉ achat, puis des produits offerts. Simple, sans points à calculer."
        />
        <Benefit
          icon={<Tractor className="size-6" />}
          title="Un accès privilégié aux fermes"
          text="Suivez la ferme qui produit vos œufs, ses nouvelles, et participez à des visites avec nos agriculteurs."
          highlight
        />
      </section>

      <section className="mx-auto mt-8 flex max-w-6xl flex-col gap-3 px-4 sm:flex-row sm:justify-center md:px-6">
        <ButtonLink to="/programme" className="sm:min-w-64">
          Découvrir le programme
        </ButtonLink>
        <ButtonLink to="/inscription" variant="dark" className="sm:min-w-64">
          Créer mon espace
        </ButtonLink>
      </section>
      <p className="mt-4 text-center text-[15px] text-brown-soft">
        Déjà membre ?{' '}
        <button
          className="font-semibold text-forest underline underline-offset-4 hover:text-leaf"
          onClick={() => {
            login()
            navigate('/accueil')
          }}
        >
          Me connecter ({DEMO_USER.firstName})
        </button>
      </p>

      <PatternBand className="mt-12" />
      <p className="mx-auto max-w-xl px-6 pt-4 text-center text-xs text-brown-soft">
        Prototype étudiant non officiel · données et personnes fictives · conçu à partir de l’univers de La Nouvelle Agriculture®.
      </p>
    </div>
  )
}

function Benefit({ icon, title, text, highlight }: { icon: React.ReactNode; title: string; text: string; highlight?: boolean }) {
  return (
    <div className={`flex gap-4 rounded-[28px] p-5 sm:p-6 ${highlight ? 'bg-forest text-white' : 'bg-white ring-1 ring-brown/8'}`}>
      <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${highlight ? 'bg-lime text-deep' : 'bg-mint text-forest'}`}>{icon}</span>
      <div>
        <h2 className="text-lg font-bold leading-tight">{title}</h2>
        <p className={`mt-1 text-[15px] ${highlight ? 'text-white/85' : 'text-brown-soft'}`}>{text}</p>
      </div>
    </div>
  )
}
