import { Link } from '@tanstack/react-router'
import { CheckIcon } from '~/components/icons'

/* Plan cards for /pricing/client. Copy is verbatim from the captured page. */

const basicFeatures = [
  'Marketplace access—skilled freelancers across thousands of skills',
  'Talent profiles—portfolios, ratings, and work history',
  'Hiring tools—proposals and terms in one place',
  'Project workspace—messages, files, and status in one view',
  'Protected payments—only pay for approved work from escrow',
]

const plusFeatures = [
  'Curated shortlists—find top talent faster with AI-powered recommendations',
  'Expert-Vetted talent—access to the top 1% of Upwork talent',
  'AI-powered hiring—tools to help you hire faster and with more confidence',
  'Centralized billing—keep team spend in one place',
  '30-day payment terms—pay eligible invoices up to 30 days after billing (US only)',
]

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 flex flex-col gap-4">
      {items.map((f) => {
        const [lead, ...restParts] = f.split('—')
        const rest = restParts.join('—')
        return (
          <li key={f} className="flex items-start gap-3">
            <CheckIcon className="mt-0.5 h-5 w-5 shrink-0" />
            <span className="text-[15px] leading-snug text-[#4d4d4d]">
              <strong className="font-semibold text-[#1f1f1f]">{lead}</strong>
              {rest ? `—${rest}` : ''}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

function FeeBlock({ fee, example }: { fee: string; example: string }) {
  return (
    <div className="mt-8 border-t border-[#e4ebe4] pt-6">
      <p className="flex items-baseline gap-2">
        <span className="text-5xl font-medium tracking-[-0.03em] text-[#1f1f1f]">{fee}</span>
        <span className="text-[15px] text-[#5e6d55]">service fee</span>
      </p>
      <p className="mt-2 text-sm leading-snug text-[#5e6d55]">{example}</p>
    </div>
  )
}

export function PlanCards() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10">
      <div className="mx-auto grid max-w-[1100px] items-start gap-6 lg:grid-cols-2">
        {/* Basic */}
        <article className="flex h-full flex-col rounded-3xl border border-[#e4ebe4] bg-white p-8 sm:p-10">
          <h2 className="text-2xl font-semibold text-[#1f1f1f]">Basic</h2>
          <p className="mt-1.5 text-[15px] text-[#5e6d55]">
            Hire for occasional, project-based work
          </p>
          <p className="mt-8 text-[15px] font-semibold text-[#1f1f1f]">Basic includes:</p>
          <FeatureList items={basicFeatures} />
          <FeeBlock
            fee="7.99%"
            example="For example, a $100 contract would cost $107.99 in total + contract initiation fee"
          />
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
        <article className="relative flex h-full flex-col rounded-3xl border-2 border-[#108a00] bg-white p-8 shadow-[0_16px_40px_rgba(16,138,0,0.10)] sm:p-10">
          <span className="absolute right-6 top-0 -translate-y-1/2 rounded-full bg-[#108a00] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
            Popular
          </span>
          <h2 className="text-2xl font-semibold text-[#1f1f1f]">Business Plus</h2>
          <p className="mt-1.5 text-[15px] text-[#5e6d55]">
            Hire for complex, ongoing work at scale
          </p>
          <p className="mt-8 text-[15px] font-semibold text-[#1f1f1f]">Everything in Basic, plus:</p>
          <FeatureList items={plusFeatures} />
          <FeeBlock
            fee="10%"
            example="For example, a $100 contract would cost $110 in total + contract initiation fee"
          />
          <div className="mt-auto pt-10">
            <Link
              to="/signup"
              className="block rounded-full bg-[#108a00] py-3 text-center text-base font-semibold text-white transition-colors hover:bg-[#0b6100]"
            >
              Get started
            </Link>
          </div>
        </article>
      </div>
    </section>
  )
}
