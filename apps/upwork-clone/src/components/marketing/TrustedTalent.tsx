import { CheckIcon } from '~/components/icons'

/* "Discover trusted talent" bullets, verbatim from the captured page. */

const bullets = [
  {
    lead: "Access to Upwork's global work marketplace",
    body: "Connect with 18+ million freelancers across 180 countries on Upwork.",
  },
  {
    lead: 'ID-verified talent only',
    body: "Upwork verifies every freelancer's identity and location before you connect, so you're confident in who you're hiring.",
  },
  {
    lead: 'Verified reviews and work history',
    body: 'See real client feedback and a proven track record of completed projects.',
  },
]

export function TrustedTalent() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10 lg:py-20">
      <h2 className="text-center text-3xl font-medium tracking-[-0.03em] text-[#001e00] sm:text-4xl">
        Discover trusted talent
      </h2>
      <div className="mx-auto mt-12 grid max-w-[1100px] gap-8 md:grid-cols-3">
        {bullets.map((b) => (
          <div key={b.lead} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e8f6e6]">
              <CheckIcon className="h-4 w-4" />
            </span>
            <p className="text-[15px] leading-relaxed text-[#4d4d4d]">
              <strong className="font-semibold text-[#1f1f1f]">{b.lead}</strong>
              {' — '}
              {b.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
