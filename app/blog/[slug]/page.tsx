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
    <main className="container py-8 md:py-12 max-w-3xl">
      <article className="prose prose-invert lg:prose-xl">
        <h1 className="mb-2">{post.title}</h1>
        <p className="text-muted-foreground mb-8 block">{post.date}</p>
        <Markdown rehypePlugins={[rehypeRaw]}>{post.content}</Markdown>
      </article>
    </main>
  )
}
