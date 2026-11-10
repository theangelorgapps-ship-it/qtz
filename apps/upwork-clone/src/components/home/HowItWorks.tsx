import { Link } from '@tanstack/react-router'
import { useState } from 'react'

type Step = { title: string; description: string; cta: string; to: string }

const hiringSteps: Step[] = [
  {
    title: 'Posting jobs is always free',
    description: 'Generate a job post with AI or create your own and filter talent matches.',
    cta: 'Create a job',
    to: '/post-job',
  },
  {
    title: 'Get proposals and hire',
    description: 'Screen, interview, or book a consult with an expert before hiring.',
    cta: 'Explore experts',
    to: '/search/talent',
  },
  {
    title: 'Pay when work is done',
    description: 'Release payments after approving work, by milestone or upon project completion.',
    cta: 'View pricing',
    to: '/pricing',
  },
]

const workSteps: Step[] = [
  {
    title: 'Find clients and remote jobs',
    description: 'Create your profile to highlight your best work and attract top clients.',
    cta: 'Create a profile',
    to: '/signup',
  },
  {
    title: 'Submit proposals for work',
    description: 'Negotiate rates for the projects you want or reply to invites from clients.',
    cta: 'Search jobs',
    to: '/search/jobs',
  },
  {
    title: 'Get paid as you deliver work',
    description: 'Land a contract, do the work you love, and get paid on time.',
    cta: 'Estimate earnings',
    to: '/signup',
  },
]

const cardArt = [
  'bg-[radial-gradient(closest-side_at_50%_45%,#dff69b_0%,#1a2413_75%)]',
  'bg-[linear-gradient(135deg,#2a2419_0%,#3d3324_45%,#191410_100%)]',
  'bg-[linear-gradient(120deg,#1c1a16_0%,#33301f_55%,#141a12_100%)]',
]

export function HowItWorks() {
  const [tab, setTab] = useState<'hiring' | 'work'>('hiring')
  const steps = tab === 'hiring' ? hiringSteps : workSteps

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10 lg:py-16">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-3xl font-medium tracking-[-0.03em] sm:text-4xl lg:text-5xl">
          How it works
        </h2>
        <div
          role="tablist"
          aria-label="How it works audience"
          className="inline-flex w-fit rounded-full bg-[#f2f7f2] p-1"
        >
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'hiring'}
            onClick={() => setTab('hiring')}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
              tab === 'hiring' ? 'bg-white text-[#1f1f1f] shadow-sm' : 'text-[#5e6d55] hover:text-[#1f1f1f]'
            }`}
          >
            For hiring
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'work'}
            onClick={() => setTab('work')}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
              tab === 'work' ? 'bg-white text-[#1f1f1f] shadow-sm' : 'text-[#5e6d55] hover:text-[#1f1f1f]'
            }`}
          >
            For finding work
          </button>
        </div>
      </div>

      <div className="mt-10 grid gap-10 md:grid-cols-3">
        {steps.map((step, i) => (
          <article key={`${tab}-${step.title}`}>
            <div
              className={`relative aspect-[4/3] overflow-hidden rounded-2xl ${cardArt[i]}`}
              aria-hidden="true"
            >
              <div className="absolute inset-0 dark-diagonal opacity-60" />
              {i === 0 ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="rounded-full bg-[#dff69b] px-8 py-6 text-2xl font-bold tracking-[-0.06em] text-[#0e0e0e] shadow-[0_0_80px_rgba(149,223,0,0.45)]">
                    upwork
                  </span>
                </div>
              ) : null}
            </div>
            <h3 className="mt-6 text-xl font-semibold text-[#1f1f1f]">{step.title}</h3>
            <p className="mt-2.5 text-base leading-snug text-[#3c3c3c]">{step.description}</p>
            <Link
              to={step.to}
              className="mt-4 inline-flex items-center rounded-full bg-[#108a00] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0b6100]"
            >
              {step.cta}
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
