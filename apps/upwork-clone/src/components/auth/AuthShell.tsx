import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'

/* Minimal chrome for auth and wizard pages: logo top-left, optional
   right-hand slot, centered content, legal footer. Deliberately does not
   reuse the marketing Header/Footer from components/layout. */

export function AuthLogo() {
  return (
    <Link to="/" aria-label="Upwork home" className="flex items-center">
      <span
        className="text-[28px] font-bold leading-none tracking-[-0.06em] text-[#001e00]"
        style={{ fontFamily: 'var(--font-family-base)' }}
      >
        upwork
      </span>
    </Link>
  )
}

interface AuthShellProps {
  children: ReactNode
  rightSlot?: ReactNode
  belowHeader?: ReactNode
  showFooter?: boolean
}

export function AuthShell({ children, rightSlot, belowHeader, showFooter = true }: AuthShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="flex items-center justify-between px-6 py-5 lg:px-10">
        <AuthLogo />
        {rightSlot ?? <span aria-hidden="true" />}
      </header>
      {belowHeader}
      <div className="flex flex-1 flex-col">{children}</div>
      {showFooter ? (
        <footer className="border-t border-[#e4ebe4] px-6 py-5">
          <p className="text-center text-xs text-[#5e6d55]">
            © 2015 - 2026 Upwork® Global LLC
            <span className="mx-2" aria-hidden="true">
              •
            </span>
            <Link to="/" className="transition-colors hover:text-[#108a00] hover:underline">
              Privacy Policy
            </Link>
            <span className="mx-2" aria-hidden="true">
              •
            </span>
            <Link to="/" className="transition-colors hover:text-[#108a00] hover:underline">
              Your Privacy Choices
            </Link>
          </p>
        </footer>
      ) : null}
    </div>
  )
}
