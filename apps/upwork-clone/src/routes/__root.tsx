import { HeadContent, Outlet, Scripts, createRootRoute, useRouterState } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { Footer } from '~/components/layout/Footer'
import { Header } from '~/components/layout/Header'
import appCss from '~/styles/app.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Upwork | Hire Top Freelance Talent with Confidence' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  component: RootComponent,
})

// Logged-in app routes render their own chrome (AppShell) instead of the
// marketing Header/Footer. Auth pages use a minimal layout (logo only).
const APP_ROUTE_PREFIXES = ['/dashboard', '/messages', '/post-job', '/login', '/signup']

function RootComponent() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const isAppRoute = APP_ROUTE_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  )
  return (
    <RootDocument>
      {!isAppRoute && <Header />}
      <main id="main">
        <Outlet />
      </main>
      {!isAppRoute && <Footer />}
    </RootDocument>
  )
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en-US">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
