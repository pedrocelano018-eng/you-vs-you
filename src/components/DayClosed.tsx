import { motion } from 'framer-motion'

interface Props {
  completed: boolean
  streak: number
}

/**
 * Locked end-of-day screen. Once the day is finished it is the only thing the
 * app shows — there is no way back to the routine until a new day begins.
 */
export function DayClosed({ completed, streak }: Props) {
  if (completed) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex min-h-full flex-col items-center justify-center bg-white px-8 text-center transition-colors dark:bg-black safe-top safe-bottom"
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
          className="mt-8 text-[30px] font-semibold leading-tight text-black dark:text-white"
        >
          OBJETIVO
          <br />
          LOGRADO
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-4 text-[15px] text-black/50 dark:text-white/50"
        >
          {streak} {streak === 1 ? 'día' : 'días'} de racha
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95 }}
          className="mt-10 text-[13px] text-black/35 dark:text-white/35"
        >
          Volvé mañana para tu nueva rutina
        </motion.p>
      </motion.div>
    )
  }

  // Incomplete day — black screen, violet YOU VS YOU.
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-full flex-col items-center justify-center bg-black px-8 text-center safe-top safe-bottom"
    >
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-[46px] font-bold leading-[0.95] tracking-tight text-violet"
      >
        YOU
        <br />
        VS
        <br />
        YOU
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-[14px] text-white/40"
      >
        Mañana es otra oportunidad
      </motion.p>
    </motion.div>
  )
}
