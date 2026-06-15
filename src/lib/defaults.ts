export const DEFAULT_WEEK = [
  'Aguantar en barra 1 min',
  'Ducha Fría/tibia (alternar día x medio)',
  'Ropa',
  'Desayuno proteico',
  'Lavar dientes, buche, tongue',
  'Crema',
  'Perfume',
  'Pertenencias',
  'Compu',
  'Colegio (ocuparse de CMM y Valken)(Tener almuerzo alto en proteínas y fibras/bajo en grasas y azúcares)',
  'Merienda',
  'Antes de 5:30 una hora entera de estudio hasta 6:30 +🧉',
  'Entrenamiento',
  'Baño',
  'Cena',
  'Libros',
  'Lavar dientes, buche',
  'Crema',
  'Dormir',
]

export const DEFAULT_WEEKEND = [
  '8:00 ducha (frío/calor/frío)',
  'Ropa',
  'Desayuno Banana+cafe',
  'Lavar dientes, buche, tongue',
  'Crema',
  'Perfume',
  'Preparar pedidos',
  'Salir a repartir',
  'Almuerzo',
  'Tele',
  'Terminar de repartir pedidos',
  '1h de estudio +🧉',
  'Entrenamiento',
  'Proyectos',
  'Baño',
  'Cena',
  'Libros',
  'Lavar dientes, buche',
  'Crema',
  'Dormir',
]

/**
 * Default routine per weekday, indexed by JS getDay(): 0=Sunday … 6=Saturday.
 * Weekdays seed with the weekday routine, weekends with the weekend one.
 */
export const DEFAULT_BY_DAY: string[][] = [
  DEFAULT_WEEKEND, // 0 Domingo
  DEFAULT_WEEK, // 1 Lunes
  DEFAULT_WEEK, // 2 Martes
  DEFAULT_WEEK, // 3 Miércoles
  DEFAULT_WEEK, // 4 Jueves
  DEFAULT_WEEK, // 5 Viernes
  DEFAULT_WEEKEND, // 6 Sábado
]

/** Weekday picker order (Monday first), mapping to JS getDay() indices. */
export const WEEKDAY_ORDER: { index: number; label: string; short: string }[] = [
  { index: 1, label: 'Lunes', short: 'Lun' },
  { index: 2, label: 'Martes', short: 'Mar' },
  { index: 3, label: 'Miércoles', short: 'Mié' },
  { index: 4, label: 'Jueves', short: 'Jue' },
  { index: 5, label: 'Viernes', short: 'Vie' },
  { index: 6, label: 'Sábado', short: 'Sáb' },
  { index: 0, label: 'Domingo', short: 'Dom' },
]

export function parseRoutineText(text: string): string[] {
  return text
    .split('\n')
    .map((line) => line.replace(/^\s*[-*•·]\s*/, '').trim())
    .filter((line) => line.length > 0)
}
