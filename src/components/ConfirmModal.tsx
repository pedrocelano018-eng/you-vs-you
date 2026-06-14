import { motion } from 'framer-motion'

interface Props {
  title: string
  message: string
  confirmLabel: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmModal({
  title,
  message,
  confirmLabel,
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
}: Props) {
  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/40 px-5 pb-8 backdrop-blur-sm">
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        className="w-full max-w-sm rounded-4xl bg-white p-6 text-center"
      >
        <h2 className="text-[20px] font-semibold text-black">{title}</h2>
        <p className="mt-2 text-[14px] leading-relaxed text-black/50">{message}</p>
        <button
          type="button"
          onClick={onConfirm}
          className="mt-6 w-full rounded-full bg-violet py-3.5 text-[15px] font-semibold text-white"
        >
          {confirmLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="mt-2 w-full rounded-full py-3 text-[15px] font-medium text-black/45"
        >
          {cancelLabel}
        </button>
      </motion.div>
    </div>
  )
}
