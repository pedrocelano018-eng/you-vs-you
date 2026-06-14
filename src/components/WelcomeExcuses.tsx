import { motion } from 'framer-motion'
import type { Excuse } from '../lib/types'
import { monthName, currentMonthKey } from '../lib/date'

interface Props {
  excuses: Excuse[]
  onStart: () => void
}

export function WelcomeExcuses({ excuses, onStart }: Props) {
  const month = monthName(currentMonthKey())

  return (
    <div className="flex min-h-full flex-col bg-black px-6 safe-top safe-bottom">
      <div className="pt-8">
        <p className="text-[13px] font-medium uppercase tracking-widest text-violet">
          {month}
        </p>
        <h1 className="mt-2 text-[26px] font-semibold leading-tight text-white">
          Tus excusas de este mes
        </h1>
        <p className="mt-2 text-[14px] text-white/40">
          Leelas antes de empezar. Que no se repitan.
        </p>
      </div>

      <div className="no-scrollbar mt-6 flex-1 space-y-3 overflow-y-auto pb-4">
        {excuses.map((e, i) => (
          <motion.div
            key={e.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.06, 0.6), duration: 0.3 }}
            className="max-w-[85%] rounded-4xl rounded-bl-lg bg-white/[0.08] px-5 py-3.5"
          >
            <p className="text-[15px] leading-relaxed text-white/90">{e.text}</p>
            <p className="mt-1 text-[11px] text-white/30">{e.date}</p>
          </motion.div>
        ))}
      </div>

      <button
        type="button"
        onClick={onStart}
        className="mt-2 w-full rounded-full bg-violet py-4 text-[16px] font-semibold text-white"
      >
        COMENZAR RUTINA
      </button>
    </div>
  )
}
