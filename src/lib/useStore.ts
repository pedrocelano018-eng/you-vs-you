import { useCallback, useEffect, useMemo, useState } from 'react'
import type { AppState } from './types'
import { loadState, saveState } from './storage'
import { todayStr, monthKey, currentMonthKey, parseDate } from './date'

export function useStore() {
  const [state, setState] = useState<AppState>(() => loadState())

  // Persist on every change.
  useEffect(() => {
    saveState(state)
  }, [state])

  // Detect a new day whenever the app gains focus / mounts.
  const syncDay = useCallback(() => {
    setState((prev) => {
      const today = todayStr()
      if (prev.currentDay === today) return prev
      // New day: clear checks and point currentDay at today.
      // History and stats are preserved untouched.
      return { ...prev, currentDay: today, checks: {} }
    })
  }, [])

  useEffect(() => {
    syncDay()
    const onFocus = () => syncDay()
    const onVisible = () => {
      if (document.visibilityState === 'visible') syncDay()
    }
    window.addEventListener('focus', onFocus)
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      window.removeEventListener('focus', onFocus)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [syncDay])

  const todayRoutine = useMemo(() => {
    const weekday = parseDate(state.currentDay).getDay()
    return state.routines[weekday] ?? []
  }, [state.currentDay, state.routines])

  const doneCount = useMemo(
    () => Object.values(state.checks).filter(Boolean).length,
    [state.checks],
  )

  const total = todayRoutine.length
  const progress = total === 0 ? 0 : Math.round((doneCount / total) * 100)

  // Monthly percentage of completed days (ignoring vacation days).
  const monthStats = useMemo(() => {
    const mk = currentMonthKey()
    const days = Object.values(state.history).filter(
      (d) => monthKey(d.date) === mk && !d.vacation,
    )
    const completed = days.filter((d) => d.completed).length
    const pct = days.length === 0 ? 0 : Math.round((completed / days.length) * 100)
    return { pct, completed, counted: days.length }
  }, [state.history])

  // --- Actions ---

  const setRoutines = useCallback((routines: string[][]) => {
    setState((p) => ({ ...p, routines, onboarded: true }))
  }, [])

  const updateRoutine = useCallback((weekday: number, tasks: string[]) => {
    setState((p) => {
      const routines = p.routines.map((r, i) => (i === weekday ? tasks : r))
      const isToday = parseDate(p.currentDay).getDay() === weekday
      return { ...p, routines, ...(isToday ? { checks: {} } : {}) }
    })
  }, [])

  const toggleTask = useCallback((index: number) => {
    setState((p) => ({
      ...p,
      checks: { ...p.checks, [index]: !p.checks[index] },
    }))
  }, [])

  const recordDay = useCallback(
    (completed: boolean, done: number, totalTasks: number) => {
      setState((p) => {
        const today = p.currentDay
        const record = { date: today, completed, done, total: totalTasks }
        const newStreak = completed ? p.streak + 1 : 0
        return {
          ...p,
          history: { ...p.history, [today]: record },
          streak: newStreak,
          bestStreak: Math.max(p.bestStreak, newStreak),
        }
      })
    },
    [],
  )

  const setVacation = useCallback((on: boolean) => {
    setState((p) => {
      if (on) {
        const today = p.currentDay
        return {
          ...p,
          vacationMode: true,
          history: {
            ...p.history,
            [today]: {
              date: today,
              completed: false,
              done: 0,
              total: 0,
              vacation: true,
            },
          },
        }
      }
      return { ...p, vacationMode: false }
    })
  }, [])

  return {
    state,
    todayRoutine,
    doneCount,
    total,
    progress,
    monthStats,
    // actions
    setRoutines,
    updateRoutine,
    toggleTask,
    recordDay,
    setVacation,
  }
}

export type Store = ReturnType<typeof useStore>
