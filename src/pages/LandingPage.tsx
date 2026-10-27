import { useNavigate } from 'react-router-dom'
import { ArrowRight, QrCode, ScanBarcode, ShoppingBasket, Sprout, Tag, Tractor } from 'lucide-react'
import { useAppState } from '../state/AppState'
import { DEMO_USER } from '../data/demo'
import { PHOTOS } from '../data/images'
import { ButtonLink, ContentTag, ImageSlot, Logo, PatternBand, PrototypeNotice } from '../components/ui'

export function LandingPage() {
  const { login, loggedIn } = useAppState()
  const navigate = useNavigate()

  return (
    <div className="min-h-dvh pb-20">
      <header className="bg-white">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 md:px-6">
          <div>
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
            Vous avez scanné le QR code du programme
          </p>
          <p className="kicker mt-6 text-brown">Proposition de programme de fidélité</p>
          <h1 className="script-title mt-1 text-[2.8rem] text-forest sm:text-[3.4rem]">Entrez dans nos fermes</h1>
          <p className="mt-4 text-[1.35rem] font-medium leading-snug sm:text-2xl">
            Vos achats LNA vous rapprochent de ceux qui les produisent.
          </p>
          <p className="mt-3 font-hand text-xl text-olive">Derrière chaque produit, une ferme à découvrir.</p>
        </div>

        <figure className="relative">
          <ImageSlot photo={PHOTOS.amelieHero} priority className="aspect-[3/2] rounded-[32px] shadow-[0_12px_40px_-16px_rgba(47,32,35,0.45)]" imgClassName="object-[50%_35%]" />
          <figcaption className="absolute bottom-3 left-3 right-3 rounded-2xl bg-white/92 px-4 py-2 text-sm backdrop-blur sm:left-auto sm:right-4 sm:max-w-sm">
            <span className="font-semibold">Amélie</span>, éleveuse de poules plein air à Moncoutant (79)
            <span className="block text-xs text-brown-soft">Agricultrice LNA · photo La Nouvelle Agriculture</span>
          </figcaption>
        </figure>
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
          text="Retrouvez la ferme de vos produits grâce à la traçabilité LNA, puis suivez-la : ses nouvelles, des visites, des rencontres."
          highlight
        />
      </section>

      <TraceToLink />

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
      <PrototypeNotice className="mx-auto max-w-xl px-6 pt-4" />
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

/** Le cœur de la recommandation : la traçabilité existante devient le point d'entrée d'une relation suivie */
function TraceToLink() {
  const steps = [
    { icon: ShoppingBasket, label: 'Un produit LNA', kind: 'lna' as const },
    { icon: ScanBarcode, label: 'La traçabilité : votre agriculteur', kind: 'lna' as const },
    { icon: Sprout, label: 'Votre espace : suivre sa ferme', kind: 'proposal' as const },
    { icon: Tractor, label: 'Avantages et expériences', kind: 'proposal' as const },
  ]
  return (
    <section className="mx-auto mt-8 max-w-6xl px-4 md:px-6">
      <div className="rounded-[28px] bg-white p-5 ring-1 ring-brown/8 sm:p-7">
        <p className="text-center text-lg font-semibold sm:text-xl">
          La traçabilité LNA vous permet de retrouver votre agriculteur.
          <br className="hidden sm:block" /> <span className="text-forest">Votre espace LNA vous permet de garder le lien.</span>
        </p>
        <ol className="mt-5 grid gap-2 sm:grid-cols-4 sm:gap-3">
          {steps.map(({ icon: Icon, label, kind }, i) => (
            <li key={label} className="relative flex items-center gap-3 rounded-2xl bg-cream p-3 sm:flex-col sm:text-center">
              <span className={`grid size-10 shrink-0 place-items-center rounded-full ${kind === 'lna' ? 'bg-forest text-white' : 'bg-lime text-deep'}`}>
                <Icon className="size-5" />
              </span>
              <span className="text-[15px] font-semibold leading-tight">{label}</span>
              {i < steps.length - 1 && <ArrowRight className="absolute -right-3 top-1/2 hidden size-5 -translate-y-1/2 text-olive sm:block" />}
            </li>
          ))}
        </ol>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <ContentTag kind="lna" label="Existe déjà chez LNA" />
          <ContentTag kind="proposal" label="Ce que nous proposons" />
        </div>
      </div>
    </section>
  )
}
