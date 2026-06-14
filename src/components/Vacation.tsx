import { motion } from 'framer-motion'
import { Toggle } from './Toggle'

interface Props {
  onEnd: () => void
}

export function Vacation({ onEnd }: Props) {
  return (
    <div className="flex min-h-full flex-col items-center justify-center bg-white px-8 text-center safe-top safe-bottom">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <UmbrellaScene />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-10 text-[34px] font-semibold tracking-tight text-black"
      >
        Vacaciones
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-3 max-w-xs text-[15px] leading-relaxed text-black/45"
      >
        Tu racha está congelada. Estos días no cuentan. Volvé cuando quieras.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="mt-12 flex items-center gap-4"
      >
        <span className="text-[15px] font-medium text-black">
          Finalizar vacaciones
        </span>
        <Toggle on={true} onChange={() => onEnd()} />
      </motion.div>
    </div>
  )
}

function UmbrellaScene() {
  return (
    <svg width={180} height={180} viewBox="0 0 200 200" fill="none">
      {/* sand */}
      <path
        d="M0 168c34-14 62-14 100-14s66 0 100 14v40H0z"
        fill="#7C3AED"
        fillOpacity={0.1}
      />
      <path d="M0 168c34-14 62-14 100-14s66 0 100 14" stroke="#7C3AED" strokeWidth={2.5} />
      {/* pole */}
      <path d="M118 56l-28 100" stroke="#000" strokeWidth={3} strokeLinecap="round" />
      {/* canopy */}
      <path
        d="M118 56C150 44 178 56 186 80c-22-8-30 2-44 6 8-22 0-36-24-30z"
        fill="#7C3AED"
      />
      <path
        d="M118 56C92 50 70 64 64 88c18-12 28-6 44-2-2-18 2-28 10-30z"
        fill="#000"
      />
      <path
        d="M118 56C150 44 178 56 186 80M118 56C92 50 70 64 64 88"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
      />
      {/* sun */}
      <circle cx="48" cy="44" r="14" stroke="#7C3AED" strokeWidth={2.5} />
    </svg>
  )
}
