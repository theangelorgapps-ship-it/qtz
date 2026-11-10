/* "Trusted by 800,000 clients" logo row. The source hotlinks brand SVGs
   from a CDN; here each logo is a typographic stand-in styled to echo the
   original wordmark's color and weight. */

const logos: Array<{ name: string; className: string }> = [
  { name: 'airbnb', className: 'text-[#ff5a5f] font-semibold tracking-tight' },
  { name: 'databricks', className: 'text-[#1b1b1b] font-bold tracking-tight' },
  { name: 'CLOUDFLARE', className: 'text-[#f6821f] font-bold tracking-wide text-sm' },
  { name: 'scale', className: 'text-[#1b1b1b] font-medium lowercase tracking-tight' },
  { name: 'Microsoft', className: 'text-[#5b5fc7] font-semibold' },
  { name: 'grammarly', className: 'text-[#15c39a] font-bold tracking-tight' },
  { name: 'bambooHR', className: 'text-[#73a41d] font-bold tracking-tight' },
  { name: 'shutterstock', className: 'text-[#1b1b1b] font-extrabold tracking-tight' },
]

export function TrustedBy() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-20">
      <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-[#5e6d55]">
        Trusted by 800,000 clients
      </p>
      <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 lg:gap-x-14">
        {logos.map((logo) => (
          <li key={logo.name} className={`text-xl leading-none ${logo.className}`}>
            {logo.name}
          </li>
        ))}
      </ul>
    </section>
  )
}
