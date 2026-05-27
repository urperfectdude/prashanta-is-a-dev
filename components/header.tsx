"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Github, Linkedin, Instagram, Mail, FileDown, Menu, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ABOUT } from "@/lib/data"

export function Header() {
  const [showToast, setShowToast] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const socialLinks = [
    { href: ABOUT.contact.github, icon: Github, label: 'GitHub' },
    { href: ABOUT.contact.linkedin, icon: Linkedin, label: 'LinkedIn' },
    { href: ABOUT.contact.instagram, icon: Instagram, label: 'Instagram' },
    { href: ABOUT.contact.resume, icon: FileDown, label: 'Download resume', download: true },
  ]

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(ABOUT.contact.email)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 2000)
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = ABOUT.contact.email
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 2000)
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pt-4 pb-2 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14 border border-border">
               <AvatarImage src={ABOUT.avatar} alt={ABOUT.name} />
               <AvatarFallback>{ABOUT.initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <Link href="/" className="font-bold text-lg leading-tight hover:opacity-80 transition-opacity">
                {ABOUT.name}
              </Link>
              <span className="text-xs text-muted-foreground font-medium">
                {ABOUT.title}
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.download ? undefined : "_blank"}
                  rel={link.download ? undefined : "noopener noreferrer"}
                  download={link.download ? "prashanta-nayak-cv-product-engineer.pdf" : undefined}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={link.label}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
              <button
                onClick={handleCopyEmail}
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                aria-label="Copy email"
              >
                <Mail className="h-5 w-5" />
              </button>
            </div>

            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="md:hidden text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-header-menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </nav>
        </div>

        {isMenuOpen && (
          <div
            id="mobile-header-menu"
            className="md:hidden mt-3 flex items-center justify-end gap-4 border-t border-white/10 pt-3"
          >
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.download ? undefined : "_blank"}
                rel={link.download ? undefined : "noopener noreferrer"}
                download={link.download ? "prashanta-nayak-cv-product-engineer.pdf" : undefined}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={link.label}
                onClick={() => setIsMenuOpen(false)}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
            <button
              onClick={() => {
                void handleCopyEmail()
                setIsMenuOpen(false)
              }}
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              aria-label="Copy email"
            >
              <Mail className="h-5 w-5" />
            </button>
          </div>
        )}
      </header>

      {/* Toast notification */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-4 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-white shadow-lg transition-all duration-300 ${
          showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        Email ID is Copied
      </div>
    </>
  )
}
