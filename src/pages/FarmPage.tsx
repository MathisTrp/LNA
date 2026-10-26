import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Egg, Heart, Info, Leaf, Lock, MapPin, Play, QrCode, Sun, Users, Wheat } from 'lucide-react'
import { useAppState } from '../state/AppState'
import { FARM, NEWS, SPONSORSHIP } from '../data/mock'
import { Badge, CardHeading, ImageSlot, Modal, SectionTitle } from '../components/ui'

const commitmentIcons = { heart: Heart, wheat: Wheat, qr: QrCode, leaf: Leaf }

export function FarmPage() {
  return (
    <div className="animate-fade-up">
      <FarmHero />

      <div className="mt-6 grid gap-4 md:grid-cols-[1.4fr_1fr] md:gap-6">
        <div className="grid content-start gap-4 md:gap-6">
          <TodayCard />
          <NewsList />
        </div>
        <div className="grid content-start gap-4 md:gap-6">
          <MemberVideoCard />
          <AboutCard />
          <FeedingCard />
        </div>
      </div>

      <Commitments />
      <HenSponsorship />
    </div>
  )
}

function FarmHero() {
  return (
    <section className="overflow-hidden rounded-[32px] bg-forest text-white">
      <div className="grid md:grid-cols-2">
        <ImageSlot scene="landscape" alt={`La ${FARM.name}`} className="aspect-[16/9] md:aspect-auto md:min-h-80" />
        <div className="p-5 sm:p-7">
          <p className="kicker text-white/80">Ma ferme</p>
          <h1 className="script-title mt-1 text-[2.3rem] text-lime sm:text-[2.7rem]">{FARM.name}</h1>
          <dl className="mt-3 grid gap-1.5 text-[16px]">
            <div className="flex gap-2">
              <dt className="text-white/75">Agricultrice :</dt>
              <dd className="font-semibold">{FARM.farmer}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-white/75">Production :</dt>
              <dd className="font-semibold">{FARM.production}</dd>
            </div>
            <div className="flex items-center gap-1.5">
              <dt className="sr-only">Localisation</dt>
              <MapPin className="size-4 text-lime" />
              <dd>{FARM.location}</dd>
            </div>
          </dl>
          <ul className="mt-4 flex flex-wrap gap-2 text-sm">
            {[`Avec LNA depuis ${FARM.since}`, FARM.hens, FARM.outdoorArea].map((t) => (
              <li key={t} className="rounded-full bg-white/12 px-3 py-1">
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-5 font-hand text-[1.3rem] leading-snug text-mint">{FARM.quote}</p>
        </div>
      </div>
    </section>
  )
}

function TodayCard() {
  return (
    <section className="rounded-[28px] bg-mint p-5 sm:p-6" aria-labelledby="today-title">
      <div className="flex items-center justify-between gap-2">
        <CardHeading icon={<Sun className="size-4" />}>
          <span id="today-title">Aujourd’hui à la ferme</span>
        </CardHeading>
        <span className="text-sm text-brown-soft">{FARM.today.date}</span>
      </div>
      <p className="mt-3 text-[1.15rem] leading-snug">{FARM.today.text}</p>
      <p className="mt-3 font-hand text-lg text-forest">— {FARM.farmerFirstName}</p>
    </section>
  )
}

function NewsList() {
  const { isUnlocked } = useAppState()
  return (
    <section className="card" aria-labelledby="news-list-title">
      <SectionTitle kicker="Dernières" title="nouvelles" />
      <p id="news-list-title" className="sr-only">Dernières nouvelles de la ferme</p>
      <ul className="mt-4 divide-y divide-brown/10">
        {NEWS.map((n) => {
          const locked = n.membersOnly && !isUnlocked
          return (
            <li key={n.id}>
              <Link to={`/ferme/actualites/${n.id}`} className="group flex items-center gap-4 py-4">
                <ImageSlot scene={n.scene} src={n.image} alt="" className="size-20 shrink-0 rounded-2xl" />
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
                          <Lock className="size-3" /> Membres 5 achats
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
        Ces nouvelles sont partagées avec les 1 240 membres qui suivent la {FARM.name}. {FARM.farmerFirstName} publie environ une fois par semaine.
      </p>
    </section>
  )
}

function MemberVideoCard() {
  const { isUnlocked, purchases } = useAppState()
  const [open, setOpen] = useState(false)
  return (
    <section className="card" aria-labelledby="video-title">
      <CardHeading icon={<Play className="size-4" />}>Vidéo réservée aux membres</CardHeading>
      <button
        onClick={() => isUnlocked && setOpen(true)}
        disabled={!isUnlocked}
        className="relative mt-3 block w-full overflow-hidden rounded-3xl text-left disabled:cursor-not-allowed"
        aria-label={isUnlocked ? 'Lire la vidéo' : 'Vidéo verrouillée'}
      >
        <ImageSlot scene="hens" alt="" className={`aspect-video ${isUnlocked ? '' : 'opacity-60 grayscale-[40%]'}`} />
        <span className="absolute inset-0 grid place-items-center">
          <span className={`grid size-16 place-items-center rounded-full shadow-lg ${isUnlocked ? 'bg-lime text-deep' : 'bg-white text-brown-soft'}`}>
            {isUnlocked ? <Play className="ml-1 size-7" fill="currentColor" /> : <Lock className="size-6" />}
          </span>
        </span>
        <span className="absolute bottom-2 right-2 rounded-full bg-brown/80 px-2.5 py-0.5 text-xs font-semibold text-white">1 min 40</span>
      </button>
      <h2 id="video-title" className="mt-3 font-bold">Une matinée avec {FARM.farmerFirstName} : l’ouverture des trappes</h2>
      <p className="mt-1 text-[15px] text-brown-soft">
        {isUnlocked ? 'Filmée par Sophie avec son téléphone, sans mise en scène.' : `Débloquée à 5 achats (vous en êtes à ${purchases}).`}
      </p>

      <Modal open={open} onClose={() => setOpen(false)} labelledBy="video-modal-title">
        <h2 id="video-modal-title" className="pr-10 text-xl font-bold">
          Une matinée avec {FARM.farmerFirstName}
        </h2>
        <div className="relative mt-4 overflow-hidden rounded-3xl">
          <ImageSlot scene="hens" alt="" className="aspect-video" />
          <span className="absolute inset-0 grid place-items-center bg-brown/30 text-center text-sm font-semibold text-white">
            Emplacement de la vidéo
            <br />
            (prototype)
          </span>
        </div>
        <p className="mt-4 font-hand text-lg leading-snug text-forest">
          « Il est 8 h 30, la rosée est tombée, on peut ouvrir. Regardez, ce sont toujours les mêmes qui sortent en premier… »
        </p>
      </Modal>
    </section>
  )
}

function AboutCard() {
  return (
    <section className="card" aria-labelledby="about-title">
      <CardHeading icon={<Info className="size-4" />}>
        <span id="about-title">À propos</span>
      </CardHeading>
      <div className="mt-3 flex items-center gap-3">
        <ImageSlot scene="farmer" alt={FARM.farmer} className="size-16 shrink-0 rounded-full" />
        <div>
          <p className="font-bold">{FARM.farmer}</p>
          <p className="text-sm text-brown-soft">Éleveuse, adhérente de la coopérative</p>
        </div>
      </div>
      {FARM.about.map((p) => (
        <p key={p.slice(0, 20)} className="mt-3 text-[16px]">
          {p}
        </p>
      ))}
    </section>
  )
}

function FeedingCard() {
  return (
    <section className="card overflow-hidden p-0 sm:p-0" aria-labelledby="feed-title">
      <ImageSlot scene="feed" alt="Champ de céréales" className="aspect-[16/6]" />
      <div className="p-5 sm:p-6">
        <h2 id="feed-title" className="text-lg font-bold">{FARM.feeding.title}</h2>
        <p className="mt-2 text-[16px]">{FARM.feeding.text}</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {FARM.feeding.points.map((p) => (
            <li key={p} className="rounded-full bg-mint px-3 py-1 text-sm font-semibold text-deep">
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Commitments() {
  return (
    <section className="mt-10" aria-labelledby="commit-title">
      <SectionTitle kicker="Nos" title={<span id="commit-title">engagements</span>} />
      <ul className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {FARM.commitments.map((c) => {
          const Icon = commitmentIcons[c.icon]
          return (
            <li key={c.title} className="rounded-[24px] bg-white p-4 ring-1 ring-brown/8 sm:p-5">
              <span className="grid size-11 place-items-center rounded-full bg-lime text-deep">
                <Icon className="size-5" />
              </span>
              <p className="mt-3 font-bold leading-tight">{c.title}</p>
              <p className="mt-1 text-sm text-brown-soft sm:text-[15px]">{c.text}</p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function HenSponsorship() {
  return (
    <section className="mt-10 rounded-[28px] bg-white p-5 ring-1 ring-brown/8 sm:p-7" aria-labelledby="hen-title">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <SectionTitle kicker="Parrainage" title={<span id="hen-title">Ma poule</span>} />
        <Badge tone="mint">
          <Egg className="size-3" /> Option catégorie œufs
        </Badge>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div>
          <p className="text-brown-soft">Vous suivez actuellement :</p>
          <p className="text-[1.6rem] font-bold">Poule n°{SPONSORSHIP.henNumber}</p>
          <dl className="mt-3 grid gap-2 text-[15px]">
            {[
              ['Élevage', `${FARM.name} · ${SPONSORSHIP.building}`],
              ['Groupe', SPONSORSHIP.group],
              ['Dans le suivi depuis', SPONSORSHIP.since],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[9.5rem_1fr] gap-2 border-b border-brown/10 pb-2">
                <dt className="text-brown-soft">{k}</dt>
                <dd className="font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 rounded-2xl bg-cream p-4 text-[15px]">
            Votre parrainage vous permet de suivre la vie de l’élevage auquel appartient cette poule. Plusieurs membres LNA peuvent suivre le même
            groupe d’animaux. La poule reste à la ferme et fait partie du troupeau de {FARM.farmerFirstName}.
          </p>
          <p className="mt-3 text-sm text-brown-soft">
            Un groupe de poules pondeuses reste en production un peu plus d’un an. À la fin du cycle, nous vous l’expliquons, puis votre suivi se
            poursuit avec le groupe suivant.
          </p>
        </div>

        <div>
          <CardHeading>Nouvelles du groupe</CardHeading>
          <ol className="mt-3 grid gap-3 border-l-2 border-lime pl-4">
            {SPONSORSHIP.updates.map((u) => (
              <li key={u.date} className="relative">
                <span className="absolute -left-[23px] top-1.5 size-3 rounded-full bg-forest ring-4 ring-white" />
                <p className="text-sm font-semibold text-olive">{u.date}</p>
                <p className="text-[16px]">{u.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
