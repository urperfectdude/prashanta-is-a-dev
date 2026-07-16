"use client"

import { useEffect, useState } from 'react'
import { Github, Linkedin, Instagram, Mail, FileDown } from 'lucide-react'
import { ABOUT } from "@/lib/data"

const ICON_STROKE_WIDTH = 1.5

const profileLinks = [
  { href: ABOUT.contact.github, icon: Github, label: 'GitHub' },
  { href: ABOUT.contact.linkedin, icon: Linkedin, label: 'LinkedIn' },
  { href: ABOUT.contact.instagram, icon: Instagram, label: 'Instagram' },
]

const iconLinkClass =
  "group/icon relative flex items-center justify-center rounded-full p-2 text-white/60 transition-all duration-150 ease-out hover:text-white hover:-translate-y-0.5 hover:scale-[1.15] active:scale-[0.92] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"

function IconTooltip({ label }: { label: string }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -top-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-150 group-hover/icon:opacity-100 group-focus-visible/icon:opacity-100 md:block"
    >
      {label}
    </span>
  )
}

export function DockNav() {
  const [mounted, setMounted] = useState(false)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(frame)
  }, [])

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
      <nav
        aria-label="Site navigation"
        className={`fixed left-1/2 z-50 -translate-x-1/2 bottom-[calc(1rem+env(safe-area-inset-bottom))] transition-all duration-[400ms] ease-out sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] ${
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
        }`}
      >
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/60 px-4 py-1.5 shadow-lg backdrop-blur-md sm:gap-3 sm:px-5 sm:py-2">
          <div className="flex items-center gap-1">
            {profileLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={iconLinkClass}
                aria-label={link.label}
              >
                <link.icon className="h-5 w-5" strokeWidth={ICON_STROKE_WIDTH} />
                <IconTooltip label={link.label} />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <a
              href={ABOUT.contact.resume}
              download="Nayak_Prashanta_Resume.pdf"
              className={iconLinkClass}
              aria-label="Download resume"
            >
              <FileDown className="h-5 w-5" strokeWidth={ICON_STROKE_WIDTH} />
              <IconTooltip label="Resume" />
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              className={`${iconLinkClass} cursor-pointer`}
              aria-label="Copy email"
            >
              <Mail className="h-5 w-5" strokeWidth={ICON_STROKE_WIDTH} />
              <IconTooltip label="Email" />
            </button>
          </div>
        </div>
      </nav>

      {/* Toast notification */}
      <div
        className={`fixed bottom-24 left-1/2 z-[100] -translate-x-1/2 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white shadow-lg transition-all duration-300 sm:bottom-28 ${
          showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        Email ID is Copied
      </div>
    </>
  )
}
