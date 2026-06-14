export interface Category {
  key: string
  label: string
  icon: string
  keywords: string[]
}

/**
 * Categories in priority order. The first one whose keyword appears in the
 * task text wins. "General" is the fallback when nothing matches.
 */
export const CATEGORIES: Category[] = [
  {
    key: 'entrenamiento',
    label: 'Entrenamiento',
    icon: '🏋',
    keywords: ['entren', 'gimnasio', 'gym', 'barra', 'aguantar', 'pesas', 'correr', 'cardio', 'flexion'],
  },
  {
    key: 'lectura',
    label: 'Lectura',
    icon: '📖',
    keywords: ['libro', 'libros', 'lectura', 'leer'],
  },
  {
    key: 'estudio',
    label: 'Estudio',
    icon: '📚',
    keywords: ['estudi', 'apuntes', 'repasar', 'tarea', 'examen'],
  },
  {
    key: 'alimentacion',
    label: 'Alimentación',
    icon: '🍽',
    keywords: ['desayuno', 'almuerzo', 'almorzar', 'cena', 'cenar', 'merienda', 'comer', 'comida', 'cafe', 'café', 'banana', 'proteic', 'proteina', 'proteína', 'mate', '🧉'],
  },
  {
    key: 'higiene',
    label: 'Higiene',
    icon: '🧴',
    keywords: ['ducha', 'baño', 'bano', 'dientes', 'buche', 'crema', 'perfume', 'tongue', 'lavar', 'afeitar', 'higiene'],
  },
  {
    key: 'colegio',
    label: 'Colegio',
    icon: '🏫',
    keywords: ['colegio', 'escuela', 'clase', 'facultad', 'universidad', 'cmm', 'valken'],
  },
  {
    key: 'trabajo',
    label: 'Trabajo / Proyectos',
    icon: '💻',
    keywords: ['compu', 'trabajo', 'proyecto', 'pedidos', 'repartir', 'reparto', 'cliente', 'código', 'codigo'],
  },
  {
    key: 'descanso',
    label: 'Descanso',
    icon: '🌙',
    keywords: ['dormir', 'descanso', 'descansar', 'siesta', 'sueño', 'tele'],
  },
]

export const GENERAL: Category = {
  key: 'general',
  label: 'General',
  icon: '✦',
  keywords: [],
}

function normalize(s: string): string {
  return s.toLowerCase()
}

export function categorize(task: string): Category {
  const text = normalize(task)
  for (const cat of CATEGORIES) {
    if (cat.keywords.some((k) => text.includes(k))) return cat
  }
  return GENERAL
}

export interface TaskGroup {
  category: Category
  /** Original indices into the routine array. */
  items: { index: number; text: string }[]
}

/**
 * Group tasks by category, preserving the input order within each group and
 * ordering the groups by their first appearance.
 */
export function groupTasks(tasks: string[]): TaskGroup[] {
  const order: string[] = []
  const map = new Map<string, TaskGroup>()

  tasks.forEach((text, index) => {
    const cat = categorize(text)
    if (!map.has(cat.key)) {
      map.set(cat.key, { category: cat, items: [] })
      order.push(cat.key)
    }
    map.get(cat.key)!.items.push({ index, text })
  })

  return order.map((k) => map.get(k)!)
}
