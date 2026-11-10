/* Small inline icons for the search/profile pages. Stroke uses currentColor
   so callers control the color via Tailwind text classes. */

type IconProps = { className?: string }

function strokeProps() {
  return {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
}

export function IconSearch({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...strokeProps()}>
      <circle cx="10.7" cy="10.7" r="7.7" />
      <path d="M16.1 16.1L21 21" />
    </svg>
  )
}

export function IconX({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...strokeProps()}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 9l6 6M15 9l-6 6" />
    </svg>
  )
}

export function IconChevronDown({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...strokeProps()}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

export function IconChevronUp({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...strokeProps()}>
      <path d="M6 15l6-6 6 6" />
    </svg>
  )
}

export function IconPin({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...strokeProps()}>
      <path d="M12 21s-7-5.5-7-11a7 7 0 1114 0c0 5.5-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  )
}

export function IconClock({ className = 'h-6 w-6' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...strokeProps()}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  )
}

export function IconCalendar({ className = 'h-6 w-6' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...strokeProps()}>
      <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
  )
}

export function IconGear({ className = 'h-6 w-6' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...strokeProps()}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.8v2.6M12 18.6v2.6M2.8 12h2.6M18.6 12h2.6M5.2 5.2l1.8 1.8M17 17l1.8 1.8M18.8 5.2L17 7M7 17l-1.8 1.8" />
    </svg>
  )
}

export function IconBriefcase({ className = 'h-6 w-6' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...strokeProps()}>
      <rect x="3" y="7.5" width="18" height="13" rx="2.5" />
      <path d="M9 7.5V5.6A1.6 1.6 0 0110.6 4h2.8A1.6 1.6 0 0115 5.6v1.9M3 12.5h18" />
    </svg>
  )
}

export function IconVideo({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...strokeProps()}>
      <rect x="2.5" y="6" width="13" height="12" rx="2.5" />
      <path d="M15.5 10.5l6-3.5v10l-6-3.5" />
    </svg>
  )
}

export function IconBolt({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...strokeProps()}>
      <path d="M13 2L4.5 13.5H11L10 22l8.5-11.5H12L13 2z" />
    </svg>
  )
}

export function IconInfo({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...strokeProps()}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <circle cx="12" cy="7.8" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconStar({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.4L12 17.4l-5.8 3 1.1-6.4L2.6 9.4l6.5-.9L12 2.6z" />
    </svg>
  )
}

export function IconVerified({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="10" fill="#1f57c3" />
      <path
        d="M7.5 12.2l3 3 6-6"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function IconCheckBadge({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="10" fill="#14a800" />
      <path
        d="M7.5 12.2l3 3 6-6"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* Colored badge glyphs used by the talent-badge filter and profile stats. */
export function BadgeGlyph({ badge, className = 'h-5 w-5' }: { badge: string; className?: string }) {
  if (badge === 'Top Rated Plus') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path
          d="M12 2l2.5 2.1 3.2-.4 1 3.1 2.9 1.5-1.2 3 1.2 3-2.9 1.5-1 3.1-3.2-.4L12 22l-2.5-2.1-3.2.4-1-3.1-2.9-1.5 1.2-3-1.2-3 2.9-1.5 1-3.1 3.2.4L12 2z"
          fill="#e56aa0"
        />
        <path d="M8.5 12.2l2.4 2.4 4.6-4.6" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }
  if (badge === 'Top Rated') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path
          d="M12 2l2.5 2.1 3.2-.4 1 3.1 2.9 1.5-1.2 3 1.2 3-2.9 1.5-1 3.1-3.2-.4L12 22l-2.5-2.1-3.2.4-1-3.1-2.9-1.5 1.2-3-1.2-3 2.9-1.5 1-3.1 3.2.4L12 2z"
          fill="#3b7ddb"
        />
        <path d="M12 7l1.5 3 3.3.5-2.4 2.3.6 3.2L12 14.5 9 16l.6-3.2-2.4-2.3 3.3-.5L12 7z" fill="#fff" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M12 2l2.5 2.1 3.2-.4 1 3.1 2.9 1.5-1.2 3 1.2 3-2.9 1.5-1 3.1-3.2-.4L12 22l-2.5-2.1-3.2.4-1-3.1-2.9-1.5 1.2-3-1.2-3 2.9-1.5 1-3.1 3.2.4L12 2z"
        fill="#14a800"
      />
      <path d="M12 16V8M8.5 11.5L12 8l3.5 3.5" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
