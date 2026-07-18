import {
  CheckCircleIcon,
  ClockIcon,
  GavelIcon,
  MapPinIcon,
  SparkleIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { Opportunity } from "@/lib/data";
import { SaveButton } from "./save-button";

export function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  return (
    <article className="opportunityCard">
      <div className="cardTopline">
        <div className="badgeRow">
          {opportunity.featured && (
            <span className="badge badgeGold">
              <SparkleIcon size={14} weight="fill" /> Featured
            </span>
          )}
          {opportunity.urgent && <span className="badge badgeWarm">Closing soon</span>}
          <span className="eyebrow">Posted {opportunity.posted}</span>
        </div>
        <SaveButton />
      </div>
      <Link href={`/app/listings/${opportunity.id}`} className="cardTitleLink">
        <h2>{opportunity.title}</h2>
      </Link>
      <div className="metaRow">
        <span>
          <MapPinIcon size={16} weight="bold" /> {opportunity.location}
        </span>
        <span>
          <ClockIcon size={16} weight="bold" /> {opportunity.duration}
        </span>
        {opportunity.verified && (
          <span>
            <CheckCircleIcon size={16} weight="fill" /> Payment verified
          </span>
        )}
      </div>
      <p className="cardDescription">{opportunity.description}</p>
      <div className="tagRow">
        {opportunity.tags.map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
      <div className="bidStrip">
        <div>
          <span className="metricLabel">Current top bid</span>
          <strong>£{opportunity.currentBid}</strong>
        </div>
        <div>
          <span className="metricLabel">Guide price</span>
          <strong>{opportunity.guidePrice}</strong>
        </div>
        <div>
          <span className="metricLabel">Customer bids</span>
          <strong>{opportunity.bids}</strong>
        </div>
        <Link className="button buttonSmall" href={`/app/listings/${opportunity.id}`}>
          <GavelIcon size={17} weight="bold" /> View and bid
        </Link>
      </div>
    </article>
  );
}
