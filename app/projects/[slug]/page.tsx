import { getAllProjects, getProjectData } from '@/lib/projects'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ProjectMarkdown } from '@/components/project-markdown'
import Image from 'next/image'

// Generate static params for static export
export function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default async function ProjectPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const project = getProjectData(params.slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="space-y-6 animate-in fade-in duration-500">
      <div className="space-y-3">
        <Link href="/projects" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="font-normal text-muted-foreground bg-muted/50 hover:bg-muted">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="aspect-video w-full rounded-lg bg-muted/20 border border-border flex items-center justify-center relative overflow-hidden group">
         {project.image?.startsWith('/projects/') ? (
           <Image
             src={project.image}
             alt={project.title}
             fill
             className="object-cover"
           />
         ) : (
           <>
             <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-muted/10" />
             <span className="z-10 text-muted-foreground font-medium">Cover Image: {project.title}</span>
           </>
         )}
      </div>

      <article className="prose prose-invert max-w-none">
         <p className="lead text-xl text-muted-foreground mb-8">{project.description}</p>
         <ProjectMarkdown content={project.content} />
      </article>
    </main>
  )
}
