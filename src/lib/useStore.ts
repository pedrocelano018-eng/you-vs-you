import { useCallback, useEffect, useMemo, useState } from 'react'
import type { AppState, Excuse } from './types'
import { loadState, saveState } from './storage'
import { todayStr, isWeekend, monthKey, currentMonthKey } from './date'

let uid = 0
function makeId(): string {
  uid += 1
  return `${Date.now()}-${uid}`
}

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
      // New day: clear checks, point currentDay at today, reset welcome flag.
      // History and stats are preserved untouched.
      return {
        ...prev,
        currentDay: today,
        checks: {},
        welcomeSeen: '',
      }
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
    return isWeekend(state.currentDay) ? state.weekendRoutine : state.weekRoutine
  }, [state.currentDay, state.weekRoutine, state.weekendRoutine])

  const doneCount = useMemo(
    () => Object.values(state.checks).filter(Boolean).length,
    [state.checks],
  )

  const total = todayRoutine.length
  const progress = total === 0 ? 0 : Math.round((doneCount / total) * 100)

  const monthExcuses = useMemo(
    () => state.excuses.filter((e) => e.month === currentMonthKey()),
    [state.excuses],
  )

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

  const setRoutines = useCallback((week: string[], weekend: string[]) => {
    setState((p) => ({
      ...p,
      weekRoutine: week,
      weekendRoutine: weekend,
      onboarded: true,
    }))
  }, [])

  const updateRoutine = useCallback(
    (which: 'week' | 'weekend', tasks: string[]) => {
      setState((p) => ({
        ...p,
        ...(which === 'week'
          ? { weekRoutine: tasks }
          : { weekendRoutine: tasks }),
        // If we replaced the routine that's active today, clear its checks.
        ...(which === (isWeekend(p.currentDay) ? 'weekend' : 'week')
          ? { checks: {} }
          : {}),
      }))
    },
    [],
  )

  const toggleTask = useCallback((index: number) => {
    setState((p) => ({
      ...p,
      checks: { ...p.checks, [index]: !p.checks[index] },
    }))
  }, [])

  const dismissWelcome = useCallback(() => {
    setState((p) => ({ ...p, welcomeSeen: todayStr() }))
  }, [])

  const recordDay = useCallback(
    (completed: boolean, done: number, totalTasks: number) => {
      setState((p) => {
        const today = p.currentDay
        const record = {
          date: today,
          completed,
          done,
          total: totalTasks,
        }
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

  const saveExcuse = useCallback((text: string) => {
    setState((p) => {
      const today = p.currentDay
      const excuse: Excuse = {
        id: makeId(),
        date: today,
        month: monthKey(today),
        text: text.trim(),
      }
      return { ...p, excuses: [...p.excuses, excuse] }
    })
  }, [])

  const setVacation = useCallback((on: boolean) => {
    setState((p) => {
      if (on) {
        // Mark today as a vacation day so the calendar shows the umbrella.
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
    monthExcuses,
    monthStats,
    // actions
    setRoutines,
    updateRoutine,
    toggleTask,
    dismissWelcome,
    recordDay,
    saveExcuse,
    setVacation,
  }
}

export type Store = ReturnType<typeof useStore>
