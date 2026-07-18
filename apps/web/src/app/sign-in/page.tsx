import { ArrowRightIcon, LockKeyIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Brand } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";

export default function SignInPage() {
  return <main className="authPage"><div className="authTop"><Brand /><ThemeToggle /></div><section className="authCard"><span className="authIcon"><LockKeyIcon size={24} weight="duotone" /></span><span className="eyebrow">Welcome back</span><h1>Log in to Quaotz</h1><p>Manage bids, bookings and protected payments in one place.</p><form><label className="fieldLabel" htmlFor="email">Email address</label><input id="email" type="email" placeholder="you@example.com" required /><label className="fieldLabel" htmlFor="password">Password</label><input id="password" type="password" placeholder="••••••••" required /><Link className="button buttonWide" href="/app/discover">Continue <ArrowRightIcon size={18} weight="bold" /></Link></form><span className="authFoot">New to Quaotz? <a href="#">Create an account</a></span></section></main>;
}
