import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { AppShell, CloseIcon, PinIcon, SearchIcon } from '~/components/app/AppShell'
import { Avatar } from '~/components/app/Avatar'
import { FREELANCERS, MESSAGE_ROOMS } from '~/lib/data'

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

function GiftIllustration() {
  return (
    <span
      aria-hidden="true"
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#effcef] text-3xl"
    >
      🎁
    </span>
  )
}

function PromoBanner() {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null
  return (
    <section className="relative flex items-start gap-4 rounded-xl border border-[#d5e0d5] bg-white p-5">
      <GiftIllustration />
      <div className="min-w-0 pr-8">
        <p className="text-base font-semibold text-[#181818]">
          Receive a $120 promo credit when you spend $400 by November 26
        </p>
        <p className="mt-1 text-sm text-[#5e6d55]">
          Once you earn your promotional credit*, it will be added to your account within 3 days.
          You&apos;ll get a confirmation email.
        </p>
      </div>
      <button
        type="button"
        aria-label="Dismiss promotion"
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-3 rounded-full p-1.5 text-[#5e6d55] transition-colors hover:bg-[#f2f7f2] hover:text-[#181818]"
      >
        <CloseIcon className="h-4 w-4" />
      </button>
    </section>
  )
}

function GetStartedCards() {
  const salman = FREELANCERS.find((f) => f.username === 'salmanazeem')
  return (
    <section>
      <h2 className="text-lg font-semibold text-[#181818]">How do you want to get started?</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {salman && (
          <Link
            to="/freelancers/$freelancerId"
            params={{ freelancerId: salman.id }}
            className="group flex flex-col rounded-xl border border-[#d5e0d5] bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(24,24,24,0.08)]"
          >
            <Avatar name={salman.name} size={44} />
            <p className="mt-3 text-base font-semibold text-[#181818] group-hover:text-[#108a00]">
              Work with {salman.name}
            </p>
            <p className="mt-1 text-sm text-[#5e6d55]">
              It&apos;s easy to send a new offer with any contract terms you want to update.
            </p>
          </Link>
        )}
        <Link
          to="/post-job"
          className="group flex flex-col rounded-xl border border-[#d5e0d5] bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(24,24,24,0.08)]"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#effcef]">
            <PinIcon className="h-6 w-6" />
          </span>
          <p className="mt-3 text-base font-semibold text-[#181818] group-hover:text-[#108a00]">
            Post a new job
          </p>
          <p className="mt-1 text-sm text-[#5e6d55]">
            Get proposals or invite selected talent to bid on the job you need done.
          </p>
        </Link>
        <Link
          to="/search/talent"
          className="group flex flex-col rounded-xl border border-[#d5e0d5] bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(24,24,24,0.08)]"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#effcef]">
            <SearchIcon className="h-6 w-6 text-[#14a800]" />
          </span>
          <p className="mt-3 text-base font-semibold text-[#181818] group-hover:text-[#108a00]">
            Search for talent
          </p>
          <p className="mt-1 text-sm text-[#5e6d55]">
            Find top Digital Marketing matches to collaborate instantly.
          </p>
        </Link>
      </div>
    </section>
  )
}

function PastHires() {
  const hires = FREELANCERS.slice(0, 4)
  return (
    <section>
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-semibold text-[#181818]">Your past hires</h2>
        <Link
          to="/search/talent"
          className="text-sm font-semibold text-[#108a00] hover:underline"
        >
          Browse past hires →
        </Link>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {hires.map((f) => (
          <Link
            key={f.id}
            to="/freelancers/$freelancerId"
            params={{ freelancerId: f.id }}
            className="group flex flex-col rounded-xl border border-[#d5e0d5] bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(24,24,24,0.08)]"
          >
            <div className="flex items-center gap-3">
              <Avatar name={f.name} size={48} />
              <div className="min-w-0">
                <p className="truncate text-base font-semibold text-[#181818] group-hover:text-[#108a00]">
                  {f.name}
                </p>
                {f.badge && <p className="truncate text-xs text-[#5e6d55]">{f.badge}</p>}
              </div>
            </div>
            <p className="mt-3 line-clamp-2 min-h-10 text-sm text-[#181818]">{f.title}</p>
            <div className="mt-4 flex items-center justify-between border-t border-[#e4ebe4] pt-3 text-center">
              <div>
                <p className="text-sm font-semibold text-[#181818]">
                  {f.jobSuccess !== null ? `${f.jobSuccess}%` : '—'}
                </p>
                <p className="text-xs text-[#5e6d55]">Job Success</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#181818]">{f.totalJobs}</p>
                <p className="text-xs text-[#5e6d55]">Jobs</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#181818]">${f.hourlyRate}/hr</p>
                <p className="text-xs text-[#5e6d55]">Rate</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

function RecentMessages() {
  const rooms = MESSAGE_ROOMS.slice(0, 4)
  return (
    <section>
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-semibold text-[#181818]">Recent messages</h2>
        <Link to="/messages" className="text-sm font-semibold text-[#108a00] hover:underline">
          View all messages →
        </Link>
      </div>
      <ul className="mt-4 divide-y divide-[#e4ebe4] rounded-xl border border-[#d5e0d5] bg-white">
        {rooms.map((room) => (
          <li key={room.id}>
            <Link
              to="/messages"
              className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-[#f7faf7]"
            >
              <Avatar name={room.counterpart} size={40} />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="truncate text-sm font-semibold text-[#181818]">{room.title}</p>
                  <span className="shrink-0 text-xs text-[#5e6d55]">{room.date}</span>
                </div>
                <p
                  className={`mt-0.5 truncate text-sm ${
                    room.unread ? 'font-semibold text-[#181818]' : 'text-[#5e6d55]'
                  }`}
                >
                  {room.preview}
                </p>
              </div>
              {room.unread && <span className="h-2 w-2 shrink-0 rounded-full bg-[#14a800]" />}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

function DashboardPage() {
  return (
    <AppShell title="Home">
      <div className="flex max-w-6xl flex-col gap-8">
        <PromoBanner />
        <GetStartedCards />
        <PastHires />
        <RecentMessages />
      </div>
    </AppShell>
  )
}
