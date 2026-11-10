import { Link, createFileRoute } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { findJob } from '~/lib/data'
import { SkillChips } from '~/components/search/SkillChip'
import { Stars } from '~/components/profile/Stars'
import {
  IconBriefcase,
  IconCalendar,
  IconCheckBadge,
  IconClock,
  IconGear,
  IconInfo,
  IconPin,
} from '~/components/search/icons'

export const Route = createFileRoute('/jobs/$jobId')({
  component: JobPage,
})

function Fact({ icon, value, label }: { icon: ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-[#001e00]">{icon}</span>
      <div>
        <p className="text-[15px] font-semibold text-[#001e00]">{value}</p>
        <p className="text-[13px] text-[#5e6d55]">{label}</p>
      </div>
    </div>
  )
}

function JobPage() {
  const { jobId } = Route.useParams()
  const job = findJob(jobId)

  if (!job) {
    return (
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-4 px-6 py-24 text-center lg:px-10">
        <h1 className="text-[28px] font-semibold text-[#001e00]">Job not found</h1>
        <p className="text-[15px] text-[#5e6d55]">
          This job may have been filled or removed by the client.
        </p>
        <Link
          to="/search/jobs"
          search={{ q: '' }}
          className="rounded-full bg-[#108a00] px-6 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#0b6100]"
        >
          Back to search
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-8 lg:px-10">
      <Link
        to="/search/jobs"
        search={{ q: '' }}
        className="inline-flex items-center gap-2 text-[15px] font-medium text-[#001e00] transition-colors hover:text-[#108a00]"
      >
        <span aria-hidden="true">←</span> Back to search
      </Link>

      <div className="mt-6 grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <h1 className="text-[30px] font-semibold leading-tight text-[#001e00]">{job.title}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-8 gap-y-2 text-[14px] text-[#5e6d55]">
            <span>{job.posted}</span>
            {job.locationRestriction ? (
              <span className="flex items-center gap-1.5">
                <IconPin className="h-4.5 w-4.5" />
                {job.locationRestriction}
              </span>
            ) : null}
          </div>

          <section className="mt-8 border-b border-[#d5e0d5] pb-8">
            <h2 className="text-[16px] font-semibold text-[#001e00]">Summary</h2>
            <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed text-[#001e00]">
              {job.description}
            </p>
          </section>

          <section className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 border-b border-[#d5e0d5] pb-8 sm:grid-cols-2 lg:grid-cols-3">
            <Fact
              icon={<IconClock />}
              value={job.hoursPerWeek}
              label={job.type === 'hourly' ? 'Hourly' : 'Fixed-price'}
            />
            <Fact icon={<IconCalendar />} value={job.duration} label="Duration" />
            <Fact icon={<IconGear />} value={job.level} label="Experience Level" />
            <Fact icon={<IconPin />} value="Remote Job" label={job.client.country} />
            <Fact icon={<IconBriefcase />} value={job.projectType} label="Project Type" />
          </section>

          <section className="mt-8 border-b border-[#d5e0d5] pb-8">
            <h2 className="text-[20px] font-semibold text-[#001e00]">Skills and Expertise</h2>
            <div className="mt-4">
              <SkillChips skills={job.skills} />
            </div>
          </section>

          <section className="mt-8 border-b border-[#d5e0d5] pb-8">
            <h2 className="text-[20px] font-semibold text-[#001e00]">Activity on this job</h2>
            <div className="mt-4 flex flex-wrap gap-x-10 gap-y-3 text-[15px] text-[#001e00]">
              <p>
                Proposals: <IconInfo className="mx-1 inline h-4 w-4 text-[#9aaa97]" />
                <span className="font-medium">{job.proposals}</span>
              </p>
              <p>
                Last viewed by client: <IconInfo className="mx-1 inline h-4 w-4 text-[#9aaa97]" />
                <span className="font-medium">{job.lastViewed}</span>
              </p>
              <p>
                Interviewing: <span className="font-medium">{job.interviewing}</span>
              </p>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-[20px] font-semibold text-[#001e00]">About the client</h2>
            <div className="mt-4 rounded-xl border border-[#d5e0d5] p-6">
              {job.client.paymentVerified ? (
                <p className="flex items-center gap-2 text-[14px] font-medium text-[#108a00]">
                  <IconCheckBadge className="h-5 w-5" />
                  Payment method verified
                </p>
              ) : (
                <p className="text-[14px] font-medium text-[#5e6d55]">Payment method not verified</p>
              )}
              <div className="mt-3 flex items-center gap-2">
                <Stars rating={job.client.rating} />
                <span className="text-[14px] font-semibold text-[#001e00]">
                  {job.client.rating.toFixed(1)}
                </span>
                <span className="text-[14px] text-[#5e6d55]">
                  of {job.client.reviewCount} review{job.client.reviewCount === 1 ? '' : 's'}
                </span>
              </div>
              <dl className="mt-4 space-y-2 text-[15px]">
                <div className="flex gap-2">
                  <dt className="text-[#5e6d55]">Location:</dt>
                  <dd className="font-medium text-[#001e00]">
                    {job.client.city ? `${job.client.city}, ` : ''}
                    {job.client.country}
                  </dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-[#5e6d55]">Jobs posted:</dt>
                  <dd className="font-medium text-[#001e00]">{job.client.jobsPosted}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-[#5e6d55]">Hires:</dt>
                  <dd className="font-medium text-[#001e00]">{job.client.hires}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-[#5e6d55]">Total spent:</dt>
                  <dd className="font-medium text-[#001e00]">{job.client.totalSpent}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-[#5e6d55]">Member since:</dt>
                  <dd className="font-medium text-[#001e00]">{job.client.memberSince}</dd>
                </div>
              </dl>
            </div>
          </section>
        </div>

        <aside>
          <div className="sticky top-24 rounded-2xl border border-[#d5e0d5] p-8">
            <h2 className="text-[24px] font-semibold leading-snug text-[#001e00]">
              Explore Upwork opportunities for free
            </h2>
            <Link
              to="/signup"
              className="mt-6 block rounded-full bg-[#14a800] px-6 py-3.5 text-center text-[16px] font-semibold text-white transition-colors hover:bg-[#0c5c00]"
            >
              Sign up
            </Link>
            <p className="mt-5 text-center text-[15px] font-semibold text-[#001e00]">
              Already have an account?{' '}
              <Link to="/login" className="font-medium underline hover:text-[#108a00]">
                Log in
              </Link>
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
