import { Link } from '@tanstack/react-router'

const columns: Array<{ heading: string; links: string[] }> = [
  {
    heading: 'For Clients',
    links: [
      'How to hire',
      'Talent Marketplace',
      'Project Catalog',
      'Hire an agency',
      'Enterprise',
      'Business Plus',
      'Any Hire',
      'Contract-to-hire',
      'Direct Contracts',
      'Hire worldwide',
      'Hire in the USA',
    ],
  },
  {
    heading: 'For Talent',
    links: [
      'How to find work',
      'Direct Contracts',
      'Find freelance jobs worldwide',
      'Find freelance jobs in the USA',
      'Win work with ads',
      'Exclusive resources with Freelancer Plus',
    ],
  },
  {
    heading: 'Resources',
    links: [
      'Help & support',
      'Success stories',
      'Upwork reviews',
      'Resources',
      'Blog',
      'Affiliate program',
      'Refer a client',
      'Free Business Tools',
      'Release notes',
    ],
  },
  {
    heading: 'Company',
    links: [
      'About us',
      'Leadership',
      'Investor relations',
      'Careers',
      'Our impact',
      'Press',
      'Contact us',
      'Trust, safety & security',
      'Modern slavery statement',
    ],
  },
]

const social = [
  {
    label: 'Visit Upwork on Facebook',
    path: 'M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.1-.1-2.1-.1-2.1 0-3.6 1.3-3.6 3.7V11H8v3h2.7v7h2.8z',
  },
  {
    label: 'Read Upwork company news on LinkedIn',
    path: 'M6.5 8.8H3.6V21h2.9V8.8zM5 7.4a1.7 1.7 0 100-3.4 1.7 1.7 0 000 3.4zM21 13.4c0-2.7-1.4-4-3.4-4-1.5 0-2.2.8-2.6 1.4V8.8h-2.9V21H15v-6.5c0-1.3.5-2.1 1.6-2.1 1.1 0 1.5.8 1.5 2.1V21H21v-7.6z',
  },
  {
    label: 'Follow @Upwork on Twitter',
    path: 'M20.9 7.3c-.6.3-1.3.5-2 .6.7-.4 1.3-1.1 1.5-1.9-.7.4-1.4.7-2.2.8a3.4 3.4 0 00-5.9 3.1A9.7 9.7 0 015 6.1a3.4 3.4 0 001.1 4.6c-.6 0-1.1-.2-1.6-.4v.1c0 1.7 1.2 3.1 2.8 3.4-.5.2-1 .2-1.6.1.4 1.4 1.7 2.4 3.1 2.4A6.9 6.9 0 013 17.9a9.7 9.7 0 005.3 1.5c6.3 0 9.8-5.2 9.8-9.8v-.4c.7-.5 1.3-1.1 1.8-1.9z',
  },
  {
    label: 'Watch Upwork videos on YouTube',
    path: 'M21.6 8.2a2.5 2.5 0 00-1.8-1.8C18.2 6 12 6 12 6s-6.2 0-7.8.4A2.5 2.5 0 002.4 8.2 26 26 0 002 12c0 1.3.1 2.6.4 3.8a2.5 2.5 0 001.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 001.8-1.8c.3-1.2.4-2.5.4-3.8s-.1-2.6-.4-3.8zM10 15V9l5.2 3L10 15z',
  },
  {
    label: 'Follow Upwork on Instagram',
    path: 'M12 8.8A3.2 3.2 0 1012 15.2 3.2 3.2 0 0012 8.8zM12 14a2 2 0 110-4 2 2 0 010 4zm4.1-4.1a.75.75 0 100-1.5.75.75 0 000 1.5zM12 5.6c2 0 2.3 0 3.1.1 2.1.1 3 1 3.1 3.1 0 .8.1 1.1.1 3.1s0 2.3-.1 3.1c-.1 2.1-1 3-3.1 3.1-.8 0-1.1.1-3.1.1s-2.3 0-3.1-.1c-2.1-.1-3-1-3.1-3.1 0-.8-.1-1.1-.1-3.1s0-2.3.1-3.1c.1-2.1 1-3 3.1-3.1.8 0 1.1-.1 3.1-.1zM12 4.3c-2.1 0-2.3 0-3.1.1-2.8.1-4.1 1.5-4.2 4.2 0 .8-.1 1-.1 3.1s0 2.3.1 3.1c.1 2.8 1.5 4.1 4.2 4.2.8 0 1 .1 3.1.1s2.3 0 3.1-.1c2.8-.1 4.1-1.5 4.2-4.2 0-.8.1-1 .1-3.1s0-2.3-.1-3.1c-.1-2.8-1.5-4.1-4.2-4.2-.8 0-1-.1-3.1-.1z',
  },
  {
    label: 'Join Upwork on Reddit',
    path: 'M21 12.4c0-1-.8-1.8-1.8-1.8-.5 0-.9.2-1.2.5-1.1-.8-2.7-1.3-4.4-1.4l.9-4.1 2.8.6a1.3 1.3 0 101.4-1.2c-.6 0-1 .3-1.2.8l-3.2-.7a.4.4 0 00-.5.3l-1 4.6c-1.7.1-3.3.6-4.4 1.4a1.8 1.8 0 10-1.9 2.9c0 .1-.1.3-.1.4 0 2.2 2.6 4 5.9 4s5.9-1.8 5.9-4c0-.1 0-.3-.1-.4 1-.3 1.9-1 1.9-1.9zM8.6 14.1a1.1 1.1 0 111.1-1.1 1.1 1.1 0 01-1.1 1.1zm6.4 2.5a3.9 3.9 0 01-2.2.7h-.1a3.9 3.9 0 01-2.2-.7.3.3 0 01.4-.5 3.2 3.2 0 001.8.6h.1a3.2 3.2 0 001.8-.6.3.3 0 01.4.5zm-.4-1.4a1.1 1.1 0 111.1-1.1 1.1 1.1 0 01-1.1 1.1z',
  },
]

const bottomLinks = [
  'Terms of Service',
  'Privacy Policy',
  'CA Notice at Collection',
  'Your Privacy Choices',
  'California Consumer Privacy Act (CCPA) Opt-Out',
  'Accessibility',
  'Sitemap',
]

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <nav aria-label="Footer navigation" className="border-t border-[#e4ebe4] py-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {columns.map((col) => (
              <div key={col.heading}>
                <h2 className="text-sm font-semibold text-[#1f1f1f]">{col.heading}</h2>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {col.links.map((label) => (
                    <li key={label}>
                      <Link
                        to="/"
                        className="text-sm text-[#5e6d55] transition-colors hover:text-[#108a00] hover:underline"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        <div className="flex flex-col gap-6 border-t border-[#e4ebe4] py-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-[#1f1f1f]">Follow us</span>
            <ul className="flex items-center gap-2">
              {social.map((s) => (
                <li key={s.label}>
                  <a
                    href="#"
                    aria-label={s.label}
                    onClick={(e) => e.preventDefault()}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d5e0d5] text-[#1f1f1f] transition-colors hover:border-[#108a00] hover:text-[#108a00]"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                      <path d={s.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-[#1f1f1f]">Mobile app</span>
            <div className="flex items-center gap-2">
              <a
                href="#"
                aria-label="Download Upwork app from iTunes"
                onClick={(e) => e.preventDefault()}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d5e0d5] transition-colors hover:border-[#108a00] hover:text-[#108a00]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path d="M16.7 12.9c0-2.4 2-3.6 2.1-3.6-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1.9-4 2.4-1.7 2.9-.4 7.3 1.2 9.7.8 1.2 1.8 2.5 3.1 2.4 1.2-.1 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.6-1-2.7-3.9zM14.3 5.6c.7-.8 1.1-1.9 1-3-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.9-1.5z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Download Upwork app from Google Play"
                onClick={(e) => e.preventDefault()}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d5e0d5] transition-colors hover:border-[#108a00] hover:text-[#108a00]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path d="M4.4 3.6v16.8c0 .5.6.9 1.1.6l13-8.4c.4-.3.4-.9 0-1.2l-13-8.4c-.5-.3-1.1.1-1.1.6z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-[#e4ebe4] py-6 lg:flex-row lg:items-center">
          <p className="text-xs text-[#5e6d55]">© 2015 - 2026 Upwork® Global LLC</p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 lg:ml-auto">
            {bottomLinks.map((label) => (
              <li key={label}>
                <Link
                  to="/"
                  className="text-xs text-[#5e6d55] transition-colors hover:text-[#108a00] hover:underline"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
