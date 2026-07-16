import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ABOUT } from "@/lib/data"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pt-4 pb-2 border-b border-white/10">
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
    </header>
  )
}
