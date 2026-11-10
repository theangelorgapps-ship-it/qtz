import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { JOBS } from '~/lib/data'
import { JobCard } from '~/components/search/JobCard'
import { JobFilters } from '~/components/search/JobFilters'
import { SearchShell } from '~/components/search/SearchShell'
import {
  filterJobs,
  initialJobFilters,
  isJobFilterActive,
  sortJobs,
  type SortOption,
} from '~/components/search/filters'

export const Route = createFileRoute('/search/jobs')({
  validateSearch: (search: Record<string, unknown>): { q?: string } => ({
    q: typeof search.q === 'string' && search.q !== '' ? search.q : undefined,
  }),
  component: SearchJobsPage,
})

const SORT_LABELS: Record<SortOption, string> = {
  relevance: 'Relevance',
  recent: 'Most recent',
  budget: 'Highest budget',
}

function SearchJobsPage() {
  const { q = '' } = Route.useSearch()
  const navigate = useNavigate()
  const [filters, setFilters] = useState(initialJobFilters)
  const [sort, setSort] = useState<SortOption>('relevance')

  const results = useMemo(() => sortJobs(filterJobs(JOBS, q, filters), sort), [q, filters, sort])

  const setQ = (value: string) => {
    void navigate({ to: '/search/jobs', search: { q: value }, replace: true })
  }

  const clearAll = () => {
    setFilters(initialJobFilters)
    setQ('')
  }

  return (
    <SearchShell
      activeTab="jobs"
      q={q}
      onQChange={setQ}
      sidebar={<JobFilters value={filters} onChange={setFilters} />}
    >
      <div className="flex items-center justify-between pb-2">
        <p className="text-[14px] text-[#5e6d55]">
          {results.length} job{results.length === 1 ? '' : 's'} found
        </p>
        <label className="flex items-center gap-2 rounded-full border border-[#9aaa97] px-4 py-2 text-[15px] text-[#001e00]">
          <span className="whitespace-nowrap">Sort by:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            aria-label="Sort jobs"
            className="cursor-pointer bg-transparent font-medium outline-none"
          >
            {(Object.keys(SORT_LABELS) as SortOption[]).map((opt) => (
              <option key={opt} value={opt}>
                {SORT_LABELS[opt]}
              </option>
            ))}
          </select>
        </label>
      </div>

      {results.length > 0 ? (
        <div>
          {results.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-xl border border-[#d5e0d5] py-16 text-center">
          <p className="text-[20px] font-semibold text-[#001e00]">No jobs found</p>
          <p className="max-w-md text-[15px] text-[#5e6d55]">
            Try adjusting your search or filters to find what you&apos;re looking for.
          </p>
          <button
            type="button"
            onClick={clearAll}
            className="rounded-full bg-[#108a00] px-6 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#0b6100]"
          >
            Clear filters
          </button>
        </div>
      )}

      {results.length > 0 && (isJobFilterActive(filters) || q) ? (
        <div className="pt-6">
          <button
            type="button"
            onClick={clearAll}
            className="text-[14px] font-semibold text-[#108a00] hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : null}
    </SearchShell>
  )
}
