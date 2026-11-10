import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { JOB_CATEGORIES } from '~/lib/data'
import { IconChevronDown, IconSearch, IconX } from './icons'

const PRIMARY_CATEGORIES = JOB_CATEGORIES.slice(0, 5)
const MORE_CATEGORIES = JOB_CATEGORIES.slice(5)

export function CategoryNav() {
  return (
    <nav aria-label="Categories" className="border-b border-[#e4ebe4]">
      <div className="mx-auto flex max-w-[1400px] items-center gap-7 overflow-x-auto px-6 py-3.5 lg:px-10">
        {PRIMARY_CATEGORIES.map((cat) => (
          <Link
            key={cat}
            to="/search/jobs"
            search={{ q: cat }}
            className="whitespace-nowrap text-[14px] text-[#001e00] transition-colors hover:text-[#108a00] hover:underline"
          >
            {cat}
          </Link>
        ))}
        <div className="group relative">
          <button
            type="button"
            className="flex items-center gap-1 whitespace-nowrap text-[14px] text-[#001e00] transition-colors group-hover:text-[#108a00]"
          >
            More
            <IconChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
          </button>
          <div className="invisible absolute left-0 top-full z-40 min-w-[220px] rounded-lg border border-[#d5e0d5] bg-white py-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
            {MORE_CATEGORIES.map((cat) => (
              <Link
                key={cat}
                to="/search/jobs"
                search={{ q: cat }}
                className="block px-4 py-2 text-[14px] text-[#001e00] hover:bg-[#f2f7f2]"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export function SearchTabs({ active, q }: { active: 'talent' | 'jobs'; q: string }) {
  const base = 'pb-3 text-[22px] transition-colors'
  const activeCls = 'border-b-[3px] border-[#001e00] font-semibold text-[#001e00]'
  const idleCls = 'border-b-[3px] border-transparent text-[#5e6d55] hover:text-[#001e00]'
  return (
    <div className="flex gap-8 border-b border-[#e4ebe4]" role="tablist">
      <Link
        to="/search/talent"
        search={{ q }}
        role="tab"
        aria-selected={active === 'talent'}
        className={`${base} ${active === 'talent' ? activeCls : idleCls}`}
      >
        Talent
      </Link>
      <Link
        to="/search/jobs"
        search={{ q }}
        role="tab"
        aria-selected={active === 'jobs'}
        className={`${base} ${active === 'jobs' ? activeCls : idleCls}`}
      >
        Jobs
      </Link>
    </div>
  )
}

export function SearchShell({
  activeTab,
  q,
  onQChange,
  sidebar,
  children,
}: {
  activeTab: 'talent' | 'jobs'
  q: string
  onQChange: (value: string) => void
  sidebar: ReactNode
  children: ReactNode
}) {
  return (
    <div>
      <CategoryNav />
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex flex-wrap items-center gap-4 py-6">
          <div className="flex min-w-[280px] max-w-[640px] flex-1 items-center gap-3 rounded-full border border-[#5e6d55] px-5 py-3 transition-colors focus-within:border-[#108a00]">
            <IconSearch className="h-5 w-5 shrink-0 text-[#001e00]" />
            <input
              type="text"
              value={q}
              onChange={(e) => onQChange(e.target.value)}
              placeholder={activeTab === 'jobs' ? 'Search for jobs' : 'Search for talent'}
              aria-label="Search"
              className="w-full bg-transparent text-[16px] text-[#001e00] outline-none placeholder:text-[#9aaa97]"
            />
            {q ? (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => onQChange('')}
                className="shrink-0 text-[#5e6d55] transition-colors hover:text-[#001e00]"
              >
                <IconX className="h-5 w-5" />
              </button>
            ) : null}
          </div>
          <button
            type="button"
            className="text-[15px] font-semibold text-[#108a00] hover:underline"
          >
            Advanced search
          </button>
        </div>

        <SearchTabs active={activeTab} q={q} />

        <div className="grid gap-10 py-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside aria-label="Filters" className="lg:pt-1">
            {sidebar}
          </aside>
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </div>
  )
}
