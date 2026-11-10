import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { AuthShell } from '~/components/auth/AuthShell'
import { AppleButton, GoogleButton } from '~/components/auth/ProviderButtons'

export const Route = createFileRoute('/login')({
  component: LoginPage,
  head: () => ({ meta: [{ title: 'Log in to Upwork' }] }),
})

function LoginPage() {
  const navigate = useNavigate()
  const [identifier, setIdentifier] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void navigate({ to: '/dashboard' })
  }

  return (
    <AuthShell>
      <div className="flex flex-1 items-start justify-center px-6 pb-16 pt-10 sm:pt-16">
        <div className="w-full max-w-sm">
          <h1 className="text-center text-[26px] font-medium tracking-[-0.02em] text-[#1f1f1f]">
            Log in to Upwork
          </h1>

          <form onSubmit={handleSubmit} className="mt-8">
            <label htmlFor="login-identifier" className="sr-only">
              Username or email
            </label>
            <input
              id="login-identifier"
              type="text"
              autoComplete="username"
              placeholder="Username or email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full rounded-lg border border-[#9aaa97] bg-white px-4 py-3 text-[15px] text-[#1f1f1f] placeholder:text-[#5e6d55] focus:border-[#108a00] focus:outline-none focus:ring-2 focus:ring-[#14a800]/25"
            />
            {/* Cloudflare Turnstile widget renders here on the live site */}
            <button
              type="submit"
              className="mt-4 w-full rounded-full bg-[#108a00] py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#0b6100] disabled:cursor-not-allowed disabled:bg-[#beccbe]"
              disabled={identifier.trim().length === 0}
            >
              Continue
            </button>
          </form>

          <div className="my-6 flex items-center gap-4" aria-hidden="true">
            <span className="h-px flex-1 bg-[#d5e0d5]" />
            <span className="text-sm text-[#5e6d55]">or</span>
            <span className="h-px flex-1 bg-[#d5e0d5]" />
          </div>

          <div className="flex flex-col gap-3">
            <GoogleButton onClick={() => void navigate({ to: '/dashboard' })} />
            <AppleButton onClick={() => void navigate({ to: '/dashboard' })} />
          </div>

          <p className="mt-10 border-t border-[#e4ebe4] pt-6 text-center text-[15px] text-[#5e6d55]">
            Don&apos;t have an Upwork account?{' '}
            <Link to="/signup" className="font-semibold text-[#108a00] hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </AuthShell>
  )
}
