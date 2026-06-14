import { motion } from 'framer-motion'

interface Props {
  progress: number
}

export function ProgressBar({ progress }: Props) {
  return (
    <div className="h-5 w-full overflow-hidden rounded-full bg-violet-soft">
      <motion.div
        className="h-full rounded-full bg-violet"
        initial={false}
        animate={{ width: `${progress}%` }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      />
    </div>
  )
}
