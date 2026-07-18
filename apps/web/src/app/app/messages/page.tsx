import { ChatCircleDotsIcon } from "@phosphor-icons/react/dist/ssr";
import { EmptySection } from "@/components/empty-section";

export default function MessagesPage() {
  return <div className="appShell"><EmptySection icon={ChatCircleDotsIcon} eyebrow="Messages" title="Keep every booking conversation together." text="Business messages, attachments and protected payment updates will appear here." action="Browse services" /></div>;
}
