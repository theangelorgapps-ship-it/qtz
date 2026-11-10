import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { ArrowRightIcon } from '~/components/icons'

type HeroMode = 'hire' | 'work'

const copy: Record<
  HeroMode,
  { title: string; subtitle: string; cta: string; ctaTo: string }
> = {
  hire: {
    title: 'Work at the speed of your ambition',
    subtitle:
      'Hire experts who use AI to amplify their talent, turning complex work into high impact business outcomes',
    cta: 'Get started',
    ctaTo: '/signup',
  },
  work: {
    title: 'Find work that fuels your ambition',
    subtitle:
      "Meet clients you're excited to work with and take your career or business to new heights",
    cta: 'Find work',
    ctaTo: '/search/jobs',
  },
}

export function Hero() {
  const [mode, setMode] = useState<HeroMode>('hire')
  const current = copy[mode]

  return (
    <section className="mx-auto mt-4 max-w-[1400px] px-6 lg:px-10" data-qa-section="hero">
      <div className="hero-placeholder relative overflow-hidden rounded-[28px]">
        {/* subtle gradient overlay like the source's hero-video treatment */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent"
          aria-hidden="true"
        />

        <div className="relative flex min-h-[560px] max-w-[720px] flex-col justify-center px-6 py-16 sm:px-14 lg:min-h-[640px]">
          {/* Hire / Work pill toggle */}
          <div
            role="tablist"
            aria-label="Audience"
            className="inline-flex w-fit rounded-full bg-white/15 p-1 backdrop-blur-sm"
          >
            {(['hire', 'work'] as const).map((value) => (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={mode === value}
                onClick={() => setMode(value)}
                className={`rounded-full px-7 py-2.5 text-sm font-semibold capitalize transition-all duration-200 ${
                  mode === value
                    ? 'bg-[#0e0e0e] text-white shadow-sm'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {value === 'hire' ? 'Hire' : 'Work'}
              </button>
            ))}
          </div>

          <h1
            key={`title-${mode}`}
            className="mt-10 text-[44px] font-medium leading-[1.05] tracking-[-0.035em] text-white sm:text-[64px] lg:text-[80px]"
          >
            {current.title}
          </h1>
          <p
            key={`sub-${mode}`}
            className="mt-6 max-w-[560px] text-lg leading-snug text-white/90 sm:text-[22px]"
          >
            {current.subtitle}
          </p>

          <div className="mt-10">
            <Link
              to={current.ctaTo}
              className="inline-flex items-center gap-2 rounded-full bg-[#108a00] px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#0b6100]"
            >
              {current.cta}
              <ArrowRightIcon className="h-5 w-5 [&>path]:stroke-white" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
