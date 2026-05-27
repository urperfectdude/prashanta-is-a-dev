import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AnalyticsTracker } from '@/components/AnalyticsTracker'
import { cn } from '@/lib/utils'

import { NavigationTabs } from '@/components/navigation-tabs'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Prashanta Nayak',
  description: 'Product-driven professional with 2+ years of cross-functional experience.',
  icons: {
    icon: 'https://raw.githubusercontent.com/urperfectdude/prashanta-is-a-dev/main/public/badal-ps.jpg',
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
        <AnalyticsTracker />
      </body>
    </html>
  )
}
