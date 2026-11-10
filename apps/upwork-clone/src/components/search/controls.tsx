import { useState, type ReactNode } from 'react'
import { IconChevronUp } from './icons'

export function FilterGroup({
  title,
  children,
  info = false,
}: {
  title: string
  children: ReactNode
  info?: boolean
}) {
  const [open, setOpen] = useState(true)
  return (
    <section className="border-b border-[#e4ebe4] py-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 text-left text-[15px] font-semibold text-[#001e00]"
      >
        <span className="flex items-center gap-1.5">
          {title}
          {info ? (
            <span className="text-[#9aaa97]" title="Filter info">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 11v5" strokeLinecap="round" />
                <circle cx="12" cy="7.8" r="0.7" fill="currentColor" stroke="none" />
              </svg>
            </span>
          ) : null}
        </span>
        <IconChevronUp
          className={`h-4 w-4 shrink-0 text-[#5e6d55] transition-transform duration-200 ${open ? '' : 'rotate-180'}`}
        />
      </button>
      {open ? <div className="mt-2">{children}</div> : null}
    </section>
  )
}

export function CheckRow({
  checked,
  onChange,
  label,
  count,
  adornment,
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  count?: number
  adornment?: ReactNode
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-1.5 text-[15px] text-[#001e00]">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 shrink-0 cursor-pointer rounded border-[#9aaa97] accent-[#108a00]"
      />
      {adornment}
      <span className="font-medium">
        {label}
        {count !== undefined ? <span className="font-normal text-[#5e6d55]"> ({count})</span> : null}
      </span>
    </label>
  )
}

export function RadioRow({
  name,
  checked,
  onChange,
  label,
}: {
  name: string
  checked: boolean
  onChange: () => void
  label: string
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-1.5 text-[15px] text-[#001e00]">
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-5 w-5 shrink-0 cursor-pointer accent-[#108a00]"
      />
      <span className="font-medium">{label}</span>
    </label>
  )
}

export function MoneyInput({
  value,
  onChange,
  placeholder,
  ariaLabel,
}: {
  value: string
  onChange: (value: string) => void
  placeholder: string
  ariaLabel: string
}) {
  return (
    <span className="flex items-center gap-1 rounded-full border border-[#9aaa97] px-3 py-1.5 focus-within:border-[#108a00]">
      <span className="text-[#5e6d55]">$</span>
      <input
        type="number"
        min={0}
        inputMode="numeric"
        value={value}
        aria-label={ariaLabel}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-14 bg-transparent text-[15px] text-[#001e00] outline-none placeholder:text-[#9aaa97]"
      />
    </span>
  )
}
