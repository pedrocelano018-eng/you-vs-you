import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from './lib/useStore'
import { useTheme } from './lib/theme'
import { todayStr } from './lib/date'
import { Onboarding } from './components/Onboarding'
import { WelcomeExcuses } from './components/WelcomeExcuses'
import { Home } from './components/Home'
import { DayClosed } from './components/DayClosed'
import { YouVsYou } from './components/YouVsYou'
import { Calendar } from './components/Calendar'
import { EditRoutines } from './components/EditRoutines'
import { Vacation } from './components/Vacation'
import { ConfirmModal } from './components/ConfirmModal'

type Overlay = 'none' | 'calendar' | 'settings'
type Flow = 'welcome' | 'home' | 'youvsyou'

function Screen({ children, k }: { children: React.ReactNode; k: string }) {
  return (
    <motion.div
      key={k}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="absolute inset-0 overflow-y-auto"
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const store = useStore()
  const { state } = store
  const [theme, toggleTheme] = useTheme()

  const [flow, setFlow] = useState<Flow>('home')
  const [overlay, setOverlay] = useState<Overlay>('none')
  const [confirmVacation, setConfirmVacation] = useState(false)

  // The record for today, if the day has already been closed.
  const todayRecord = state.history[state.currentDay]
  const dayClosed = !!todayRecord && !todayRecord.vacation

  // Decide the entry flow for the day: show the welcome (excuses) screen the
  // first time the app is opened on a new day, if there are excuses this month.
  useEffect(() => {
    if (!state.onboarded || state.vacationMode || dayClosed) return
    const needsWelcome = state.welcomeSeen !== todayStr()
    if (needsWelcome) {
      setFlow(store.monthExcuses.length > 0 ? 'welcome' : 'home')
      if (store.monthExcuses.length === 0) store.dismissWelcome()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.onboarded, state.currentDay, state.vacationMode, dayClosed])

  // --- Onboarding ---
  if (!state.onboarded) {
    return (
      <Shell>
        <Onboarding onDone={(week, weekend) => store.setRoutines(week, weekend)} />
      </Shell>
    )
  }

  // --- Vacation mode takes over everything ---
  if (state.vacationMode) {
    return (
      <Shell>
        <Vacation onEnd={() => store.setVacation(false)} />
      </Shell>
    )
  }

  // --- Day already closed: show ONLY the result until a new day begins ---
  if (dayClosed && flow !== 'youvsyou') {
    return (
      <Shell>
        <DayClosed completed={todayRecord.completed} streak={state.streak} />
      </Shell>
    )
  }

  function handleFinish() {
    const total = store.total
    const done = store.doneCount
    const complete = total > 0 && done === total
    if (complete) {
      // Recording closes the day -> the locked DayClosed screen takes over.
      store.recordDay(true, done, total)
    } else {
      setFlow('youvsyou')
    }
  }

  return (
    <Shell>
      <AnimatePresence>
        {overlay === 'calendar' && (
          <Screen k="calendar">
            <Calendar history={state.history} onClose={() => setOverlay('none')} />
          </Screen>
        )}
        {overlay === 'settings' && (
          <Screen k="settings">
            <EditRoutines
              week={state.weekRoutine}
              weekend={state.weekendRoutine}
              theme={theme}
              onToggleTheme={toggleTheme}
              onSave={store.updateRoutine}
              onClose={() => setOverlay('none')}
            />
          </Screen>
        )}
      </AnimatePresence>

      {overlay === 'none' && (
        <AnimatePresence mode="wait">
          {flow === 'welcome' && (
            <Screen k="welcome">
              <WelcomeExcuses
                excuses={store.monthExcuses}
                onStart={() => {
                  store.dismissWelcome()
                  setFlow('home')
                }}
              />
            </Screen>
          )}

          {flow === 'home' && (
            <Screen k="home">
              <Home
                store={store}
                onFinish={handleFinish}
                onOpenCalendar={() => setOverlay('calendar')}
                onOpenSettings={() => setOverlay('settings')}
                onVacationRequest={() => setConfirmVacation(true)}
              />
            </Screen>
          )}

          {flow === 'youvsyou' && (
            <Screen k="youvsyou">
              <YouVsYou
                onSave={(excuse) => {
                  store.saveExcuse(excuse)
                  store.recordDay(false, store.doneCount, store.total)
                  // Day is now closed -> locked DayClosed screen takes over.
                  setFlow('home')
                }}
              />
            </Screen>
          )}
        </AnimatePresence>
      )}

      <AnimatePresence>
        {confirmVacation && (
          <ConfirmModal
            title="Activar modo vacaciones"
            message="Tu racha quedará congelada y estos días no contarán como cumplidos ni incumplidos. Podrás volver cuando quieras."
            confirmLabel="Activar vacaciones"
            onConfirm={() => {
              setConfirmVacation(false)
              store.setVacation(true)
            }}
            onCancel={() => setConfirmVacation(false)}
          />
        )}
      </AnimatePresence>
    </Shell>
  )
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto h-[100dvh] w-full max-w-md overflow-hidden bg-white transition-colors dark:bg-black">
      {children}
    </div>
  )
}
