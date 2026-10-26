import { Link } from 'react-router-dom'
import { CalendarDays, Check, ChevronRight, Drumstick, Gift, Handshake, Lock, Sun, Tag, Tractor } from 'lucide-react'
import { useAppState } from '../state/AppState'
import { REWARDS, type Reward, type RewardStatus } from '../data/demo'
import { Badge, ContentTag, SectionTitle } from '../components/ui'

const icons = {
  coupon: Tag,
  gift: Gift,
  drumstick: Drumstick,
  farm: Tractor,
  visit: CalendarDays,
  meet: Handshake,
  family: Sun,
  season: Sun,
}

const statusBadge: Record<RewardStatus, { label: string; tone: 'lime' | 'mint' | 'cream' | 'brown' }> = {
  unlocked: { label: 'Débloquée', tone: 'lime' },
  progress: { label: 'En cours', tone: 'mint' },
  locked: { label: 'Verrouillée', tone: 'cream' },
  used: { label: 'Utilisée', tone: 'cream' },
}

export function RewardsPage() {
  const { purchases } = useAppState()
  const experiences = REWARDS.filter((r) => r.kind === 'experience')
  const immediate = REWARDS.filter((r) => r.kind === 'immediate')

  return (
    <div className="animate-fade-up">
      <SectionTitle as="h1" kicker="Mes" title="récompenses" />
      <div className="mt-2">
        <ContentTag kind="proposal" label="Récompenses proposées · seuils et montants fictifs" />
      </div>
      <p className="mt-1 text-brown-soft">
        {purchases} achat{purchases > 1 ? 's' : ''} validé{purchases > 1 ? 's' : ''}. Les expériences sont le cœur du programme ; les avantages
        vous remercient au passage.
      </p>

      <div className="mt-6 grid gap-8 md:grid-cols-[1.25fr_1fr] md:gap-6">
        <section aria-labelledby="exp-heading">
          <h2 id="exp-heading" className="kicker flex items-center gap-2 text-forest">
            <Tractor className="size-4" /> Expériences
          </h2>
          <ul className="mt-3 grid gap-3">
            {experiences.map((r) => (
              <RewardRow key={r.id} reward={r} highlight />
            ))}
          </ul>
        </section>
        <section aria-labelledby="imm-heading">
          <h2 id="imm-heading" className="kicker flex items-center gap-2 text-brown-soft">
            <Tag className="size-4" /> Avantages immédiats
          </h2>
          <ul className="mt-3 grid gap-3">
            {immediate.map((r) => (
              <RewardRow key={r.id} reward={r} />
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

function RewardRow({ reward, highlight }: { reward: Reward; highlight?: boolean }) {
  const { rewardStatus, purchases } = useAppState()
  const status = rewardStatus(reward)
  const Icon = icons[reward.icon]
  const available = status === 'unlocked'
  const badge = statusBadge[status]
  const remaining = reward.threshold - purchases
  const followPending = reward.requiresFollow && status === 'progress'
  const href = followPending ? '/tracabilite' : available ? (reward.kind === 'immediate' ? '/avantage' : reward.link) : undefined

  const content = (
    <>
      <span
        className={`grid size-12 shrink-0 place-items-center rounded-2xl ${
          available ? (highlight ? 'bg-forest text-white' : 'bg-lime text-deep') : 'bg-cream-dark text-brown-soft'
        }`}
      >
        {status === 'locked' ? <Lock className="size-5" /> : status === 'used' ? <Check className="size-5" /> : <Icon className="size-5" />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className={`text-[17px] font-bold leading-tight ${status === 'locked' || status === 'used' ? 'text-brown-soft' : ''}`}>{reward.title}</span>
          <Badge tone={badge.tone}>{badge.label}</Badge>
        </span>
        <span className="mt-1 block text-[15px] text-brown-soft">{reward.description}</span>
        {followPending && <span className="mt-1.5 block text-sm font-semibold text-olive">Retrouvez votre agriculteur pour commencer</span>}
        {!followPending && (status === 'progress' || status === 'locked') && (
          <span className="mt-1.5 block text-sm font-semibold text-olive">
            {reward.threshold} achats · encore {remaining}
          </span>
        )}
      </span>
      {href && <ChevronRight className="size-5 shrink-0 text-forest" />}
    </>
  )

  const cls = `flex items-center gap-4 rounded-[24px] bg-white p-4 ring-1 transition ${
    available ? 'ring-lime/80' : 'ring-brown/8'
  } ${status === 'locked' ? 'bg-white/60' : ''}`

  return (
    <li>
      {href ? (
        <Link to={href} className={`${cls} hover:ring-2 hover:ring-forest/50`}>
          {content}
        </Link>
      ) : (
        <div className={cls}>{content}</div>
      )}
    </li>
  )
}
