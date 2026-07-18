import { BriefcaseIcon } from "@phosphor-icons/react/dist/ssr";
import { EmptySection } from "@/components/empty-section";

export default function ContractsPage() {
  return <div className="appShell"><EmptySection icon={BriefcaseIcon} eyebrow="Bookings" title="Accepted bookings will live here." text="Track access details, completion records, review windows and payment release in one clear timeline." action="Browse services" /></div>;
}
