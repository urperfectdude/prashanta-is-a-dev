"use client"

import * as React from "react"

interface CompanyLinkProps {
  url?: string
  company: string
}

export function CompanyLink({ url, company }: CompanyLinkProps) {
  if (!url) {
    return <span>{company}</span>
  }

  return (
    <object className="inline-block">
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="hover:text-primary transition-colors hover:underline relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {company}
      </a>
    </object>
  )
}
