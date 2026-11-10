import { Link } from '@tanstack/react-router'

export function StubPage({ title }: { title: string }) {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#14a800]">Coming next</p>
      <h1 className="mt-4 text-4xl font-medium tracking-tight">{title}</h1>
      <p className="mt-4 text-base text-[#5e6d55]">
        This page is a placeholder in the marketing shell and will be built out in a later
        milestone.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-full border-2 border-[#108a00] px-6 py-2.5 text-sm font-semibold text-[#108a00] transition-colors hover:bg-[#108a00] hover:text-white"
      >
        Back to homepage
      </Link>
    </div>
  )
}
