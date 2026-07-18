import type { Icon } from "@phosphor-icons/react";
import Link from "next/link";

export function EmptySection({ icon: Icon, eyebrow, title, text, action }: { icon: Icon; eyebrow: string; title: string; text: string; action: string }) {
  return (
    <section className="emptyState">
      <span className="emptyIcon"><Icon size={30} weight="duotone" /></span>
      <span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p>
      <Link className="button" href="/app/discover">{action}</Link>
    </section>
  );
}
