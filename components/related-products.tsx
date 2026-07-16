import Link from "next/link"
import Image from "next/image"
import { Card, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/lib/projects"

interface RelatedProductsProps {
  projects: Project[]
}

export function RelatedProducts({ projects }: RelatedProductsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
      {projects.map((project) => (
        <Link key={project.slug} href={`/projects/${project.slug}`} className="group block h-full">
          <Card className="h-full overflow-hidden border-none bg-zinc-900 flex flex-col hover:bg-zinc-800/80 transition-colors">
            <div className="relative h-32 sm:h-36 md:h-40 w-full shrink-0 overflow-hidden bg-muted/20">
              {project.image?.startsWith("/projects/") ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900" />
                  <span className="relative text-xs text-muted-foreground font-medium">Image</span>
                </>
              )}
            </div>
            <div className="flex flex-col gap-1.5 p-4">
              <CardTitle className="text-base md:text-lg leading-snug line-clamp-1 group-hover:text-primary transition-colors">
                {project.title}
              </CardTitle>
              <CardDescription className="text-xs md:text-sm line-clamp-2 text-muted-foreground/80">
                {project.description}
              </CardDescription>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs font-normal bg-zinc-800 text-zinc-300">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}
