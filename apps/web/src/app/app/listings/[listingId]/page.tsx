import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircleIcon, ClockIcon, MapPinIcon, ShieldCheckIcon, UsersThreeIcon } from "@phosphor-icons/react/dist/ssr";
import { BidDialog } from "@/components/bid-dialog";
import { SaveButton } from "@/components/save-button";
import { getOpportunity, opportunities } from "@/lib/data";

export function generateStaticParams() {
  return opportunities.map(({ id }) => ({ listingId: id }));
}

export default async function ListingPage({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) {
  const { listingId } = await params;
  const opportunity = getOpportunity(listingId);
  if (!opportunity) notFound();

  return (
    <div className="appShell detailShell">
      <Link className="backLink" href="/app/discover">← Back to services</Link>
      <div className="detailLayout">
        <article className="detailContent">
          <header className="detailHeader"><div><span className="eyebrow">{opportunity.category} · Posted {opportunity.posted}</span><h1>{opportunity.title}</h1><p className="businessLine">{opportunity.business}</p></div><SaveButton /></header>
          <div className="detailMeta"><span><MapPinIcon size={18} weight="bold" />{opportunity.location}</span><span><ClockIcon size={18} weight="bold" />{opportunity.duration}</span><span><UsersThreeIcon size={18} weight="bold" />{opportunity.bids} bids</span></div>
          <section><h2>About this service</h2><p>{opportunity.description} The Business will confirm the final scope and access arrangements with the chosen Customer before the booking begins.</p></section>
          <section><h2>What to include in your bid</h2><ul className="detailList"><li>The service address and preferred start time</li><li>Any access limits, site photos or special requirements</li><li>A contact who can approve the completed work</li></ul></section>
          <section><h2>Skills and details</h2><div className="tagRow">{opportunity.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div></section>
          <section className="businessPanel"><div className="businessAvatar">CL</div><div><span className="eyebrow">Service Business</span><h2>{opportunity.business}</h2><p>{opportunity.verified ? "Identity verified" : "Identity verification pending"} · 18 completed bookings · 4.9 average rating</p></div>{opportunity.verified && <CheckCircleIcon size={24} weight="fill" />}</section>
        </article>
        <aside className="bidPanel">
          <span className="eyebrow">Live bidding</span><div className="topBid"><span>Current top bid</span><strong>£{opportunity.currentBid}</strong></div><div className="bidFacts"><span><small>Guide price</small><strong>{opportunity.guidePrice}</strong></span><span><small>Customer bids</small><strong>{opportunity.bids}</strong></span></div><BidDialog currentBid={opportunity.currentBid} title={opportunity.title} />
          <div className="protectionNote"><ShieldCheckIcon size={21} weight="fill" /><p><strong>Optional Quaotz Protection</strong>Customers can safeguard payment for 3%, capped at £49.99.</p></div>
          <p className="finePrint">By bidding, you agree to keep payment and messages on Quaotz for this opportunity.</p>
        </aside>
      </div>
    </div>
  );
}
