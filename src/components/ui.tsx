import { useEffect, useState, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Link, useNavigate, type LinkProps } from 'react-router-dom'
import { ArrowLeft, Apple, BadgeCheck, Carrot, Egg, ExternalLink, Info, Leaf, Lightbulb, Sprout, Tractor, Wheat, X } from 'lucide-react'
import { Illustration, type SceneName } from './Illustration'

/* ---------- Boutons ---------- */

type Variant = 'primary' | 'dark' | 'outline' | 'ghost' | 'light'

const variantClasses: Record<Variant, string> = {
  // Bouton signature du site LNA : vert tendre + texte vert profond en capitales
  primary: 'bg-lime text-deep hover:bg-[#9fcc6a] uppercase tracking-wide font-bold',
  dark: 'bg-forest text-white hover:bg-leaf uppercase tracking-wide font-bold',
  outline: 'bg-transparent text-forest ring-2 ring-inset ring-forest/70 hover:bg-mint font-semibold',
  ghost: 'bg-transparent text-forest hover:bg-mint font-semibold',
  light: 'bg-white text-deep hover:bg-mint uppercase tracking-wide font-bold',
}

const base =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] transition-colors duration-150 disabled:opacity-100 disabled:bg-cream-dark disabled:text-brown-soft disabled:ring-0 disabled:normal-case disabled:tracking-normal disabled:font-semibold'

export function Button({
  variant = 'primary',
  full,
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; full?: boolean }) {
  return <button className={`${base} ${variantClasses[variant]} ${full ? 'w-full' : ''} ${className}`} {...props} />
}

export function ButtonLink({
  variant = 'primary',
  full,
  className = '',
  ...props
}: LinkProps & { variant?: Variant; full?: boolean }) {
  return <Link className={`${base} ${variantClasses[variant]} ${full ? 'w-full' : ''} ${className}`} {...props} />
}

/* ---------- Titres ---------- */

export function SectionTitle({
  kicker,
  title,
  light,
  as: Tag = 'h2',
  className = '',
}: {
  kicker?: string
  title: ReactNode
  light?: boolean
  as?: 'h1' | 'h2' | 'h3'
  className?: string
}) {
  return (
    <div className={className}>
      {kicker && <p className={`kicker ${light ? 'text-white' : 'text-brown'}`}>{kicker}</p>}
      <Tag className={`script-title mt-0.5 text-[1.9rem] sm:text-[2.2rem] ${light ? 'text-lime' : 'text-forest'}`}>{title}</Tag>
    </div>
  )
}

export function CardHeading({ icon, children }: { icon?: ReactNode; children: ReactNode }) {
  return (
    <h3 className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.14em] text-brown-soft">
      {icon}
      {children}
    </h3>
  )
}

/* ---------- Progression ---------- */

export function ProgressBar({ value, max, label }: { value: number; max: number; label: string }) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  return (
    <div>
      <div
        className="h-4 overflow-hidden rounded-full bg-mint ring-1 ring-forest/15"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
      >
        <div className="h-full rounded-full bg-forest transition-[width] duration-700 ease-out" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-2 flex justify-between" aria-hidden>
        {Array.from({ length: max }, (_, i) => (
          <span
            key={i}
            className={`grid size-7 place-items-center rounded-full text-xs font-bold transition-colors ${
              i < value ? 'bg-forest text-white' : 'bg-white text-brown-soft ring-1 ring-brown/15'
            }`}
          >
            {i < value ? <Egg className="size-3.5" /> : i + 1}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ---------- Badges de statut ---------- */

export function Badge({ tone = 'mint', children }: { tone?: 'mint' | 'lime' | 'cream' | 'brown'; children: ReactNode }) {
  const tones = {
    mint: 'bg-mint text-deep',
    lime: 'bg-lime text-deep',
    cream: 'bg-cream-dark text-brown-soft',
    brown: 'bg-brown text-white',
  }
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${tones[tone]}`}>
      {children}
    </span>
  )
}

/* ---------- Image avec repli sur illustration ---------- */

export function ImageSlot({
  src,
  scene,
  alt,
  className = '',
}: {
  src?: string
  scene: SceneName
  alt: string
  className?: string
}) {
  const [failed, setFailed] = useState(false)
  return (
    <div className={`relative overflow-hidden bg-mint ${className}`}>
      {src && !failed ? (
        <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className="h-full w-full object-cover" />
      ) : (
        <Illustration name={scene} label={alt} />
      )}
    </div>
  )
}

/* ---------- Logo du prototype ----------
 * Aucun logo officiel LNA n'est fourni dans le projet : on affiche volontairement
 * un repère neutre au nom du programme (pas d'imitation du logo de la marque).
 */

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" aria-label="Entrez dans nos fermes — accueil" className="inline-flex items-center gap-2.5">
      <span className={`grid shrink-0 place-items-center rounded-2xl bg-forest text-lime ${compact ? 'size-9' : 'size-11'}`}>
        <Sprout className={compact ? 'size-5' : 'size-6'} />
      </span>
      <span className="leading-tight">
        <span className={`block font-bold text-brown ${compact ? 'text-[15px]' : 'text-[17px]'}`}>Entrez dans nos fermes</span>
        <span className="block text-[11px] font-semibold uppercase tracking-wider text-brown-soft">Espace fidélité · prototype</span>
      </span>
    </Link>
  )
}

/* ---------- Distinction réel / proposition / démo ---------- */

export type ContentKind = 'lna' | 'proposal' | 'demo'

const tagStyles: Record<ContentKind, { label: string; cls: string; Icon: typeof Info }> = {
  lna: { label: 'Information LNA', cls: 'bg-white text-forest ring-1 ring-forest/40', Icon: BadgeCheck },
  proposal: { label: 'Notre proposition', cls: 'bg-lime text-deep', Icon: Lightbulb },
  demo: { label: 'Donnée fictive', cls: 'bg-cream-dark text-brown-soft', Icon: Info },
}

/** Étiquette indiquant la nature d'un contenu : réel (LNA), proposé (notre recommandation) ou fictif (démo) */
export function ContentTag({ kind, label }: { kind: ContentKind; label?: string }) {
  const { label: defaultLabel, cls, Icon } = tagStyles[kind]
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${cls}`}>
      <Icon className="size-3" />
      {label ?? defaultLabel}
    </span>
  )
}

/** Lien discret vers la page officielle d'où provient une information */
export function SourceLink({ href, label = 'Source : lanouvelleagriculture.coop' }: { href: string; label?: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-brown-soft underline underline-offset-2 hover:text-forest">
      {label}
      <ExternalLink className="size-3" />
    </a>
  )
}

export function PrototypeNotice({ className = '' }: { className?: string }) {
  return (
    <p className={`text-center text-xs text-brown-soft ${className}`}>
      Prototype étudiant – non officiel · certaines données sont simulées à des fins de démonstration.
    </p>
  )
}

/* ---------- Bandeau motif agricole (clin d'œil au site LNA) ---------- */

export function PatternBand({ className = '' }: { className?: string }) {
  const icons = [Egg, Wheat, Tractor, Leaf, Apple, Sprout, Carrot]
  return (
    <div className={`overflow-hidden bg-mint ${className}`} aria-hidden>
      <div className="flex gap-7 px-4 py-3 text-olive/40">
        {Array.from({ length: 28 }, (_, i) => {
          const Icon = icons[i % icons.length]
          return <Icon key={i} className="size-6 shrink-0" />
        })}
      </div>
    </div>
  )
}

/* ---------- En-tête de page avec retour ---------- */

export function BackButton({ to, label = 'Retour' }: { to?: string; label?: string }) {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => (to ? navigate(to) : navigate(-1))}
      className="-ml-2 inline-flex min-h-11 items-center gap-1.5 rounded-full px-2 text-[15px] font-semibold text-forest hover:bg-mint"
    >
      <ArrowLeft className="size-5" />
      {label}
    </button>
  )
}

/* ---------- Modale ---------- */

export function Modal({
  open,
  onClose,
  children,
  labelledBy,
}: {
  open: boolean
  onClose: () => void
  children: ReactNode
  labelledBy: string
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null
  // Portail : la modale échappe aux conteneurs animés (transform) et passe au-dessus de la navigation
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <div className="absolute inset-0 bg-brown/55 animate-fade-up" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className="relative max-h-[92dvh] w-full overflow-y-auto rounded-t-[32px] bg-cream p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-2xl animate-pop sm:max-w-md sm:rounded-[32px]"
      >
        <button
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full bg-white text-brown shadow hover:bg-mint"
        >
          <X className="size-5" />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  )
}
