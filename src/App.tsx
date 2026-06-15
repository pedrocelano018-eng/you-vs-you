import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from './lib/useStore'
import { useTheme } from './lib/theme'
import { Onboarding } from './components/Onboarding'
import { Home } from './components/Home'
import { DayClosed } from './components/DayClosed'
import { Calendar } from './components/Calendar'
import { EditRoutines } from './components/EditRoutines'
import { Vacation } from './components/Vacation'
import { ConfirmModal } from './components/ConfirmModal'

type Overlay = 'none' | 'calendar' | 'settings'

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

  const [overlay, setOverlay] = useState<Overlay>('none')
  const [confirmVacation, setConfirmVacation] = useState(false)

  // The record for today, if the day has already been closed.
  const todayRecord = state.history[state.currentDay]
  const dayClosed = !!todayRecord && !todayRecord.vacation

  // --- Onboarding ---
  if (!state.onboarded) {
    return (
      <Shell>
        <Onboarding onDone={(routines) => store.setRoutines(routines)} />
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
  if (dayClosed) {
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
    // Recording closes the day either way -> the locked DayClosed screen
    // takes over (completed = OBJETIVO LOGRADO, else "Día no completado").
    store.recordDay(complete, done, total)
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
              routines={state.routines}
              theme={theme}
              onToggleTheme={toggleTheme}
              onSave={store.updateRoutine}
              onClose={() => setOverlay('none')}
            />
          </Screen>
        )}
      </AnimatePresence>

      {overlay === 'none' && (
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
