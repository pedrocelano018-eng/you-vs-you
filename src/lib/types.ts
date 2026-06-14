export interface DayRecord {
  date: string // YYYY-MM-DD
  completed: boolean
  done: number
  total: number
  vacation?: boolean
}

export interface Excuse {
  id: string
  date: string // YYYY-MM-DD
  month: string // YYYY-MM
  text: string
}

export interface AppState {
  version: number
  onboarded: boolean
  weekRoutine: string[]
  weekendRoutine: string[]
  /** Day the current checks belong to (YYYY-MM-DD). */
  currentDay: string
  /** Map of task index -> completed for the current day. */
  checks: Record<number, boolean>
  /** Whether the welcome (excuses) screen was already dismissed today. */
  welcomeSeen: string
  history: Record<string, DayRecord>
  excuses: Excuse[]
  streak: number
  bestStreak: number
  vacationMode: boolean
}
