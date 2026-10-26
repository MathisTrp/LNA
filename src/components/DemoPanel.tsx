import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CalendarDays, FlaskConical, LogOut, Plus, RotateCcw, ScanBarcode, Sparkles, Star, Tractor, X } from 'lucide-react'
import { useAppState } from '../state/AppState'

/**
 * Mode démo : panneau discret pour dérouler la soutenance en 2-3 minutes.
 * Chaque action se connecte automatiquement en tant que Claire si besoin.
 */
export function DemoPanel() {
  const [open, setOpen] = useState(false)
  const app = useAppState()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const hasBottomNav = !['/', '/programme', '/inscription'].includes(pathname)

  const run = (fn: () => void, to?: string) => {
    if (!app.loggedIn) app.login()
    fn()
    if (to) navigate(to)
    setOpen(false)
  }

  const actions = [
    { icon: RotateCcw, label: 'Remettre le compte à 3 achats', onClick: () => run(app.resetDemo, '/accueil') },
    { icon: Plus, label: 'Valider un achat', hint: 'ticket simulé, +1 achat', onClick: () => run(app.addPurchase, '/accueil') },
    { icon: ScanBarcode, label: 'Simuler la traçabilité', hint: 'produit → agriculteur → suivre la ferme', onClick: () => run(() => {}, '/tracabilite') },
    { icon: Sparkles, label: 'Passer directement à 5 achats', hint: 'débloque la récompense', onClick: () => run(() => app.setPurchases(Math.max(5, app.purchases)), '/accueil') },
    { icon: Tractor, label: 'Afficher la ferme', hint: 'la suit automatiquement si besoin', onClick: () => run(() => app.setFollowedFarm(true), '/ferme') },
    { icon: CalendarDays, label: 'Afficher la visite de ferme', onClick: () => run(() => {}, '/experiences/visite') },
    {
      icon: Star,
      label: 'Simuler une expérience terminée',
      hint: 'ouvre l’écran de satisfaction',
      onClick: () =>
        run(() => {
          if (app.purchases < 5) app.setPurchases(5)
          app.dismissUnlock()
          app.setVisit('done')
        }, '/avis/visite'),
    },
    { icon: LogOut, label: 'Revenir à la landing page', hint: 'déconnexion', onClick: () => { app.logout(); navigate('/'); setOpen(false) } },
  ]

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`fixed left-3 z-40 inline-flex items-center gap-1.5 rounded-full bg-brown/70 px-2.5 py-1.5 text-xs opacity-80 hover:opacity-100 md:px-3 md:py-2 font-semibold text-white shadow-lg backdrop-blur transition hover:bg-brown md:bottom-4 md:left-4 ${
          hasBottomNav ? 'bottom-[calc(5.25rem+env(safe-area-inset-bottom))]' : 'bottom-[calc(0.75rem+env(safe-area-inset-bottom))]'
        }`}
        aria-expanded={open}
        aria-controls="demo-panel"
        aria-label="Mode démo"
      >
        <FlaskConical className="size-4" />
        <span className="md:hidden">Démo</span>
        <span className="hidden md:inline">Mode démo</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div
            id="demo-panel"
            className={`fixed left-3 right-3 z-50 rounded-3xl bg-brown p-4 text-white shadow-2xl animate-fade-up sm:right-auto sm:w-80 md:bottom-16 md:left-4 ${
              hasBottomNav ? 'bottom-[calc(8.5rem+env(safe-area-inset-bottom))]' : 'bottom-16'
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="kicker text-lime">Mode démo</p>
              <button onClick={() => setOpen(false)} aria-label="Fermer le mode démo" className="grid size-8 place-items-center rounded-full hover:bg-white/10">
                <X className="size-4" />
              </button>
            </div>
            <p className="mt-1 text-sm text-white/70">
              {app.loggedIn ? `${app.user.firstName} · ${app.purchases} achat${app.purchases > 1 ? 's' : ''} validé${app.purchases > 1 ? 's' : ''}` : 'Non connecté'}
            </p>
            <ul className="mt-3 grid gap-1">
              {actions.map(({ icon: Icon, label, hint, onClick }) => (
                <li key={label}>
                  <button onClick={onClick} className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-[15px] hover:bg-white/10">
                    <Icon className="size-4 shrink-0 text-lime" />
                    <span>
                      {label}
                      {hint && <span className="block text-xs text-white/60">{hint}</span>}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  )
}
