import { Badge } from "@/components/ui/badge"
import { Card, CardTitle, CardDescription } from "@/components/ui/card"
import { getAllProjects } from "@/lib/projects"
import Link from "next/link"
import Image from "next/image"

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <main className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Projects{" "}
          <span className="text-muted-foreground font-normal">({projects.length})</span>
        </h1>
        <p className="text-muted-foreground">
          A collection of things I&apos;ve built and worked on.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {projects.map((project) => (
          <Link key={project.slug} href={`/projects/${project.slug}`}>
            <Card className="h-full hover:bg-zinc-800/80 transition-colors cursor-pointer group bg-zinc-900 border-none overflow-hidden relative">
              <div className="flex flex-col sm:flex-row h-full">
                {/* Left Image Section */}
                <div className="w-full sm:w-48 h-40 sm:h-56 bg-muted/20 shrink-0 relative flex items-center justify-center overflow-hidden">
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

                {/* Right Content Section */}
                <div className="flex flex-col justify-between p-6 w-full">
                  <div className="space-y-2">
                    <CardTitle className="group-hover:text-primary transition-colors text-xl">{project.title}</CardTitle>
                    <CardDescription className="line-clamp-2 text-muted-foreground/80 leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.slice(0, 4).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs font-normal bg-zinc-800 text-zinc-300 hover:bg-zinc-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  )
}
