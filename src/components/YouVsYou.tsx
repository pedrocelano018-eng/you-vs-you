import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  onSave: (excuse: string) => void
}

export function YouVsYou({ onSave }: Props) {
  const [phase, setPhase] = useState<'title' | 'excuse'>('title')
  const [text, setText] = useState('')

  useEffect(() => {
    const t = setTimeout(() => setPhase('excuse'), 2600)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="flex min-h-full flex-col items-center justify-center bg-black px-7 safe-top safe-bottom">
      <AnimatePresence mode="wait">
        {phase === 'title' ? (
          <motion.h1
            key="title"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="text-center text-[46px] font-bold leading-[0.95] tracking-tight text-violet"
          >
            YOU
            <br />
            VS
            <br />
            YOU
          </motion.h1>
        ) : (
          <motion.div
            key="excuse"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <h2 className="text-center text-[24px] font-semibold text-white">
              ¿Cuál es tu excusa?
            </h2>
            <textarea
              autoFocus
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Escribí lo que pasó hoy…"
              className="mt-6 min-h-[160px] w-full resize-none rounded-4xl border-2 border-violet/30 bg-white/[0.04] p-5 text-[15px] leading-relaxed text-white outline-none transition-colors placeholder:text-white/25 focus:border-violet"
            />
            <button
              type="button"
              disabled={text.trim().length === 0}
              onClick={() => onSave(text.trim())}
              className="mt-5 w-full rounded-full bg-violet py-4 text-[16px] font-semibold text-white transition-opacity disabled:opacity-30"
            >
              Guardar
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
