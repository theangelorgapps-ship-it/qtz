import { Link } from '@tanstack/react-router'

export type PricingTab = 'clients' | 'freelancers'

interface PricingHeroProps {
  tab: PricingTab
  onTab: (tab: PricingTab) => void
}

export function PricingHero({ tab, onTab }: PricingHeroProps) {
  return (
    <section className="border-b border-[#e4ebe4] bg-[#f7faf7]">
      <div className="mx-auto max-w-[1400px] px-6 pb-14 pt-12 text-center lg:px-10 lg:pt-16">
        {/* Clients | Freelancers toggle */}
        <div
          role="tablist"
          aria-label="Pricing audience"
          className="mx-auto inline-flex rounded-full border border-[#d5e0d5] bg-white p-1"
        >
          {(
            [
              { id: 'clients', label: 'Clients' },
              { id: 'freelancers', label: 'Freelancers' },
            ] as Array<{ id: PricingTab; label: string }>
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => onTab(t.id)}
              className={`rounded-full px-8 py-2.5 text-[15px] font-semibold transition-colors ${
                tab === t.id ? 'bg-[#108a00] text-white' : 'text-[#1f1f1f] hover:text-[#108a00]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <h1 className="mx-auto mt-10 max-w-3xl text-4xl font-medium tracking-[-0.03em] text-[#001e00] sm:text-5xl">
          Flexible pricing that scales with your business
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#4d4d4d]">
          Access skilled experts who can support one-time projects or complex, ongoing work.
          It&apos;s free to get started—pay only when you hire.
        </p>
        <p className="mt-6 text-[15px] text-[#5e6d55]">
          Looking to work?{' '}
          <Link to="/signup" className="font-semibold text-[#108a00] hover:underline">
            Join as a freelancer
          </Link>
        </p>
      </div>
    </section>
  )
}
