import type { ExperienceLevel, Freelancer, Job } from '~/lib/data'

/* ------------------------------- Jobs ----------------------------------- */

export type SortOption = 'relevance' | 'recent' | 'budget'

export interface JobFilterState {
  categories: string[]
  levels: ExperienceLevel[]
  hourly: boolean
  hourlyMin: string
  hourlyMax: string
  fixed: boolean
  budgets: string[]
  hires: string[]
  durations: string[]
  hoursPerWeek: string[]
  contractToHire: boolean
}

export const initialJobFilters: JobFilterState = {
  categories: [],
  levels: [],
  hourly: false,
  hourlyMin: '',
  hourlyMax: '',
  fixed: false,
  budgets: [],
  hires: [],
  durations: [],
  hoursPerWeek: [],
  contractToHire: false,
}

export const BUDGET_RANGES: Array<{ id: string; label: string; min: number; max: number | null }> = [
  { id: 'lt100', label: 'Less than $100', min: 0, max: 100 },
  { id: '100-500', label: '$100 to $500', min: 100, max: 500 },
  { id: '500-1k', label: '$500 - $1K', min: 500, max: 1000 },
  { id: '1k-5k', label: '$1K - $5K', min: 1000, max: 5000 },
  { id: '5k+', label: '$5K+', min: 5000, max: null },
]

export const PROJECT_LENGTHS = [
  'Less than 1 month',
  '1 to 3 months',
  '3 to 6 months',
  'More than 6 months',
] as const

export const HOURS_PER_WEEK = ['Less than 30 hrs/week', 'More than 30 hrs/week'] as const

export const HIRE_BUCKETS: Array<{ id: string; label: string; test: (hires: number) => boolean }> = [
  { id: 'none', label: 'No hires', test: (n) => n === 0 },
  { id: '1-9', label: '1 to 9 hires', test: (n) => n >= 1 && n <= 9 },
  { id: '10+', label: '10+ hires', test: (n) => n >= 10 },
]

function matchesQuery(haystack: string[], q: string): boolean {
  const needle = q.trim().toLowerCase()
  if (!needle) return true
  return haystack.some((h) => h.toLowerCase().includes(needle))
}

export function filterJobs(jobs: Job[], q: string, f: JobFilterState): Job[] {
  return jobs.filter((job) => {
    if (!matchesQuery([job.title, job.description, ...job.skills], q)) return false
    if (f.categories.length > 0 && !f.categories.includes(job.category)) return false
    if (f.levels.length > 0 && !f.levels.includes(job.level)) return false

    // Job type: unchecked means "include this type".
    if (f.hourly && !f.fixed && job.type !== 'hourly') return false
    if (f.fixed && !f.hourly && job.type !== 'fixed') return false

    if (job.type === 'hourly' && (f.hourlyMin !== '' || f.hourlyMax !== '')) {
      const min = f.hourlyMin === '' ? null : Number(f.hourlyMin)
      const max = f.hourlyMax === '' ? null : Number(f.hourlyMax)
      const lo = job.hourlyMin ?? 0
      const hi = job.hourlyMax ?? Number.POSITIVE_INFINITY
      if (min !== null && hi < min) return false
      if (max !== null && lo > max) return false
    }

    if (job.type === 'fixed' && f.budgets.length > 0 && job.fixedBudget !== undefined) {
      const inRange = f.budgets.some((id) => {
        const range = BUDGET_RANGES.find((r) => r.id === id)
        if (!range) return false
        const budget = job.fixedBudget ?? 0
        return budget >= range.min && (range.max === null || budget < range.max)
      })
      if (!inRange) return false
    }

    if (f.hires.length > 0) {
      const ok = f.hires.some((id) => HIRE_BUCKETS.find((b) => b.id === id)?.test(job.client.hires))
      if (!ok) return false
    }

    if (f.durations.length > 0 && !f.durations.includes(job.duration)) return false
    if (f.hoursPerWeek.length > 0 && !f.hoursPerWeek.includes(job.hoursPerWeek)) return false
    if (f.contractToHire && !job.contractToHire) return false

    return true
  })
}

function budgetScore(job: Job): number {
  if (job.type === 'fixed') return job.fixedBudget ?? 0
  // Rough monthly-equivalent for hourly jobs so the two types are comparable.
  return (job.hourlyMax ?? 0) * 160
}

export function sortJobs(jobs: Job[], sort: SortOption): Job[] {
  const copy = [...jobs]
  if (sort === 'recent') copy.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo)
  else if (sort === 'budget') copy.sort((a, b) => budgetScore(b) - budgetScore(a))
  return copy
}

export function isJobFilterActive(f: JobFilterState): boolean {
  return (
    f.categories.length > 0 ||
    f.levels.length > 0 ||
    f.hourly ||
    f.fixed ||
    f.hourlyMin !== '' ||
    f.hourlyMax !== '' ||
    f.budgets.length > 0 ||
    f.hires.length > 0 ||
    f.durations.length > 0 ||
    f.hoursPerWeek.length > 0 ||
    f.contractToHire
  )
}

/* ------------------------------- Talent ---------------------------------- */

export type TalentType = 'all' | 'freelancers' | 'agencies'
export type JobSuccessMin = 0 | 80 | 90 | 100

export interface TalentFilterState {
  badges: string[]
  rateMin: string
  rateMax: string
  skills: string[]
  location: string
  talentType: TalentType
  contractToHire: boolean
  consultations: boolean
  jobSuccess: JobSuccessMin
}

export const initialTalentFilters: TalentFilterState = {
  badges: [],
  rateMin: '',
  rateMax: '',
  skills: [],
  location: '',
  talentType: 'all',
  contractToHire: false,
  consultations: false,
  jobSuccess: 0,
}

export const TALENT_BADGES = ['Top Rated Plus', 'Top Rated', 'Rising Talent'] as const

export function filterTalent(talent: Freelancer[], q: string, f: TalentFilterState): Freelancer[] {
  return talent.filter((t) => {
    if (!matchesQuery([t.name, t.title, t.bio, ...t.skills], q)) return false
    if (f.badges.length > 0 && (t.badge === null || !f.badges.includes(t.badge))) return false

    const min = f.rateMin === '' ? null : Number(f.rateMin)
    const max = f.rateMax === '' ? null : Number(f.rateMax)
    if (min !== null && t.hourlyRate < min) return false
    if (max !== null && t.hourlyRate > max) return false

    if (f.skills.length > 0 && !f.skills.some((s) => t.skills.includes(s))) return false

    const loc = f.location.trim().toLowerCase()
    if (loc && !`${t.city} ${t.country}`.toLowerCase().includes(loc)) return false

    if (f.talentType === 'freelancers' && t.agency) return false
    if (f.talentType === 'agencies' && !t.agency) return false

    if (f.contractToHire && !t.contractToHire) return false
    if (f.consultations && !t.offersConsultations) return false
    if (f.jobSuccess > 0 && (t.jobSuccess === null || t.jobSuccess < f.jobSuccess)) return false

    return true
  })
}

export function isTalentFilterActive(f: TalentFilterState): boolean {
  return (
    f.badges.length > 0 ||
    f.rateMin !== '' ||
    f.rateMax !== '' ||
    f.skills.length > 0 ||
    f.location.trim() !== '' ||
    f.talentType !== 'all' ||
    f.contractToHire ||
    f.consultations ||
    f.jobSuccess > 0
  )
}

/* ------------------------------- Shared ---------------------------------- */

export function toggle(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}
