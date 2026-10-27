import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Compass, List, MousePointerClick, RotateCcw, X } from 'lucide-react'
import { useAppState } from '../state/AppState'
import { TOUR } from '../data/tour'
import { ContentTag } from './ui'

const STORAGE_KEY = 'lna-visite-guidee'

type TourState = { open: boolean; index: number | null; minimized: boolean }

function loadTour(): TourState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { open: false, minimized: false, ...JSON.parse(raw) }
  } catch {
    // stockage indisponible : la visite repart du début
  }
  return { open: false, index: null, minimized: false }
}

/**
 * Mode démo : visite guidée étape par étape.
 * Chaque étape remet le compte dans l'état attendu, on peut donc avancer, reculer,
 * sauter à n'importe quelle étape ou recommencer à zéro.
 */
export function DemoPanel() {
  const app = useAppState()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [tour, setTour] = useState<TourState>(loadTour)
  const [showList, setShowList] = useState(false)
  const hasBottomNav = !['/', '/programme', '/inscription'].includes(pathname)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tour))
    } catch {
      // ignoré
    }
  }, [tour])

  // Laisse sous la page la hauteur réelle de la carte, pour que rien ne reste caché dessous
  const cardRef = useRef<HTMLElement>(null)
  const expanded = tour.open && !tour.minimized
  useEffect(() => {
    const card = cardRef.current
    if (!expanded || !card) {
      document.body.style.paddingBottom = ''
      return
    }
    const update = () => {
      document.body.style.paddingBottom = `${card.offsetHeight + 24}px`
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(card)
    return () => {
      observer.disconnect()
      document.body.style.paddingBottom = ''
    }
  })

  const goTo = (i: number) => {
    const step = TOUR[i]
    app.demoPatch(step.patch)
    navigate(step.route, { state: step.routeState })
    setTour({ open: true, index: i, minimized: false })
    setShowList(false)
  }

  const restart = () => goTo(0)

  // Après chaque changement d'étape : amener l'élément à cliquer au-dessus de la carte et le mettre en évidence
  const currentStep = tour.index !== null ? TOUR[tour.index] : null
  useEffect(() => {
    const target = currentStep?.target
    if (!tour.open || !target) return
    const timer = setTimeout(() => {
      const candidates = [...document.querySelectorAll<HTMLElement>('main button, main a, main p, main h2')]
      const el = candidates.find((c) => c.textContent?.trim().startsWith(target)) ?? candidates.find((c) => c.textContent?.includes(target))
      if (!el) return
      // Place l'élément dans le haut de l'écran, au-dessus de la carte
      const top = el.getBoundingClientRect().top + window.scrollY - Math.max(96, window.innerHeight * 0.2)
      window.scrollTo({ top, behavior: 'smooth' })
      el.classList.add('tour-highlight')
      setTimeout(() => el.classList.remove('tour-highlight'), 4000)
    }, 500)
    return () => clearTimeout(timer)
  }, [currentStep, tour.open])

  const position = `fixed z-40 left-2 right-2 sm:right-auto sm:left-4 sm:w-[24rem] ${
    hasBottomNav ? 'bottom-[calc(4.75rem+env(safe-area-inset-bottom))] md:bottom-4' : 'bottom-[calc(0.5rem+env(safe-area-inset-bottom))] md:bottom-4'
  }`

  // Bouton d'ouverture
  if (!tour.open) {
    return (
      <button
        onClick={() => setTour((t) => ({ ...t, open: true, minimized: false }))}
        aria-label="Mode démo : visite guidée"
        className={`fixed left-3 z-40 inline-flex items-center gap-1.5 rounded-full bg-brown/80 px-3 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur transition hover:bg-brown md:bottom-4 md:left-4 ${
          hasBottomNav ? 'bottom-[calc(5.25rem+env(safe-area-inset-bottom))]' : 'bottom-[calc(0.75rem+env(safe-area-inset-bottom))]'
        }`}
      >
        <Compass className="size-4" />
        Visite guidée
      </button>
    )
  }

  const index = tour.index
  const step = index !== null ? TOUR[index] : null

  // Carte réduite
  if (tour.minimized) {
    return (
      <button
        onClick={() => setTour((t) => ({ ...t, minimized: false }))}
        aria-label="Agrandir la visite guidée"
        className={`${position} flex items-center justify-between gap-3 rounded-full bg-brown px-4 py-2.5 text-left text-sm text-white shadow-xl sm:w-auto`}
      >
        <span className="flex items-center gap-2">
          <Compass className="size-4 text-lime" />
          {step ? `Étape ${index! + 1}/${TOUR.length} · ${step.title}` : 'Visite guidée'}
        </span>
        <ChevronUp className="size-4" />
      </button>
    )
  }

  return (
    <section
      ref={cardRef}
      aria-label="Visite guidée du prototype"
      className={`${position} max-h-[70dvh] overflow-y-auto rounded-3xl bg-brown p-4 text-white shadow-2xl animate-fade-up`}
    >
      {/* En-tête */}
      <div className="flex items-center justify-between gap-2">
        <p className="kicker flex items-center gap-1.5 text-lime">
          <Compass className="size-4" />
          {step ? `Étape ${index! + 1} / ${TOUR.length}` : 'Visite guidée'}
        </p>
        <div className="flex gap-1">
          <IconButton label="Réduire" onClick={() => setTour((t) => ({ ...t, minimized: true }))}>
            <ChevronDown className="size-4" />
          </IconButton>
          <IconButton label="Fermer la visite guidée" onClick={() => setTour((t) => ({ ...t, open: false }))}>
            <X className="size-4" />
          </IconButton>
        </div>
      </div>

      {step && (
        <div className="mt-2 flex gap-1" aria-hidden>
          {TOUR.map((s, i) => (
            <span key={s.id} className={`h-1 flex-1 rounded-full ${i <= index! ? 'bg-lime' : 'bg-white/20'}`} />
          ))}
        </div>
      )}

      {showList ? (
        <StepList current={index} onPick={goTo} />
      ) : step ? (
        <div className="mt-3" key={step.id}>
          <p className="text-xs text-white/60">{step.part}</p>
          <h2 className="text-lg font-bold leading-tight">{step.title}</h2>
          <div className="mt-1.5">
            <ContentTag kind={step.kind} />
          </div>
          <p className="mt-2 text-[14px] leading-snug text-white/90 sm:text-[15px]">{step.explain}</p>
          {step.todo && (
            <p className="mt-2 flex gap-2 rounded-2xl bg-white/10 px-3 py-2 text-[13px] leading-snug sm:text-[14px]">
              <MousePointerClick className="mt-0.5 size-4 shrink-0 text-lime" />
              {step.todo}
            </p>
          )}
        </div>
      ) : (
        <div className="mt-3">
          <h2 className="text-lg font-bold">Découvrir le prototype pas à pas</h2>
          <p className="mt-1 text-[15px] text-white/85">
            {TOUR.length} étapes courtes, de la landing page à l’avis après la visite. Chaque étape prépare l’écran pour vous.
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-4 flex items-center gap-2">
        {step && index! > 0 && (
          <button
            onClick={() => goTo(index! - 1)}
            className="inline-flex min-h-11 items-center gap-1 rounded-full px-3 text-sm font-semibold text-white ring-1 ring-white/30 hover:bg-white/10"
          >
            <ChevronLeft className="size-4" /> Précédent
          </button>
        )}
        {!step && (
          <button onClick={restart} className="inline-flex min-h-11 flex-1 items-center justify-center gap-1 rounded-full bg-lime px-4 text-sm font-bold uppercase tracking-wide text-deep">
            Commencer <ChevronRight className="size-4" />
          </button>
        )}
        {step && index! < TOUR.length - 1 && (
          <button
            onClick={() => goTo(index! + 1)}
            className="ml-auto inline-flex min-h-11 items-center gap-1 rounded-full bg-lime px-4 text-sm font-bold uppercase tracking-wide text-deep"
          >
            Suivant <ChevronRight className="size-4" />
          </button>
        )}
        {step && index === TOUR.length - 1 && (
          <button
            onClick={() => setTour({ open: true, index: null, minimized: false })}
            className="ml-auto inline-flex min-h-11 items-center gap-1 rounded-full bg-lime px-4 text-sm font-bold uppercase tracking-wide text-deep"
          >
            Terminer
          </button>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-white/15 pt-3 text-sm">
        <button onClick={() => setShowList((v) => !v)} className="inline-flex min-h-9 items-center gap-1.5 text-white/85 hover:text-lime">
          <List className="size-4" /> {showList ? 'Masquer les étapes' : 'Toutes les étapes'}
        </button>
        <button onClick={restart} className="inline-flex min-h-9 items-center gap-1.5 text-white/85 hover:text-lime">
          <RotateCcw className="size-4" /> Recommencer à zéro
        </button>
      </div>
    </section>
  )
}

function StepList({ current, onPick }: { current: number | null; onPick: (i: number) => void }) {
  const parts = [...new Set(TOUR.map((s) => s.part))]
  return (
    <div className="mt-3 grid gap-3">
      {parts.map((part) => (
        <div key={part}>
          <p className="text-xs font-semibold uppercase tracking-wide text-white/60">{part}</p>
          <ol className="mt-1 grid gap-0.5">
            {TOUR.map((s, i) =>
              s.part === part ? (
                <li key={s.id}>
                  <button
                    onClick={() => onPick(i)}
                    aria-current={i === current ? 'step' : undefined}
                    className={`flex w-full items-center gap-2.5 rounded-xl px-2 py-1.5 text-left text-[14px] ${
                      i === current ? 'bg-lime text-deep font-semibold' : 'hover:bg-white/10'
                    }`}
                  >
                    <span className={`grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold ${i === current ? 'bg-deep text-lime' : 'bg-white/15'}`}>
                      {i + 1}
                    </span>
                    {s.title}
                  </button>
                </li>
              ) : null,
            )}
          </ol>
        </div>
      ))}
    </div>
  )
}

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} aria-label={label} className="grid size-8 place-items-center rounded-full hover:bg-white/10">
      {children}
    </button>
  )
}
