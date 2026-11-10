import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { AuthShell } from '~/components/auth/AuthShell'

export const Route = createFileRoute('/signup')({
  component: SignupPage,
  head: () => ({ meta: [{ title: 'Sign up for Upwork' }] }),
})

type Role = 'hiring' | 'freelancer'

const roles: Array<{ id: Role; title: string; description: string }> = [
  { id: 'hiring', title: "I'm hiring", description: 'Post jobs and hire freelancers' },
  { id: 'freelancer', title: "I'm a freelancer", description: 'Find jobs and get paid' },
]

const countries = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'India',
  'Philippines',
  'Ukraine',
  'Pakistan',
  'Brazil',
]

const inputClass =
  'w-full rounded-lg border border-[#9aaa97] bg-white px-4 py-3 text-[15px] text-[#1f1f1f] placeholder:text-[#5e6d55] focus:border-[#108a00] focus:outline-none focus:ring-2 focus:ring-[#14a800]/25'

function RoleIcon({ role }: { role: Role }) {
  return role === 'hiring' ? (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
      <rect x="3" y="7" width="18" height="13" rx="2" stroke="#108a00" strokeWidth="1.6" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" stroke="#108a00" strokeWidth="1.6" />
      <path d="M3 12h18" stroke="#108a00" strokeWidth="1.6" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="#108a00" strokeWidth="1.6" />
      <path d="M4 20c0-3.3 3.6-5.5 8-5.5s8 2.2 8 5.5" stroke="#108a00" strokeWidth="1.6" />
    </svg>
  )
}

function SignupPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<1 | 2>(1)
  const [role, setRole] = useState<Role | null>(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [country, setCountry] = useState(countries[0])
  const [sendEmails, setSendEmails] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)

  const stepTwoValid =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    email.trim().length > 0 &&
    password.length >= 8 &&
    agreeTerms

  function handleCreateAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void navigate({ to: '/dashboard' })
  }

  return (
    <AuthShell>
      <div className="flex flex-1 items-start justify-center px-6 pb-16 pt-10 sm:pt-16">
        {step === 1 ? (
          <div className="w-full max-w-xl">
            <h1 className="text-center text-[30px] font-medium tracking-[-0.02em] text-[#1f1f1f]">
              Welcome to Upwork
            </h1>
            <p className="mt-3 text-center text-[17px] text-[#5e6d55]">
              Which describes you best?
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2" role="radiogroup" aria-label="Account type">
              {roles.map((r) => {
                const selected = role === r.id
                return (
                  <button
                    key={r.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setRole(r.id)}
                    className={`flex flex-col items-start gap-3 rounded-2xl border-2 bg-white p-6 text-left transition-all ${
                      selected
                        ? 'border-[#108a00] shadow-[0_8px_24px_rgba(16,138,0,0.12)]'
                        : 'border-[#d5e0d5] hover:border-[#9aaa97]'
                    }`}
                  >
                    <span className="flex w-full items-start justify-between">
                      <RoleIcon role={r.id} />
                      <span
                        aria-hidden="true"
                        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                          selected ? 'border-[#108a00] bg-[#108a00]' : 'border-[#beccbe]'
                        }`}
                      >
                        {selected ? (
                          <svg viewBox="0 0 12 12" className="h-3 w-3">
                            <path
                              d="M2.5 6.2 4.8 8.5 9.5 3.5"
                              stroke="#fff"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              fill="none"
                            />
                          </svg>
                        ) : null}
                      </span>
                    </span>
                    <span className="text-lg font-semibold text-[#1f1f1f]">{r.title}</span>
                    <span className="text-[15px] leading-snug text-[#5e6d55]">{r.description}</span>
                  </button>
                )
              })}
            </div>

            <button
              type="button"
              disabled={role === null}
              onClick={() => setStep(2)}
              className="mt-8 w-full rounded-full bg-[#108a00] py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#0b6100] disabled:cursor-not-allowed disabled:bg-[#beccbe]"
            >
              Continue
            </button>

            <p className="mt-8 text-center text-[15px] text-[#5e6d55]">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-[#108a00] hover:underline">
                Log in
              </Link>
            </p>
          </div>
        ) : (
          <div className="w-full max-w-md">
            <h1 className="text-center text-[26px] font-medium tracking-[-0.02em] text-[#1f1f1f]">
              {role === 'freelancer' ? 'Sign up to find work' : 'Sign up to hire talent'}
            </h1>

            <form onSubmit={handleCreateAccount} className="mt-8 flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="signup-first-name" className="sr-only">
                    First name
                  </label>
                  <input
                    id="signup-first-name"
                    type="text"
                    autoComplete="given-name"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="signup-last-name" className="sr-only">
                    Last name
                  </label>
                  <input
                    id="signup-last-name"
                    type="text"
                    autoComplete="family-name"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="signup-email" className="sr-only">
                  Email
                </label>
                <input
                  id="signup-email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="signup-password" className="sr-only">
                  Password
                </label>
                <input
                  id="signup-password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Password (8 or more characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="signup-country" className="mb-1.5 block text-sm font-medium text-[#1f1f1f]">
                  Country
                </label>
                <select
                  id="signup-country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className={`${inputClass} appearance-none`}
                >
                  {countries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <label className="flex items-start gap-3 text-sm text-[#4d4d4d]">
                <input
                  type="checkbox"
                  checked={sendEmails}
                  onChange={(e) => setSendEmails(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded accent-[#108a00]"
                />
                Send me helpful emails to find rewarding work and job leads.
              </label>

              <label className="flex items-start gap-3 text-sm text-[#4d4d4d]">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded accent-[#108a00]"
                />
                <span>
                  Yes, I understand and agree to the{' '}
                  <Link to="/" className="font-semibold text-[#108a00] hover:underline">
                    Upwork Terms of Service
                  </Link>
                  .
                </span>
              </label>

              <button
                type="submit"
                disabled={!stepTwoValid}
                className="mt-2 w-full rounded-full bg-[#108a00] py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#0b6100] disabled:cursor-not-allowed disabled:bg-[#beccbe]"
              >
                Create my account
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-center text-sm font-semibold text-[#108a00] hover:underline"
              >
                Back
              </button>
            </form>
          </div>
        )}
      </div>
    </AuthShell>
  )
}
