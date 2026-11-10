import { Link, useRouterState } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { MESSAGE_ROOMS } from '~/lib/data'
import { Avatar } from '~/components/app/Avatar'

type IconProps = { className?: string }

function strokeProps(color = 'currentColor') {
  return {
    fill: 'none',
    stroke: color,
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...strokeProps()}>
      <circle cx="11" cy="11" r="7" />
      <path d="M16.2 16.2L21 21" />
    </svg>
  )
}

export function HomeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...strokeProps()}>
      <path d="M4 11.5L12 4l8 7.5" />
      <path d="M6.5 10v9.5h11V10" />
    </svg>
  )
}

export function BellIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...strokeProps()}>
      <path d="M6 16v-5a6 6 0 0112 0v5l1.5 2.5h-15L6 16z" />
      <path d="M10 21a2.2 2.2 0 004 0" />
    </svg>
  )
}

export function BriefcaseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...strokeProps()}>
      <rect x="3.5" y="7.5" width="17" height="12" rx="2" />
      <path d="M9 7.5V6a2 2 0 012-2h2a2 2 0 012 2v1.5M3.5 12.5h17" />
    </svg>
  )
}

export function UsersIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...strokeProps()}>
      <circle cx="9.5" cy="8.5" r="3.5" />
      <path d="M3.5 19.5c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" />
      <circle cx="17" cy="9.5" r="2.6" />
      <path d="M17.2 14.3c2.6.4 4.3 2.3 4.3 5.2" />
    </svg>
  )
}

export function WalletIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...strokeProps()}>
      <rect x="3" y="6" width="18" height="13" rx="2.5" />
      <path d="M3 9.5h18M16 14.5h2" />
    </svg>
  )
}

export function ChatIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...strokeProps()}>
      <path d="M4 6.5A2.5 2.5 0 016.5 4h11A2.5 2.5 0 0120 6.5v8a2.5 2.5 0 01-2.5 2.5H9l-5 4v-4.5z" />
    </svg>
  )
}

export function HelpIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...strokeProps()}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.7 9.4a2.5 2.5 0 014.9.7c0 1.7-2.4 2-2.4 3.6" />
      <circle cx="12" cy="16.8" r="0.4" fill="currentColor" />
    </svg>
  )
}

export function PinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...strokeProps('#14a800')}>
      <path d="M12 21s6.5-5.6 6.5-10.5A6.5 6.5 0 005.5 10.5C5.5 15.4 12 21 12 21z" />
      <circle cx="12" cy="10.5" r="2.3" />
    </svg>
  )
}

export function SendIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...strokeProps()}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  )
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...strokeProps()}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

type AppTo = '/search/jobs' | '/dashboard' | '/search/talent' | '/messages'

interface NavItem {
  label: string
  to: AppTo
  icon: (props: IconProps) => ReactNode
  badge?: 'notifications' | 'messages'
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Search', to: '/search/jobs', icon: SearchIcon },
  { label: 'Home', to: '/dashboard', icon: HomeIcon },
  { label: 'Notifications', to: '/dashboard', icon: BellIcon, badge: 'notifications' },
  { label: 'Jobs', to: '/dashboard', icon: BriefcaseIcon },
  { label: 'Freelancers', to: '/search/talent', icon: UsersIcon },
  { label: 'Finances', to: '/dashboard', icon: WalletIcon },
  { label: 'Messages', to: '/messages', icon: ChatIcon, badge: 'messages' },
]

export function AppShell({
  title,
  children,
  fillHeight = false,
}: {
  title: string
  children: ReactNode
  fillHeight?: boolean
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const unreadCount = MESSAGE_ROOMS.filter((r) => r.unread).length

  const isActive = (item: NavItem): boolean => {
    if (item.label === 'Home') return pathname === '/dashboard'
    if (item.label === 'Messages') return pathname.startsWith('/messages')
    return false
  }

  return (
    <div className="min-h-dvh bg-[#f2f7f2]">
      {/* Fixed left sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 flex w-60 flex-col border-r border-[#d5e0d5] bg-white">
        <div className="px-5 pt-5 pb-4">
          <Link to="/dashboard" aria-label="Upwork dashboard" className="inline-flex items-center">
            <span className="text-[26px] font-bold leading-none tracking-[-0.06em] text-[#001e00]">
              upwork
            </span>
          </Link>
        </div>

        {/* User chip */}
        <div className="mx-3 mb-3 flex items-center gap-3 rounded-lg px-2 py-2">
          <Avatar name="Charles Finny" size={36} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#181818]">Charles Finny</p>
            <p className="truncate text-xs text-[#5e6d55]">Client · Basic</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3" aria-label="App navigation">
          <ul className="flex flex-col gap-0.5">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item)
              const Icon = item.icon
              return (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                      active
                        ? 'bg-[#e8f6e6] font-semibold text-[#0c5c00]'
                        : 'text-[#181818] hover:bg-[#f2f7f2]'
                    }`}
                  >
                    <span className="relative inline-flex">
                      <Icon className={`h-5 w-5 ${active ? 'text-[#0c5c00]' : 'text-[#5e6d55]'}`} />
                      {item.badge === 'notifications' && (
                        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[#d93025]" />
                      )}
                    </span>
                    <span className="flex-1">{item.label}</span>
                    {item.badge === 'messages' && unreadCount > 0 && (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#14a800] px-1.5 text-[11px] font-semibold text-white">
                        {unreadCount}
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Help at bottom */}
        <div className="border-t border-[#d5e0d5] px-3 py-3">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#181818] transition-colors hover:bg-[#f2f7f2]"
          >
            <HelpIcon className="h-5 w-5 text-[#5e6d55]" />
            Help
          </a>
        </div>
      </aside>

      {/* Content area */}
      <div className="ml-60 flex min-h-dvh flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between px-6">
          <h1 className="text-xl font-semibold tracking-tight text-[#181818]">{title}</h1>
          <Link
            to="/post-job"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#108a00] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0b6100]"
          >
            <span aria-hidden="true" className="text-base leading-none">+</span> Post a job
          </Link>
        </header>
        <div className={fillHeight ? 'flex min-h-0 flex-1 flex-col px-6 pb-6' : 'px-6 pb-10'}>
          {children}
        </div>
      </div>
    </div>
  )
}
