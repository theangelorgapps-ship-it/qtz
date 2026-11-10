import { Link } from '@tanstack/react-router'
import type { Job } from '~/lib/data'
import { SkillChips } from './SkillChip'

function metaLine(job: Job): string {
  if (job.type === 'hourly') {
    const rate =
      job.hourlyMin !== undefined && job.hourlyMax !== undefined
        ? `Hourly: $${job.hourlyMin} - $${job.hourlyMax}`
        : 'Hourly'
    return `${rate} - ${job.level} - Est. time: ${job.duration}, ${job.hoursPerWeek}`
  }
  const budget = job.fixedBudget !== undefined ? `$${job.fixedBudget.toLocaleString('en-US')}` : ''
  return `Fixed-price - ${job.level} - Est. budget: ${budget}`
}

export function JobCard({ job }: { job: Job }) {
  return (
    <article className="-mx-4 border-b border-[#d5e0d5] px-4 py-6 transition-colors hover:bg-[#f7faf7]">
      <p className="text-[13px] text-[#5e6d55]">{job.posted}</p>
      <h3 className="mt-1.5 text-[19px] font-semibold leading-snug">
        <Link
          to="/jobs/$jobId"
          params={{ jobId: job.id }}
          className="text-[#001e00] transition-colors hover:text-[#108a00] hover:underline"
        >
          {job.title}
        </Link>
      </h3>
      <p className="mt-1.5 text-[14px] text-[#5e6d55]">{metaLine(job)}</p>
      <p className="mt-2.5 line-clamp-2 text-[15px] leading-relaxed text-[#001e00]">
        {job.description}
      </p>
      <div className="mt-3.5">
        <SkillChips skills={job.skills} />
      </div>
    </article>
  )
}
