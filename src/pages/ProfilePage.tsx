import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, LogOut, Receipt, RotateCcw, Users } from 'lucide-react'
import { useAppState } from '../state/AppState'
import { FARM, PURCHASE_HISTORY } from '../data/mock'
import { Button, CardHeading, SectionTitle } from '../components/ui'

export function ProfilePage() {
  const { user, purchases, addedPurchases, logout, resetDemo } = useAppState()
  const navigate = useNavigate()
  const [weeklyNews, setWeeklyNews] = useState(true)
  const [events, setEvents] = useState(true)
  const history = [...addedPurchases, ...PURCHASE_HISTORY]

  return (
    <div className="mx-auto max-w-3xl animate-fade-up">
      <SectionTitle as="h1" kicker="Mon" title="profil" />

      <section className="card mt-5 flex items-center gap-4">
        <span className="grid size-16 shrink-0 place-items-center rounded-full bg-forest text-2xl font-bold text-white">{user.firstName[0]}</span>
        <div className="min-w-0">
          <p className="text-xl font-bold">{user.firstName}</p>
          <p className="truncate text-brown-soft">{user.email}</p>
          <p className="mt-1 flex items-center gap-1.5 text-[15px]">
            <Users className="size-4 text-olive" />
            Foyer de {user.householdSize} personne{user.householdSize > 1 ? 's' : ''}
            {user.hasChildren ? ', avec enfants' : ''}
          </p>
        </div>
      </section>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <section className="card">
          <CardHeading icon={<Bell className="size-4" />}>Ce que je reçois</CardHeading>
          <Toggle checked={weeklyNews} onChange={setWeeklyNews} label={`Nouvelles de la ${FARM.name}`} hint="1 e-mail par semaine maximum" />
          <Toggle checked={events} onChange={setEvents} label="Visites et événements près de chez moi" hint="Quelques fois par an" />
        </section>

        <section className="card">
          <CardHeading icon={<Receipt className="size-4" />}>Mes achats validés · {purchases}</CardHeading>
          <ul className="mt-2 divide-y divide-brown/10">
            {history.slice(0, 5).map((p, i) => (
              <li key={`${p.date}-${i}`} className="flex justify-between gap-3 py-2.5 text-[15px]">
                <span>
                  <span className="block font-semibold">{p.product}</span>
                  <span className="text-brown-soft">{p.store}</span>
                </span>
                <span className="shrink-0 text-brown-soft">{p.date}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-4 grid gap-3 sm:grid-cols-2">
        <Button
          variant="outline"
          onClick={() => {
            resetDemo()
            navigate('/accueil')
          }}
        >
          <RotateCcw className="size-4" /> Réinitialiser la démo
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            logout()
            navigate('/')
          }}
        >
          <LogOut className="size-4" /> Se déconnecter
        </Button>
      </section>
    </div>
  )
}

function Toggle({ checked, onChange, label, hint }: { checked: boolean; onChange: (v: boolean) => void; label: string; hint: string }) {
  return (
    <label className="mt-3 flex cursor-pointer items-center justify-between gap-4 rounded-2xl py-1">
      <span>
        <span className="block font-semibold">{label}</span>
        <span className="text-sm text-brown-soft">{hint}</span>
      </span>
      <input type="checkbox" className="peer sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="relative h-7 w-12 shrink-0 rounded-full bg-cream-dark transition-colors peer-checked:bg-forest peer-focus-visible:ring-2 peer-focus-visible:ring-olive after:absolute after:left-1 after:top-1 after:size-5 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:after:translate-x-5" />
    </label>
  )
}
