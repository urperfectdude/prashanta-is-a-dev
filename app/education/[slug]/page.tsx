import { getAllEducation, getEducationData } from '@/lib/education'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, GraduationCap } from 'lucide-react'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { Badge } from '@/components/ui/badge'

export function generateStaticParams() {
  const education = getAllEducation()
  return education.map((edu) => ({
    slug: edu.slug,
  }))
}

export default async function EducationPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const edu = getEducationData(params.slug)

  if (!edu) {
    notFound()
  }

  return (
    <main className="space-y-6 animate-in fade-in duration-500">
      <div className="space-y-3">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">{edu.institution}</h1>
            <h2 className="text-xl text-muted-foreground font-medium">{edu.degree}</h2>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{edu.year}</span>
            </div>
             <div className="flex items-center gap-1">
                <GraduationCap className="h-4 w-4" />
                <span>{edu.score}</span>
            </div>
        </div>
      </div>

      <article className="prose prose-invert max-w-none">
         <p className="lead text-xl text-muted-foreground mb-8">{edu.description}</p>
         <Markdown rehypePlugins={[rehypeRaw]}>{edu.content}</Markdown>
      </article>
    </main>
  )
}
