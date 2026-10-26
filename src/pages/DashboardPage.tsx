import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BadgeCheck, CalendarDays, ChevronRight, Lock, MapPin, Newspaper, Plus, ScanBarcode, Tag, Tractor, Users } from 'lucide-react'
import { useAppState } from '../state/AppState'
import { FARM, NEWS, REWARDS, VISIT } from '../data/demo'
import { CATEGORIES, EGGS_PLEIN_AIR } from '../data/lna'
import { Badge, Button, ButtonLink, CardHeading, ContentTag, ImageSlot, Modal, ProgressBar, SourceLink } from '../components/ui'

type Category = (typeof CATEGORIES)[number]

export function DashboardPage() {
  const { user } = useAppState()
  return (
    <div className="animate-fade-up">
      <h1 className="script-title text-[2.3rem] text-forest sm:text-[2.6rem]">Bonjour {user.firstName}</h1>
      <p className="text-brown-soft">Voici où vous en êtes, et le lien avec la ferme de vos produits.</p>

      <div className="mt-5 grid gap-4 md:grid-cols-2 md:gap-6">
        <div className="grid content-start gap-4 md:gap-6">
          <ProgressCard />
          <FarmCard />
        </div>
        <div className="grid content-start gap-4 md:gap-6">
          <ExperienceCard />
          <LatestNewsCard />
          <AdvantageCard />
        </div>
      </div>

      <DiscoverCategories />
    </div>
  )
}

function ProgressCard() {
  const { purchases, nextMilestone } = useAppState()
  const max = nextMilestone?.purchases ?? purchases
  const remaining = max - purchases

  return (
    <section className="rounded-[28px] bg-forest p-5 text-white sm:p-6" aria-labelledby="progress-title">
      <p className="kicker text-white/80">Ma progression</p>
      <h2 id="progress-title" className="mt-1 text-[1.7rem] font-bold leading-tight">
        <span className="text-lime">{purchases}</span> achat{purchases > 1 ? 's' : ''} LNA validé{purchases > 1 ? 's' : ''}
      </h2>

      {nextMilestone ? (
        <>
          <div className="mt-4 rounded-3xl bg-white p-4 text-brown">
            <div className="mb-2 flex justify-between text-sm font-semibold">
              <span>{nextMilestone.label}</span>
              <span>
                {purchases} / {max}
              </span>
            </div>
            {max <= 6 ? (
              <ProgressBar value={purchases} max={max} label={`${purchases} achats sur ${max}`} />
            ) : (
              <div className="h-4 overflow-hidden rounded-full bg-mint" role="progressbar" aria-valuenow={purchases} aria-valuemax={max} aria-label={`${purchases} achats sur ${max}`}>
                <div className="h-full rounded-full bg-forest transition-[width] duration-700" style={{ width: `${(purchases / max) * 100}%` }} />
              </div>
            )}
          </div>
          <p className="mt-3 text-[16px] text-white/90">
            Encore <strong className="text-lime">{remaining} achat{remaining > 1 ? 's' : ''}</strong> pour débloquer {nextMilestone.short}.
          </p>
        </>
      ) : (
        <p className="mt-3 text-white/90">Toutes les expériences de la saison sont débloquées. Merci pour votre fidélité !</p>
      )}

      <ButtonLink to="/achat" full className="mt-4">
        <Plus className="size-5" />
        Valider un achat
      </ButtonLink>
    </section>
  )
}

function AdvantageCard() {
  const { rewardStatus } = useAppState()
  const immediate = REWARDS.filter((r) => r.kind === 'immediate')
  const available = immediate.filter((r) => rewardStatus(r) === 'unlocked')
  const next = immediate.find((r) => rewardStatus(r) === 'progress')

  return (
    <section className="card" aria-labelledby="advantage-title">
      <CardHeading icon={<Tag className="size-4" />}>Mon avantage</CardHeading>
      {available.length > 0 ? (
        <>
          <p id="advantage-title" className="mt-2 text-[1.4rem] font-bold leading-tight">
            {available[0].title} <span className="font-medium text-brown-soft">disponible</span>
          </p>
          {available.length > 1 && <p className="mt-1 text-[15px] text-brown-soft">+ {available.length - 1} autre avantage disponible</p>}
          <ButtonLink to="/avantage" variant="outline" full className="mt-4">
            Voir mon avantage
          </ButtonLink>
        </>
      ) : (
        <>
          <p id="advantage-title" className="mt-2 text-lg font-semibold">Pas d’avantage en attente</p>
          {next && (
            <p className="mt-1 text-[15px] text-brown-soft">
              Prochain : {next.title.toLowerCase()} à {next.threshold} achats.
            </p>
          )}
          <ButtonLink to="/recompenses" variant="ghost" className="mt-2 -ml-3">
            Voir mes récompenses <ChevronRight className="size-4" />
          </ButtonLink>
        </>
      )}
    </section>
  )
}

function FarmCard() {
  const { followedFarm } = useAppState()

  if (!followedFarm) {
    return (
      <section className="card border-2 border-dashed border-forest/30 ring-0" aria-labelledby="farm-title">
        <CardHeading icon={<Tractor className="size-4" />}>Ma ferme</CardHeading>
        <h2 id="farm-title" className="mt-2 text-[1.35rem] font-bold leading-tight">Qui a produit vos œufs ?</h2>
        <p className="mt-2 text-[16px]">
          La traçabilité LNA vous permet de retrouver votre agriculteur. <strong>Votre espace LNA vous permet de garder le lien.</strong>
        </p>
        <ButtonLink to="/tracabilite" variant="dark" full className="mt-4">
          <ScanBarcode className="size-5" /> Retrouver mon agriculteur
        </ButtonLink>
      </section>
    )
  }

  return (
    <section className="card overflow-hidden p-0 sm:p-0" aria-labelledby="farm-title">
      <ImageSlot scene="farmer" alt={`Illustration : ${FARM.farmer} dans sa ferme`} className="aspect-[16/8]" />
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardHeading icon={<Tractor className="size-4" />}>Ma ferme</CardHeading>
          <ContentTag kind="demo" label="Profil fictif" />
        </div>
        <h2 id="farm-title" className="mt-2 text-[1.4rem] font-bold leading-tight">{FARM.name}</h2>
        <p className="mt-1 text-[15px]">
          <strong>{FARM.farmer}</strong> · {EGGS_PLEIN_AIR.production}
        </p>
        <p className="flex items-center gap-1.5 text-[15px] text-brown-soft">
          <MapPin className="size-4 text-olive" /> {FARM.location}
        </p>
        <p className="mt-3 flex items-start gap-2 text-[15px]">
          <BadgeCheck className="mt-0.5 size-4 shrink-0 text-forest" />
          Retrouvée grâce à la traçabilité LNA, ajoutée à votre espace pour garder le lien.
        </p>
        <ButtonLink to="/ferme" variant="dark" full className="mt-4">
          Voir les nouvelles de ma ferme
        </ButtonLink>
      </div>
    </section>
  )
}

function LatestNewsCard() {
  const { followedFarm } = useAppState()
  const news = NEWS[0]
  if (!followedFarm) return null
  return (
    <section className="card" aria-labelledby="news-title">
      <div className="flex items-center justify-between">
        <CardHeading icon={<Newspaper className="size-4" />}>Dernière actualité</CardHeading>
        <ContentTag kind="demo" label="Fictive" />
      </div>
      <div className="mt-3 flex gap-4">
        <ImageSlot scene={news.scene} src={news.image} alt="" className="size-24 shrink-0 rounded-2xl sm:size-28" />
        <div className="min-w-0">
          <p className="text-sm text-brown-soft">{news.date}</p>
          <h2 id="news-title" className="mt-0.5 font-bold leading-snug">{news.title}</h2>
          <p className="mt-1 line-clamp-2 text-[15px] text-brown-soft">{news.excerpt}</p>
        </div>
      </div>
      <ButtonLink to={`/ferme/actualites/${news.id}`} variant="ghost" className="mt-2 -ml-3">
        Lire la suite <ChevronRight className="size-4" />
      </ButtonLink>
    </section>
  )
}

function ExperienceCard() {
  const { purchases, isUnlocked, visitStatus } = useAppState()
  const remaining = Math.max(0, 5 - purchases)

  return (
    <section className={`card ${isUnlocked ? 'ring-2 ring-lime' : ''}`} aria-labelledby="exp-title">
      <div className="flex items-center justify-between gap-2">
        <CardHeading icon={<CalendarDays className="size-4" />}>{isUnlocked ? 'Expérience débloquée' : 'Expérience à débloquer'}</CardHeading>
        {isUnlocked ? <Badge tone="lime">Débloquée</Badge> : <Badge tone="cream"><Lock className="size-3" /> {purchases}/5</Badge>}
      </div>
      <h2 id="exp-title" className="mt-2 text-[1.4rem] font-bold leading-tight">Visite de ferme en famille</h2>
      <p className="mt-1 flex items-center gap-1.5 text-[15px] text-brown-soft">
        <Users className="size-4" /> {VISIT.date} · {VISIT.seats} familles
      </p>

      {!isUnlocked && (
        <>
          <p className="mt-3 font-semibold text-terracotta">
            Encore {remaining} achat{remaining > 1 ? 's' : ''} nécessaire{remaining > 1 ? 's' : ''}
          </p>
          <Button full disabled className="mt-3">
            <Lock className="size-4" /> Bientôt disponible
          </Button>
        </>
      )}
      {isUnlocked && visitStatus === 'none' && (
        <ButtonLink to="/experiences/visite" full className="mt-4">
          Participer au tirage au sort
        </ButtonLink>
      )}
      {visitStatus === 'entered' && (
        <>
          <p className="mt-3 font-semibold text-forest">Vous participez au tirage. Résultat le {VISIT.drawDate}.</p>
          <ButtonLink to="/experiences/visite" variant="outline" full className="mt-3">
            Voir le programme
          </ButtonLink>
        </>
      )}
      {visitStatus === 'done' && (
        <>
          <p className="mt-3 font-semibold text-forest">Visite terminée. Merci d’être venus !</p>
          <ButtonLink to="/avis/visite" variant="outline" full className="mt-3">
            Donner mon avis
          </ButtonLink>
        </>
      )}
    </section>
  )
}

function DiscoverCategories() {
  const [selected, setSelected] = useState<Category | null>(null)
  const navigate = useNavigate()

  return (
    <section className="mt-10" aria-labelledby="discover-title">
      <p className="kicker">Découvrez aussi</p>
      <h2 id="discover-title" className="script-title text-[1.9rem] text-forest">La Nouvelle Agriculture</h2>
      <p className="mt-1 text-[16px] text-brown-soft">
        Vous connaissez déjà nos œufs. Découvrez maintenant les éleveurs derrière notre volaille et notre viande.
      </p>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {CATEGORIES.map((cat) => {
          const known = cat.id === 'oeufs'
          return (
            <button
              key={cat.id}
              onClick={() => (known ? navigate('/ferme') : setSelected(cat))}
              className="group overflow-hidden rounded-3xl bg-white text-left ring-1 ring-brown/8 transition hover:-translate-y-0.5 hover:ring-forest/40"
              aria-label={known ? `${cat.label} : voir ma ferme` : `Découvrir la filière : ${cat.label}`}
            >
              <ImageSlot scene={cat.scene} alt="" className="aspect-[4/3] md:aspect-[16/7]" />
              <div className="p-3">
                <p className="font-bold">{cat.label}</p>
                <p className="text-xs text-brown-soft sm:text-sm">{known ? 'Votre ferme' : 'Découvrir la filière'}</p>
              </div>
            </button>
          )
        })}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} labelledBy="cat-title">
        {selected && (
          <>
            <ImageSlot scene={selected.scene} alt="" className="-mx-6 -mt-6 mb-5 aspect-[16/9] rounded-t-[32px]" />
            <ContentTag kind="lna" />
            <h2 id="cat-title" className="mt-2 text-2xl font-bold">
              {selected.label} La Nouvelle Agriculture®
            </h2>
            <ul className="mt-3 grid gap-2">
              {selected.facts.map((f) => (
                <li key={f.text} className="flex gap-2 text-[16px]">
                  <BadgeCheck className="mt-0.5 size-5 shrink-0 text-forest" />
                  <span>
                    {f.text} <span className="text-sm text-brown-soft">({f.scope})</span>
                  </span>
                </li>
              ))}
            </ul>
            {selected.farmer && (
              <p className="mt-4 rounded-2xl bg-white p-4 text-[15px] ring-1 ring-brown/10">
                Parmi les agriculteurs présentés sur le site LNA : <strong>{selected.farmer.name}</strong>, {selected.farmer.caption}.
              </p>
            )}
            <p className="mt-3">
              <SourceLink href={selected.facts[0]?.source ?? selected.farmer!.source} />
            </p>
            <div className="mt-5 rounded-2xl bg-mint p-4">
              <ContentTag kind="proposal" />
              <p className="mt-2 text-[15px]">
                Achetez un produit {selected.label.toLowerCase()} LNA, retrouvez son éleveur grâce à la traçabilité et suivez aussi sa ferme.
              </p>
            </div>
            <Link
              to="/recompenses"
              onClick={() => setSelected(null)}
              className="mt-4 inline-flex min-h-11 items-center gap-1 font-semibold text-forest underline underline-offset-4"
            >
              Voir les récompenses proposées <ChevronRight className="size-4" />
            </Link>
          </>
        )}
      </Modal>
    </section>
  )
}
