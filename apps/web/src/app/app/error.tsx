"use client";

import { WarningCircleIcon } from "@phosphor-icons/react";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div className="appShell"><section className="emptyState"><span className="emptyIcon"><WarningCircleIcon size={30} weight="duotone" /></span><span className="eyebrow">Something went wrong</span><h1>We could not load this page.</h1><p>Your account is safe. Try the request again or return to the marketplace.</p><button className="button" type="button" onClick={reset}>Try again</button></section></div>;
}
