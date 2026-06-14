interface Props {
  on: boolean
  onChange: (on: boolean) => void
}

export function Toggle({ on, onChange }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className={
        'relative h-7 w-12 flex-shrink-0 rounded-full border-2 transition-colors duration-300 ' +
        (on ? 'border-violet bg-violet' : 'border-violet/40 bg-transparent')
      }
    >
      <span
        className={
          'absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full transition-all duration-300 ' +
          (on ? 'left-[22px] bg-white' : 'left-[3px] bg-violet')
        }
      />
    </button>
  )
}
