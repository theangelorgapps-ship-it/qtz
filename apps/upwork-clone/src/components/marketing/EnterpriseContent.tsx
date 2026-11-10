import { Link } from '@tanstack/react-router'
import { ArrowRightIcon } from '~/components/icons'

/* Enterprise landing: Upwork Enterprise is now Lifted, an Upwork Company™. */

const features = [
  {
    title: 'Sourcing',
    body: 'Dedicated sourcing experts and AI-powered matching build shortlists of proven talent for your most critical roles.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10" aria-hidden="true">
        <circle cx="20" cy="20" r="10" stroke="#95df00" strokeWidth="2" />
        <path d="M28 28l10 10" stroke="#95df00" strokeWidth="2" strokeLinecap="round" />
        <circle cx="20" cy="20" r="3" fill="#95df00" />
      </svg>
    ),
  },
  {
    title: 'Contracting',
    body: 'Streamlined onboarding, contracts, and worker classification handled in one place—no procurement maze.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10" aria-hidden="true">
        <path d="M12 6h18l8 8v28H12z" stroke="#95df00" strokeWidth="2" strokeLinejoin="round" />
        <path d="M30 6v8h8" stroke="#95df00" strokeWidth="2" strokeLinejoin="round" />
        <path d="M18 24h14M18 30h14M18 36h8" stroke="#95df00" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Global compliance & payments',
    body: 'Pay and manage talent in 180+ countries with compliance, tax, and payment infrastructure built in.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10" aria-hidden="true">
        <circle cx="24" cy="24" r="18" stroke="#95df00" strokeWidth="2" />
        <path d="M6 24h36M24 6c6 5 9 11.4 9 18s-3 13-9 18c-6-5-9-11.4-9-18s3-13 9-18z" stroke="#95df00" strokeWidth="2" />
      </svg>
    ),
  },
]

export function EnterpriseContent() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-[#e4ebe4] bg-[#f7faf7]">
        <div className="mx-auto max-w-[1400px] px-6 py-16 text-center lg:px-10 lg:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#108a00]">
            Upwork Enterprise is now Lifted
          </p>
          <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-medium tracking-[-0.03em] text-[#001e00] sm:text-5xl lg:text-6xl">
            Enterprise-grade talent, without enterprise friction
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#4d4d4d]">
            Upwork Enterprise has evolved into Lifted, an Upwork Company™—a dedicated platform and
            services team for workforce solutions at scale. Source, contract, and pay global talent
            with the controls and compliance your organization needs.
          </p>
        </div>
      </section>

      {/* Dark CTA card */}
      <section className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10">
        <div className="dark-diagonal mx-auto flex max-w-[1100px] flex-col items-start gap-6 rounded-3xl px-8 py-12 sm:px-12 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-medium tracking-[-0.02em] text-white sm:text-3xl">
              Talk to our experts
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#beccbe]">
              Tell us about your program and we&apos;ll show you how Lifted can flex your workforce
              without slowing you down.
            </p>
          </div>
          <Link
            to="/signup"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#95df00] px-8 py-3.5 text-base font-semibold text-[#0e0e0e] transition-colors hover:bg-[#a9f92b]"
          >
            Talk to our experts
            <ArrowRightIcon className="h-4 w-4 [&>path]:stroke-[#0e0e0e]" />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-[1400px] px-6 pb-20 lg:px-10">
        <div className="mx-auto grid max-w-[1100px] gap-6 md:grid-cols-3">
          {features.map((f) => (
            <article
              key={f.title}
              className="rounded-3xl border border-[#e4ebe4] bg-white p-8 transition-shadow hover:shadow-[0_12px_32px_rgba(16,138,0,0.08)]"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#181818]">
                {f.icon}
              </span>
              <h3 className="mt-6 text-xl font-semibold text-[#1f1f1f]">{f.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#5e6d55]">{f.body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
