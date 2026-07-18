"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { CheckIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

const useCases = [
  {
    name: "Cleaning",
    title: "Fill the slots in your week.",
    text: "Publish an available cleaning slot and let nearby Customers bid to book it.",
    points: ["Set the place, duration and starting price", "Choose the highest bid or the best fit"],
    image: "/images/quaotz-restaurant-briefing.png",
    alt: "A cleaning professional and restaurant owner reviewing the work before opening",
  },
  {
    name: "Retail setup",
    title: "Sell specialist work, not spare time.",
    text: "Show exactly what you install, when you can do it and what Customers should prepare.",
    points: ["Keep the scope clear before bidding starts", "Compare each Customer request in one place"],
    image: "/images/quaotz-retail-display.png",
    alt: "A retail display installer working from a layout with a shop owner",
  },
  {
    name: "Outdoor services",
    title: "Finish the job with a clear record.",
    text: "Keep the agreed scope, messages and completion confirmation attached to the booking.",
    points: ["Customer payment is collected before the booking", "Optional protection adds a seven-day review"],
    image: "/images/quaotz-patio-complete.png",
    alt: "An outdoor maintenance worker and cafe owner reviewing a completed patio",
  },
];

const plans = [
  { name: "Standard", monthly: "$9.99", yearly: "$99", fee: "15%", note: "For occasional bookings." },
  { name: "Gold", monthly: "$29.99", yearly: "$299", fee: "12%", note: "For regular local work.", featured: true },
  { name: "Diamond", monthly: "$79.99", yearly: "$799", fee: "9%", note: "For established service Businesses." },
  { name: "Platinum", monthly: "$199.99", yearly: "$1,999", fee: "6%", note: "For high-volume booking teams." },
];

export function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function WorkUseCases() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const interval = window.setInterval(() => setActive((index) => (index + 1) % useCases.length), 6500);
    return () => window.clearInterval(interval);
  }, [reduce]);

  const current = useCases[active];

  return (
    <section className="useCasesSection" id="use-cases">
      <div className="useCasesInner">
        <div className="useCasesCopy">
          <h2>Built around the work you already do.</h2>
          <div className="caseTabs" role="tablist" aria-label="Business use cases">
            {useCases.map((item, index) => (
              <button
                key={item.name}
                type="button"
                role="tab"
                aria-selected={active === index}
                onClick={() => setActive(index)}
              >
                <span>{item.name}</span>
                <small>{index + 1}</small>
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              className="caseStatement"
              key={current.name}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3>{current.title}</h3>
              <p>{current.text}</p>
              <div className="casePoints">
                {current.points.map((point) => (
                  <span key={point}><CheckIcon size={18} weight="bold" />{point}</span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="caseImageFrame">
          <AnimatePresence mode="wait">
            <motion.div
              className="caseImage"
              key={current.image}
              initial={reduce ? false : { opacity: 0, x: 32, scale: 0.985 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, x: -24, scale: 0.985 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image src={current.image} alt={current.alt} fill loading="eager" sizes="(max-width: 900px) 100vw, 55vw" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export function BusinessPlans() {
  const [yearly, setYearly] = useState(true);

  return (
    <section className="plansSection" id="plans">
      <div className="plansInner">
        <div className="plansHeading">
          <h2>Keep more of every completed booking.</h2>
          <p>Plans belong to the Business. The service fee is deducted only after the Customer pays.</p>
          <div className="billingToggle">
            <span className={yearly ? "active" : undefined}>Yearly</span>
            <button
              type="button"
              role="switch"
              aria-checked={!yearly}
              aria-label="Switch between yearly and monthly billing"
              onClick={() => setYearly((value) => !value)}
            >
              <motion.span animate={{ x: yearly ? 0 : 20 }} transition={{ type: "spring", stiffness: 420, damping: 30 }} />
            </button>
            <span className={!yearly ? "active" : undefined}>Monthly</span>
          </div>
        </div>
        <div className="planGrid">
          {plans.map((plan, index) => (
            <motion.article
              className={plan.featured ? "planCard featured" : "planCard"}
              key={plan.name}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <div>
                <h3>{plan.name}</h3>
                <p>{plan.note}</p>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.strong
                  key={yearly ? plan.yearly : plan.monthly}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  {yearly ? plan.yearly : plan.monthly}<small> / {yearly ? "year" : "month"}</small>
                </motion.strong>
              </AnimatePresence>
              <div className="planFee"><span>{plan.fee}</span><small>service fee when paid</small></div>
              <Link className={plan.featured ? "button buttonWide" : "button buttonSecondary buttonWide"} href="/sign-in">
                Choose {plan.name}
              </Link>
            </motion.article>
          ))}
        </div>
        <p className="plansFootnote">No free trial. Change or cancel a plan before the next billing date.</p>
      </div>
    </section>
  );
}
