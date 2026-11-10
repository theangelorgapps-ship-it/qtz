const testimonials = [
  {
    quote:
      '"We discovered CTO-level expertise on the platform—someone who had already served as a startup CTO—willing to contribute to our open-source project. That kind of talent brings tremendous value to us."',
    name: 'Saswata Basu, CEO',
    company: 'Züs',
  },
  {
    quote:
      '"Upwork isn\u2019t just a hiring platform for us—it\u2019s a strategic partner. It\u2019s helped us fill every technical gap, accelerate our delivery from months to weeks, and even bring on leaders who\u2019ve become foundational to our business."',
    name: 'David Wrench, Co-Founder and CEO',
    company: 'Datajoi',
  },
  {
    quote:
      '"I found two awesome candidates and wound up hiring an AI freelancer based in Paris...I love the platform and the amount of talent I have access to. We really couldn\u2019t be this far along without help from the talent on Upwork."',
    name: 'Matt See, Co-Founder and CEO',
    company: 'Lighthouse',
  },
  {
    quote:
      '"Upwork is paramount to the success that we\u2019ve had. We can\u2019t accomplish what we do without our Upwork staff. And like I said, to us, you know, it\u2019s awkward for me to say Upwork or freelancer staff, because we fully consider them part of our team."',
    name: 'Bryan Goltzman, CEO',
    company: 'Liquid Screen Design',
  },
  {
    quote:
      '"But in this early stage, we really need to be lean, targeted, and prove out all the things that we\u2019re doing. And being able to really find the right people, and be able to interview different people where you know they\u2019re really heart driven, but that yet they also have these immense talents, has been really awesome."',
    name: 'Jen Libby, Founder and CEO',
    company: 'Promly',
  },
  {
    quote:
      '"The safety features are nice, but what really builds our confidence in Upwork is how we consistently find experts who deliver on highly technical, complex projects...Upwork helped us build a community of incredible talent, which means we now spend even less time recruiting than before."',
    name: 'Gabriel Richman, Founder and CEO',
    company: 'Omic',
  },
]

/* Avatar stand-ins: initials on a soft green disc (source hotlinks headshots) */
function Avatar({ name }: { name: string }) {
  const initials = name
    .split(',')[0]
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
  return (
    <div
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#dff69b] to-[#75c76a] text-base font-bold text-[#0e0e0e]"
      aria-hidden="true"
    >
      {initials}
    </div>
  )
}

export function Testimonials() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10 lg:py-16">
      <h2 className="text-3xl font-medium tracking-[-0.03em] sm:text-4xl lg:text-5xl">
        Proven results on Upwork
      </h2>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="flex flex-col justify-between rounded-2xl border border-[#e4ebe4] bg-white p-8 transition-shadow duration-200 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
          >
            <blockquote className="text-[15px] font-medium leading-relaxed text-[#1f1f1f]">
              {t.quote}
            </blockquote>
            <figcaption className="mt-8 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-[#1f1f1f]">{t.name}</p>
                <p className="mt-0.5 text-sm text-[#9aaa97]">{t.company}</p>
              </div>
              <Avatar name={t.name} />
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
