import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Minus, Plus } from 'lucide-react'
import { useAppState } from '../state/AppState'
import { DEMO_USER } from '../data/demo'
import { BackButton, Button, Logo, SectionTitle } from '../components/ui'

const inputClass =
  'mt-1.5 block w-full rounded-2xl border-0 bg-white px-4 py-3.5 text-[17px] ring-1 ring-brown/15 placeholder:text-brown-soft/60 focus:outline-none focus:ring-2 focus:ring-forest'

export function SignupPage() {
  const { login } = useAppState()
  const navigate = useNavigate()
  // Pré-rempli avec l'utilisateur de démonstration pour aller vite en soutenance
  const [firstName, setFirstName] = useState(DEMO_USER.firstName)
  const [email, setEmail] = useState(DEMO_USER.email)
  const [password, setPassword] = useState('fermes2026')
  const [householdSize, setHouseholdSize] = useState(DEMO_USER.householdSize)
  const [hasChildren, setHasChildren] = useState<boolean | null>(DEMO_USER.hasChildren)
  const [error, setError] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!firstName.trim()) return setError('Indiquez votre prénom.')
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError('Indiquez une adresse e-mail valide.')
    if (password.length < 6) return setError('Le mot de passe doit contenir au moins 6 caractères.')
    login({ firstName: firstName.trim(), email, householdSize, hasChildren: !!hasChildren })
    navigate('/accueil')
  }

  return (
    <div className="min-h-dvh pb-24">
      <header className="bg-white">
        <div className="mx-auto flex h-20 max-w-lg items-center justify-between px-4">
          <div className="pt-3">
            <Logo compact />
          </div>
          <BackButton />
        </div>
        <div className="h-3 bg-forest" />
      </header>

      <main className="mx-auto max-w-lg px-4 pt-8">
        <SectionTitle as="h1" kicker="Créer" title="mon espace" />
        <p className="mt-2 text-brown-soft">Trois informations suffisent. Gratuit, sans engagement.</p>

        <form onSubmit={submit} className="mt-6 grid gap-5" noValidate>
          <label className="block font-semibold">
            Prénom
            <input className={inputClass} value={firstName} onChange={(e) => setFirstName(e.target.value)} autoComplete="given-name" />
          </label>
          <label className="block font-semibold">
            E-mail
            <input type="email" className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          </label>
          <label className="block font-semibold">
            Mot de passe
            <input type="password" className={inputClass} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
          </label>

          <fieldset className="rounded-[24px] bg-white p-5 ring-1 ring-brown/10">
            <legend className="sr-only">Informations facultatives</legend>
            <p className="kicker text-brown-soft">Facultatif</p>
            <p className="mt-1 text-[15px] text-brown-soft">Pour vous proposer des expériences adaptées à votre foyer.</p>

            <div className="mt-4 flex items-center justify-between gap-4">
              <span id="household-label" className="font-semibold">Personnes dans le foyer</span>
              <div className="flex items-center gap-2" role="group" aria-labelledby="household-label">
                <button type="button" aria-label="Moins" onClick={() => setHouseholdSize((n) => Math.max(1, n - 1))} className="grid size-10 place-items-center rounded-full bg-mint text-forest hover:bg-lime">
                  <Minus className="size-4" />
                </button>
                <span className="w-8 text-center text-lg font-bold" aria-live="polite">
                  {householdSize}
                  {householdSize >= 6 ? '+' : ''}
                </span>
                <button type="button" aria-label="Plus" onClick={() => setHouseholdSize((n) => Math.min(6, n + 1))} className="grid size-10 place-items-center rounded-full bg-mint text-forest hover:bg-lime">
                  <Plus className="size-4" />
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4">
              <span id="children-label" className="font-semibold">Enfants dans le foyer</span>
              <div className="flex rounded-full bg-cream p-1" role="radiogroup" aria-labelledby="children-label">
                {[
                  { v: true, l: 'Oui' },
                  { v: false, l: 'Non' },
                ].map(({ v, l }) => (
                  <button
                    key={l}
                    type="button"
                    role="radio"
                    aria-checked={hasChildren === v}
                    onClick={() => setHasChildren(v)}
                    className={`min-h-10 rounded-full px-5 text-[15px] font-semibold transition-colors ${hasChildren === v ? 'bg-forest text-white' : 'text-brown-soft'}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </fieldset>

          {error && (
            <p role="alert" className="rounded-2xl bg-[#fbe6df] px-4 py-3 text-[15px] font-medium text-terracotta">
              {error}
            </p>
          )}

          <Button type="submit" full>
            Créer mon espace
          </Button>
          <p className="text-center text-xs text-brown-soft">
            Inscription simulée : aucune donnée n’est envoyée. Les champs sont pré-remplis pour la démonstration.
          </p>
        </form>
      </main>
    </div>
  )
}
