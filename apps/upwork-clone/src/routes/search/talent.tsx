import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { FREELANCERS } from '~/lib/data'
import { SearchShell } from '~/components/search/SearchShell'
import { TalentCard } from '~/components/search/TalentCard'
import { TalentFilters } from '~/components/search/TalentFilters'
import {
  filterTalent,
  initialTalentFilters,
  isTalentFilterActive,
} from '~/components/search/filters'

export const Route = createFileRoute('/search/talent')({
  validateSearch: (search: Record<string, unknown>): { q?: string } => ({
    q: typeof search.q === 'string' && search.q !== '' ? search.q : undefined,
  }),
  component: SearchTalentPage,
})

function SearchTalentPage() {
  const { q = '' } = Route.useSearch()
  const navigate = useNavigate()
  const [filters, setFilters] = useState(initialTalentFilters)

  const results = useMemo(() => filterTalent(FREELANCERS, q, filters), [q, filters])

  const setQ = (value: string) => {
    void navigate({ to: '/search/talent', search: { q: value }, replace: true })
  }

  const clearAll = () => {
    setFilters(initialTalentFilters)
    setQ('')
  }

  return (
    <SearchShell
      activeTab="talent"
      q={q}
      onQChange={setQ}
      sidebar={<TalentFilters value={filters} onChange={setFilters} />}
    >
      <p className="pb-2 text-[14px] text-[#5e6d55]">
        {results.length} freelancer{results.length === 1 ? '' : 's'} found
      </p>

      {results.length > 0 ? (
        <div>
          {results.map((f) => (
            <TalentCard key={f.id} freelancer={f} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-xl border border-[#d5e0d5] py-16 text-center">
          <p className="text-[20px] font-semibold text-[#001e00]">No talent found</p>
          <p className="max-w-md text-[15px] text-[#5e6d55]">
            Try adjusting your search or filters to find the right freelancer.
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

      {results.length > 0 && (isTalentFilterActive(filters) || q) ? (
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
