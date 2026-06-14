import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { parseRoutineText, DEFAULT_WEEK, DEFAULT_WEEKEND } from '../lib/defaults'

interface Props {
  onDone: (week: string[], weekend: string[]) => void
}

function RoutineStep({
  title,
  subtitle,
  placeholder,
  defaultFill,
  cta,
  onSubmit,
}: {
  title: string
  subtitle: string
  placeholder: string
  defaultFill: string[]
  cta: string
  onSubmit: (tasks: string[]) => void
}) {
  const [text, setText] = useState('')
  const tasks = parseRoutineText(text)

  return (
    <div className="flex min-h-full flex-col px-6 safe-top safe-bottom">
      <div className="pt-6">
        <h1 className="text-[28px] font-semibold leading-tight text-black">
          {title}
        </h1>
        <p className="mt-2 text-[15px] text-black/50">{subtitle}</p>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        className="mt-6 min-h-[260px] flex-1 resize-none rounded-4xl border-2 border-violet/20 bg-white p-5 text-[15px] leading-relaxed text-black outline-none transition-colors placeholder:text-black/30 focus:border-violet"
      />

      <div className="mt-3 flex items-center justify-between px-1">
        <button
          type="button"
          onClick={() => setText(defaultFill.join('\n'))}
          className="text-[13px] font-medium text-violet"
        >
          Usar rutina de ejemplo
        </button>
        <span className="text-[13px] text-black/40">
          {tasks.length} {tasks.length === 1 ? 'tarea' : 'tareas'}
        </span>
      </div>

      <button
        type="button"
        disabled={tasks.length === 0}
        onClick={() => onSubmit(tasks)}
        className="mt-4 w-full rounded-full bg-violet py-4 text-[16px] font-semibold text-white transition-opacity disabled:opacity-30"
      >
        {cta}
      </button>
    </div>
  )
}

export function Onboarding({ onDone }: Props) {
  const [step, setStep] = useState<0 | 1>(0)
  const [week, setWeek] = useState<string[]>([])

  return (
    <div className="min-h-full bg-white">
      <AnimatePresence mode="wait">
        {step === 0 ? (
          <motion.div
            key="week"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3 }}
            className="min-h-full"
          >
            <RoutineStep
              title="Tu rutina de semana"
              subtitle="Pegá tu rutina de lunes a viernes. Cada línea es una tarea."
              placeholder={'Levantarse\nDesayunar\nGimnasio\nEstudiar'}
              defaultFill={DEFAULT_WEEK}
              cta="Continuar"
              onSubmit={(tasks) => {
                setWeek(tasks)
                setStep(1)
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="weekend"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3 }}
            className="min-h-full"
          >
            <RoutineStep
              title="Tu rutina de fin de semana"
              subtitle="Pegá tu rutina de sábado y domingo."
              placeholder={'Dormir hasta tarde\nDesayuno\nProyectos'}
              defaultFill={DEFAULT_WEEKEND}
              cta="Empezar"
              onSubmit={(tasks) => onDone(week, tasks)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
