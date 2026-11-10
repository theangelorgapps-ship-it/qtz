/* Inline SVG line icons in Upwork green, replacing the CDN-served
   category icons from the source capture. */

type IconProps = { className?: string }

const stroke = {
  stroke: '#14a800',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  fill: 'none',
}

export function AtomIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" {...stroke}>
      <circle cx="24" cy="24" r="3.2" />
      <ellipse cx="24" cy="24" rx="18" ry="7.5" />
      <ellipse cx="24" cy="24" rx="18" ry="7.5" transform="rotate(60 24 24)" />
      <ellipse cx="24" cy="24" rx="18" ry="7.5" transform="rotate(120 24 24)" />
    </svg>
  )
}

export function CodeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" {...stroke}>
      <path d="M16 16 6 24l10 8M32 16l10 8-10 8M27 10l-6 28" />
    </svg>
  )
}

export function PaletteIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" {...stroke}>
      <path d="M24 6c10 0 18 7.2 18 16.2 0 6.3-4.7 9.8-10 9.8h-3.5c-1.7 0-2.5 1.3-2.5 2.4 0 1.8 1.4 2.2 1.4 3.9 0 1.5-1.4 2.7-3.4 2.7C14 41 6 33.8 6 24 6 14.1 14 6 24 6z" />
      <circle cx="14.5" cy="20" r="2.2" />
      <circle cx="21.5" cy="13.5" r="2.2" />
      <circle cx="30.5" cy="14.5" r="2.2" />
      <circle cx="35.5" cy="22" r="2.2" />
    </svg>
  )
}

export function HandshakeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" {...stroke}>
      <path d="M15 10l-9 6v14l8 5 10 7 10-7 8-5V16l-9-6-9 8-9-8z" />
      <path d="M24 18l-8 8 4 4 8-8M15 10v13M33 10v13" />
    </svg>
  )
}

export function PenNibIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" {...stroke}>
      <path d="M30 6l12 12-8 8-12-12 8-8zM22 14L8 40l18-6M8 40l6-6" />
      <circle cx="26" cy="22" r="2.4" />
    </svg>
  )
}

export function HeadsetIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" {...stroke}>
      <path d="M10 30v-6a14 14 0 0128 0v6" />
      <rect x="6" y="28" width="8" height="10" rx="3" />
      <rect x="34" y="28" width="8" height="10" rx="3" />
      <path d="M38 38a8 8 0 01-8 6h-4" />
      <circle cx="22" cy="44" r="2" />
    </svg>
  )
}

export function BankIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" {...stroke}>
      <path d="M6 18L24 6l18 12M8 20v16M16 20v16M32 20v16M40 20v16M4 40h40M4 36h40" />
    </svg>
  )
}

export function ScalesIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" {...stroke}>
      <path d="M24 6v34M12 40h24M24 12h14M24 12H10" />
      <path d="M6 26l4-12 4 12a4.5 4.5 0 01-8 0zM34 26l4-12 4 12a4.5 4.5 0 01-8 0z" />
    </svg>
  )
}

export function PeopleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" {...stroke}>
      <circle cx="17" cy="15" r="6" />
      <path d="M5 40c0-7 5-11 12-11s12 4 12 11" />
      <circle cx="34" cy="18" r="4.5" />
      <path d="M34 29c5.5.5 9 4 9 9" />
    </svg>
  )
}

export function ToolsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" {...stroke}>
      <path d="M32 6a8 8 0 00-7.6 10.5L8 33a5 5 0 007 7l16.5-16.4A8 8 0 0042 16l-5.5 5.5-4.5-1-1-4.5L36.5 10.5A8 8 0 0032 6z" />
      <path d="M22 26l8 8" />
    </svg>
  )
}

/* Small icons for the AI quiz options */
export function ClockIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  )
}

export function DollarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M12 2v20M17 6.5c-.8-1.4-2.6-2-5-2-2.8 0-4.5 1.3-4.5 3.3 0 4.7 9.6 2.2 9.6 6.9 0 2-1.9 3.3-5.1 3.3-2.6 0-4.4-.9-5-2.5" />
    </svg>
  )
}

export function BoltIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M13 2L4.5 13.5H11L10 22l8.5-11.5H12L13 2z" />
    </svg>
  )
}

export function RocketIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M12 2c3.5 1.8 5.5 5 5.5 9 0 2.5-.8 4.8-2 6.5h-7c-1.2-1.7-2-4-2-6.5 0-4 2-7.2 5.5-9z" />
      <circle cx="12" cy="9.5" r="1.8" />
      <path d="M8.5 17.5L6 21M15.5 17.5L18 21M12 18v3" />
    </svg>
  )
}

export function QuestionIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.2A2.6 2.6 0 0112 7.6c1.4 0 2.6 1 2.6 2.4 0 1.9-2.6 2-2.6 3.8" />
      <circle cx="12" cy="16.8" r="0.6" fill="#14a800" />
    </svg>
  )
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M4.5 12.5l5 5L19.5 7" />
    </svg>
  )
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M3 11.5h18m-7.5 7.7L21 11.5 13.5 4" />
    </svg>
  )
}

export function ChevronRightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  )
}

export function SparkleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
      <path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z" />
    </svg>
  )
}
