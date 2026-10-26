import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, Check, ChevronRight, QrCode, Receipt, Upload } from 'lucide-react'
import { useAppState } from '../state/AppState'
import { FARM, SCANNED_PRODUCT } from '../data/mock'
import { BackButton, Button, SectionTitle } from '../components/ui'

type Step = 'choose' | 'ticket' | 'qr' | 'processing' | 'success'

export function AddPurchasePage() {
  const [step, setStep] = useState<Step>('choose')
  const [method, setMethod] = useState<'ticket' | 'qr'>('ticket')
  const { addPurchase, purchases } = useAppState()
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
        <BackButton label={step === 'choose' ? 'Retour' : 'Changer de méthode'} {...(step === 'choose' ? { to: '/accueil' } : {})} />
      )}

      {step === 'choose' && (
        <>
          <SectionTitle as="h1" kicker="Ajouter" title="un achat" className="mt-2" />
          <p className="mt-2 text-brown-soft">Choisissez la méthode la plus simple pour vous.</p>
          <div className="mt-6 grid gap-3">
            <MethodButton
              icon={<Receipt className="size-6" />}
              title="Scanner mon ticket"
              text="Une photo du ticket de caisse, tous les produits LNA sont reconnus."
              recommended
              onClick={() => {
                setMethod('ticket')
                setStep('ticket')
              }}
            />
            <MethodButton
              icon={<QrCode className="size-6" />}
              title="Scanner le QR code du produit"
              text="Le QR code imprimé sur la boîte ou l’étiquette."
              onClick={() => {
                setMethod('qr')
                setStep('qr')
              }}
            />
          </div>
        </>
      )}

      {step === 'ticket' && <TicketStep onValidate={() => setStep('processing')} />}
      {step === 'qr' && <QrStep onValidate={() => setStep('processing')} />}

      {step === 'processing' && (
        <div className="mt-10 text-center" aria-live="polite">
          <div className="relative mx-auto w-56">
            <TicketMock />
            <div className="absolute inset-x-2 h-1 rounded-full bg-forest shadow-[0_0_16px_4px_rgba(48,102,24,0.45)] animate-scan" />
          </div>
          <p className="mt-6 text-lg font-semibold">{method === 'ticket' ? 'Lecture du ticket…' : 'Lecture du QR code…'}</p>
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
            <p className="kicker text-brown-soft">Produit reconnu</p>
            <p className="mt-1 text-lg font-bold">{SCANNED_PRODUCT.product}</p>
            <p className="text-[15px] text-brown-soft">{SCANNED_PRODUCT.store} · aujourd’hui</p>
            <hr className="my-4 border-brown/10" />
            <p className="font-hand text-xl leading-snug text-forest">
              Ces œufs viennent de la {FARM.name}, chez {FARM.farmerFirstName}.
            </p>
          </div>

          <div className="mt-6 grid gap-3">
            <Button full onClick={() => navigate('/accueil')}>
              Retour à mon espace
            </Button>
            <Button full variant="ghost" onClick={() => setStep('choose')}>
              Ajouter un autre achat
            </Button>
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
  recommended,
  onClick,
}: {
  icon: React.ReactNode
  title: string
  text: string
  recommended?: boolean
  onClick: () => void
}) {
  return (
    <button onClick={onClick} className="card flex items-center gap-4 text-left transition hover:ring-2 hover:ring-forest/50">
      <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-mint text-forest">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2 text-lg font-bold">
          {title}
          {recommended && <span className="rounded-full bg-lime px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-deep">Conseillé</span>}
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
      <SectionTitle as="h1" kicker="Scanner" title="mon ticket" className="mt-2" />
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
      <p className="mt-3 text-center text-sm text-brown-soft">Prototype : aucune photo n’est envoyée ni analysée.</p>
      <Button full className="mt-5" onClick={onValidate}>
        Simuler la validation
      </Button>
    </>
  )
}

function QrStep({ onValidate }: { onValidate: () => void }) {
  return (
    <>
      <SectionTitle as="h1" kicker="Scanner" title="le QR code" className="mt-2" />
      <div className="relative mt-5 grid aspect-square place-items-center overflow-hidden rounded-[28px] bg-brown">
        <div className="relative size-3/5">
          {['left-0 top-0 border-l-4 border-t-4', 'right-0 top-0 border-r-4 border-t-4', 'left-0 bottom-0 border-l-4 border-b-4', 'right-0 bottom-0 border-r-4 border-b-4'].map((c) => (
            <span key={c} className={`absolute size-10 rounded-sm border-lime ${c}`} />
          ))}
          <QrCode className="absolute inset-0 m-auto size-1/2 text-white/25" />
          <div className="absolute inset-x-2 h-0.5 bg-lime shadow-[0_0_12px_3px_rgba(175,216,126,0.6)] animate-scan" />
        </div>
        <p className="absolute bottom-4 flex items-center gap-2 text-sm text-white/80">
          <Camera className="size-4" /> Visez le QR code sur la boîte
        </p>
      </div>
      <Button full className="mt-5" onClick={onValidate}>
        Simuler le scan
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
