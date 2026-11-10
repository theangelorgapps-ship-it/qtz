import { Link } from '@tanstack/react-router'
import type { ComponentType } from 'react'
import {
  AtomIcon,
  BankIcon,
  CodeIcon,
  HandshakeIcon,
  HeadsetIcon,
  PaletteIcon,
  PenNibIcon,
  PeopleIcon,
  ScalesIcon,
  ToolsIcon,
} from '~/components/icons'

const categories: Array<{ label: string; Icon: ComponentType<{ className?: string }> }> = [
  { label: 'AI Services', Icon: AtomIcon },
  { label: 'Development & IT', Icon: CodeIcon },
  { label: 'Design & Creative', Icon: PaletteIcon },
  { label: 'Sales & Marketing', Icon: HandshakeIcon },
  { label: 'Writing & Translation', Icon: PenNibIcon },
  { label: 'Admin & Support', Icon: HeadsetIcon },
  { label: 'Finance & Accounting', Icon: BankIcon },
  { label: 'Legal', Icon: ScalesIcon },
  { label: 'HR & Training', Icon: PeopleIcon },
  { label: 'Engineering & Architecture', Icon: ToolsIcon },
]

export function Categories() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10 lg:py-16">
      <h2 className="text-3xl font-medium tracking-[-0.03em] sm:text-4xl lg:text-5xl">
        Find freelancers for every type of work
      </h2>

      <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map(({ label, Icon }) => (
          <li key={label}>
            <Link
              to="/search/talent"
              className="group flex h-full min-h-[200px] flex-col justify-between rounded-2xl border border-[#e4ebe4] bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#14a800] hover:shadow-[0_12px_30px_rgba(16,138,0,0.12)]"
            >
              <Icon className="h-12 w-12 transition-transform duration-200 group-hover:scale-110" />
              <span className="mt-8 text-xl font-medium leading-snug text-[#1f1f1f]">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
