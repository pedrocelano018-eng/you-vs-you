export interface DayRecord {
  date: string // YYYY-MM-DD
  completed: boolean
  done: number
  total: number
  vacation?: boolean
}

export interface AppState {
  version: number
  onboarded: boolean
  /** One routine per weekday, indexed by JS getDay(): 0=Sunday … 6=Saturday. */
  routines: string[][]
  /** Day the current checks belong to (YYYY-MM-DD). */
  currentDay: string
  /** Map of task index -> completed for the current day. */
  checks: Record<number, boolean>
  history: Record<string, DayRecord>
  streak: number
  bestStreak: number
  vacationMode: boolean
}
