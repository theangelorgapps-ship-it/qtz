"use client";

import {
  BellIcon,
  BriefcaseIcon,
  ChatCircleDotsIcon,
  ListIcon,
  MagnifyingGlassIcon,
  XIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Brand } from "./brand";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "/app/discover", label: "Services", icon: MagnifyingGlassIcon },
  { href: "/app/proposals", label: "My bids", icon: BriefcaseIcon },
  { href: "/app/contracts", label: "Bookings", icon: ListIcon },
  { href: "/app/messages", label: "Messages", icon: ChatCircleDotsIcon },
];

export function SiteHeader({ marketing = false }: { marketing?: boolean }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={marketing ? "siteHeader marketingHeader" : "siteHeader"}>
      <div className="headerInner">
        <Brand />
        {marketing ? (
          <nav className="desktopNav" aria-label="Primary navigation">
            <Link href="/#how-it-works">How it works</Link>
            <Link href="/#use-cases">Use cases</Link>
            <Link href="/protection">Protection</Link>
            <Link href="/#plans">Plans</Link>
          </nav>
        ) : (
          <nav className="desktopNav" aria-label="Marketplace navigation">
            {links.map(({ href, label }) => (
              <Link key={href} href={href} className={pathname.startsWith(href) ? "active" : undefined}>
                {label}
              </Link>
            ))}
          </nav>
        )}
        <div className="headerActions">
          {!marketing && (
            <button className="iconButton desktopOnly" type="button" aria-label="Notifications">
              <BellIcon size={19} weight="bold" />
              <span className="notificationDot" />
            </button>
          )}
          <ThemeToggle />
          {marketing ? (
            <>
              <Link className="textButton desktopOnly" href="/sign-in">
                Log in
              </Link>
              <Link className="button buttonSmall desktopOnly" href="/app/discover">
                Browse services
              </Link>
            </>
          ) : (
            <Link className="avatarButton desktopOnly" href="/app/profile" aria-label="Your profile">
              CF
            </Link>
          )}
          <button
            className="iconButton mobileMenuButton"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <XIcon size={20} weight="bold" /> : <ListIcon size={20} weight="bold" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav id="mobile-menu" className="mobileMenu" aria-label="Mobile navigation">
          {(marketing
            ? [
                { href: "/#how-it-works", label: "How it works", icon: ListIcon },
                { href: "/#use-cases", label: "Use cases", icon: MagnifyingGlassIcon },
                { href: "/protection", label: "Protection", icon: BriefcaseIcon },
                { href: "/#plans", label: "Plans", icon: ListIcon },
                { href: "/sign-in", label: "Log in", icon: ChatCircleDotsIcon },
              ]
            : links
          ).map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)}>
              <Icon size={19} weight="bold" />
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
