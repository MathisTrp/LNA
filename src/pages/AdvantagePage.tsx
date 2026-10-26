import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Info } from 'lucide-react'
import { useAppState } from '../state/AppState'
import { FARM, REWARDS } from '../data/mock'
import { BackButton, Button, ButtonLink, SectionTitle } from '../components/ui'

export function AdvantagePage() {
  const { rewardStatus, markRewardUsed, user } = useAppState()
  const navigate = useNavigate()
  const available = REWARDS.filter((r) => r.kind === 'immediate' && rewardStatus(r) === 'unlocked')
  const [selectedId, setSelectedId] = useState(available[0]?.id)
  const reward = available.find((r) => r.id === selectedId) ?? available[0]

  return (
    <div className="mx-auto max-w-lg animate-fade-up">
      <BackButton to="/accueil" />
      <SectionTitle as="h1" kicker="Mon" title="avantage" className="mt-2" />

      {!reward ? (
        <div className="card mt-6 text-center">
          <p className="text-lg font-semibold">Aucun avantage disponible pour le moment.</p>
          <ButtonLink to="/recompenses" variant="outline" className="mt-4">
            Voir mes récompenses
          </ButtonLink>
        </div>
      ) : (
        <>
          {available.length > 1 && (
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1" role="tablist">
              {available.map((r) => (
                <button
                  key={r.id}
                  role="tab"
                  aria-selected={r.id === reward.id}
                  onClick={() => setSelectedId(r.id)}
                  className={`shrink-0 rounded-full px-4 py-2 text-[15px] font-semibold ${r.id === reward.id ? 'bg-forest text-white' : 'bg-white text-brown ring-1 ring-brown/15'}`}
                >
                  {r.title}
                </button>
              ))}
            </div>
          )}

          {/* Bon de réduction à présenter en caisse */}
          <div className="mt-5 overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-brown/10">
            <div className="bg-forest px-6 py-6 text-white">
              <p className="kicker text-lime">Bon de réduction · {user.firstName}</p>
              <p className="mt-2 text-[2rem] font-bold leading-tight">{reward.title}</p>
              <p className="mt-1 text-white/85">{reward.description}</p>
            </div>
            <div className="relative border-t-2 border-dashed border-brown/15 px-6 py-6 text-center">
              <span className="absolute -left-4 -top-4 size-8 rounded-full bg-cream" />
              <span className="absolute -right-4 -top-4 size-8 rounded-full bg-cream" />
              <div
                className="mx-auto h-20 w-full max-w-xs"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(90deg,#2f2023 0 2px,transparent 2px 4px,#2f2023 4px 7px,transparent 7px 9px,#2f2023 9px 10px,transparent 10px 13px)',
                }}
                aria-label="Code-barres à présenter en caisse"
                role="img"
              />
              <p className="mt-2 font-mono text-lg tracking-[0.3em]">LNA 2026 {reward.id === 'reduction-1e' ? '0184' : '0527'}</p>
              <p className="mt-2 text-sm text-brown-soft">À présenter en caisse · valable jusqu’au 31/12/2026</p>
            </div>
          </div>

          <p className="mt-4 flex gap-2 rounded-2xl bg-mint p-4 text-[15px]">
            <Info className="mt-0.5 size-5 shrink-0 text-forest" />
            La Nouvelle Agriculture est la marque des agriculteurs de la coopérative : en l’achetant, vous soutenez des éleveurs comme {FARM.farmerFirstName}.
          </p>

          <Button
            full
            className="mt-6"
            onClick={() => {
              markRewardUsed(reward.id)
              navigate('/avis/avantage')
            }}
          >
            J’ai utilisé mon avantage
          </Button>
        </>
      )}
    </div>
  )
}
