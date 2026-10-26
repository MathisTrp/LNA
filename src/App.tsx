import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AppLayout } from './components/AppLayout'
import { DemoPanel } from './components/DemoPanel'
import { LandingPage } from './pages/LandingPage'
import { ProgramPage } from './pages/ProgramPage'
import { SignupPage } from './pages/SignupPage'
import { DashboardPage } from './pages/DashboardPage'
import { AddPurchasePage } from './pages/AddPurchasePage'
import { AdvantagePage } from './pages/AdvantagePage'
import { FarmPage } from './pages/FarmPage'
import { NewsDetailPage } from './pages/NewsDetailPage'
import { RewardsPage } from './pages/RewardsPage'
import { VisitPage } from './pages/VisitPage'
import { FeedbackPage } from './pages/FeedbackPage'
import { ProfilePage } from './pages/ProfilePage'
import { TracePage } from './pages/TracePage'

export default function App() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <Routes>
        {/* Parcours de découverte (après scan du QR code) */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/programme" element={<ProgramPage />} />
        <Route path="/inscription" element={<SignupPage />} />

        {/* Espace membre */}
        <Route element={<AppLayout />}>
          <Route path="/accueil" element={<DashboardPage />} />
          <Route path="/achat" element={<AddPurchasePage />} />
          <Route path="/tracabilite" element={<TracePage />} />
          <Route path="/avantage" element={<AdvantagePage />} />
          <Route path="/ferme" element={<FarmPage />} />
          <Route path="/ferme/actualites/:id" element={<NewsDetailPage />} />
          <Route path="/recompenses" element={<RewardsPage />} />
          <Route path="/experiences/visite" element={<VisitPage />} />
          <Route path="/avis/:context" element={<FeedbackPage />} />
          <Route path="/profil" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <DemoPanel />
    </>
  )
}
