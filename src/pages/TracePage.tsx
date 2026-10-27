import { useEffect, useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowDown, BadgeCheck, Check, MapPin, ScanBarcode, Sprout } from 'lucide-react'
import { useAppState } from '../state/AppState'
import { DEMO_TRACE, FARM } from '../data/demo'
import { EGGS_PLEIN_AIR, TRACEABILITY } from '../data/lna'
import { URLS } from '../data/sources'
import { PHOTOS } from '../data/images'
import { BackButton, Button, ButtonLink, ContentTag, ImageSlot, SectionTitle, SourceLink } from '../components/ui'

type Step = 'form' | 'searching' | 'result' | 'followed'

const inputClass =
  'mt-1.5 block w-full rounded-2xl border-0 bg-white px-4 py-3.5 text-[17px] tracking-wide ring-1 ring-brown/15 focus:outline-none focus:ring-2 focus:ring-forest'

/**
 * Simulation de l'outil de traçabilité LNA (qui existe déjà),
 * prolongé par notre proposition : « Suivre cette ferme » dans l'espace fidélité.
 */
export function TracePage() {
  // La visite guidée peut ouvrir directement le résultat (state.traceStep = 'result')
  const location = useLocation()
  const [step, setStep] = useState<Step>((location.state as { traceStep?: Step } | null)?.traceStep ?? 'form')

  // Nouvelle navigation vers cette page (ex. saut d'étape dans la visite guidée) : on repart de l'étape demandée
  useEffect(() => {
    setStep((location.state as { traceStep?: Step } | null)?.traceStep ?? 'form')
  }, [location.key, location.state])
  const { followedFarm, setFollowedFarm, purchases, nextMilestone } = useAppState()
  const navigate = useNavigate()

  useEffect(() => {
    if (step !== 'searching') return
    const t = setTimeout(() => setStep('result'), 1200)
    return () => clearTimeout(t)
  }, [step])

  return (
    <div className="mx-auto max-w-2xl animate-fade-up">
      {step === 'form' && <TraceForm onSubmit={() => setStep('searching')} />}

      {step === 'searching' && (
        <div className="pt-16 text-center" aria-live="polite">
          <div className="relative mx-auto grid size-24 place-items-center rounded-3xl bg-white ring-1 ring-brown/10">
            <ScanBarcode className="size-12 text-forest" />
            <div className="absolute inset-x-3 h-0.5 bg-forest shadow-[0_0_12px_3px_rgba(48,102,24,0.4)] animate-scan" />
          </div>
          <p className="mt-6 text-lg font-semibold">Recherche de votre produit…</p>
        </div>
      )}

      {step === 'result' && (
        <>
          <BackButton label="Modifier la saisie" />
          <TraceResult />

          {/* Transition : de la traçabilité ponctuelle à la relation suivie */}
          <div className="my-5 flex flex-col items-center text-center">
            <ArrowDown className="size-6 text-olive" />
            <p className="mt-2 max-w-md text-lg font-semibold">Vous savez maintenant qui a produit vos œufs.</p>
            <p className="text-brown-soft">Avec votre espace LNA, gardez le lien avec sa ferme.</p>
          </div>

          <section className="rounded-[28px] bg-forest p-5 text-white sm:p-7" aria-labelledby="follow-title">
            <ContentTag kind="proposal" label="Notre proposition · espace fidélité" />
            <h2 id="follow-title" className="script-title mt-3 text-[2rem] text-lime">Gardez le lien</h2>
            <p className="mt-1 text-lg font-semibold">Souhaitez-vous suivre cette ferme dans votre espace LNA ?</p>
            <ul className="mt-4 grid gap-2 text-[16px] text-white/90">
              {[
                'Ses informations et ses engagements, toujours à portée de main',
                'Des nouvelles ponctuelles de la ferme',
                'Des expériences à débloquer au fil de vos achats, comme une visite',
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <Check className="mt-0.5 size-5 shrink-0 text-lime" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {followedFarm ? (
                <ButtonLink to="/ferme" full>
                  Vous suivez déjà cette ferme
                </ButtonLink>
              ) : (
                <Button
                  full
                  onClick={() => {
                    setFollowedFarm(true)
                    setStep('followed')
                  }}
                >
                  <Sprout className="size-5" /> Suivre cette ferme
                </Button>
              )}
              <button
                onClick={() => navigate('/accueil')}
                className="min-h-12 w-full rounded-full px-6 font-semibold text-white ring-1 ring-inset ring-white/40 hover:bg-white/10"
              >
                Pas maintenant
              </button>
            </div>
          </section>
        </>
      )}

      {step === 'followed' && (
        <div className="pt-6 text-center" aria-live="polite">
          <div className="mx-auto grid size-24 place-items-center rounded-full bg-lime text-deep animate-pop">
            <Sprout className="size-11" />
          </div>
          <h1 className="script-title mt-5 text-[2.3rem] text-forest">Ferme ajoutée !</h1>
          <p className="mt-1 text-lg">
            La <strong>{FARM.name}</strong> apparaît maintenant dans <strong>Ma ferme</strong>.
          </p>
          {nextMilestone && (
            <p className="mt-3 rounded-2xl bg-mint px-4 py-3 text-[16px]">
              Encore <strong>{nextMilestone.purchases - purchases} achat{nextMilestone.purchases - purchases > 1 ? 's' : ''}</strong> pour
              débloquer : {nextMilestone.label.toLowerCase()}.
            </p>
          )}
          <div className="mt-6 grid gap-3">
            <ButtonLink to="/ferme" full>
              Voir ma ferme
            </ButtonLink>
            <ButtonLink to="/accueil" variant="ghost" full>
              Retour à mon espace
            </ButtonLink>
          </div>
        </div>
      )}
    </div>
  )
}

function TraceForm({ onSubmit }: { onSubmit: () => void }) {
  const [barcode, setBarcode] = useState('')
  const [lot, setLot] = useState(DEMO_TRACE.lot)
  const [dcr, setDcr] = useState(DEMO_TRACE.dcr)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!barcode) setBarcode(DEMO_TRACE.barcode)
    onSubmit()
  }

  return (
    <>
      <BackButton />
      <div className="mt-2 flex flex-wrap gap-2">
        <ContentTag kind="lna" label="Traçabilité LNA · service existant" />
        <ContentTag kind="demo" label="Simulation" />
      </div>
      <div className="mt-3 grid items-center gap-4 sm:grid-cols-[1fr_auto]">
        <SectionTitle as="h1" kicker="Retrouvez l’agriculteur" title="derrière votre produit" />
        <figure className="hidden sm:block">
          <ImageSlot photo={PHOTOS.amelieEggs} priority className="h-44 w-32 rounded-2xl" />
          <figcaption className="mt-1 w-32 text-[11px] leading-tight text-brown-soft">Amélie, éleveuse LNA, et son fils · Photo LNA</figcaption>
        </figure>
      </div>
      <figure className="mt-4 sm:hidden">
        <ImageSlot photo={PHOTOS.amelieEggs} priority showCredit className="aspect-[4/3] rounded-[20px]" imgClassName="object-[50%_58%]" />
      </figure>

      <ol className="mt-4 grid gap-2 sm:grid-cols-3">
        {TRACEABILITY.steps.map((s, i) => (
          <li key={s} className="flex items-start gap-2 rounded-2xl bg-white p-3 text-[15px] ring-1 ring-brown/8">
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-forest text-xs font-bold text-white">{i + 1}</span>
            {s}
          </li>
        ))}
      </ol>
      <p className="mt-2">
        <SourceLink href={URLS.tracabilite} label="Fonctionnement décrit sur lanouvelleagriculture.coop/tracabilite" />
      </p>

      <form onSubmit={submit} className="card mt-5 grid gap-5">
        <div>
          <label htmlFor="barcode" className="font-semibold">
            Code-barres du produit
          </label>
          <p className="text-sm text-brown-soft">{TRACEABILITY.barcodeHint}</p>
          <div className="flex gap-2">
            <input
              id="barcode"
              inputMode="numeric"
              placeholder="13 chiffres"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => setBarcode(DEMO_TRACE.barcode)}
              className="mt-1.5 inline-flex shrink-0 items-center gap-2 rounded-2xl bg-mint px-4 font-semibold text-deep hover:bg-lime"
            >
              <ScanBarcode className="size-5" />
              <span className="hidden sm:inline">Scanner</span>
              <span className="sr-only sm:hidden">Scanner un code-barres</span>
            </button>
          </div>
        </div>

        <div>
          <p className="font-semibold">Numéro de lot</p>
          <p className="text-sm text-brown-soft">{TRACEABILITY.lotHint}</p>
          <div className="mt-1 grid grid-cols-[1fr_1fr] gap-2">
            <label className="text-sm text-brown-soft">
              Lot
              <input value={lot} onChange={(e) => setLot(e.target.value)} className={inputClass} />
            </label>
            <label className="text-sm text-brown-soft">
              DCR
              <input value={dcr} onChange={(e) => setDcr(e.target.value)} className={inputClass} />
            </label>
          </div>
        </div>

        <Button type="submit" full>
          Retrouver mon agriculteur
        </Button>
        <p className="-mt-2 text-center text-xs text-brown-soft">
          Simulation : codes fictifs, aucune connexion à l’outil réel. Le service existe sur le site LNA et l’application {TRACEABILITY.app}.
        </p>
      </form>
    </>
  )
}

/** Résultat de traçabilité simulé : éleveuse fictive, engagements réels des œufs Plein Air */
export function TraceResult({ compact = false }: { compact?: boolean }) {
  return (
    <section className="rounded-[28px] bg-white p-5 ring-2 ring-forest/25 sm:p-6" aria-labelledby="trace-title">
      <div className="flex flex-wrap items-center gap-2">
        <ContentTag kind="lna" label="Résultat de la traçabilité" />
      </div>
      <div className="mt-3 flex items-center gap-4">
        <ImageSlot photo={PHOTOS.eggBox} className="aspect-[3/2] w-28 shrink-0 rounded-2xl bg-white ring-1 ring-brown/10 sm:w-36" imgClassName="object-contain p-1.5" />
        <div>
          <p className="text-sm text-brown-soft">Votre produit</p>
          <h2 id="trace-title" className="text-[1.3rem] font-bold leading-tight sm:text-[1.4rem]">
            {EGGS_PLEIN_AIR.productName}
          </h2>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4 rounded-3xl bg-cream p-4">
        <span className="grid size-16 shrink-0 place-items-center rounded-full bg-forest text-2xl font-bold text-white" aria-hidden>
          {FARM.farmerFirstName[0]}
        </span>
        <div className="min-w-0">
          <p className="text-lg font-bold leading-tight">{FARM.farmer}</p>
          <p className="text-[15px]">
            {FARM.name} · {EGGS_PLEIN_AIR.production}
          </p>
          <p className="flex items-center gap-1 text-[15px] text-brown-soft">
            <MapPin className="size-4 text-olive" /> {FARM.location}
          </p>
          <div className="mt-1.5">
            <ContentTag kind="demo" label="Profil fictif" />
          </div>
        </div>
      </div>

      {!compact && (
        <>
          <h3 className="mt-5 font-bold">Ses bonnes pratiques et engagements</h3>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {EGGS_PLEIN_AIR.commitments.slice(0, 4).map((c) => (
              <li key={c.id} className="flex gap-2 text-[15px]">
                <BadgeCheck className="mt-0.5 size-5 shrink-0 text-forest" />
                <span>
                  <strong>{c.title}</strong> — {c.text}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-brown-soft">
            Engagements publiés par LNA pour ses œufs Plein Air. L’éleveuse est fictive pour la démonstration.{' '}
            <SourceLink href={URLS.oeufsPleinAir} label="Voir la page officielle" />
          </p>
        </>
      )}
    </section>
  )
}
