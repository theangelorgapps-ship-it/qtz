import { initialsOf } from '~/components/search/TalentCard'

export function Avatar({ name, size = 'md' }: { name: string; size?: 'md' | 'lg' }) {
  const cls =
    size === 'lg'
      ? 'h-28 w-28 text-[32px]'
      : 'h-16 w-16 text-[20px]'
  return (
    <div
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full bg-[#c9e9c4] font-semibold text-[#0b5c00] ${cls}`}
    >
      {initialsOf(name)}
    </div>
  )
}
