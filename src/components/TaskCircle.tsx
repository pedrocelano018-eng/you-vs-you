import { motion, AnimatePresence } from 'framer-motion'
import { CheckIcon } from './Icons'

interface Props {
  text: string
  checked: boolean
  onToggle: () => void
}

export function TaskCircle({ text, checked, onToggle }: Props) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileTap={{ scale: 0.97 }}
      className="flex w-full items-center gap-4 py-3 text-left"
    >
      <span className="relative flex h-7 w-7 flex-shrink-0 items-center justify-center">
        <motion.span
          initial={false}
          animate={{
            backgroundColor: checked ? '#7C3AED' : 'rgba(124,58,237,0)',
            borderColor: '#7C3AED',
            scale: checked ? 1 : 1,
          }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="absolute inset-0 rounded-full border-2"
        />
        <AnimatePresence>
          {checked && (
            <motion.span
              key="check"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              className="relative text-white"
            >
              <CheckIcon size={16} />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      <span
        className={
          'text-[15px] leading-snug transition-colors duration-300 ' +
          (checked
            ? 'text-black/35 line-through decoration-violet/40'
            : 'text-black')
        }
      >
        {text}
      </span>
    </motion.button>
  )
}
