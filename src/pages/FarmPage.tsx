import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BadgeCheck,
  CalendarDays,
  Check,
  ChevronRight,
  Coins,
  Lock,
  MapPin,
  Newspaper,
  Play,
  ScanBarcode,
  ShieldCheck,
  Sprout,
  Sun,
  Trees,
  Wheat,
  Users,
} from 'lucide-react'
import { useAppState } from '../state/AppState'
import { FARM, FLOCK_FOLLOW, NEWS, VISIT } from '../data/demo'
import { EGGS_PLEIN_AIR, type Commitment } from '../data/lna'
import { PHOTOS } from '../data/images'
import { URLS } from '../data/sources'
import { Badge, ButtonLink, CardHeading, ContentTag, ImageSlot, Modal, ProgressBar, SourceLink } from '../components/ui'

const commitmentIcons: Record<Commitment['icon'], typeof Trees> = {
  trees: Trees,
  wheat: Wheat,
  shield: ShieldCheck,
  map: MapPin,
  coins: Coins,
  check: BadgeCheck,
}

export function FarmPage() {
  const { followedFarm } = useAppState()
  if (!followedFarm) return <NoFarmYet />

  return (
    <div className="animate-fade-up">
      <FarmHeader />

      {/* ① Ce que la traçabilité LNA montre déjà */}
      <TraceabilitySection />

      {/* ② Ce que notre programme ajoute */}
      <KeepInTouchSection />
    </div>
  )
}

function NoFarmYet() {
  return (
    <div className="mx-auto max-w-lg pt-4 text-center animate-fade-up">
      <ImageSlot photo={PHOTOS.outdoorFlock} alt="" className="aspect-[16/9] rounded-[28px]" />
      <h1 className="script-title mt-6 text-[2.2rem] text-forest">Ma ferme</h1>
      <p className="mt-2 text-lg">Vous ne suivez encore aucune ferme.</p>
      <p className="mt-1 text-brown-soft">
        Retrouvez l’agriculteur de votre dernier produit avec la traçabilité LNA, puis ajoutez sa ferme à votre espace.
      </p>
      <ButtonLink to="/tracabilite" full className="mt-6">
        <ScanBarcode className="size-5" /> Retrouver mon agriculteur
      </ButtonLink>
    </div>
  )
}

function FarmHeader() {
  return (
    <section className="overflow-hidden rounded-[32px] bg-white ring-1 ring-brown/8">
      <div className="grid md:grid-cols-[1.1fr_1fr]">
        <ImageSlot photo={PHOTOS.hensMeadow} priority showCredit className="aspect-[16/9] md:aspect-auto md:min-h-72" />
        <div className="p-5 sm:p-7">
          <p className="kicker">Ma ferme</p>
          <h1 className="script-title mt-1 text-[2.3rem] text-forest sm:text-[2.7rem]">{FARM.name}</h1>
          <p className="mt-2 text-[16px]">
            <strong>{FARM.farmer}</strong> · {EGGS_PLEIN_AIR.production}
          </p>
          <p className="flex items-center gap-1.5 text-[15px] text-brown-soft">
            <MapPin className="size-4 text-olive" /> {FARM.location}
          </p>
          <div className="mt-4 rounded-2xl bg-cream px-4 py-3 text-sm text-brown-soft">
            <ContentTag kind="demo" label="Profil fictif" />
            <span className="mt-1.5 block">{FARM.fictionNote}. Aucun vrai agriculteur ne s’exprime dans ce prototype.</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function TraceabilitySection() {
  return (
    <section className="mt-8" aria-labelledby="trace-section">
      <ContentTag kind="lna" label="Traçabilité LNA · déjà disponible" />
      <h2 id="trace-section" className="script-title mt-2 text-[1.9rem] text-forest">
        Votre produit vient de cette ferme
      </h2>
      <p className="mt-1 text-brown-soft">Les informations que la traçabilité LNA permet déjà de retrouver à partir d’un produit.</p>

      <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1.4fr] md:gap-6">
        <div className="grid content-start gap-4">
          <div className="rounded-[24px] bg-white p-5 ring-2 ring-forest/20">
            <CardHeading icon={<ScanBarcode className="size-4" />}>Fiche produit</CardHeading>
            <dl className="mt-3 grid gap-2 text-[15px]">
              {[
                ['Produit', EGGS_PLEIN_AIR.productName],
                ['Production', EGGS_PLEIN_AIR.production],
                ['Agricultrice', `${FARM.farmer} (fictive)`],
                ['Localisation', `${FARM.location} (fictive)`],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-2 border-b border-brown/10 pb-2 last:border-0">
                  <dt className="text-brown-soft">{k}</dt>
                  <dd className="font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-[24px] bg-white p-5 ring-2 ring-forest/20">
            <CardHeading icon={<Wheat className="size-4" />}>Pratique documentée : l’alimentation</CardHeading>
            <p className="mt-3 text-[15px]">{EGGS_PLEIN_AIR.feeding.text}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {EGGS_PLEIN_AIR.feeding.points.map((p) => (
                <li key={p} className="rounded-full bg-mint px-3 py-1 text-sm font-semibold text-deep">
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-3">
              <SourceLink href={EGGS_PLEIN_AIR.feeding.source} />
            </p>
          </div>
        </div>

        <div className="rounded-[24px] bg-white p-5 ring-2 ring-forest/20">
          <CardHeading icon={<BadgeCheck className="size-4" />}>Engagements applicables · œufs Plein Air</CardHeading>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {EGGS_PLEIN_AIR.commitments.map((c) => {
              const Icon = commitmentIcons[c.icon]
              return (
                <li key={c.id} className="rounded-2xl bg-cream p-4">
                  <span className="grid size-10 place-items-center rounded-full bg-forest text-white">
                    <Icon className="size-5" />
                  </span>
                  <p className="mt-2 font-bold leading-tight">{c.title}</p>
                  <p className="mt-1 text-sm text-brown-soft">{c.text}</p>
                </li>
              )
            })}
          </ul>
          <p className="mt-3 text-xs text-brown-soft">
            Engagements publiés par LNA pour la filière œufs Plein Air (ils ne s’appliquent pas à l’identique aux autres filières).{' '}
            <SourceLink href={URLS.oeufsPleinAir} label="Œufs Plein Air" /> · <SourceLink href={URLS.demarche} label="Démarche et contrôles" />
          </p>
        </div>
      </div>
    </section>
  )
}

function KeepInTouchSection() {
  const { setFollowedFarm } = useAppState()
  return (
    <section className="mt-10 rounded-[32px] bg-mint p-4 sm:p-7" aria-labelledby="keep-section">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <ContentTag kind="proposal" label="Notre proposition · espace fidélité" />
          <h2 id="keep-section" className="script-title mt-2 text-[1.9rem] text-forest">
            Garder le lien
          </h2>
          <p className="mt-1 max-w-xl text-[16px]">
            Ce que notre programme ajoute : la traçabilité ponctuelle devient une relation suivie avec la ferme.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-forest px-3 py-1.5 text-sm font-semibold text-white">
          <Check className="size-4" /> Vous suivez cette ferme
        </span>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-[1.4fr_1fr] md:gap-6">
        <div className="grid content-start gap-4">
          <TodayCard />
          <NewsList />
        </div>
        <div className="grid content-start gap-4">
          <ProgressMini />
          <ExperienceMini />
          <MemberVideoCard />
        </div>
      </div>

      <FlockFollow />

      <p className="mt-5 text-center">
        <button onClick={() => setFollowedFarm(false)} className="min-h-11 text-sm text-brown-soft underline underline-offset-4 hover:text-forest">
          Ne plus suivre cette ferme
        </button>
      </p>
    </section>
  )
}

function TodayCard() {
  return (
    <div className="card">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <CardHeading icon={<Sun className="size-4" />}>Aujourd’hui à la ferme</CardHeading>
        <ContentTag kind="demo" label="Exemple fictif" />
      </div>
      <p className="mt-3 text-[1.1rem] leading-snug">{FARM.today.text}</p>
      <p className="mt-2 text-sm text-brown-soft">{FARM.today.date}</p>
    </div>
  )
}

function NewsList() {
  const { isUnlocked } = useAppState()
  return (
    <div className="card">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <CardHeading icon={<Newspaper className="size-4" />}>Nouvelles de la ferme</CardHeading>
        <ContentTag kind="demo" label="Actualités fictives" />
      </div>
      <ul className="mt-2 divide-y divide-brown/10">
        {NEWS.map((n) => {
          const locked = n.membersOnly && !isUnlocked
          return (
            <li key={n.id}>
              <Link to={`/ferme/actualites/${n.id}`} className="group flex items-center gap-4 py-3.5">
                <ImageSlot scene={n.scene} photo={n.photo} alt="" className="size-16 shrink-0 rounded-2xl sm:size-20" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-brown-soft">{n.date}</p>
                  <p className="font-bold leading-snug group-hover:text-forest">{n.title}</p>
                  {(n.video || locked) && (
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {n.video && (
                        <Badge tone="mint">
                          <Play className="size-3" /> Vidéo
                        </Badge>
                      )}
                      {locked && (
                        <Badge tone="cream">
                          <Lock className="size-3" /> 5 achats
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
                <ChevronRight className="size-5 shrink-0 text-forest" />
              </Link>
            </li>
          )
        })}
      </ul>
      <p className="mt-2 flex items-start gap-2 text-sm text-brown-soft">
        <Users className="mt-0.5 size-4 shrink-0" />
        Dans notre proposition, une même nouvelle est partagée avec tous les membres qui suivent la ferme : l’agriculteur n’écrit pas à chacun.
      </p>
    </div>
  )
}

function ProgressMini() {
  const { purchases, nextMilestone } = useAppState()
  return (
    <div className="card">
      <CardHeading icon={<Sprout className="size-4" />}>Ma progression</CardHeading>
      <p className="mt-2 text-lg font-bold">
        {purchases} achat{purchases > 1 ? 's' : ''} validé{purchases > 1 ? 's' : ''}
      </p>
      {nextMilestone && nextMilestone.purchases <= 6 && (
        <div className="mt-2">
          <ProgressBar value={purchases} max={nextMilestone.purchases} label={`${purchases} achats sur ${nextMilestone.purchases}`} />
        </div>
      )}
      {nextMilestone && (
        <p className="mt-2 text-[15px] text-brown-soft">
          Prochaine étape : {nextMilestone.label.toLowerCase()} ({nextMilestone.purchases} achats).
        </p>
      )}
      <ButtonLink to="/achat" variant="outline" full className="mt-3">
        Valider un achat
      </ButtonLink>
    </div>
  )
}

function ExperienceMini() {
  const { isUnlocked, purchases } = useAppState()
  return (
    <div className={`card ${isUnlocked ? 'ring-2 ring-lime' : ''}`}>
      <CardHeading icon={<CalendarDays className="size-4" />}>Expérience</CardHeading>
      <p className="mt-2 text-lg font-bold leading-tight">Visite de ferme en famille</p>
      <p className="text-[15px] text-brown-soft">
        {VISIT.date} · {VISIT.seats} familles
      </p>
      {isUnlocked ? (
        <ButtonLink to="/experiences/visite" full className="mt-3">
          Découvrir la visite
        </ButtonLink>
      ) : (
        <>
          <p className="mt-2 font-semibold text-terracotta">Débloquée à 5 achats (vous en êtes à {purchases}).</p>
          <ButtonLink to="/experiences/visite" variant="ghost" className="mt-1 -ml-3">
            Voir le programme <ChevronRight className="size-4" />
          </ButtonLink>
        </>
      )}
    </div>
  )
}

function MemberVideoCard() {
  const { isUnlocked, purchases } = useAppState()
  const [open, setOpen] = useState(false)
  return (
    <div className="card">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <CardHeading icon={<Play className="size-4" />}>Contenu membres</CardHeading>
        <ContentTag kind="demo" label="Exemple" />
      </div>
      <button
        onClick={() => isUnlocked && setOpen(true)}
        disabled={!isUnlocked}
        className="relative mt-3 block w-full overflow-hidden rounded-3xl text-left disabled:cursor-not-allowed"
        aria-label={isUnlocked ? 'Lire la vidéo' : 'Vidéo verrouillée'}
      >
        <ImageSlot photo={PHOTOS.henGrass} alt="" className={`aspect-video ${isUnlocked ? '' : 'opacity-60'}`} />
        <span className="absolute inset-0 grid place-items-center">
          <span className={`grid size-14 place-items-center rounded-full shadow-lg ${isUnlocked ? 'bg-lime text-deep' : 'bg-white text-brown-soft'}`}>
            {isUnlocked ? <Play className="ml-1 size-6" fill="currentColor" /> : <Lock className="size-5" />}
          </span>
        </span>
      </button>
      <p className="mt-3 font-bold">Une matinée à la ferme : l’ouverture des trappes</p>
      <p className="mt-1 text-[15px] text-brown-soft">
        {isUnlocked ? 'Courte vidéo réservée aux membres.' : `Débloquée à 5 achats (vous en êtes à ${purchases}).`}
      </p>

      <Modal open={open} onClose={() => setOpen(false)} labelledBy="video-modal-title">
        <h2 id="video-modal-title" className="pr-10 text-xl font-bold">
          Une matinée à la ferme
        </h2>
        <div className="relative mt-4 overflow-hidden rounded-3xl">
          <ImageSlot photo={PHOTOS.henGrass} alt="" className="aspect-video" />
          <span className="absolute inset-0 grid place-items-center bg-brown/30 text-center text-sm font-semibold text-white">
            Emplacement de la vidéo
            <br />
            (prototype)
          </span>
        </div>
        <p className="mt-4 text-[15px] text-brown-soft">
          Exemple de format court envisagé pour les membres. Les contenus réels seraient produits avec les agriculteurs qui le souhaitent.
        </p>
      </Modal>
    </div>
  )
}

function FlockFollow() {
  return (
    <div className="mt-4 rounded-[24px] bg-white p-5 ring-1 ring-brown/8 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="kicker text-brown-soft">Option œufs</p>
          <h3 className="script-title text-[1.7rem] text-forest">Suivre l’élevage</h3>
        </div>
        <ContentTag kind="proposal" />
      </div>
      <ImageSlot photo={PHOTOS.outdoorFlock} showCredit className="mt-4 aspect-[16/9] rounded-[20px] md:aspect-[21/8]" />
      <div className="mt-4 grid gap-5 md:grid-cols-2">
        <div>
          <p className="text-brown-soft">Vous suivez :</p>
          <p className="text-[1.3rem] font-bold leading-tight">{FLOCK_FOLLOW.group}</p>
          <p className="mt-1 text-sm text-brown-soft">Dans le suivi depuis le {FLOCK_FOLLOW.since}</p>
          <p className="mt-4 rounded-2xl bg-cream p-4 text-[15px]">
            Le parrainage permet de suivre la vie d’un élevage et de mieux comprendre le quotidien de la ferme. Il ne correspond pas à la propriété
            individuelle d’un animal. Plusieurs membres suivent le même groupe.
          </p>
        </div>
        <div>
          <CardHeading>Nouvelles du groupe (fictives)</CardHeading>
          <ol className="mt-3 grid gap-3 border-l-2 border-lime pl-4">
            {FLOCK_FOLLOW.updates.map((u) => (
              <li key={u.date} className="relative">
                <span className="absolute -left-[23px] top-1.5 size-3 rounded-full bg-forest ring-4 ring-white" />
                <p className="text-sm font-semibold text-olive">{u.date}</p>
                <p className="text-[16px]">{u.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
