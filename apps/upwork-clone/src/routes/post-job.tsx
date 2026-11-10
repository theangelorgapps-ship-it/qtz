import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import { AuthShell } from '~/components/auth/AuthShell'

export const Route = createFileRoute('/post-job')({
  component: PostJobPage,
  head: () => ({ meta: [{ title: 'Post a job | Upwork' }] }),
})

type Level = 'Entry' | 'Intermediate' | 'Expert'
type BudgetType = 'hourly' | 'fixed'

interface JobDraft {
  title: string
  description: string
  skills: string[]
  level: Level | null
  projectLength: string
  hoursPerWeek: string
  budgetType: BudgetType
  hourlyMin: string
  hourlyMax: string
  fixedBudget: string
}

const STEPS = ['Title', 'Description', 'Details', 'Budget', 'Review'] as const

const levels: Array<{ id: Level; description: string }> = [
  { id: 'Entry', description: 'Looking for someone relatively new to this field' },
  { id: 'Intermediate', description: 'Looking for substantial experience in this field' },
  { id: 'Expert', description: 'Looking for comprehensive and deep expertise in this field' },
]

const projectLengths = ['Less than 1 month', '1 to 3 months', '3 to 6 months', 'More than 6 months']
const hoursOptions = ['Less than 10 hrs/week', '10-30 hrs/week', 'More than 30 hrs/week', 'Not sure yet']

const inputClass =
  'w-full rounded-lg border border-[#9aaa97] bg-white px-4 py-3 text-[15px] text-[#1f1f1f] placeholder:text-[#5e6d55] focus:border-[#108a00] focus:outline-none focus:ring-2 focus:ring-[#14a800]/25'

const MAX_SKILLS = 10

function SkillsInput({
  skills,
  onChange,
}: {
  skills: string[]
  onChange: (skills: string[]) => void
}) {
  const [value, setValue] = useState('')

  function addSkill(raw: string) {
    const skill = raw.trim()
    if (skill.length === 0 || skills.length >= MAX_SKILLS) return
    if (skills.some((s) => s.toLowerCase() === skill.toLowerCase())) return
    onChange([...skills, skill])
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      addSkill(value)
      setValue('')
    } else if (event.key === 'Backspace' && value.length === 0 && skills.length > 0) {
      onChange(skills.slice(0, -1))
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-[#9aaa97] bg-white px-3 py-2 focus-within:border-[#108a00] focus-within:ring-2 focus-within:ring-[#14a800]/25">
        {skills.map((skill) => (
          <span
            key={skill}
            className="flex items-center gap-1.5 rounded-full bg-[#f2f7f2] px-3 py-1 text-sm text-[#1f1f1f]"
          >
            {skill}
            <button
              type="button"
              aria-label={`Remove ${skill}`}
              onClick={() => onChange(skills.filter((s) => s !== skill))}
              className="text-[#5e6d55] transition-colors hover:text-[#1f1f1f]"
            >
              <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
                <path
                  d="M2 2l8 8M10 2l-8 8"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </span>
        ))}
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={skills.length === 0 ? 'Type a skill and press Enter' : 'Add another skill'}
          className="min-w-[180px] flex-1 bg-transparent px-1 py-1.5 text-[15px] text-[#1f1f1f] placeholder:text-[#5e6d55] focus:outline-none"
          aria-label="Add a skill"
        />
      </div>
      <p className="mt-2 text-xs text-[#5e6d55]">
        {skills.length} of {MAX_SKILLS} skills added
      </p>
    </div>
  )
}

function ReviewRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 border-b border-[#e4ebe4] py-4 last:border-0 sm:grid-cols-[180px_1fr] sm:gap-6">
      <dt className="text-sm font-semibold text-[#5e6d55]">{label}</dt>
      <dd className="text-[15px] leading-relaxed text-[#1f1f1f]">{children}</dd>
    </div>
  )
}

function PostJobPage() {
  const [step, setStep] = useState(0)
  const [posted, setPosted] = useState(false)
  const [draft, setDraft] = useState<JobDraft>({
    title: '',
    description: '',
    skills: [],
    level: null,
    projectLength: projectLengths[1],
    hoursPerWeek: hoursOptions[1],
    budgetType: 'hourly',
    hourlyMin: '',
    hourlyMax: '',
    fixedBudget: '',
  })

  function update(patch: Partial<JobDraft>) {
    setDraft((d) => ({ ...d, ...patch }))
  }

  function canContinue(): boolean {
    switch (step) {
      case 0:
        return draft.title.trim().length > 0
      case 1:
        return draft.description.trim().length > 0 && draft.skills.length > 0
      case 2:
        return draft.level !== null
      case 3:
        return draft.budgetType === 'hourly'
          ? draft.hourlyMin.trim().length > 0 && draft.hourlyMax.trim().length > 0
          : draft.fixedBudget.trim().length > 0
      default:
        return true
    }
  }

  function handleContinue() {
    if (!canContinue()) return
    if (step < STEPS.length - 1) {
      setStep(step + 1)
    } else {
      setPosted(true)
    }
  }

  const progress = posted ? 100 : ((step + 1) / STEPS.length) * 100

  const budgetSummary =
    draft.budgetType === 'hourly'
      ? `$${draft.hourlyMin}–$${draft.hourlyMax} /hr`
      : `$${draft.fixedBudget} fixed price`

  return (
    <AuthShell
      rightSlot={
        <Link
          to="/dashboard"
          className="text-sm font-semibold text-[#1f1f1f] transition-colors hover:text-[#108a00]"
        >
          Save &amp; exit
        </Link>
      }
      belowHeader={
        <div className="h-1 w-full bg-[#e4ebe4]" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} aria-label="Job post progress">
          <div
            className="h-full bg-[#14a800] transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      }
    >
      {posted ? (
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#e8f6e6]">
            <svg viewBox="0 0 24 24" className="h-9 w-9" aria-hidden="true">
              <path
                d="M4.5 12.5l5 5L19.5 7"
                stroke="#108a00"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </span>
          <h1 className="mt-8 text-3xl font-medium tracking-[-0.02em] text-[#1f1f1f]">
            Your job is live
          </h1>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#5e6d55]">
            &ldquo;{draft.title}&rdquo; is now visible to freelancers in the marketplace. You&apos;ll
            start receiving proposals soon.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/jobs/$jobId"
              params={{ jobId: '022116124995209590313' }}
              className="rounded-full bg-[#108a00] px-8 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#0b6100]"
            >
              View job
            </Link>
            <Link
              to="/dashboard"
              className="rounded-full border-2 border-[#108a00] px-8 py-3 text-[15px] font-semibold text-[#108a00] transition-colors hover:bg-[#108a00] hover:text-white"
            >
              Back to dashboard
            </Link>
          </div>
        </div>
      ) : (
        <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#5e6d55]">
            Step {step + 1} of {STEPS.length} — {STEPS[step]}
          </p>

          {step === 0 ? (
            <div className="mt-6">
              <h1 className="text-3xl font-medium tracking-[-0.02em] text-[#1f1f1f]">
                Let&apos;s start with a strong title.
              </h1>
              <p className="mt-2 text-[15px] text-[#5e6d55]">
                This helps your job post stand out to the right candidates.
              </p>
              <label htmlFor="job-title" className="sr-only">
                Job title
              </label>
              <input
                id="job-title"
                type="text"
                value={draft.title}
                onChange={(e) => update({ title: e.target.value })}
                placeholder="Job title"
                className={`${inputClass} mt-6`}
              />
              <p className="mt-3 text-sm text-[#5e6d55]">
                Example: Full Stack Developer needed for SaaS dashboard
              </p>
            </div>
          ) : null}

          {step === 1 ? (
            <div className="mt-6">
              <h1 className="text-3xl font-medium tracking-[-0.02em] text-[#1f1f1f]">
                Describe what you need done
              </h1>
              <p className="mt-2 text-[15px] text-[#5e6d55]">
                Share the scope, deliverables, and anything that makes this project unique.
              </p>
              <label htmlFor="job-description" className="sr-only">
                Job description
              </label>
              <textarea
                id="job-description"
                rows={6}
                value={draft.description}
                onChange={(e) => update({ description: e.target.value })}
                placeholder="Describe the work, deliverables, and timeline…"
                className={`${inputClass} mt-6 resize-y`}
              />
              <div className="mt-6">
                <p className="mb-2 text-sm font-semibold text-[#1f1f1f]">Skills</p>
                <SkillsInput skills={draft.skills} onChange={(skills) => update({ skills })} />
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="mt-6">
              <h1 className="text-3xl font-medium tracking-[-0.02em] text-[#1f1f1f]">
                Tell us about the project
              </h1>
              <fieldset className="mt-6">
                <legend className="text-sm font-semibold text-[#1f1f1f]">Experience level</legend>
                <div className="mt-3 grid gap-3 sm:grid-cols-3" role="radiogroup">
                  {levels.map((l) => {
                    const selected = draft.level === l.id
                    return (
                      <button
                        key={l.id}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => update({ level: l.id })}
                        className={`rounded-2xl border-2 p-4 text-left transition-all ${
                          selected
                            ? 'border-[#108a00] bg-[#f7faf7] shadow-[0_6px_18px_rgba(16,138,0,0.10)]'
                            : 'border-[#d5e0d5] hover:border-[#9aaa97]'
                        }`}
                      >
                        <span className="block text-[15px] font-semibold text-[#1f1f1f]">
                          {l.id}
                        </span>
                        <span className="mt-1 block text-sm leading-snug text-[#5e6d55]">
                          {l.description}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </fieldset>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="project-length" className="mb-1.5 block text-sm font-semibold text-[#1f1f1f]">
                    Project length
                  </label>
                  <select
                    id="project-length"
                    value={draft.projectLength}
                    onChange={(e) => update({ projectLength: e.target.value })}
                    className={`${inputClass} appearance-none`}
                  >
                    {projectLengths.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="hours-per-week" className="mb-1.5 block text-sm font-semibold text-[#1f1f1f]">
                    Hours per week
                  </label>
                  <select
                    id="hours-per-week"
                    value={draft.hoursPerWeek}
                    onChange={(e) => update({ hoursPerWeek: e.target.value })}
                    className={`${inputClass} appearance-none`}
                  >
                    {hoursOptions.map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="mt-6">
              <h1 className="text-3xl font-medium tracking-[-0.02em] text-[#1f1f1f]">
                Set your budget
              </h1>
              <div className="mt-6 grid grid-cols-2 gap-3" role="radiogroup" aria-label="Budget type">
                {(
                  [
                    { id: 'hourly', label: 'Hourly rate' },
                    { id: 'fixed', label: 'Fixed price' },
                  ] as Array<{ id: BudgetType; label: string }>
                ).map((b) => {
                  const selected = draft.budgetType === b.id
                  return (
                    <button
                      key={b.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => update({ budgetType: b.id })}
                      className={`rounded-2xl border-2 p-4 text-center text-[15px] font-semibold transition-all ${
                        selected
                          ? 'border-[#108a00] bg-[#f7faf7] text-[#1f1f1f]'
                          : 'border-[#d5e0d5] text-[#5e6d55] hover:border-[#9aaa97]'
                      }`}
                    >
                      {b.label}
                    </button>
                  )
                })}
              </div>

              {draft.budgetType === 'hourly' ? (
                <div className="mt-6 flex items-end gap-3">
                  <div className="flex-1">
                    <label htmlFor="hourly-min" className="mb-1.5 block text-sm font-semibold text-[#1f1f1f]">
                      From
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[15px] text-[#5e6d55]">
                        $
                      </span>
                      <input
                        id="hourly-min"
                        type="number"
                        min={0}
                        inputMode="decimal"
                        value={draft.hourlyMin}
                        onChange={(e) => update({ hourlyMin: e.target.value })}
                        placeholder="25"
                        className={`${inputClass} pl-8`}
                      />
                    </div>
                  </div>
                  <span className="pb-3.5 text-[#5e6d55]">–</span>
                  <div className="flex-1">
                    <label htmlFor="hourly-max" className="mb-1.5 block text-sm font-semibold text-[#1f1f1f]">
                      To
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[15px] text-[#5e6d55]">
                        $
                      </span>
                      <input
                        id="hourly-max"
                        type="number"
                        min={0}
                        inputMode="decimal"
                        value={draft.hourlyMax}
                        onChange={(e) => update({ hourlyMax: e.target.value })}
                        placeholder="45"
                        className={`${inputClass} pl-8`}
                      />
                    </div>
                  </div>
                  <span className="pb-3.5 text-sm text-[#5e6d55]">/hr</span>
                </div>
              ) : (
                <div className="mt-6">
                  <label htmlFor="fixed-budget" className="mb-1.5 block text-sm font-semibold text-[#1f1f1f]">
                    Project budget
                  </label>
                  <div className="relative max-w-xs">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[15px] text-[#5e6d55]">
                      $
                    </span>
                    <input
                      id="fixed-budget"
                      type="number"
                      min={0}
                      inputMode="decimal"
                      value={draft.fixedBudget}
                      onChange={(e) => update({ fixedBudget: e.target.value })}
                      placeholder="500"
                      className={`${inputClass} pl-8`}
                    />
                  </div>
                </div>
              )}

              <p className="mt-4 rounded-lg bg-[#f2f7f2] px-4 py-3 text-sm text-[#4d4d4d]">
                A 7.99% marketplace fee applies to client payments on the Basic plan.
              </p>
            </div>
          ) : null}

          {step === 4 ? (
            <div className="mt-6">
              <h1 className="text-3xl font-medium tracking-[-0.02em] text-[#1f1f1f]">
                Review and post
              </h1>
              <dl className="mt-6 rounded-2xl border border-[#e4ebe4] bg-white px-6">
                <ReviewRow label="Title">{draft.title}</ReviewRow>
                <ReviewRow label="Description">
                  <span className="whitespace-pre-wrap">{draft.description}</span>
                </ReviewRow>
                <ReviewRow label="Skills">
                  <span className="flex flex-wrap gap-2">
                    {draft.skills.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-[#f2f7f2] px-3 py-1 text-sm text-[#1f1f1f]"
                      >
                        {s}
                      </span>
                    ))}
                  </span>
                </ReviewRow>
                <ReviewRow label="Experience level">{draft.level}</ReviewRow>
                <ReviewRow label="Project length">{draft.projectLength}</ReviewRow>
                <ReviewRow label="Hours per week">{draft.hoursPerWeek}</ReviewRow>
                <ReviewRow label="Budget">{budgetSummary}</ReviewRow>
                <ReviewRow label="Marketplace fee">7.99% on client payments</ReviewRow>
              </dl>
            </div>
          ) : null}

          {/* Footer controls */}
          <div className="mt-auto flex items-center justify-between pt-12">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="text-[15px] font-semibold text-[#108a00] hover:underline"
              >
                Back
              </button>
            ) : (
              <span aria-hidden="true" />
            )}
            <button
              type="button"
              onClick={handleContinue}
              disabled={!canContinue()}
              className="rounded-full bg-[#108a00] px-8 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#0b6100] disabled:cursor-not-allowed disabled:bg-[#beccbe]"
            >
              {step === STEPS.length - 1 ? 'Post this job' : 'Continue'}
            </button>
          </div>
        </div>
      )}
    </AuthShell>
  )
}
