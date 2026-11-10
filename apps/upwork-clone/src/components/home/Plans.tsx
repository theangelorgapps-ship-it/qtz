import { Link } from '@tanstack/react-router'
import { CheckIcon } from '~/components/icons'

const basicFeatures = [
  'Marketplace access - skilled freelancers across thousands of skills',
  'Talent profiles - portfolios, ratings, and work history',
  'Hiring tools - proposals and terms in one place',
  'Project workspace - messages, files, and status in one view',
  'Protected payments - escrow-backed pay tied to approved work',
]

const plusFeatures = [
  'Curated shortlists - we surface top matches so you can hire faster',
  'Expert-Vetted talent - access to the top 1% of Upwork freelancers',
  'Team workspace - shared hiring with roles and permissions',
  'Centralized billing - keep team spend in one place',
  'Premium support - faster help and access to human agents',
]

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 flex flex-col gap-4">
      {items.map((f) => {
        const [lead, rest] = f.split(' - ')
        return (
          <li key={f} className="flex items-start gap-3">
            <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 [&>path]:stroke-[#4d4d4d]" />
            <span className="text-[15px] leading-snug text-[#4d4d4d]">
              <strong className="font-semibold text-[#1f1f1f]">{lead}</strong>
              {rest ? ` - ${rest}` : ''}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

export function Plans() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10 lg:py-16">
      <div className="text-center">
        <h2 className="text-3xl font-medium tracking-[-0.03em] sm:text-4xl lg:text-5xl">
          Choose how you want to hire
        </h2>
        <p className="mt-4 text-lg font-medium text-[#1f1f1f]">
          Flexible options designed to fit your hiring needs
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-[1100px] gap-6 lg:grid-cols-2">
        {/* Basic */}
        <article className="flex flex-col rounded-3xl border border-[#e4ebe4] bg-white p-8 sm:p-10">
          <h3 className="text-2xl font-semibold text-[#1f1f1f]">Basic</h3>
          <p className="mt-1.5 text-[15px] text-[#5e6d55]">For occasional hiring and one-off projects</p>
          <p className="mt-5 text-[15px] leading-snug text-[#4d4d4d]">
            Hire skilled freelancers fast – without long-term commitments or extra overhead.
          </p>
          <p className="mt-8 border-t border-[#e4ebe4] pt-6 text-[15px] font-semibold text-[#1f1f1f]">
            Basic includes:
          </p>
          <FeatureList items={basicFeatures} />
          <div className="mt-auto pt-10">
            <Link
              to="/signup"
              className="block rounded-full border-2 border-[#108a00] py-3 text-center text-base font-semibold text-[#108a00] transition-colors hover:bg-[#108a00] hover:text-white"
            >
              Get started for free
            </Link>
          </div>
        </article>

        {/* Business Plus */}
        <article className="relative flex flex-col rounded-3xl border-2 border-[#95df00] bg-white p-8 shadow-[0_16px_40px_rgba(16,138,0,0.10)] sm:p-10">
          <span
            className="absolute right-6 top-0 -translate-y-1/2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1f1f1f]"
            style={{ background: 'var(--upsell-tag-bg-color)' }}
          >
            Popular
          </span>
          <h3 className="text-2xl font-semibold text-[#1f1f1f]">Business Plus</h3>
          <p className="mt-1.5 text-[15px] text-[#5e6d55]">For ongoing work, repeat hiring, and teams</p>
          <p className="mt-5 text-[15px] leading-snug text-[#4d4d4d]">
            Premium tools, vetted talent, and team controls for running freelance work at scale.
          </p>
          <p className="mt-8 border-t border-[#e4ebe4] pt-6 text-[15px] font-semibold text-[#1f1f1f]">
            Everything in Basic, plus:
          </p>
          <FeatureList items={plusFeatures} />
          <div className="mt-auto pt-10">
            <Link
              to="/signup"
              className="block rounded-full bg-[#108a00] py-3 text-center text-base font-semibold text-white transition-colors hover:bg-[#0b6100]"
            >
              Get started for free
            </Link>
          </div>
        </article>
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/pricing"
          className="text-base font-medium text-[#1f1f1f] underline-offset-4 transition-colors hover:text-[#108a00] hover:underline"
        >
          Compare features across plans
        </Link>
      </div>
    </section>
  )
}
