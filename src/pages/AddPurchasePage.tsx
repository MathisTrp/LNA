import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ChevronRight, Receipt, ScanBarcode, Upload } from 'lucide-react'
import { useAppState } from '../state/AppState'
import { SCANNED_PRODUCT } from '../data/demo'
import { BackButton, Button, ContentTag, SectionTitle } from '../components/ui'

type Step = 'choose' | 'ticket' | 'processing' | 'success'

/**
 * Fonction A — Valider mon achat : mécanique PROPOSÉE par notre programme (simulation),
 * distincte de la traçabilité LNA (fonction B, page /tracabilite).
 */
export function AddPurchasePage() {
  const [step, setStep] = useState<Step>('choose')
  const { addPurchase, purchases, followedFarm } = useAppState()
  const navigate = useNavigate()

  // Simulation de l'analyse : ~1,6 s puis validation de l'achat
  useEffect(() => {
    if (step !== 'processing') return
    const t = setTimeout(() => {
      addPurchase()
      setStep('success')
    }, 1600)
    return () => clearTimeout(t)
  }, [step])

  return (
    <div className="mx-auto max-w-lg animate-fade-up">
      {step !== 'success' && step !== 'processing' && (
        <BackButton label="Retour" {...(step === 'choose' ? { to: '/accueil' } : {})} />
      )}

      {step === 'choose' && (
        <>
          <div className="mt-2">
            <ContentTag kind="proposal" label="Programme de fidélité · notre proposition" />
          </div>
          <SectionTitle as="h1" kicker="Valider" title="mon achat" className="mt-3" />
          <p className="mt-2 text-brown-soft">Chaque achat LNA validé vous fait progresser vers vos avantages et vos expériences.</p>
          <div className="mt-6 grid gap-3">
            <MethodButton
              icon={<Receipt className="size-6" />}
              title="Scanner mon ticket"
              text="Une photo du ticket de caisse suffit à valider vos produits LNA."
              onClick={() => setStep('ticket')}
            />
          </div>

          <div className="mt-8 rounded-[24px] border-2 border-dashed border-forest/30 p-5">
            <ContentTag kind="lna" label="Traçabilité LNA · service existant" />
            <p className="mt-3 text-lg font-bold">Envie de savoir qui a produit vos œufs ?</p>
            <p className="mt-1 text-[15px] text-brown-soft">
              Avec le code-barres et le numéro de lot, la traçabilité LNA vous fait découvrir l’agriculteur, sa localisation et ses engagements.
            </p>
            <Button variant="outline" full className="mt-4" onClick={() => navigate('/tracabilite')}>
              <ScanBarcode className="size-5" /> Retrouver mon agriculteur
            </Button>
          </div>
        </>
      )}

      {step === 'ticket' && <TicketStep onValidate={() => setStep('processing')} />}

      {step === 'processing' && (
        <div className="mt-10 text-center" aria-live="polite">
          <div className="relative mx-auto w-56">
            <TicketMock />
            <div className="absolute inset-x-2 h-1 rounded-full bg-forest shadow-[0_0_16px_4px_rgba(48,102,24,0.45)] animate-scan" />
          </div>
          <p className="mt-6 text-lg font-semibold">Lecture du ticket…</p>
          <p className="text-brown-soft">Nous recherchons vos produits LNA.</p>
        </div>
      )}

      {step === 'success' && (
        <div className="mt-6 text-center" aria-live="polite">
          <div className="mx-auto grid size-24 place-items-center rounded-full bg-forest text-white animate-pop">
            <Check className="size-12" strokeWidth={3} />
          </div>
          <h1 className="script-title mt-5 text-[2.4rem] text-forest">Achat validé !</h1>
          <p className="mt-1 text-lg">
            Vous avez maintenant <strong>{purchases} achats LNA validés</strong>.
          </p>

          <div className="card mt-6 text-left">
            <p className="kicker text-brown-soft">Produit reconnu sur le ticket</p>
            <p className="mt-1 text-lg font-bold">{SCANNED_PRODUCT.product}</p>
            <p className="text-[15px] text-brown-soft">{SCANNED_PRODUCT.store} · aujourd’hui</p>
            {!followedFarm && (
              <>
                <hr className="my-4 border-brown/10" />
                <p className="text-[16px]">
                  <strong>Et maintenant, qui a produit ces œufs ?</strong> Le ticket valide votre achat ; le numéro de lot imprimé sur l’œuf
                  permet de retrouver la ferme grâce à la traçabilité LNA.
                </p>
              </>
            )}
          </div>

          <div className="mt-6 grid gap-3">
            {!followedFarm ? (
              <>
                <Button full onClick={() => navigate('/tracabilite')}>
                  <ScanBarcode className="size-5" /> Retrouver mon agriculteur
                </Button>
                <Button full variant="ghost" onClick={() => navigate('/accueil')}>
                  Retour à mon espace
                </Button>
              </>
            ) : (
              <>
                <Button full onClick={() => navigate('/accueil')}>
                  Retour à mon espace
                </Button>
                <Button full variant="ghost" onClick={() => setStep('choose')}>
                  Valider un autre achat
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function MethodButton({
  icon,
  title,
  text,
  onClick,
}: {
  icon: React.ReactNode
  title: string
  text: string
  onClick: () => void
}) {
  return (
    <button onClick={onClick} className="card flex items-center gap-4 text-left transition hover:ring-2 hover:ring-forest/50">
      <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-mint text-forest">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2 text-lg font-bold">
          {title}
        </span>
        <span className="mt-0.5 block text-[15px] text-brown-soft">{text}</span>
      </span>
      <ChevronRight className="size-5 shrink-0 text-forest" />
    </button>
  )
}

function TicketStep({ onValidate }: { onValidate: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)

  return (
    <>
      <SectionTitle as="h1" kicker="Valider mon achat" title="mon ticket" className="mt-2" />
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          setFileName(e.dataTransfer.files[0]?.name ?? 'ticket.jpg')
        }}
        className={`mt-5 flex min-h-64 flex-col items-center justify-center rounded-[28px] border-2 border-dashed p-6 text-center transition-colors ${
          dragging ? 'border-forest bg-mint' : 'border-forest/40 bg-white hover:bg-mint/50'
        }`}
      >
        {fileName ? (
          <>
            <div className="w-28">
              <TicketMock />
            </div>
            <p className="mt-3 font-semibold">{fileName}</p>
            <p className="text-sm text-brown-soft">Touchez pour changer de photo</p>
          </>
        ) : (
          <>
            <span className="grid size-16 place-items-center rounded-full bg-mint text-forest">
              <Upload className="size-7" />
            </span>
            <p className="mt-4 text-lg font-bold">Déposez votre ticket ici</p>
            <p className="mt-1 text-[15px] text-brown-soft">
              ou <span className="font-semibold text-forest underline underline-offset-4">prenez-le en photo</span>
            </p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="sr-only"
          tabIndex={-1}
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
        />
      </div>
      <p className="mt-3 text-center text-sm text-brown-soft">Simulation : aucune photo n’est envoyée ni analysée. La validation par ticket est une proposition du programme.</p>
      <Button full className="mt-5" onClick={onValidate}>
        Simuler la validation
      </Button>
    </>
  )
}

function TicketMock() {
  return (
    <div className="rounded-xl bg-white p-4 text-left shadow-md ring-1 ring-brown/10" aria-hidden>
      <div className="mx-auto h-2 w-1/2 rounded bg-brown/30" />
      <div className="mt-3 grid gap-1.5">
        {[80, 60, 70, 90, 55].map((w, i) => (
          <div key={i} className="flex justify-between gap-2">
            <div className={`h-1.5 rounded ${i === 2 ? 'bg-forest' : 'bg-brown/15'}`} style={{ width: `${w}%` }} />
            <div className={`h-1.5 w-6 rounded ${i === 2 ? 'bg-forest' : 'bg-brown/15'}`} />
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-between border-t border-dashed border-brown/20 pt-2">
        <div className="h-2 w-1/4 rounded bg-brown/40" />
        <div className="h-2 w-1/5 rounded bg-brown/40" />
      </div>
    </div>
  )
}
