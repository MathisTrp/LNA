import { createContext, useContext, useEffect, useReducer, type ReactNode } from 'react'
import { DEMO_USER, INITIAL_PURCHASES, SCANNED_PRODUCT, MILESTONES, REWARDS, type Reward, type RewardStatus, type User } from '../data/mock'

const STORAGE_KEY = 'lna-fidelite-v1'
const UNLOCK_THRESHOLD = MILESTONES[0].purchases

export type VisitStatus = 'none' | 'entered' | 'done'

export type Feedback = { context: string; rating: number; liked: string[]; comment: string }

type State = {
  loggedIn: boolean
  user: User
  purchases: number
  /** Achats ajoutés pendant la session (affichés dans le profil) */
  addedPurchases: { date: string; product: string; store: string }[]
  usedRewards: string[]
  visitStatus: VisitStatus
  feedbacks: Feedback[]
  showUnlock: boolean
}

const initialState: State = {
  loggedIn: false,
  user: DEMO_USER,
  purchases: INITIAL_PURCHASES,
  addedPurchases: [],
  usedRewards: [],
  visitStatus: 'none',
  feedbacks: [],
  showUnlock: false,
}

type Action =
  | { type: 'login'; user?: Partial<User> }
  | { type: 'logout' }
  | { type: 'setPurchases'; value: number; product?: { product: string; store: string } }
  | { type: 'markRewardUsed'; id: string }
  | { type: 'setVisit'; status: VisitStatus }
  | { type: 'feedback'; feedback: Feedback }
  | { type: 'dismissUnlock' }
  | { type: 'resetDemo' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'login':
      return { ...state, loggedIn: true, user: { ...DEMO_USER, ...action.user } }
    case 'logout':
      return { ...initialState }
    case 'setPurchases': {
      const value = Math.max(0, action.value)
      const crossesUnlock = state.purchases < UNLOCK_THRESHOLD && value >= UNLOCK_THRESHOLD
      const today = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
      return {
        ...state,
        purchases: value,
        showUnlock: crossesUnlock || state.showUnlock,
        addedPurchases: action.product
          ? [{ date: today, ...action.product }, ...state.addedPurchases]
          : state.addedPurchases,
        // Si on redescend sous le seuil (mode démo), l'expérience redevient verrouillée
        visitStatus: value < UNLOCK_THRESHOLD ? 'none' : state.visitStatus,
      }
    }
    case 'markRewardUsed':
      return state.usedRewards.includes(action.id)
        ? state
        : { ...state, usedRewards: [...state.usedRewards, action.id] }
    case 'setVisit':
      return { ...state, visitStatus: action.status }
    case 'feedback':
      return { ...state, feedbacks: [...state.feedbacks, action.feedback] }
    case 'dismissUnlock':
      return { ...state, showUnlock: false }
    case 'resetDemo':
      return { ...initialState, loggedIn: true, user: state.user }
  }
}

function loadState(): State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...initialState, ...JSON.parse(raw), showUnlock: false }
  } catch {
    // stockage indisponible (navigation privée…) : on repart des données par défaut
  }
  return initialState
}

type AppStateValue = State & {
  login: (user?: Partial<User>) => void
  logout: () => void
  addPurchase: () => void
  setPurchases: (value: number) => void
  markRewardUsed: (id: string) => void
  setVisit: (status: VisitStatus) => void
  submitFeedback: (feedback: Feedback) => void
  dismissUnlock: () => void
  resetDemo: () => void
  rewardStatus: (reward: Reward) => RewardStatus
  nextMilestone: (typeof MILESTONES)[number] | undefined
  isUnlocked: boolean
}

const AppStateContext = createContext<AppStateValue | null>(null)

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // ignoré : le prototype fonctionne aussi sans persistance
    }
  }, [state])

  const rewardStatus = (reward: Reward): RewardStatus => {
    if (state.usedRewards.includes(reward.id)) return 'used'
    if (state.purchases >= reward.threshold) return 'unlocked'
    const nextOfKind = REWARDS.filter((r) => r.kind === reward.kind && r.threshold > state.purchases).sort(
      (a, b) => a.threshold - b.threshold,
    )[0]
    return nextOfKind?.id === reward.id ? 'progress' : 'locked'
  }

  const value: AppStateValue = {
    ...state,
    login: (user) => dispatch({ type: 'login', user }),
    logout: () => dispatch({ type: 'logout' }),
    addPurchase: () =>
      dispatch({
        type: 'setPurchases',
        value: state.purchases + 1,
        product: SCANNED_PRODUCT,
      }),
    setPurchases: (value) => dispatch({ type: 'setPurchases', value }),
    markRewardUsed: (id) => dispatch({ type: 'markRewardUsed', id }),
    setVisit: (status) => dispatch({ type: 'setVisit', status }),
    submitFeedback: (feedback) => dispatch({ type: 'feedback', feedback }),
    dismissUnlock: () => dispatch({ type: 'dismissUnlock' }),
    resetDemo: () => dispatch({ type: 'resetDemo' }),
    rewardStatus,
    nextMilestone: MILESTONES.find((m) => m.purchases > state.purchases),
    isUnlocked: state.purchases >= UNLOCK_THRESHOLD,
  }

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export function useAppState() {
  const ctx = useContext(AppStateContext)
  if (!ctx) throw new Error('useAppState doit être utilisé dans <AppStateProvider>')
  return ctx
}
