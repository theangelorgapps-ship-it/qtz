import { useMemo, useState } from 'react'
import { JOBS, JOB_CATEGORIES, type ExperienceLevel } from '~/lib/data'
import {
  BUDGET_RANGES,
  HIRE_BUCKETS,
  HOURS_PER_WEEK,
  PROJECT_LENGTHS,
  toggle,
  type JobFilterState,
} from './filters'
import { CheckRow, FilterGroup, MoneyInput } from './controls'
import { IconChevronDown } from './icons'

const LEVELS: ExperienceLevel[] = ['Entry Level', 'Intermediate', 'Expert']

export function JobFilters({
  value,
  onChange,
}: {
  value: JobFilterState
  onChange: (next: JobFilterState) => void
}) {
  const [catOpen, setCatOpen] = useState(false)

  const counts = useMemo(() => {
    const by = (pick: (job: (typeof JOBS)[number]) => string) =>
      JOBS.reduce<Record<string, number>>((acc, job) => {
        const k = pick(job)
        acc[k] = (acc[k] ?? 0) + 1
        return acc
      }, {})
    return {
      category: by((j) => j.category),
      level: by((j) => j.level),
      type: by((j) => j.type),
      duration: by((j) => j.duration),
      hours: by((j) => j.hoursPerWeek),
      hires: {
        none: JOBS.filter((j) => j.client.hires === 0).length,
        '1-9': JOBS.filter((j) => j.client.hires >= 1 && j.client.hires <= 9).length,
        '10+': JOBS.filter((j) => j.client.hires >= 10).length,
      } as Record<string, number>,
    }
  }, [])

  const set = (patch: Partial<JobFilterState>) => onChange({ ...value, ...patch })

  return (
    <div>
      <FilterGroup title="Category">
        <div className="relative">
          <button
            type="button"
            onClick={() => setCatOpen((v) => !v)}
            aria-expanded={catOpen}
            className="flex w-full items-center justify-between rounded-full border border-[#9aaa97] px-4 py-2.5 text-[15px] text-[#5e6d55] transition-colors hover:border-[#5e6d55]"
          >
            {value.categories.length > 0
              ? `${value.categories.length} selected`
              : 'Select Categories'}
            <IconChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${catOpen ? 'rotate-180' : ''}`}
            />
          </button>
          {catOpen ? (
            <div className="mt-2 max-h-72 overflow-y-auto rounded-lg border border-[#d5e0d5] bg-white p-2 shadow-md">
              {JOB_CATEGORIES.map((cat) => (
                <CheckRow
                  key={cat}
                  label={cat}
                  count={counts.category[cat] ?? 0}
                  checked={value.categories.includes(cat)}
                  onChange={() => set({ categories: toggle(value.categories, cat) })}
                />
              ))}
            </div>
          ) : null}
        </div>
      </FilterGroup>

      <FilterGroup title="Experience level">
        {LEVELS.map((level) => (
          <CheckRow
            key={level}
            label={level}
            count={counts.level[level] ?? 0}
            checked={value.levels.includes(level)}
            onChange={() => set({ levels: toggle(value.levels, level) as ExperienceLevel[] })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Job type" info>
        <CheckRow
          label="Hourly"
          count={counts.type.hourly ?? 0}
          checked={value.hourly}
          onChange={(v) => set({ hourly: v })}
        />
        {value.hourly ? (
          <div className="flex items-center gap-2 py-1.5 pl-8 text-[14px] text-[#5e6d55]">
            <MoneyInput
              value={value.hourlyMin}
              onChange={(v) => set({ hourlyMin: v })}
              placeholder="Min"
              ariaLabel="Minimum hourly rate"
            />
            <span>/hr</span>
            <MoneyInput
              value={value.hourlyMax}
              onChange={(v) => set({ hourlyMax: v })}
              placeholder="Max"
              ariaLabel="Maximum hourly rate"
            />
            <span>/hr</span>
          </div>
        ) : null}
        <CheckRow
          label="Fixed-Price"
          count={counts.type.fixed ?? 0}
          checked={value.fixed}
          onChange={(v) => set({ fixed: v })}
        />
        {value.fixed ? (
          <div className="pl-8">
            {BUDGET_RANGES.map((range) => (
              <CheckRow
                key={range.id}
                label={range.label}
                checked={value.budgets.includes(range.id)}
                onChange={() => set({ budgets: toggle(value.budgets, range.id) })}
              />
            ))}
          </div>
        ) : null}
      </FilterGroup>

      <FilterGroup title="Client history" info>
        {HIRE_BUCKETS.map((bucket) => (
          <CheckRow
            key={bucket.id}
            label={bucket.label}
            count={counts.hires[bucket.id] ?? 0}
            checked={value.hires.includes(bucket.id)}
            onChange={() => set({ hires: toggle(value.hires, bucket.id) })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Project length">
        {PROJECT_LENGTHS.map((len) => (
          <CheckRow
            key={len}
            label={len}
            count={counts.duration[len] ?? 0}
            checked={value.durations.includes(len)}
            onChange={() => set({ durations: toggle(value.durations, len) })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Hours per week" info>
        {HOURS_PER_WEEK.map((h) => (
          <CheckRow
            key={h}
            label={h}
            count={counts.hours[h] ?? 0}
            checked={value.hoursPerWeek.includes(h)}
            onChange={() => set({ hoursPerWeek: toggle(value.hoursPerWeek, h) })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Job duration" info>
        <CheckRow
          label="Contract-to-hire roles"
          checked={value.contractToHire}
          onChange={(v) => set({ contractToHire: v })}
        />
      </FilterGroup>
    </div>
  )
}
