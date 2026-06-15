import type { AppState } from './types'
import { todayStr } from './date'

const KEY = 'yvy-state-v1'

export function defaultState(): AppState {
  return {
    version: 2,
    onboarded: false,
    routines: [[], [], [], [], [], [], []],
    currentDay: todayStr(),
    checks: {},
    history: {},
    streak: 0,
    bestStreak: 0,
    vacationMode: false,
  }
}

/** Old shape (v1) used week/weekend routines; map them onto per-day routines. */
interface LegacyState {
  weekRoutine?: string[]
  weekendRoutine?: string[]
  routines?: string[][]
}

function migrate(parsed: Partial<AppState> & LegacyState): Partial<AppState> {
  if (parsed.routines && parsed.routines.length === 7) return parsed
  if (parsed.weekRoutine || parsed.weekendRoutine) {
    const week = parsed.weekRoutine ?? []
    const weekend = parsed.weekendRoutine ?? []
    const routines = [0, 1, 2, 3, 4, 5, 6].map((d) =>
      d === 0 || d === 6 ? [...weekend] : [...week],
    )
    return { ...parsed, routines }
  }
  return parsed
}

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return defaultState()
    const parsed = migrate(JSON.parse(raw))
    return { ...defaultState(), ...parsed }
  } catch {
    return defaultState()
  }
}

export function saveState(state: AppState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    // Storage full or unavailable — fail silently, app stays usable in-memory.
  }
}
