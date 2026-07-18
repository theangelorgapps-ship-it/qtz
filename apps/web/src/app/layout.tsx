import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Quaotz | Bid to book local services",
    template: "%s | Quaotz",
  },
  description:
    "Local service Businesses publish available work slots and Customers bid to book them.",
};

const themeScript = `
  (() => {
    try {
      const saved = localStorage.getItem('quaotz-theme');
      document.documentElement.dataset.theme = saved === 'light' ? 'light' : 'dark';
    } catch (_) {
      document.documentElement.dataset.theme = 'dark';
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
