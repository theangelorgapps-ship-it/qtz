import { useState } from 'react'
import { AtomIcon } from '~/components/icons'

export function PricingInsights() {
  const [value, setValue] = useState('')
  const ready = value.trim().length > 0

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10 lg:py-16">
      <div className="dark-diagonal relative overflow-hidden rounded-[28px]">
        <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-medium leading-[1.08] tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
              Get insights into freelancer pricing
            </h2>
            <p className="mt-4 text-base text-white/80 sm:text-lg">
              We'll calculate the average cost for freelancers with the skills you need.
            </p>

            <div className="relative mt-10 rounded-2xl bg-white p-5 shadow-xl">
              <label htmlFor="pricing-brief" className="sr-only">
                To start, describe what you need done.
              </label>
              <textarea
                id="pricing-brief"
                rows={3}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="To start, describe what you need done."
                className="w-full resize-none bg-transparent text-sm text-[#1f1f1f] outline-none placeholder:text-[#9aaa97]"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  disabled={!ready}
                  className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${
                    ready
                      ? 'bg-[#0e0e0e] text-white hover:bg-[#2e2e2e]'
                      : 'cursor-not-allowed bg-[#e4ebe4] text-[#9aaa97]'
                  }`}
                >
                  Next
                  <AtomIcon className={`h-4 w-4 [&>*]:stroke-current`} />
                </button>
              </div>
            </div>
          </div>

          {/* Atom graphic stand-in for the source's glowing lime atom render */}
          <div className="relative hidden min-h-[320px] items-center justify-center lg:flex" aria-hidden="true">
            <div className="atom-glow absolute inset-0" />
            <AtomIcon className="relative h-44 w-44 [&>*]:stroke-[#c6f24e]" />
          </div>
        </div>
      </div>
    </section>
  )
}
