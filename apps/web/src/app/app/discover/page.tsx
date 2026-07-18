import {
  BellSimpleRingingIcon,
  CheckIcon,
  FunnelSimpleIcon,
  MagnifyingGlassIcon,
  SlidersHorizontalIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { OpportunityCard } from "@/components/opportunity-card";
import { opportunities } from "@/lib/data";

export default function DiscoverPage() {
  return (
    <div className="appShell">
      <section className="appHero">
        <div><span className="eyebrow">Available near Manchester</span><h1>Book a local service by bidding your price.</h1><p>Browse service slots published by local Businesses, then bid on the one that fits.</p></div>
        <button className="button buttonSecondary desktopOnly" type="button"><BellSimpleRingingIcon size={18} weight="bold" /> Create alert</button>
      </section>
      <form className="searchBar" role="search">
        <MagnifyingGlassIcon size={21} weight="bold" />
        <input aria-label="Search local services" placeholder="Search cleaning, reception, retail setup..." />
        <button className="filterButton" type="button"><SlidersHorizontalIcon size={19} weight="bold" /><span>Filters</span></button>
      </form>
      <div className="discoveryLayout">
        <aside className="filterRail" aria-label="Search filters">
          <div className="railHeading"><strong>Filters</strong><button type="button">Clear all</button></div>
          <fieldset><legend>Distance</legend>{["Within 5 miles", "Within 15 miles", "Remote or flexible"].map((item, index) => <label key={item}><input type="radio" name="distance" defaultChecked={index === 1} />{item}</label>)}</fieldset>
          <fieldset><legend>Category</legend>{["Cleaning", "Hospitality", "Retail support", "Outdoor services"].map((item, index) => <label key={item}><input type="checkbox" defaultChecked={index < 2} />{item}</label>)}</fieldset>
          <fieldset><legend>Opportunity type</legend>{["One-off", "Recurring", "Urgent"].map((item) => <label key={item}><input type="checkbox" />{item}</label>)}</fieldset>
          <button className="button buttonSecondary buttonWide" type="button"><FunnelSimpleIcon size={17} weight="bold" /> Apply filters</button>
        </aside>
        <section className="feed" aria-labelledby="feed-heading">
          <div className="feedTabs"><div><button className="active" type="button">Best matches</button><button type="button">Most recent</button><button type="button">Saved</button></div><span><CheckIcon size={15} weight="bold" /> 24 matched</span></div>
          <h2 id="feed-heading" className="srOnly">Available services</h2>
          <div className="activeFilters"><span>Within 15 miles</span><span>Cleaning</span><span>Hospitality</span></div>
          <div className="opportunityList">{opportunities.map((opportunity) => <OpportunityCard key={opportunity.id} opportunity={opportunity} />)}</div>
          <button className="button buttonSecondary loadMore" type="button">Load more services</button>
        </section>
        <aside className="profileRail">
          <div className="profileCard"><div className="profileIdentity"><span className="profileAvatar">CF</span><div><strong>Charles Finney</strong><span>Customer account</span></div></div><div className="progressLabel"><span>Booking ready</span><strong>2 of 2</strong></div><div className="progressTrack complete"><span /></div><Link href="/app/profile">View account checks</Link></div>
          <div className="tipCard"><span className="eyebrow">Before you bid</span><h3>Be specific about the booking</h3><p>Share the location, access details and timing the Business needs to confirm.</p><Link href="/app/proposals">Review your bids</Link></div>
        </aside>
      </div>
    </div>
  );
}
