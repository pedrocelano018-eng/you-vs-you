import { motion } from 'framer-motion'
import type { Store } from '../lib/useStore'
import { greeting, prettyDate } from '../lib/date'
import { ProgressBar } from './ProgressBar'
import { TaskCircle } from './TaskCircle'
import { Toggle } from './Toggle'
import { CalendarIcon, SettingsIcon } from './Icons'

interface Props {
  store: Store
  onFinish: () => void
  onOpenCalendar: () => void
  onOpenSettings: () => void
  onVacationRequest: () => void
}

export function Home({
  store,
  onFinish,
  onOpenCalendar,
  onOpenSettings,
  onVacationRequest,
}: Props) {
  const { state, todayRoutine, doneCount, total, progress } = store

  return (
    <div className="flex min-h-full flex-col bg-white px-6 transition-colors dark:bg-black safe-top safe-bottom">
      {/* Header */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onOpenSettings}
          className="text-violet"
          aria-label="Ajustes"
        >
          <SettingsIcon size={24} />
        </button>
        <button
          type="button"
          onClick={onOpenCalendar}
          className="text-violet"
          aria-label="Calendario"
        >
          <CalendarIcon size={24} />
        </button>
      </div>

      {/* Greeting */}
      <div className="mt-6">
        <h1 className="text-[30px] font-semibold leading-tight text-black dark:text-white">
          {greeting()}
        </h1>
        <p className="mt-1 text-[15px] capitalize text-black/45 dark:text-white/40">
          {prettyDate(state.currentDay)}
        </p>
      </div>

      {/* Progress */}
      <div className="mt-7">
        <div className="mb-3 flex items-baseline justify-between">
          <motion.span
            key={progress}
            initial={{ opacity: 0.4, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[40px] font-bold leading-none text-violet"
          >
            {progress}%
          </motion.span>
          <span className="text-[14px] font-medium text-black/45 dark:text-white/40">
            {doneCount}/{total} tareas completadas
          </span>
        </div>
        <ProgressBar progress={progress} />
      </div>

      {/* Tasks in the exact order they were entered */}
      <div className="mt-7 flex-1">
        <div className="divide-y divide-black/[0.05] dark:divide-white/[0.07]">
          {todayRoutine.map((text, index) => (
            <TaskCircle
              key={index}
              text={text}
              checked={!!state.checks[index]}
              onToggle={() => store.toggleTask(index)}
            />
          ))}
        </div>

        {/* Vacation switch — discreet */}
        <div className="mt-7 flex items-center justify-between rounded-3xl border border-violet/20 px-5 py-3.5">
          <div>
            <p className="text-[14px] font-medium text-black dark:text-white">
              Modo vacaciones
            </p>
            <p className="text-[12px] text-black/40 dark:text-white/40">
              Congela tu racha
            </p>
          </div>
          <Toggle on={false} onChange={() => onVacationRequest()} />
        </div>
      </div>

      {/* Finish button */}
      <button
        type="button"
        onClick={onFinish}
        className="mt-6 w-full rounded-full bg-violet py-4 text-[16px] font-semibold text-white"
      >
        Terminé el día
      </button>
    </div>
  )
}
