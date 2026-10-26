import { NavLink, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Gift, Home, Sparkles, Tractor, User } from 'lucide-react'
import { useAppState } from '../state/AppState'
import { FARM, VISIT } from '../data/demo'
import { Button, Logo, Modal, PrototypeNotice } from './ui'

const NAV = [
  { to: '/accueil', label: 'Accueil', icon: Home },
  { to: '/ferme', label: 'Ma ferme', icon: Tractor },
  { to: '/recompenses', label: 'Récompenses', icon: Gift },
  { to: '/profil', label: 'Profil', icon: User },
]

export function AppLayout() {
  const { loggedIn, user } = useAppState()

  if (!loggedIn) return <Navigate to="/" replace />

  return (
    <div className="min-h-dvh pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:pb-12">
      {/* En-tête */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur md:static">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-20 md:px-6">
          <div>
            <Logo compact />
          </div>
          <p className="text-[15px] text-brown-soft md:hidden">
            Bonjour <span className="font-semibold text-brown">{user.firstName}</span>
          </p>
          <p className="kicker hidden text-brown-soft md:block">Prototype étudiant – non officiel</p>
        </div>
        {/* Barre de navigation desktop, dans l'esprit du bandeau vert du site LNA */}
        <nav className="hidden bg-forest md:block" aria-label="Navigation principale">
          <ul className="mx-auto flex max-w-6xl justify-center gap-2 px-6">
            {NAV.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 border-b-4 px-5 py-3.5 text-[15px] font-bold uppercase tracking-wide transition-colors ${
                      isActive ? 'border-lime text-lime' : 'border-transparent text-white hover:text-lime'
                    }`
                  }
                >
                  <Icon className="size-5" />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 pt-4 md:px-6 md:pt-8">
        <Outlet />
        <PrototypeNotice className="mt-10" />
      </main>

      {/* Navigation mobile en bas */}
      <nav
        className="fixed inset-x-0 bottom-0 z-30 border-t border-brown/10 bg-white pb-[env(safe-area-inset-bottom)] md:hidden"
        aria-label="Navigation principale"
      >
        <ul className="grid grid-cols-4">
          {NAV.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex min-h-16 flex-col items-center justify-center gap-1 text-[12px] font-semibold ${
                    isActive ? 'text-forest' : 'text-brown-soft'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className={`grid h-8 w-14 place-items-center rounded-full transition-colors ${isActive ? 'bg-mint' : ''}`}>
                      <Icon className="size-[22px]" strokeWidth={isActive ? 2.4 : 2} />
                    </span>
                    {label}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <UnlockModal />
    </div>
  )
}

function UnlockModal() {
  const { showUnlock, dismissUnlock, user, followedFarm } = useAppState()
  const navigate = useNavigate()
  // Sur l'écran « Achat validé », on laisse d'abord savourer la validation
  const { pathname } = useLocation()

  const go = (to: string) => {
    dismissUnlock()
    navigate(to)
  }

  return (
    <Modal open={showUnlock && pathname !== '/achat'} onClose={dismissUnlock} labelledBy="unlock-title">
      <div className="text-center">
        <div className="mx-auto grid size-20 place-items-center rounded-full bg-lime text-deep animate-pop">
          <Sparkles className="size-9" />
        </div>
        <h2 id="unlock-title" className="script-title mt-4 text-[2rem] text-forest">
          Félicitations {user.firstName} !
        </h2>
        <p className="mt-2 text-lg font-medium">Vous avez débloqué une nouvelle expérience LNA.</p>
      </div>

      <div className="mt-5 rounded-3xl bg-white p-5 ring-1 ring-brown/10">
        <p className="kicker text-olive">Nouvelle expérience</p>
        <p className="mt-1 text-[17px] font-semibold">
          Participez au tirage au sort pour une visite {followedFarm ? `de la ${FARM.name}` : 'de ferme'} en famille.
        </p>
        <p className="mt-1 text-[15px] text-brown-soft">
          {VISIT.date} · {VISIT.seats} familles
        </p>
        <hr className="my-4 border-brown/10" />
        <p className="text-[15px] text-brown-soft">
          Vous avez aussi accès aux <strong className="text-brown">contenus membres</strong> de la ferme que vous suivez.
        </p>
      </div>

      <div className="mt-6 grid gap-3">
        <Button full onClick={() => go(followedFarm ? '/ferme' : '/tracabilite')}>
          {followedFarm ? 'Découvrir ma ferme' : 'Retrouver mon agriculteur'}
        </Button>
        <Button full variant="ghost" onClick={() => go('/experiences/visite')}>
          Voir la visite de ferme
        </Button>
      </div>
    </Modal>
  )
}
