import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Check, Heart } from 'lucide-react'
import { useAppState } from '../state/AppState'
import { FARM, FEEDBACK_CHOICES } from '../data/demo'
import { Button, SectionTitle } from '../components/ui'

const RATING_LABELS = ['Décevante', 'Moyenne', 'Bien', 'Très bien', 'Excellente']

export function FeedbackPage() {
  const { context = 'avantage' } = useParams()
  const { submitFeedback, user } = useAppState()
  const navigate = useNavigate()
  const [rating, setRating] = useState(0)
  const [liked, setLiked] = useState<string[]>([])
  const [comment, setComment] = useState('')
  const [sent, setSent] = useState(false)

  const subject = context === 'visite' ? `votre visite de la ${FARM.name}` : 'votre avantage'

  if (sent) {
    return (
      <div className="mx-auto max-w-lg pt-6 text-center animate-fade-up">
        <div className="mx-auto grid size-20 place-items-center rounded-full bg-lime text-deep animate-pop">
          <Heart className="size-9" fill="currentColor" />
        </div>
        <h1 className="script-title mt-5 text-[2.3rem] text-forest">Merci {user.firstName} !</h1>
        <p className="mt-2 text-lg">
          Dans notre proposition, les retours sont lus par l’équipe du programme et partagés de façon groupée avec les agriculteurs. Ils aident à faire évoluer le programme.
        </p>
        <Button full className="mt-8" onClick={() => navigate('/accueil')}>
          Retour à mon espace
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg animate-fade-up">
      <SectionTitle as="h1" kicker="Votre avis" title="compte pour nous" className="mt-2" />
      <form
        className="mt-6 grid gap-6"
        onSubmit={(e) => {
          e.preventDefault()
          submitFeedback({ context, rating, liked, comment })
          setSent(true)
        }}
      >
        <fieldset className="card">
          <legend className="sr-only">Note</legend>
          <p className="text-lg font-bold">Comment avez-vous trouvé {subject} ?</p>
          <div className="mt-4 grid grid-cols-5 gap-2" role="radiogroup" aria-label="Note de 1 à 5">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                role="radio"
                aria-checked={rating === n}
                aria-label={`${n} sur 5 : ${RATING_LABELS[n - 1]}`}
                onClick={() => setRating(n)}
                className={`flex aspect-square items-center justify-center rounded-2xl text-xl font-bold transition ${
                  rating === n ? 'scale-105 bg-forest text-white' : n <= rating ? 'bg-lime text-deep' : 'bg-cream text-brown hover:bg-mint'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-sm text-brown-soft">
            <span>Décevante</span>
            <span className="font-semibold text-forest">{rating ? RATING_LABELS[rating - 1] : ''}</span>
            <span>Excellente</span>
          </div>
        </fieldset>

        <fieldset className="card">
          <legend className="sr-only">Ce que vous avez apprécié</legend>
          <p className="text-lg font-bold">Qu’avez-vous le plus apprécié ?</p>
          <p className="text-[15px] text-brown-soft">Plusieurs choix possibles.</p>
          <div className="mt-4 grid gap-2">
            {FEEDBACK_CHOICES.map((choice) => {
              const active = liked.includes(choice)
              return (
                <button
                  key={choice}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setLiked((l) => (active ? l.filter((c) => c !== choice) : [...l, choice]))}
                  className={`flex min-h-12 items-center gap-3 rounded-2xl px-4 text-left font-medium transition-colors ${
                    active ? 'bg-forest text-white' : 'bg-cream hover:bg-mint'
                  }`}
                >
                  <span className={`grid size-6 place-items-center rounded-md ${active ? 'bg-lime text-deep' : 'bg-white ring-1 ring-brown/20'}`}>
                    {active && <Check className="size-4" strokeWidth={3} />}
                  </span>
                  {choice}
                </button>
              )
            })}
          </div>
          <label className="mt-4 block text-[15px] font-semibold">
            Un mot pour {FARM.farmerFirstName} ou l’équipe ? <span className="font-normal text-brown-soft">(facultatif)</span>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="mt-1.5 block w-full rounded-2xl border-0 bg-cream px-4 py-3 text-[16px] ring-1 ring-brown/10 focus:outline-none focus:ring-2 focus:ring-forest"
            />
          </label>
        </fieldset>

        <div>
          <Button type="submit" full disabled={rating === 0}>
            Envoyer mon avis
          </Button>
          {rating === 0 && <p className="mt-2 text-center text-sm text-brown-soft">Choisissez une note pour envoyer votre avis.</p>}
        </div>
      </form>
    </div>
  )
}
