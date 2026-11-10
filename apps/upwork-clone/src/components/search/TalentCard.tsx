import { Link } from '@tanstack/react-router'
import type { Freelancer } from '~/lib/data'
import { SkillChips } from './SkillChip'
import { IconBolt, IconVerified, IconVideo } from './icons'

export function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function TalentCard({ freelancer }: { freelancer: Freelancer }) {
  const f = freelancer
  return (
    <article className="-mx-4 border-b border-[#d5e0d5] px-4 py-6 transition-colors hover:bg-[#f7faf7]">
      <div className="flex items-start gap-5">
        <div
          aria-hidden="true"
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#c9e9c4] text-[20px] font-semibold text-[#0b5c00]"
        >
          {initialsOf(f.name)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 text-[15px] text-[#001e00]">
                <span>{f.name}</span>
                {f.verified ? <IconVerified className="h-4.5 w-4.5" /> : null}
              </p>
              <h3 className="mt-0.5 line-clamp-2 text-[19px] font-semibold leading-snug text-[#001e00]">
                <Link
                  to="/freelancers/$freelancerId"
                  params={{ freelancerId: f.id }}
                  className="transition-colors hover:text-[#108a00] hover:underline"
                >
                  {f.title}
                </Link>
              </h3>
              <p className="mt-1 text-[14px] text-[#5e6d55]">{f.country}</p>
            </div>
            <Link
              to="/freelancers/$freelancerId"
              params={{ freelancerId: f.id }}
              className="shrink-0 rounded-full border border-[#108a00] px-5 py-2 text-[14px] font-semibold text-[#108a00] transition-colors hover:bg-[#f2f7f2]"
            >
              View profile
            </Link>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-[#5e6d55]">
            <span className="font-semibold text-[#001e00]">${f.hourlyRate}/hr</span>
            {f.jobSuccess !== null ? (
              <span className="flex items-center gap-1.5 font-medium text-[#001e00]">
                <span className="flex h-5 w-5 items-center justify-center rounded-full border-[1.5px] border-[#3b7ddb]">
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="#3b7ddb" aria-hidden="true">
                    <path d="M12 3l2.7 5.5 6.1.9-4.4 4.3 1 6L12 16.9 6.6 19.7l1-6L3.2 9.4l6.1-.9L12 3z" />
                  </svg>
                </span>
                {f.jobSuccess}% Job Success
              </span>
            ) : null}
            <span className="font-medium text-[#001e00]">{f.earned}</span>
            {f.availableNow ? (
              <span className="flex items-center gap-1.5 rounded-full bg-[#e8f6e6] px-3 py-1 text-[13px] font-medium text-[#108a00]">
                <IconBolt className="h-3.5 w-3.5" />
                Available now
              </span>
            ) : null}
            {f.offersConsultations ? (
              <span className="flex items-center gap-1.5">
                <IconVideo className="h-4.5 w-4.5" />
                Offers consultations
              </span>
            ) : null}
          </div>

          <div className="mt-3.5">
            <SkillChips skills={f.skills} max={7} />
          </div>

          {f.relatedJobs > 0 ? (
            <p className="mt-3.5 text-[14px] font-semibold text-[#001e00]">
              {f.name} has worked{' '}
              <span className="text-[#108a00]">
                {f.relatedJobs} job{f.relatedJobs === 1 ? '' : 's'} related to your search.
              </span>
            </p>
          ) : null}

          <p className="mt-2.5 line-clamp-3 text-[15px] leading-relaxed text-[#001e00]">{f.bio}</p>
        </div>
      </div>
    </article>
  )
}
