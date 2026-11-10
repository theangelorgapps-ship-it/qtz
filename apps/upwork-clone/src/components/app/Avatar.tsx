const AVATAR_COLORS: Array<{ bg: string; fg: string }> = [
  { bg: '#c9e9c4', fg: '#0c5c00' },
  { bg: '#dff69b', fg: '#3c8224' },
  { bg: '#e4ebe4', fg: '#5e6d55' },
  { bg: '#a9f9b2', fg: '#0f7500' },
  { bg: '#d5e0d5', fg: '#181818' },
  { bg: '#f0e2c8', fg: '#7a4a12' },
]

export function initialsOf(name: string): string {
  const parts = name.replace(/[/.]/g, ' ').split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

export function Avatar({
  name,
  size = 40,
  className = '',
}: {
  name: string
  size?: number
  className?: string
}) {
  let hash = 0
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0
  const { bg, fg } = AVATAR_COLORS[hash % AVATAR_COLORS.length]
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full font-semibold ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: bg,
        color: fg,
        fontSize: Math.round(size * 0.38),
      }}
    >
      {initialsOf(name)}
    </span>
  )
}
