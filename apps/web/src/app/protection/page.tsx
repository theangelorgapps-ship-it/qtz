import { ArrowRightIcon, CheckIcon, ShieldCheckIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { Brand } from "@/components/brand";
import { Reveal } from "@/components/marketing-sections";
import { SiteHeader } from "@/components/site-header";

const standard = [
  "Customer pays when the booking is accepted",
  "Business marks the service complete",
  "Payment releases after 48 hours",
];

const protectedBooking = [
  "Customer adds Protection before payment",
  "Seven-day review window after completion",
  "Quaotz keeps the booking record available for review",
];

export default function ProtectionPage() {
  return (
    <div className="marketingPage protectionPage">
      <SiteHeader marketing />
      <main>
        <section className="protectionHero">
          <Image
            src="/images/quaotz-patio-complete.png"
            alt="A cafe owner and maintenance professional reviewing completed patio work"
            fill
            priority
            sizes="100vw"
          />
          <div className="protectionHeroShade" />
          <Reveal className="protectionHeroCopy">
            <ShieldCheckIcon size={46} weight="duotone" />
            <span>Quaotz Protection</span>
            <h1>A longer review window when the job needs one.</h1>
            <p>Protection is optional and paid by the Customer. It adds time to check the completed service before payment is released.</p>
            <Link className="button" href="/app/discover">Browse protected bookings <ArrowRightIcon size={19} weight="bold" /></Link>
          </Reveal>
        </section>

        <section className="protectionCompare">
          <Reveal className="protectionCompareIntro">
            <span className="heroLabel">Two payment routes</span>
            <h2>Choose before you pay.</h2>
            <p>The Business still chooses the winning Customer. Protection changes the review period, not the bidding rules.</p>
          </Reveal>
          <div className="protectionOptions">
            <Reveal className="protectionOption">
              <div><span>Standard</span><strong>Included</strong></div>
              <p>A straightforward release for routine work.</p>
              <ul>{standard.map((item) => <li key={item}><CheckIcon size={18} weight="bold" />{item}</li>)}</ul>
            </Reveal>
            <Reveal className="protectionOption highlighted">
              <div><span>Protected</span><strong>3%</strong></div>
              <p>$2.99 minimum and $49.99 maximum, shown before payment.</p>
              <ul>{protectedBooking.map((item) => <li key={item}><CheckIcon size={18} weight="bold" />{item}</li>)}</ul>
            </Reveal>
          </div>
        </section>

        <section className="protectionClose">
          <Reveal>
            <h2>Clear scope first. Clear record throughout.</h2>
            <p>Keep the service details, messages, payment and completion confirmation in Quaotz so both sides can see what was agreed.</p>
            <Link className="button" href="/app/discover">Find a service <ArrowRightIcon size={19} weight="bold" /></Link>
          </Reveal>
        </section>
      </main>
      <footer className="editorialFooter">
        <Brand />
        <div><Link href="/app/discover">Browse services</Link><Link href="/sign-in">Business login</Link><Link href="/admin">Admin</Link></div>
        <span>© 2026 Quaotz</span>
      </footer>
    </div>
  );
}
