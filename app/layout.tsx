import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { AnalyticsTracker } from '@/components/AnalyticsTracker'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' })

export const metadata: Metadata = {
  title: 'Prashanta Nayak',
  description: 'Product-driven professional with 2+ years of cross-functional experience.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.variable, playfair.variable, "min-h-screen bg-background font-sans antialiased text-foreground")}>
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <div className="relative flex min-h-screen flex-col">
            <Nav />
            <div className="flex-1 py-10">{children}</div>
            <Footer />
          </div>
        </div>
        <AnalyticsTracker />
      </body>
    </html>
  )
}
