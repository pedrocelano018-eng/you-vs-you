const DAY_NAMES = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
]

const MONTH_NAMES = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
]

/** Local date as YYYY-MM-DD (no timezone shifting). */
export function todayStr(d: Date = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function monthKey(dateStr: string): string {
  return dateStr.slice(0, 7)
}

export function currentMonthKey(): string {
  return todayStr().slice(0, 7)
}

export function parseDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function isWeekend(dateStr: string): boolean {
  const day = parseDate(dateStr).getDay()
  return day === 0 || day === 6
}

export function dayName(dateStr: string): string {
  return DAY_NAMES[parseDate(dateStr).getDay()]
}

export function monthName(key: string): string {
  const m = Number(key.split('-')[1]) - 1
  return MONTH_NAMES[m] ?? ''
}

export function greeting(d: Date = new Date()): string {
  const h = d.getHours()
  if (h < 6) return 'Buenas noches'
  if (h < 13) return 'Buenos días'
  if (h < 20) return 'Buenas tardes'
  return 'Buenas noches'
}

export function prettyDate(dateStr: string): string {
  const d = parseDate(dateStr)
  return `${dayName(dateStr)} ${d.getDate()} de ${monthName(monthKey(dateStr))}`
}
