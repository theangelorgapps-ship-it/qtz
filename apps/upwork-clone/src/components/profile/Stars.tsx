import { IconStar } from '~/components/search/icons'

export function Stars({ rating, className = 'h-4 w-4' }: { rating: number; className?: string }) {
  const filled = Math.round(rating)
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <IconStar
          key={i}
          className={`${className} ${i < filled ? 'text-[#e6a817]' : 'text-[#d5e0d5]'}`}
        />
      ))}
    </span>
  )
}
