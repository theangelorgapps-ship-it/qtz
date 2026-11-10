/* G2 badge row — the source hotlinks G2 shield images; these are
   styled-div stand-ins with the same labels. */

const badges: Array<{ top: string; title: string; sub: string; accent: string }> = [
  { top: 'BEST SOFTWARE 2026', title: 'Top 50', sub: 'HR PRODUCTS', accent: '#f6c445' },
  { top: 'WINTER 2026', title: 'Leader', sub: 'SMALL BUSINESS', accent: '#f6821f' },
  { top: 'WINTER 2026', title: 'Best Results', sub: 'SMALL BUSINESS', accent: '#8a63d2' },
  { top: 'WINTER 2026', title: 'Best Usability', sub: 'SMALL BUSINESS', accent: '#f6c445' },
  { top: 'WINTER 2026', title: 'Easiest Setup', sub: 'MID-MARKET', accent: '#4a90d9' },
  { top: 'WINTER 2026', title: 'Easiest To Use', sub: 'MID-MARKET', accent: '#f6c445' },
  { top: 'WINTER 2026', title: 'Best Meets Requirements', sub: 'MID-MARKET', accent: '#e2574c' },
]

export function G2Badges() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10 lg:py-20">
      <h2 className="text-center text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
        Trusted by growing businesses
      </h2>

      <ul className="mt-12 flex flex-wrap items-start justify-center gap-x-6 gap-y-8">
        {badges.map((b) => (
          <li key={b.title} className="w-[120px]">
            <div className="g2-badge rounded-t-lg border border-[#d5e0d5] bg-white px-2 pb-5 pt-2 text-center shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[7px] font-bold tracking-wide text-[#4d4d4d]">{b.top}</span>
                <span
                  className="flex h-4 w-4 items-center justify-center rounded-[4px] text-[9px] font-black text-white"
                  style={{ background: '#e2574c' }}
                  aria-hidden="true"
                >
                  G
                </span>
              </div>
              <p className="mt-3 text-[15px] font-extrabold leading-tight text-[#1f1f1f]">
                {b.title}
              </p>
              <p className="mt-1.5 text-[7px] font-bold tracking-[0.12em] text-[#4d4d4d]">{b.sub}</p>
              <div className="mx-auto mt-3 h-1 w-4/5 rounded-full" style={{ background: b.accent }} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
