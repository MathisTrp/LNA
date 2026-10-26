import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ChevronRight, Heart, Lock, Play } from 'lucide-react'
import { useAppState } from '../state/AppState'
import { FARM, NEWS } from '../data/demo'
import { BackButton, ButtonLink, ContentTag, ImageSlot } from '../components/ui'

export function NewsDetailPage() {
  const { id } = useParams()
  const { isUnlocked, purchases } = useAppState()
  const [thanked, setThanked] = useState(false)
  const news = NEWS.find((n) => n.id === id)
  if (!news) return <Navigate to="/ferme" replace />

  const locked = news.membersOnly && !isUnlocked
  const others = NEWS.filter((n) => n.id !== news.id).slice(0, 2)

  return (
    <article className="mx-auto max-w-2xl animate-fade-up">
      <BackButton to="/ferme" label="Ma ferme" />

      <div className="relative mt-2 overflow-hidden rounded-[28px]">
        <ImageSlot scene={news.scene} src={news.image} alt={news.title} className="aspect-[16/9]" />
        {news.video && (
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid size-16 place-items-center rounded-full bg-lime text-deep shadow-lg">
              {locked ? <Lock className="size-6" /> : <Play className="ml-1 size-7" fill="currentColor" />}
            </span>
          </span>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <ContentTag kind="demo" label="Actualité fictive · exemple de contenu" />
      </div>
      <p className="mt-2 text-brown-soft">
        {news.date} · {FARM.name}
      </p>
      <h1 className="mt-1 text-[1.75rem] font-bold leading-tight sm:text-[2rem]">{news.title}</h1>

      <div className="mt-4 grid gap-4 text-[17px] leading-relaxed">
        {(locked ? news.body.slice(0, 1) : news.body).map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>

      {locked ? (
        <div className="mt-6 rounded-[24px] bg-mint p-5 text-center">
          <Lock className="mx-auto size-6 text-forest" />
          <p className="mt-2 font-semibold">La suite et la vidéo sont réservées aux membres ayant validé 5 achats.</p>
          <p className="text-[15px] text-brown-soft">Vous en êtes à {purchases}.</p>
          <ButtonLink to="/achat" className="mt-4">
            Valider un achat
          </ButtonLink>
        </div>
      ) : (
        <>
          <div className="mt-6 flex items-center gap-3">
            <ImageSlot scene="farmer" alt="" className="size-12 shrink-0 rounded-full" />
            <p className="font-hand text-xl text-forest">
              {FARM.farmerFirstName} <span className="font-sans text-sm text-brown-soft">(profil fictif)</span>
            </p>
          </div>

          <div className="mt-6 rounded-[24px] bg-white p-4 ring-1 ring-brown/8" aria-live="polite">
            {thanked ? (
              <div className="animate-fade-up">
                <p className="flex items-center gap-2 font-semibold text-forest">
                  <Heart className="size-5" fill="currentColor" /> Merci ! Votre message de soutien a été pris en compte.
                </p>
                <p className="mt-1 text-sm text-brown-soft">
                  Les messages sont regroupés afin de ne pas solliciter individuellement les agriculteurs.
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setThanked(true)}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-mint px-5 font-semibold text-deep transition-colors hover:bg-lime"
                >
                  <Heart className="size-5" />
                  Dire merci à {FARM.farmerFirstName}
                </button>
                <ContentTag kind="proposal" />
              </div>
            )}
          </div>
        </>
      )}

      <h2 className="mt-10 kicker">Autres nouvelles</h2>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
        {others.map((n) => (
          <li key={n.id}>
            <Link to={`/ferme/actualites/${n.id}`} className="card flex items-center gap-3 p-3 hover:ring-forest/40 sm:p-3">
              <ImageSlot scene={n.scene} alt="" className="size-16 shrink-0 rounded-2xl" />
              <span className="min-w-0 flex-1">
                <span className="block text-sm text-brown-soft">{n.date}</span>
                <span className="block font-semibold leading-snug">{n.title}</span>
              </span>
              <ChevronRight className="size-5 shrink-0 text-forest" />
            </Link>
          </li>
        ))}
      </ul>
    </article>
  )
}
