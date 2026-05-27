import { getAllPosts } from '@/lib/posts'
import BlogPostsList, { type BlogPostSummary } from './posts-list'
import { Suspense } from 'react'

function getRandomizedUniqueTags(tags: string[]): string[] {
  const uniqueTags = [...new Set(tags)]

  for (let i = uniqueTags.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    ;[uniqueTags[i], uniqueTags[randomIndex]] = [uniqueTags[randomIndex], uniqueTags[i]]
  }

  return uniqueTags
}

type BlogIndexProps = {
  searchParams?: Promise<{
    tag?: string | string[]
  }>
}

export default async function BlogIndex({ searchParams }: BlogIndexProps) {
  void searchParams
  const posts = getAllPosts()
  const postSummaries: BlogPostSummary[] = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    description: post.description,
    tags: post.tags,
  }))
  const randomUniqueTags = getRandomizedUniqueTags(posts.flatMap((post) => post.tags))

  return (
    <Suspense fallback={<main className="py-8 text-sm text-muted-foreground">Loading posts...</main>}>
      <BlogPostsList posts={postSummaries} tags={randomUniqueTags} />
    </Suspense>
  )
}
