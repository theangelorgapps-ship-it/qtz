"use client";

import {
  BriefcaseIcon,
  ChatCircleDotsIcon,
  FileTextIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/app/discover", label: "Discover", icon: MagnifyingGlassIcon },
  { href: "/app/proposals", label: "Bids", icon: FileTextIcon },
  { href: "/app/contracts", label: "Bookings", icon: BriefcaseIcon },
  { href: "/app/messages", label: "Messages", icon: ChatCircleDotsIcon },
  { href: "/app/profile", label: "Profile", icon: UserCircleIcon },
];

export function MobileAppNavigation() {
  const pathname = usePathname();

  return (
    <nav className="mobileAppNav" aria-label="Mobile app navigation">
      {links.map(({ href, label, icon: Icon }) => (
        <Link key={href} href={href} className={pathname.startsWith(href) ? "active" : undefined}>
          <Icon size={21} weight={pathname.startsWith(href) ? "fill" : "regular"} />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}
