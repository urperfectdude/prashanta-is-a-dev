"use client"

import Link from 'next/link'
import { Github, Linkedin, Instagram, Mail } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ABOUT } from "@/lib/data"

export function Header() {
  const socialLinks = [
    { href: ABOUT.contact.github, icon: Github, label: 'GitHub' },
    { href: ABOUT.contact.linkedin, icon: Linkedin, label: 'LinkedIn' },
    { href: ABOUT.contact.instagram, icon: Instagram, label: 'Instagram' },
    { href: `mailto:${ABOUT.contact.email}`, icon: Mail, label: 'Email' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pt-4 pb-2 border-b border-white/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Increased size by ~10% from h-12 (3rem) to h-[3.3rem] which is 52.8px, originally 48px. 
              User asked for 10% increase. 48 + 4.8 = 52.8. Tailwind h-13 doesn't exist. 
              Let's go slightly larger to be noticeable: h-14 (3.5rem = 56px). 
          */}
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
           <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={link.label}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}
