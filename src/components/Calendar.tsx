import { useState } from 'react'
import { motion } from 'framer-motion'
import type { DayRecord } from '../lib/types'
import { todayStr, monthName } from '../lib/date'
import { CloseIcon, UmbrellaIcon, ArrowRight } from './Icons'

interface Props {
  history: Record<string, DayRecord>
  onClose: () => void
}

const WEEKDAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export function Calendar({ history, onClose }: Props) {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth()) // 0-11

  const monthKeyStr = `${year}-${pad(month + 1)}`
  const firstDay = new Date(year, month, 1)
  // Convert JS Sunday=0 to Monday-first index.
  const startOffset = (firstDay.getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = todayStr()

  const counted = Object.values(history).filter(
    (d) => d.date.startsWith(monthKeyStr) && !d.vacation,
  )
  const completed = counted.filter((d) => d.completed).length
  const pct = counted.length === 0 ? 0 : Math.round((completed / counted.length) * 100)

  const cells: (number | null)[] = []
  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  function shift(delta: number) {
    let m = month + delta
    let y = year
    if (m < 0) {
      m = 11
      y -= 1
    } else if (m > 11) {
      m = 0
      y += 1
    }
    setMonth(m)
    setYear(y)
  }

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
          Calendario
        </span>
        <button
          type="button"
          onClick={onClose}
          className="text-violet"
          aria-label="Cerrar"
        >
          <CloseIcon size={26} />
        </button>
      </div>

      <h1 className="mt-6 text-[26px] font-semibold text-black">
        <span className="text-violet">{pct}%</span> Mi mejor versión
      </h1>
      <p className="mt-1 text-[14px] text-black/45">
        {completed} de {counted.length} días cumplidos este mes
      </p>

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={() => shift(-1)}
          className="rotate-180 text-violet"
          aria-label="Mes anterior"
        >
          <ArrowRight size={22} />
        </button>
        <span className="text-[17px] font-semibold capitalize text-black">
          {monthName(monthKeyStr)} {year}
        </span>
        <button
          type="button"
          onClick={() => shift(1)}
          className="text-violet"
          aria-label="Mes siguiente"
        >
          <ArrowRight size={22} />
        </button>
      </div>

      <div className="mt-5 grid grid-cols-7 gap-1.5 text-center">
        {WEEKDAYS.map((w, i) => (
          <span key={i} className="text-[11px] font-medium text-black/30">
            {w}
          </span>
        ))}
        {cells.map((day, i) => {
          if (day === null) return <span key={`e${i}`} />
          const dateStr = `${monthKeyStr}-${pad(day)}`
          const rec = history[dateStr]
          const isToday = dateStr === today
          const vacation = rec?.vacation
          const complete = rec?.completed
          const incomplete = rec && !rec.completed && !rec.vacation

          return (
            <div
              key={dateStr}
              className={
                'relative flex aspect-square items-center justify-center rounded-2xl border text-[13px] ' +
                (vacation
                  ? 'border-violet/40 text-violet'
                  : complete
                    ? 'border-violet bg-violet/30 font-semibold text-black'
                    : incomplete
                      ? 'border-violet/60 text-black/70'
                      : 'border-black/[0.06] text-black/35') +
                (isToday ? ' ring-2 ring-violet ring-offset-1' : '')
              }
            >
              {vacation ? <UmbrellaIcon size={15} /> : day}
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
