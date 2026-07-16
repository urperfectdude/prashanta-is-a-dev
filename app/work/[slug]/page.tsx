import { getAllWorkExperience, getWorkExperienceData } from '@/lib/experience'
import { getProjectData, type Project } from '@/lib/projects'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Briefcase } from 'lucide-react'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { Badge } from '@/components/ui/badge'
import { RelatedProducts } from '@/components/related-products'

const RELATED_PRODUCTS_BY_WORK_SLUG: Record<string, string[]> = {
  enviu: ['stymo-deadstock-marketplace', 'qilin-p2p-thrifting-app'],
  yourerpcoach: ['onesherpa-erpnext-implementation', 'sherpa-erp-training', 'yecc-app'],
  driveo: ['easyv-ev-saas'],
}

export function generateStaticParams() {
  const work = getAllWorkExperience()
  return work.map((job) => ({
    slug: job.slug,
  }))
}

export default async function WorkPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const job = getWorkExperienceData(params.slug)

  if (!job) {
    notFound()
  }

  const relatedProjects = (RELATED_PRODUCTS_BY_WORK_SLUG[params.slug] ?? [])
    .map((slug) => getProjectData(slug))
    .filter((project): project is Project => project !== null)

  return (
    <main className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-4">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">{job.role}</h1>
            <h2 className="text-xl text-muted-foreground font-medium">{job.company}</h2>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{job.period}</span>
            </div>
        </div>
      </div>

      <article className="prose prose-invert max-w-none">
         <p className="lead text-xl text-muted-foreground mb-8">{job.description}</p>
         <Markdown rehypePlugins={[rehypeRaw]}>{job.content}</Markdown>
      </article>

      {relatedProjects.length > 0 && (
        <section className="space-y-6 mt-16">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider border-b pb-2">Related Products</h3>
          <RelatedProducts projects={relatedProjects} />
        </section>
      )}
    </main>
  )
}
