import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header'
import { DockNav } from '@/components/dock-nav'
import { Footer } from '@/components/footer'
import { AnalyticsTracker } from '@/components/AnalyticsTracker'
import { cn } from '@/lib/utils'

import { NavigationTabs } from '@/components/navigation-tabs'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const PROFILE_IMAGE = 'https://raw.githubusercontent.com/urperfectdude/prashanta-is-a-dev/main/public/badal-ps.jpg'
const SITE_TITLE = 'Prashanta Nayak | AI Product Builder'
const SITE_DESCRIPTION = 'tldr; mostly self-taught through internet rabbit holes and shipping tiny experiments. I love technology for the real-world impact, and I use AI plus code to build strange but useful products fast.'

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  icons: {
    icon: PROFILE_IMAGE,
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: PROFILE_IMAGE,
        width: 1000,
        height: 1000,
        alt: 'Prashanta Nayak',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [PROFILE_IMAGE],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={cn(spaceGrotesk.variable, spaceGrotesk.className, "min-h-screen bg-background font-sans antialiased text-foreground")}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:px-8">
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <NavigationTabs />
            <div className="flex-1 py-4">{children}</div>
            <Footer />
          </div>
        </div>
        <DockNav />
        <AnalyticsTracker />
      </body>
    </html>
  )
}
