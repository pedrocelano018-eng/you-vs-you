import type { AppState } from './types'
import { todayStr } from './date'

const KEY = 'yvy-state-v1'

export function defaultState(): AppState {
  return {
    version: 1,
    onboarded: false,
    weekRoutine: [],
    weekendRoutine: [],
    currentDay: todayStr(),
    checks: {},
    welcomeSeen: '',
    history: {},
    excuses: [],
    streak: 0,
    bestStreak: 0,
    vacationMode: false,
  }
}

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return defaultState()
    const parsed = JSON.parse(raw) as Partial<AppState>
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
