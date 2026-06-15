import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { parseRoutineText, DEFAULT_BY_DAY, WEEKDAY_ORDER } from '../lib/defaults'

interface Props {
  onDone: (routines: string[][]) => void
}

function RoutineStep({
  label,
  position,
  placeholder,
  defaultFill,
  isLast,
  initial,
  onSubmit,
}: {
  label: string
  position: string
  placeholder: string
  defaultFill: string[]
  isLast: boolean
  initial: string
  onSubmit: (tasks: string[]) => void
}) {
  const [text, setText] = useState(initial)
  const tasks = parseRoutineText(text)

  return (
    <div className="flex min-h-full flex-col px-6 safe-top safe-bottom">
      <div className="pt-6">
        <p className="text-[13px] font-medium uppercase tracking-widest text-violet">
          {position}
        </p>
        <h1 className="mt-2 text-[28px] font-semibold leading-tight text-black dark:text-white">
          Rutina de {label}
        </h1>
        <p className="mt-2 text-[15px] text-black/50 dark:text-white/45">
          Pegá tu rutina para el {label}. Cada línea es una tarea.
        </p>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        className="mt-6 min-h-[240px] flex-1 resize-none rounded-4xl border-2 border-violet/20 bg-white p-5 text-[15px] leading-relaxed text-black outline-none transition-colors placeholder:text-black/30 focus:border-violet dark:bg-white/[0.04] dark:text-white dark:placeholder:text-white/25"
      />

      <div className="mt-3 flex items-center justify-between px-1">
        <button
          type="button"
          onClick={() => setText(defaultFill.join('\n'))}
          className="text-[13px] font-medium text-violet"
        >
          Usar rutina de ejemplo
        </button>
        <span className="text-[13px] text-black/40 dark:text-white/40">
          {tasks.length} {tasks.length === 1 ? 'tarea' : 'tareas'}
        </span>
      </div>

      <button
        type="button"
        disabled={tasks.length === 0}
        onClick={() => onSubmit(tasks)}
        className="mt-4 w-full rounded-full bg-violet py-4 text-[16px] font-semibold text-white transition-opacity disabled:opacity-30"
      >
        {isLast ? 'Empezar' : 'Continuar'}
      </button>
    </div>
  )
}

export function Onboarding({ onDone }: Props) {
  const [step, setStep] = useState(0)
  // routines indexed by JS getDay(); filled as the user advances.
  const [routines, setRoutines] = useState<string[][]>([[], [], [], [], [], [], []])

  const day = WEEKDAY_ORDER[step]

  return (
    <div className="min-h-full bg-white transition-colors dark:bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.3 }}
          className="min-h-full"
        >
          <RoutineStep
            label={day.label}
            position={`Día ${step + 1} de 7`}
            placeholder={'Levantarse\nDesayunar\nGimnasio\nEstudiar'}
            defaultFill={DEFAULT_BY_DAY[day.index]}
            isLast={step === WEEKDAY_ORDER.length - 1}
            initial={routines[day.index].join('\n')}
            onSubmit={(tasks) => {
              const next = routines.map((r, i) => (i === day.index ? tasks : r))
              setRoutines(next)
              if (step === WEEKDAY_ORDER.length - 1) {
                onDone(next)
              } else {
                setStep(step + 1)
              }
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
