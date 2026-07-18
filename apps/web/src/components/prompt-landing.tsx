"use client";

import {
  ArrowCircleDownIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  BroomIcon,
  CheckIcon,
  GavelIcon,
  HardHatIcon,
  ListIcon,
  ShieldCheckIcon,
  StorefrontIcon,
  UserIcon,
  UsersThreeIcon,
  XIcon,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";

const scenarios = [
  {
    name: "Cleaning Businesses",
    copy: "Publish open cleaning slots, collect Customer bids and choose the booking that works for your schedule.",
    features: ["Set the service area and opening bid", "Compare every Customer request", "Keep messages and payment together"],
    image: "/images/quaotz-restaurant-briefing.png",
    alt: "A cleaning professional discussing an evening service with a restaurant owner",
  },
  {
    name: "Retail Installers",
    copy: "List specialist installation work with a clear scope, available time and the details Customers need before bidding.",
    features: ["Publish exact installation requirements", "Review access details before accepting", "Choose the best-fit Customer"],
    image: "/images/quaotz-retail-display.png",
    alt: "A retail installer and shop owner reviewing a window display layout",
  },
  {
    name: "Outdoor Services",
    copy: "Turn available exterior-care time into confirmed bookings without losing the agreed scope or completion record.",
    features: ["Accept Customer payment before the booking", "Confirm completion in one timeline", "Add a seven-day Protection review"],
    image: "/images/quaotz-patio-complete.png",
    alt: "An outdoor maintenance professional and cafe owner reviewing completed patio work",
  },
  {
    name: "Staffing Teams",
    copy: "Offer experienced reception and event cover, then select the Customer whose location, timing and requirements fit.",
    features: ["Describe the available team and hours", "Compare live bids as they arrive", "Confirm the chosen booking directly"],
    image: "/images/quaotz-restaurant-briefing.png",
    alt: "A service professional and venue owner reviewing requirements before opening",
  },
];

const advertSlides = [
  {
    heading: "Book local services",
    copy: "Browse available service slots, bid your price and keep every booking detail in one place.",
    image: "/images/quaotz-patio-complete.png",
  },
  {
    heading: "Add Protection",
    copy: "Choose a seven-day review window when the completed service needs more time to check.",
    image: "/images/quaotz-restaurant-briefing.png",
  },
];

const plans = [
  {
    name: "Standard",
    monthly: "$9.99",
    yearly: "$99",
    fee: "15% service fee",
    copy: "For occasional local bookings.",
    features: ["Publish service availability", "Live Customer bidding", "Booking messages", "Standard payment release"],
  },
  {
    name: "Gold",
    monthly: "$29.99",
    yearly: "$299",
    fee: "12% service fee",
    copy: "For regular service Businesses.",
    features: ["Everything in Standard", "Lower service fee", "Priority listing tools", "Booking performance summary"],
    featured: true,
  },
  {
    name: "Diamond",
    monthly: "$79.99",
    yearly: "$799",
    fee: "9% service fee",
    copy: "For established booking teams.",
    features: ["Everything in Gold", "Team booking access", "Advanced monthly summary", "Priority support"],
  },
  {
    name: "Platinum",
    monthly: "$199.99",
    yearly: "$1,999",
    fee: "6% service fee",
    copy: "For high-volume operations.",
    features: ["Everything in Diamond", "Lowest service fee", "Operations controls", "Dedicated support"],
  },
];

function useSectionScale() {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    function update() {
      if (window.innerWidth < 1024) {
        setZoom(1);
        return;
      }
      setZoom(Math.max(0.5, Math.min(window.innerWidth / 1440, window.innerHeight / 900)));
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return zoom;
}

function ScaledSection({ children, className, id }: { children: ReactNode; className: string; id?: string }) {
  const zoom = useSectionScale();
  if (zoom === 1) return <section id={id} className={className}>{children}</section>;

  return (
    <section id={id} className="scaledSectionFrame">
      <div className={className} style={{ zoom, width: "100%", minHeight: `${100 / zoom}dvh` }}>{children}</div>
    </section>
  );
}

function AnimatedWords({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((word, index) => (
        <motion.span
          aria-hidden="true"
          className="animatedWord"
          key={`${word}-${index}`}
          initial={reduce ? false : { opacity: 0, y: 10, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 163, damping: 40, mass: 1, delay: delay + index * 0.05 }}
        >
          {word}{" "}
        </motion.span>
      ))}
    </span>
  );
}

function PromptNavbar() {
  const [open, setOpen] = useState(false);
  const nav = [
    ["How it works", "#how-it-works"],
    ["Use cases", "#use-cases"],
    ["Protection", "#protection"],
    ["Pricing", "#pricing"],
    ["Browse", "/app/discover"],
  ];

  return (
    <>
      <nav className="promptNav" aria-label="Primary navigation">
        <Link className="promptLogo" href="/" aria-label="Quaotz home"><span>Q</span></Link>
        <div className="promptNavLinks">
          {nav.map(([label, href]) => <Link href={href} key={label}>{label}</Link>)}
        </div>
        <div className="promptNavActions">
          <Link href="/app/discover" aria-label="Browse services"><ArrowRightIcon size={24} /></Link>
          <Link href="/sign-in" aria-label="Log in"><UserIcon size={24} /></Link>
        </div>
        <button className="promptMobileMenu" type="button" onClick={() => setOpen(true)} aria-label="Open menu"><ListIcon size={25} /></button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div className="promptMenuOverlay" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu"><XIcon size={28} /></button>
            {nav.map(([label, href], index) => (
              <motion.div key={label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }}>
                <Link href={href} onClick={() => setOpen(false)}>{label}</Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function HeroSection() {
  const ticker = [
    [BroomIcon, "Cleaning"],
    [StorefrontIcon, "Retail setup"],
    [HardHatIcon, "Outdoor care"],
    [UsersThreeIcon, "Staffing"],
    [ShieldCheckIcon, "Protected payment"],
  ] as const;

  return (
    <ScaledSection className="promptSection promptHero" id="how-it-works">
      <PromptNavbar />
      <div className="promptHeroMain">
        <motion.div className="promptHeroCopy" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h1><AnimatedWords text="Post the service" className="promptGradientText" /><AnimatedWords text="Pick the booking" delay={0.15} /></h1>
          <p><AnimatedWords text="Businesses publish service slots. Customers bid to book. The Business chooses the Customer." delay={0.4} /></p>
          <div className="promptHeroButtons">
            <Link className="promptPrimaryCta" href="/app/discover"><span>Browse services</span><i><ArrowRightIcon size={16} weight="bold" /></i></Link>
            <Link className="promptSecondaryCta" href="/sign-in">Post a service</Link>
          </div>
        </motion.div>
        <motion.div className="promptHeroImage" initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
          <Image src="/images/quaotz-restaurant-briefing.png" alt="A cleaning professional and restaurant owner agreeing an evening service" fill priority sizes="(max-width: 900px) 100vw, 55vw" />
        </motion.div>
      </div>
      <div className="promptOfferStrip">
        <p>Business plans start at $9.99 per month. <a href="#pricing">Compare plans</a></p>
        <div className="promptTicker" aria-label="Quaotz service categories">
          <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }}>
            {[...ticker, ...ticker].map(([Icon, label], index) => <span key={`${label}-${index}`}><Icon size={28} weight="duotone" />{label}</span>)}
          </motion.div>
        </div>
      </div>
    </ScaledSection>
  );
}

function ScenariosSection() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = scenarios[active];

  useEffect(() => {
    if (reduce) return;
    const interval = window.setInterval(() => setActive((index) => (index + 1) % scenarios.length), 5000);
    return () => window.clearInterval(interval);
  }, [reduce]);

  return (
    <ScaledSection className="promptSection promptScenarios" id="use-cases">
      <div className="promptScenarioLayout">
        <div className="promptScenarioCopy">
          <strong className="promptScenarioLabel">Use cases</strong>
          <AnimatePresence mode="wait">
            <motion.div className="promptScenarioText" key={current.name} initial={reduce ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -20 }} transition={{ duration: 0.55 }}>
              <h2>{current.name}</h2>
              <p>{current.copy}</p>
              <div className="promptFeatureList">
                {current.features.map((feature, index) => (
                  <motion.div key={feature} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 + index * 0.09 }}>
                    <span><CheckIcon size={18} weight="bold" /></span>{feature}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="promptScenarioPagination" aria-label="Choose a service use case">
            {scenarios.map((scenario, index) => (
              <button className={active === index ? "active" : ""} type="button" onClick={() => setActive(index)} key={scenario.name} aria-label={`Show ${scenario.name}`}>
                {active === index && <svg viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="20" /><motion.circle className="progress" cx="22" cy="22" r="20" pathLength="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: reduce ? 0 : 5, ease: "linear" }} /></svg>}
                <span>{index + 1}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="promptScenarioImage">
          <AnimatePresence mode="wait">
            <motion.div key={current.image + active} initial={reduce ? false : { opacity: 0, x: 80, scale: 0.97 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={reduce ? undefined : { opacity: 0, x: -50, scale: 0.97 }} transition={{ duration: 0.7 }}>
              <Image src={current.image} alt={current.alt} fill loading="eager" sizes="(max-width: 900px) 100vw, 58vw" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </ScaledSection>
  );
}

function AdvertSection() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = advertSlides[active];

  useEffect(() => {
    if (reduce) return;
    const interval = window.setInterval(() => setActive((index) => (index + 1) % advertSlides.length), 7000);
    return () => window.clearInterval(interval);
  }, [reduce]);

  return (
    <ScaledSection className="promptSection promptAdvert" id="protection">
      <AnimatePresence mode="wait">
        <motion.div className="promptAdvertImage" key={current.image} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.6 }}>
          <Image src={current.image} alt="Quaotz service booking in progress" fill sizes="100vw" />
        </motion.div>
      </AnimatePresence>
      <div className="promptAdvertOverlay" />
      <div className="promptAdvertContent">
        <motion.div className="promptAdvertMark" initial={reduce ? false : { opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 180, damping: 24 }}>Q</motion.div>
        <AnimatePresence mode="wait">
          <motion.div key={current.heading} initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -14 }}>
            <h2>{current.heading}</h2>
            <p>{current.copy}</p>
          </motion.div>
        </AnimatePresence>
        <Link className="promptDownloadCta" href="/app/discover"><ArrowCircleDownIcon size={31} />Open Quaotz</Link>
      </div>
    </ScaledSection>
  );
}

function PricingSection() {
  const [yearly, setYearly] = useState(true);
  const reduce = useReducedMotion();

  return (
    <ScaledSection className="promptSection promptPricing" id="pricing">
      <div className="promptPricingInner">
        <h2>Business plans</h2>
        <div className="promptBillingToggle">
          <span className={yearly ? "active" : ""}>Yearly</span>
          <button type="button" role="switch" aria-checked={!yearly} aria-label="Switch between yearly and monthly billing" onClick={() => setYearly((value) => !value)}>
            <motion.span animate={{ x: yearly ? 0 : 20 }} transition={{ type: "spring", stiffness: 420, damping: 30 }} />
          </button>
          <span className={!yearly ? "active" : ""}>Monthly</span>
        </div>
        <div className="promptPlanGrid">
          {plans.map((plan, index) => (
            <motion.article className={plan.featured ? "promptPlan featured" : "promptPlan"} key={plan.name} initial={reduce ? false : { opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ type: "spring", stiffness: 130, damping: 28, delay: index * 0.1 }}>
              {plan.featured && <span className="promptPlanRibbon">Top choice</span>}
              <div className="promptPlanTop">
                <h3>{plan.name}</h3>
                <p>{plan.copy}</p>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.strong key={yearly ? plan.yearly : plan.monthly} initial={{ opacity: 0, y: 8, filter: "blur(5px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -8, filter: "blur(5px)" }}>
                    {yearly ? plan.yearly : plan.monthly}
                  </motion.strong>
                </AnimatePresence>
                <Link href="/sign-in">Choose {plan.name}<span><ArrowUpRightIcon size={15} weight="bold" /></span></Link>
                <small>{yearly ? "Paid annually" : "Paid monthly"}. {plan.fee} when paid.</small>
              </div>
              <div className="promptPlanFeatures">
                {plan.features.map((feature) => <span key={feature}><i><CheckIcon size={16} weight="bold" /></i>{feature}</span>)}
              </div>
            </motion.article>
          ))}
        </div>
        <p className="promptPricingNote"><GavelIcon size={18} />Plans belong to the Business. Customer Protection is optional and charged separately.</p>
      </div>
    </ScaledSection>
  );
}

export function PromptLanding() {
  return (
    <main className="promptLanding">
      <HeroSection />
      <ScenariosSection />
      <AdvertSection />
      <PricingSection />
    </main>
  );
}
