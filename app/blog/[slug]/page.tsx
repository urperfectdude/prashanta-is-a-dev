import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getAllPosts, getPostData } from '@/lib/posts'
import Markdown from 'react-markdown'
import { notFound } from 'next/navigation'
import rehypeRaw from 'rehype-raw'

// Required for static export to generate all paths
export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const post = getPostData(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="pt-0 pb-6 md:pt-0 md:pb-8 animate-in fade-in duration-500">
      <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Blog
      </Link>
      <article className="prose prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-strong:font-semibold prose-em:italic prose-p:leading-relaxed">
        <h1 className="mb-2 text-4xl md:text-5xl font-bold tracking-tight">{post.title}</h1>
        <p className="text-muted-foreground mb-2 block text-sm">{post.date}</p>
        {post.tags.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-white/15 bg-muted px-3 py-1 text-xs text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        <Markdown rehypePlugins={[rehypeRaw]}>{post.content}</Markdown>
      </article>
    </main>
  )
}
