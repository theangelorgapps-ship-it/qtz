import { Link } from '@tanstack/react-router'

export function CtaBanner() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 pb-20 pt-6 lg:px-10">
      <div className="cta-gradient rounded-[28px] px-8 py-20 text-center sm:px-12 lg:py-28">
        <h2 className="mx-auto max-w-[900px] text-3xl font-medium leading-[1.1] tracking-[-0.03em] text-white sm:text-4xl lg:text-[52px]">
          Find freelancers who can help you build what's next
        </h2>
        <Link
          to="/search/talent"
          className="mt-10 inline-block rounded-full bg-white px-9 py-3.5 text-base font-semibold text-[#1f1f1f] transition-colors hover:bg-[#f2f7f2]"
        >
          Explore freelancers
        </Link>
      </div>
    </section>
  )
}
