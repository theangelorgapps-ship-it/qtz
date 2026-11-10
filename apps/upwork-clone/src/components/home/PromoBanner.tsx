import { Link } from '@tanstack/react-router'
import { ChevronRightIcon } from '~/components/icons'

export function PromoBanner() {
  return (
    <section className="mx-auto mt-4 max-w-[1400px] px-6 lg:px-10">
      <div className="promo-bg flex flex-col gap-3 rounded-2xl px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:py-6">
        <p className="text-lg font-medium text-[#1f1f1f] sm:text-xl">
          Hire the top 1% of talent on Business Plus.
        </p>
        <Link
          to="/signup"
          className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#1f1f1f] underline underline-offset-4 transition-colors hover:text-[#108a00]"
        >
          Get started
          <ChevronRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
