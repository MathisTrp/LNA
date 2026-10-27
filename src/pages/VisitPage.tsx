import { CalendarDays, Check, Clock, Lock, MapPin, Users } from 'lucide-react'
import { useAppState } from '../state/AppState'
import { VISIT } from '../data/demo'
import { PHOTOS } from '../data/images'
import { BackButton, Badge, Button, ButtonLink, ContentTag, ImageSlot, SectionTitle } from '../components/ui'

export function VisitPage() {
  const { isUnlocked, purchases, visitStatus, setVisit } = useAppState()
  const remaining = Math.max(0, 5 - purchases)

  return (
    <div className="mx-auto max-w-3xl animate-fade-up">
      <BackButton />
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <p className="kicker">Expériences</p>
        <ContentTag kind="proposal" label="Expérience proposée · date fictive" />
      </div>

      <div className="mt-2 overflow-hidden rounded-[32px] bg-white ring-1 ring-brown/8">
        <ImageSlot photo={PHOTOS.amelieFamily} priority showCredit className="aspect-[16/9] sm:aspect-[16/8]" imgClassName="object-[50%_60%]" />
        <div className="p-5 sm:p-7">
          <p className="mb-4 rounded-2xl bg-cream px-4 py-2.5 text-sm text-brown-soft">
            Photo d’illustration : Amélie, agricultrice LNA, avec sa famille dans son élevage. La visite décrite ci-dessous est une proposition de
            notre programme, à la Ferme de la Vallée (fictive).
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge tone="brown">
              <Users className="size-3" /> Places limitées : {VISIT.seats} familles
            </Badge>
            {isUnlocked ? <Badge tone="lime">Débloquée</Badge> : <Badge tone="cream"><Lock className="size-3" /> 5 achats</Badge>}
          </div>
          <h1 className="mt-3 text-[1.75rem] font-bold leading-tight sm:text-[2rem]">{VISIT.title}</h1>

          <ul className="mt-4 grid gap-2 text-[16px] sm:grid-cols-3">
            <li className="flex items-center gap-2">
              <CalendarDays className="size-5 text-forest" /> {VISIT.date}
            </li>
            <li className="flex items-center gap-2">
              <Clock className="size-5 text-forest" /> {VISIT.time} · {VISIT.duration}
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-5 text-forest" /> {VISIT.place}
            </li>
          </ul>

          <SectionTitle kicker="Le" title="programme" className="mt-7" />
          <ol className="mt-3 grid gap-3 sm:grid-cols-2">
            {VISIT.program.map((p, i) => (
              <li key={p.title} className="flex gap-3 rounded-[20px] bg-cream p-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-forest text-sm font-bold text-white">{i + 1}</span>
                <span>
                  <span className="block font-bold">{p.title}</span>
                  <span className="text-[15px] text-brown-soft">{p.text}</span>
                </span>
              </li>
            ))}
          </ol>

          <p className="mt-5 text-[15px] text-brown-soft">
            Gratuit. Tirage au sort parmi les membres inscrits, résultat le {VISIT.drawDate}. Les conditions de visite seraient définies avec
            l’éleveur volontaire, dans le respect des règles sanitaires de l’élevage.
          </p>

          <div className="mt-6">
            {!isUnlocked && (
              <>
                <p className="mb-3 font-semibold text-terracotta">
                  Encore {remaining} achat{remaining > 1 ? 's' : ''} pour participer au tirage au sort.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button disabled className="sm:flex-1">
                    <Lock className="size-4" /> Bientôt disponible
                  </Button>
                  <ButtonLink to="/achat" variant="outline" className="sm:flex-1">
                    Valider un achat
                  </ButtonLink>
                </div>
              </>
            )}
            {isUnlocked && visitStatus === 'none' && (
              <Button full onClick={() => setVisit('entered')}>
                Participer au tirage au sort
              </Button>
            )}
            {visitStatus === 'entered' && (
              <div className="rounded-[24px] bg-mint p-5" aria-live="polite">
                <p className="flex items-center gap-2 text-lg font-bold text-forest">
                  <Check className="size-5" /> Vous participez au tirage au sort
                </p>
                <p className="mt-1 text-[15px]">Nous vous écrirons le {VISIT.drawDate}. Si vous n’êtes pas tiré au sort, vous serez prioritaire pour la prochaine visite.</p>
              </div>
            )}
            {visitStatus === 'done' && (
              <div className="rounded-[24px] bg-mint p-5">
                <p className="text-lg font-bold text-forest">Merci d’être venus à la ferme !</p>
                <p className="mt-1 text-[15px]">Deux minutes pour nous dire comment ça s’est passé ?</p>
                <ButtonLink to="/avis/visite" full className="mt-4">
                  Donner mon avis
                </ButtonLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
