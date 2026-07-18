import { FileTextIcon } from "@phosphor-icons/react/dist/ssr";
import { EmptySection } from "@/components/empty-section";

export default function ProposalsPage() {
  return <div className="appShell"><EmptySection icon={FileTextIcon} eyebrow="My bids" title="Your bid board is ready." text="Submitted, leading, accepted and withdrawn bids will appear here with live status updates." action="Browse services" /></div>;
}
