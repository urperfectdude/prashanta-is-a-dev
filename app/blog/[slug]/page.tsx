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
      <article className="prose prose-invert max-w-none">
        <h1 className="mb-2 font-serif">{post.title}</h1>
        <p className="text-muted-foreground mb-6 block text-sm">{post.date}</p>
        <Markdown rehypePlugins={[rehypeRaw]}>{post.content}</Markdown>
      </article>
    </main>
  )
}
