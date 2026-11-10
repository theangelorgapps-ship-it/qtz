import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import type { ComponentType } from 'react'
import {
  ArrowRightIcon,
  BoltIcon,
  ClockIcon,
  DollarIcon,
  PeopleIcon,
  QuestionIcon,
  RocketIcon,
  SparkleIcon,
} from '~/components/icons'

type Option = { label: string; Icon: ComponentType<{ className?: string }> }

const questions: Array<{ prompt: string; options: Option[] }> = [
  {
    prompt: "What's your top business priority?",
    options: [
      { label: 'Save time', Icon: ClockIcon },
      { label: 'Grow revenue', Icon: DollarIcon },
      { label: 'Boost loyalty', Icon: PeopleIcon },
      { label: 'Make better decisions', Icon: BoltIcon },
      { label: 'Build something new', Icon: RocketIcon },
      { label: 'Other', Icon: QuestionIcon },
    ],
  },
  {
    prompt: 'What kind of work should AI take on first?',
    options: [
      { label: 'Customer support', Icon: PeopleIcon },
      { label: 'Marketing content', Icon: BoltIcon },
      { label: 'Data & reporting', Icon: DollarIcon },
      { label: 'Internal workflows', Icon: ClockIcon },
      { label: 'Product features', Icon: RocketIcon },
      { label: 'Other', Icon: QuestionIcon },
    ],
  },
  {
    prompt: 'How soon do you want to get started?',
    options: [
      { label: 'Right away', Icon: BoltIcon },
      { label: 'Within a month', Icon: ClockIcon },
      { label: 'This quarter', Icon: DollarIcon },
      { label: 'Just exploring', Icon: QuestionIcon },
    ],
  },
]

export function AiQuiz() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const done = step >= questions.length

  function choose(label: string) {
    setAnswers((prev) => [...prev.slice(0, step), label])
    setStep((s) => s + 1)
  }

  function restart() {
    setStep(0)
    setAnswers([])
  }

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10 lg:py-16">
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Left copy */}
        <div className="pt-4">
          <p className="flex items-center gap-2.5 text-sm font-semibold text-[#1f1f1f]">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e8f6e6]">
              <SparkleIcon className="h-4 w-4" />
            </span>
            Free AI project scoping
          </p>
          <h2 className="mt-6 text-3xl font-medium leading-[1.08] tracking-[-0.03em] sm:text-4xl lg:text-[52px]">
            Not sure where to start with AI?
          </h2>
          <p className="mt-5 max-w-[440px] text-lg leading-snug text-[#3c3c3c]">
            Answer three quick questions. Get matched to the right AI project and specialist.
          </p>
        </div>

        {/* Quiz card */}
        <div className="rounded-3xl border border-[#e4ebe4] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:p-9">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-[#5e6d55]">
              {done ? 'All 3 questions answered' : `Question ${step + 1} of 3`}
            </p>
            <div className="flex gap-1.5" aria-label="Quiz progress">
              {questions.map((q, i) => (
                <span
                  key={q.prompt}
                  className={`h-2 w-10 rounded-full transition-colors duration-300 ${
                    i < step || done ? 'bg-[#14a800]' : i === step ? 'bg-[#14a800]' : 'bg-[#e4ebe4]'
                  }`}
                />
              ))}
            </div>
          </div>

          {done ? (
            <div className="pt-8">
              <h3 className="text-2xl font-medium tracking-[-0.02em] sm:text-3xl">
                You're all set
              </h3>
              <p className="mt-3 text-base leading-snug text-[#3c3c3c]">
                We'll match you to the right AI project and specialist
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {answers.map((a) => (
                  <li
                    key={a}
                    className="rounded-full bg-[#f2f7f2] px-4 py-1.5 text-sm font-medium text-[#1f1f1f]"
                  >
                    {a}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 rounded-full bg-[#108a00] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0b6100]"
                >
                  Get matched
                  <ArrowRightIcon className="h-4 w-4 [&>path]:stroke-white" />
                </Link>
                <button
                  type="button"
                  onClick={restart}
                  className="text-sm font-semibold text-[#108a00] underline underline-offset-4 hover:text-[#0b6100]"
                >
                  Start over
                </button>
              </div>
            </div>
          ) : (
            <div key={step}>
              <h3 className="pt-8 text-2xl font-medium leading-tight tracking-[-0.02em] sm:text-[28px]">
                {questions[step].prompt}
              </h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {questions[step].options.map(({ label, Icon }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => choose(label)}
                    className="flex items-center gap-2.5 rounded-xl bg-[#f7faf7] px-4 py-3.5 text-left text-sm font-semibold text-[#1f1f1f] transition-all duration-150 hover:bg-[#e8f6e6] hover:ring-2 hover:ring-[#14a800] sm:flex-col sm:items-start sm:gap-3 sm:px-5 sm:py-5"
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
