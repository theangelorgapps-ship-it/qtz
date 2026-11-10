import { Link } from '@tanstack/react-router'
import { CheckIcon } from '~/components/icons'

/* Simple freelancer-side panel shown when the Freelancers tab is active. */

const points = [
  'Free to join—create a profile and browse millions of jobs at no cost',
  'Connects—use Upwork’s virtual tokens to submit proposals; you get a free allotment every month',
  'Earn Connects back when clients engage with your proposals, or buy more as you need them',
  'Simple freelancer service fee—10% on what you earn, with payment protection on every contract',
]

export function FreelancerPanel() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-2xl rounded-3xl border border-[#e4ebe4] bg-white p-8 text-center sm:p-12">
        <h2 className="text-3xl font-medium tracking-[-0.03em] text-[#001e00]">Free to join</h2>
        <p className="mt-4 text-[15px] leading-relaxed text-[#4d4d4d]">
          Joining Upwork as a freelancer costs nothing. You use Connects to submit proposals for
          jobs, and a 10% freelancer service fee applies only when you get paid.
        </p>
        <ul className="mt-8 flex flex-col gap-4 text-left">
          {points.map((p) => {
            const [lead, ...restParts] = p.split('—')
            const rest = restParts.join('—')
            return (
              <li key={p} className="flex items-start gap-3">
                <CheckIcon className="mt-0.5 h-5 w-5 shrink-0" />
                <span className="text-[15px] leading-snug text-[#4d4d4d]">
                  <strong className="font-semibold text-[#1f1f1f]">{lead}</strong>
                  {rest ? `—${rest}` : ''}
                </span>
              </li>
            )
          })}
        </ul>
        <Link
          to="/signup"
          className="mt-10 inline-block rounded-full bg-[#108a00] px-10 py-3 text-base font-semibold text-white transition-colors hover:bg-[#0b6100]"
        >
          Join as a freelancer
        </Link>
      </div>
    </section>
  )
}
