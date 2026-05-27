'use client'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export type BlogPostSummary = {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
}

type BlogPostsListProps = {
  posts: BlogPostSummary[]
  tags: string[]
}

export default function BlogPostsList({ posts, tags }: BlogPostsListProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  useEffect(() => {
    setSelectedTag(searchParams.get('tag'))
  }, [searchParams])

  const handleSelectTag = (tag: string | null) => {
    setSelectedTag(tag)
    if (tag) {
      router.push(`${pathname}?tag=${encodeURIComponent(tag)}`)
      return
    }
    router.push(pathname)
  }

  const filteredPosts = selectedTag
    ? posts.filter((post) => post.tags.includes(selectedTag))
    : posts

  return (
    <main className="flex flex-col gap-0">
      {tags.length > 0 && (
        <section className="mb-4">
          <div className="overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max gap-2">
              <button
                type="button"
                onClick={() => handleSelectTag(null)}
                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs whitespace-nowrap transition-colors ${
                  selectedTag
                    ? 'border-primary/30 bg-primary/10 text-foreground hover:bg-primary/20'
                    : 'border-primary bg-primary text-primary-foreground'
                }`}
              >
                All
              </button>
              {tags.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => handleSelectTag(tag)}
                  className={`inline-flex items-center rounded-full border px-3 py-1 text-xs whitespace-nowrap transition-colors ${
                    selectedTag === tag
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-primary/30 bg-primary/10 text-foreground hover:bg-primary/20'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {filteredPosts.map((post, index) => {
        const date = new Date(post.date)
        const day = date.getDate().toString().padStart(2, '0')
        const monthYear = date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
        const isLast = index === filteredPosts.length - 1

        return (
          <article
            key={post.slug}
            role="link"
            tabIndex={0}
            onClick={() => router.push(`/blog/${post.slug}`)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                router.push(`/blog/${post.slug}`)
              }
            }}
            className={`group relative flex cursor-pointer gap-6 md:gap-10 items-start transition-colors hover:bg-muted/50 active:bg-muted/50 py-4 px-4 -mx-4 rounded-none border-white/5 ${!isLast ? 'border-b' : ''}`}
            aria-label={`Read ${post.title}`}
          >
            <div className="relative z-10 flex flex-col items-end shrink-0 w-[4.5rem] pt-1">
              <span className="text-2xl font-semibold leading-none tabular-nums">{day}</span>
              <span className="text-xs text-muted-foreground text-right mt-1">{monthYear}</span>
            </div>
            <div className="relative z-10 flex flex-col gap-1">
              <h2 className="text-lg font-medium leading-tight text-foreground group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed line-clamp-2">
                {post.description}
              </p>
              {post.tags.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={`${post.slug}-${tag}`}
                      className={`pointer-events-none relative z-20 inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] ${
                        selectedTag === tag
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-white/15 text-muted-foreground'
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>
        )
      })}

      {filteredPosts.length === 0 && (
        <p className="py-8 text-sm text-muted-foreground">
          No posts found for <span className="text-foreground">#{selectedTag}</span>.{' '}
          <Link href="/blog" className="underline underline-offset-2 hover:text-foreground">
            Clear filter
          </Link>
          .
        </p>
      )}
    </main>
  )
}
