import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { findFreelancer, type Freelancer } from '~/lib/data'
import { CategoryNav } from '~/components/search/SearchShell'
import { SkillChip } from '~/components/search/SkillChip'
import { Avatar } from '~/components/profile/Avatar'
import { Stars } from '~/components/profile/Stars'
import { BadgeGlyph, IconPin, IconStar, IconVerified, IconVideo } from '~/components/search/icons'

export const Route = createFileRoute('/freelancers/$freelancerId')({
  component: FreelancerPage,
})

type TabId = 'about' | 'feedback' | 'history' | 'portfolio' | 'skills'

const TABS: Array<{ id: TabId; label: string }> = [
  { id: 'about', label: 'About' },
  { id: 'feedback', label: 'Client feedback' },
  { id: 'history', label: 'Work history' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'skills', label: 'Skills' },
]

const PORTFOLIO_GRADIENTS = [
  'linear-gradient(135deg, #dff69b, #56ab2f)',
  'linear-gradient(135deg, #c9e9c4, #3c8224)',
  'linear-gradient(135deg, #95e79b, #0f7500)',
]

function AboutTab({ f }: { f: Freelancer }) {
  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-6">
        <h2 className="text-[30px] font-semibold text-[#001e00]">About {f.name}</h2>
        <div className="flex gap-10 text-[15px]">
          <div>
            <p className="font-semibold text-[#001e00]">${f.hourlyRate.toFixed(2)}/hr</p>
            <p className="text-[#5e6d55]">Rate</p>
          </div>
          {f.agency ? (
            <div className="max-w-[260px]">
              <p className="truncate font-medium text-[#108a00] underline" title={f.agency}>
                {f.agency}
              </p>
              <p className="text-[#5e6d55]">Agency</p>
            </div>
          ) : null}
        </div>
      </div>
      <p className="mt-6 whitespace-pre-line text-[15px] leading-relaxed text-[#001e00]">{f.bio}</p>
      <p className="mt-6 text-[15px] text-[#5e6d55]">
        English: <span className="font-medium text-[#001e00]">{f.englishLevel}</span>
      </p>
    </div>
  )
}

function FeedbackTab({ f }: { f: Freelancer }) {
  return (
    <div>
      <h2 className="text-[24px] font-semibold text-[#001e00]">Client feedback</h2>
      <div className="mt-5 space-y-5">
        {f.feedback.map((fb) => (
          <article key={fb.title} className="rounded-xl border border-[#d5e0d5] p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-[16px] font-semibold text-[#001e00]">{fb.title}</h3>
              <p className="text-[13px] text-[#5e6d55]">{fb.date}</p>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Stars rating={fb.rating} />
              <span className="text-[14px] font-semibold text-[#001e00]">{fb.rating.toFixed(1)}</span>
            </div>
            <blockquote className="mt-3 text-[15px] leading-relaxed text-[#001e00]">
              &ldquo;{fb.quote}&rdquo;
            </blockquote>
            {fb.client ? (
              <p className="mt-3 text-[14px] text-[#5e6d55]">— {fb.client}</p>
            ) : null}
          </article>
        ))}
      </div>
      <nav aria-label="Feedback pages" className="mt-6 flex items-center gap-2">
        <span className="mr-2 text-[14px] text-[#5e6d55]">Current page 1 of 22</span>
        {[1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            type="button"
            aria-current={page === 1 ? 'page' : undefined}
            className={`flex h-9 w-9 items-center justify-center rounded-full text-[14px] font-medium transition-colors ${
              page === 1
                ? 'bg-[#181818] text-white'
                : 'border border-[#d5e0d5] text-[#001e00] hover:bg-[#f2f7f2]'
            }`}
          >
            {page}
          </button>
        ))}
      </nav>
    </div>
  )
}

function HistoryTab({ f }: { f: Freelancer }) {
  return (
    <div>
      <h2 className="text-[24px] font-semibold text-[#001e00]">Work history</h2>
      <div className="mt-5 divide-y divide-[#e4ebe4] rounded-xl border border-[#d5e0d5]">
        {f.workHistory.map((w) => (
          <div key={w.title} className="flex flex-wrap items-center justify-between gap-3 px-6 py-5">
            <div className="min-w-0">
              <p className="text-[15px] font-semibold text-[#001e00]">{w.title}</p>
              <div className="mt-1 flex items-center gap-2">
                {w.rating !== null ? (
                  <>
                    <Stars rating={w.rating} className="h-3.5 w-3.5" />
                    <span className="text-[13px] font-medium text-[#001e00]">
                      {w.rating.toFixed(1)}
                    </span>
                  </>
                ) : (
                  <span className="text-[13px] text-[#5e6d55]">No rating given</span>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-[15px] font-semibold text-[#001e00]">{w.earnings}</p>
              <p className="text-[13px] text-[#5e6d55]">{w.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PortfolioTab() {
  return (
    <div>
      <h2 className="text-[24px] font-semibold text-[#001e00]">Portfolio</h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PORTFOLIO_GRADIENTS.map((gradient, i) => (
          <div
            key={i}
            className="flex aspect-[4/3] items-end rounded-xl p-4"
            style={{ background: gradient }}
          >
            <span className="rounded-full bg-white/85 px-3 py-1 text-[13px] font-medium text-[#001e00]">
              Project {i + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SkillsTab({ f }: { f: Freelancer }) {
  return (
    <div>
      <h2 className="text-[24px] font-semibold text-[#001e00]">Skills</h2>
      <div className="mt-5 flex flex-wrap gap-2">
        {f.skills.map((s) => (
          <SkillChip key={s} label={s} />
        ))}
      </div>
    </div>
  )
}

function FreelancerPage() {
  const { freelancerId } = Route.useParams()
  const freelancer = findFreelancer(freelancerId)
  const [tab, setTab] = useState<TabId>('about')

  if (!freelancer) {
    return (
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-4 px-6 py-24 text-center lg:px-10">
        <h1 className="text-[28px] font-semibold text-[#001e00]">Profile not found</h1>
        <p className="text-[15px] text-[#5e6d55]">
          This freelancer profile may be private or no longer available.
        </p>
        <Link
          to="/search/talent"
          search={{ q: '' }}
          className="rounded-full bg-[#108a00] px-6 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#0b6100]"
        >
          Back to search
        </Link>
      </div>
    )
  }

  const f = freelancer

  return (
    <div>
      <CategoryNav />
      <div className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)]">
          {/* Left column: identity card */}
          <div>
            <div className="relative inline-block">
              <Avatar name={f.name} size="lg" />
              <span
                title={f.availableNow ? 'Available now' : 'Offline'}
                className={`absolute -right-1 -top-1 h-5 w-5 rounded-full border-2 border-white ${
                  f.availableNow ? 'bg-[#14a800]' : 'bg-[#9aaa97]'
                }`}
              />
            </div>
            <p className="mt-2 text-[13px] text-[#5e6d55]">
              Status: {f.availableNow ? 'Available now' : 'Offline'}
            </p>
            <h1 className="mt-2 flex items-center gap-2 text-[32px] font-semibold leading-tight text-[#001e00]">
              {f.name}
              {f.verified ? <IconVerified className="h-6 w-6" /> : null}
            </h1>
            <p className="mt-2 text-[15px] leading-snug text-[#001e00]">{f.title}</p>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] font-medium text-[#001e00]">
              {f.jobSuccess !== null ? (
                <span className="flex items-center gap-1.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#3b7ddb]">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="#3b7ddb" aria-hidden="true">
                      <path d="M12 3l2.7 5.5 6.1.9-4.4 4.3 1 6L12 16.9 6.6 19.7l1-6L3.2 9.4l6.1-.9L12 3z" />
                    </svg>
                  </span>
                  {f.jobSuccess}% Job Success
                </span>
              ) : null}
              {f.badge ? (
                <span className="flex items-center gap-1.5">
                  <BadgeGlyph badge={f.badge} className="h-5 w-5" />
                  {f.badge}
                </span>
              ) : null}
              <span className="flex items-center gap-1.5">
                <IconStar className="h-4.5 w-4.5 text-[#e6a817]" />
                {f.rating.toFixed(1)} ({f.reviewCount})
              </span>
            </div>

            <p className="mt-4 flex items-center gap-1.5 text-[14px] text-[#001e00]">
              <IconPin className="h-4.5 w-4.5 text-[#5e6d55]" />
              {f.city}, {f.country} – {f.localTime}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-[#f7faf7] px-4 py-4 text-center">
                <p className="text-[24px] font-semibold text-[#001e00]">{f.totalJobs}</p>
                <p className="text-[13px] text-[#5e6d55]">Total jobs</p>
              </div>
              <div className="rounded-xl bg-[#f7faf7] px-4 py-4 text-center">
                <p className="text-[24px] font-semibold text-[#001e00]">{f.totalHours}</p>
                <p className="text-[13px] text-[#5e6d55]">Total hours</p>
              </div>
            </div>
          </div>

          {/* Right column: actions, tabs, content */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/signup"
                className="rounded-full bg-[#14a800] px-8 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#0c5c00]"
              >
                Sign up to hire
              </Link>
              {f.offersConsultations ? (
                <div className="flex flex-col gap-1">
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-full border-[1.5px] border-[#108a00] px-6 py-2.5 text-[15px] font-semibold text-[#108a00] transition-colors hover:bg-[#f2f7f2]"
                  >
                    <IconVideo className="h-4.5 w-4.5" />
                    Book a consultation
                  </button>
                  {f.consultationPrice ? (
                    <p className="text-center text-[13px] text-[#5e6d55]">{f.consultationPrice}</p>
                  ) : null}
                </div>
              ) : null}
            </div>

            <div
              role="tablist"
              aria-label="Profile sections"
              className="mt-8 inline-flex flex-wrap gap-1 rounded-full border border-[#d5e0d5] p-1.5"
            >
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={tab === t.id}
                  onClick={() => setTab(t.id)}
                  className={`rounded-full px-5 py-2 text-[15px] transition-colors ${
                    tab === t.id
                      ? 'bg-[#181818] font-semibold text-white'
                      : 'text-[#5e6d55] hover:text-[#001e00]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-[#e4ebe4] p-8">
              {tab === 'about' ? <AboutTab f={f} /> : null}
              {tab === 'feedback' ? <FeedbackTab f={f} /> : null}
              {tab === 'history' ? <HistoryTab f={f} /> : null}
              {tab === 'portfolio' ? <PortfolioTab /> : null}
              {tab === 'skills' ? <SkillsTab f={f} /> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
