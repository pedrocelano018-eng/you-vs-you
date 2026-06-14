import { motion } from 'framer-motion'

interface Props {
  streak: number
  onClose: () => void
}

export function GoalAchieved({ streak, onClose }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-full flex-col items-center justify-center bg-white px-8 text-center safe-top safe-bottom"
    >
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
        className="flex h-28 w-28 items-center justify-center rounded-full bg-violet"
      >
        <motion.svg
          width={56}
          height={56}
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth={2.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            d="M5 12.5l4.2 4.2L19 7"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />
        </motion.svg>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-[30px] font-semibold leading-tight text-black"
      >
        OBJETIVO
        <br />
        LOGRADO
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-4 text-[15px] text-black/50"
      >
        {streak} {streak === 1 ? 'día' : 'días'} de racha
      </motion.p>

      <motion.button
        type="button"
        onClick={onClose}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mt-12 w-full max-w-xs rounded-full border-2 border-violet py-4 text-[16px] font-semibold text-violet"
      >
        Cerrar el día
      </motion.button>
    </motion.div>
  )
}
