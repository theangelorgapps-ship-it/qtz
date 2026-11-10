import { Link } from '@tanstack/react-router'
import { useState } from 'react'

const navItems: Array<{ label: string; to: string; caret?: boolean }> = [
  { label: 'Hire talent', to: '/search/talent', caret: true },
  { label: 'Get outcomes', to: '/enterprise', caret: true },
  { label: 'Find work', to: '/search/jobs', caret: true },
  { label: 'Why Upwork', to: '/enterprise', caret: true },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Enterprise', to: '/enterprise' },
]

function CaretDown() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180"
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path
        d="M10.688 18.377a7.688 7.688 0 100-15.377 7.688 7.688 0 000 15.377zm5.428-2.261L21 21"
        stroke="#001e00"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function UpworkLogo({ dark = false }: { dark?: boolean }) {
  return (
    <Link to="/" aria-label="Upwork home" className="flex items-center">
      <span
        className={`text-[28px] font-bold leading-none tracking-[-0.06em] ${
          dark ? 'text-white' : 'text-[#001e00]'
        }`}
        style={{ fontFamily: 'var(--font-family-base)' }}
      >
        upwork
      </span>
    </Link>
  )
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center gap-6 px-6 lg:px-10">
        <UpworkLogo />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="group flex items-center gap-1.5 rounded-md px-3 py-2 text-[15px] text-[#001e00] transition-colors hover:text-[#108a00]"
            >
              {item.label}
              {item.caret ? <CaretDown /> : null}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <Link
            to="/search/talent"
            aria-label="Search"
            className="hidden rounded-full p-2 transition-colors hover:bg-[#f2f7f2] sm:block"
          >
            <SearchIcon />
          </Link>
          <Link
            to="/login"
            className="hidden text-[15px] text-[#001e00] transition-colors hover:text-[#108a00] sm:block"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="rounded-full bg-[#108a00] px-6 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#0b6100]"
          >
            Sign up
          </Link>
          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-md p-2 lg:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="#001e00"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <nav aria-label="Mobile" className="border-t border-[#e4ebe4] bg-white px-6 py-4 lg:hidden">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-md px-2 py-2.5 text-[15px] text-[#001e00]"
                >
                  {item.label}
                  {item.caret ? <CaretDown /> : null}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="block rounded-md px-2 py-2.5 text-[15px] text-[#001e00]"
              >
                Log in
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
