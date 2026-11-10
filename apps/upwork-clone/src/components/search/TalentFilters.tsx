import { useMemo, useState } from 'react'
import { FREELANCERS } from '~/lib/data'
import {
  TALENT_BADGES,
  toggle,
  type JobSuccessMin,
  type TalentFilterState,
  type TalentType,
} from './filters'
import { CheckRow, FilterGroup, MoneyInput, RadioRow } from './controls'
import { BadgeGlyph } from './icons'

const ALL_SKILLS = Array.from(new Set(FREELANCERS.flatMap((f) => f.skills))).sort()
const SKILLS_PREVIEW = 8

const TALENT_TYPES: Array<{ id: TalentType; label: string }> = [
  { id: 'all', label: 'Freelancers & Agencies' },
  { id: 'freelancers', label: 'Freelancers' },
  { id: 'agencies', label: 'Agencies' },
]

const JOB_SUCCESS: Array<{ value: JobSuccessMin; label: string }> = [
  { value: 80, label: '80% & up' },
  { value: 90, label: '90% & up' },
  { value: 100, label: '100%' },
]

export function TalentFilters({
  value,
  onChange,
}: {
  value: TalentFilterState
  onChange: (next: TalentFilterState) => void
}) {
  const [seeMoreSkills, setSeeMoreSkills] = useState(false)
  const badgeCounts = useMemo(
    () =>
      FREELANCERS.reduce<Record<string, number>>((acc, f) => {
        if (f.badge) acc[f.badge] = (acc[f.badge] ?? 0) + 1
        return acc
      }, {}),
    [],
  )

  const set = (patch: Partial<TalentFilterState>) => onChange({ ...value, ...patch })
  const shownSkills = seeMoreSkills ? ALL_SKILLS : ALL_SKILLS.slice(0, SKILLS_PREVIEW)

  return (
    <div>
      <FilterGroup title="Talent badge" info>
        {TALENT_BADGES.map((badge) => (
          <CheckRow
            key={badge}
            label={badge}
            count={badgeCounts[badge] ?? 0}
            adornment={<BadgeGlyph badge={badge} className="h-5 w-5 shrink-0" />}
            checked={value.badges.includes(badge)}
            onChange={() => set({ badges: toggle(value.badges, badge) })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Hourly rate">
        <div className="flex items-center gap-2 py-1.5 text-[14px] text-[#5e6d55]">
          <MoneyInput
            value={value.rateMin}
            onChange={(v) => set({ rateMin: v })}
            placeholder="Min"
            ariaLabel="Minimum hourly rate"
          />
          <span>/hr</span>
          <MoneyInput
            value={value.rateMax}
            onChange={(v) => set({ rateMax: v })}
            placeholder="Max"
            ariaLabel="Maximum hourly rate"
          />
          <span>/hr</span>
        </div>
      </FilterGroup>

      <FilterGroup title="Skills">
        <div className="flex flex-wrap gap-2 py-1">
          {shownSkills.map((skill) => {
            const active = value.skills.includes(skill)
            return (
              <button
                key={skill}
                type="button"
                aria-pressed={active}
                onClick={() => set({ skills: toggle(value.skills, skill) })}
                className={`rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors ${
                  active
                    ? 'border-[#108a00] bg-[#e8f6e6] text-[#108a00]'
                    : 'border-[#d5e0d5] bg-[#f2f7f2] text-[#001e00] hover:border-[#9aaa97]'
                }`}
              >
                {skill}
              </button>
            )
          })}
        </div>
        <button
          type="button"
          onClick={() => setSeeMoreSkills((v) => !v)}
          className="mt-1.5 text-[14px] font-semibold text-[#108a00] hover:underline"
        >
          {seeMoreSkills ? 'See less' : 'See more'}
        </button>
      </FilterGroup>

      <FilterGroup title="Location">
        <input
          type="text"
          value={value.location}
          onChange={(e) => set({ location: e.target.value })}
          placeholder="Enter a country or city"
          aria-label="Location"
          className="w-full rounded-full border border-[#9aaa97] px-4 py-2.5 text-[15px] text-[#001e00] outline-none placeholder:text-[#9aaa97] focus:border-[#108a00]"
        />
      </FilterGroup>

      <FilterGroup title="Talent type">
        {TALENT_TYPES.map((t) => (
          <RadioRow
            key={t.id}
            name="talent-type"
            label={t.label}
            checked={value.talentType === t.id}
            onChange={() => set({ talentType: t.id })}
          />
        ))}
      </FilterGroup>

      <section className="border-b border-[#e4ebe4] py-4">
        <CheckRow
          label="Open to contract-to-hire"
          checked={value.contractToHire}
          onChange={(v) => set({ contractToHire: v })}
        />
        <CheckRow
          label="Offers consultations"
          checked={value.consultations}
          onChange={(v) => set({ consultations: v })}
        />
      </section>

      <FilterGroup title="Job success">
        {JOB_SUCCESS.map((opt) => (
          <RadioRow
            key={opt.value}
            name="job-success"
            label={opt.label}
            checked={value.jobSuccess === opt.value}
            onChange={() => set({ jobSuccess: opt.value })}
          />
        ))}
        {value.jobSuccess > 0 ? (
          <button
            type="button"
            onClick={() => set({ jobSuccess: 0 })}
            className="mt-1.5 text-[14px] font-semibold text-[#108a00] hover:underline"
          >
            Any job success
          </button>
        ) : null}
      </FilterGroup>
    </div>
  )
}
