import { useState } from 'react'
import { motion } from 'framer-motion'
import { parseRoutineText } from '../lib/defaults'
import { CloseIcon } from './Icons'

interface Props {
  week: string[]
  weekend: string[]
  onSave: (which: 'week' | 'weekend', tasks: string[]) => void
  onClose: () => void
}

export function EditRoutines({ week, weekend, onSave, onClose }: Props) {
  const [tab, setTab] = useState<'week' | 'weekend'>('week')
  const [weekText, setWeekText] = useState(week.join('\n'))
  const [weekendText, setWeekendText] = useState(weekend.join('\n'))

  const text = tab === 'week' ? weekText : weekendText
  const setText = tab === 'week' ? setWeekText : setWeekendText
  const tasks = parseRoutineText(text)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ type: 'spring', stiffness: 200, damping: 26 }}
      className="flex min-h-full flex-col bg-white px-6 safe-top safe-bottom"
    >
      <div className="flex items-center justify-between pt-2">
        <span className="text-[13px] font-medium uppercase tracking-widest text-violet">
          Editar rutinas
        </span>
        <button type="button" onClick={onClose} className="text-violet" aria-label="Cerrar">
          <CloseIcon size={26} />
        </button>
      </div>

      <div className="mt-6 flex gap-2 rounded-full bg-violet-soft p-1">
        {(['week', 'weekend'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={
              'flex-1 rounded-full py-2.5 text-[14px] font-medium transition-colors ' +
              (tab === t ? 'bg-violet text-white' : 'text-violet')
            }
          >
            {t === 'week' ? 'Semana' : 'Fin de semana'}
          </button>
        ))}
      </div>

      <p className="mt-5 text-[14px] text-black/45">
        Pegá la rutina nueva. Cada línea es una tarea. Al guardar reemplaza la
        anterior.
      </p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="mt-4 min-h-[280px] flex-1 resize-none rounded-4xl border-2 border-violet/20 bg-white p-5 text-[15px] leading-relaxed text-black outline-none transition-colors focus:border-violet"
      />

      <div className="mt-3 px-1 text-right text-[13px] text-black/40">
        {tasks.length} {tasks.length === 1 ? 'tarea' : 'tareas'}
      </div>

      <button
        type="button"
        disabled={tasks.length === 0}
        onClick={() => {
          onSave(tab, tasks)
          onClose()
        }}
        className="mt-3 w-full rounded-full bg-violet py-4 text-[16px] font-semibold text-white transition-opacity disabled:opacity-30"
      >
        Guardar rutina
      </button>
    </motion.div>
  )
}
