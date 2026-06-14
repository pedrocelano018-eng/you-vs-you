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

export function parseRoutineText(text: string): string[] {
  return text
    .split('\n')
    .map((line) => line.replace(/^\s*[-*•·]\s*/, '').trim())
    .filter((line) => line.length > 0)
}
