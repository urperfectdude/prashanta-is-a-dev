import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

function getRandomizedUniqueTags(tags: string[]): string[] {
  const uniqueTags = [...new Set(tags)]

  for (let i = uniqueTags.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    ;[uniqueTags[i], uniqueTags[randomIndex]] = [uniqueTags[randomIndex], uniqueTags[i]]
  }

  return uniqueTags
}

export default function BlogIndex() {
  const posts = getAllPosts()
  const randomUniqueTags = getRandomizedUniqueTags(posts.flatMap((post) => post.tags))

  return (
    <main className="flex flex-col gap-0">
      {randomUniqueTags.length > 0 && (
        <section className="mb-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Browse by tags
          </p>
          <div className="overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max gap-2">
              {randomUniqueTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-foreground whitespace-nowrap"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}
      {posts.map((post, index) => {
        const date = new Date(post.date)
        const day = date.getDate().toString().padStart(2, '0')
        const monthYear = date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
        const isLast = index === posts.length - 1

        return (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
            <div className={`flex gap-6 md:gap-10 items-start transition-colors hover:bg-muted/50 active:bg-muted/50 py-4 px-4 -mx-4 rounded-none border-white/5 ${!isLast ? 'border-b' : ''}`}>
              <div className="flex flex-col items-end shrink-0 w-[4.5rem] pt-1">
                <span className="text-2xl font-semibold leading-none tabular-nums">{day}</span>
                <span className="text-xs text-muted-foreground text-right mt-1">{monthYear}</span>
              </div>
              <div className="flex flex-col gap-1">
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
                        className="inline-flex items-center rounded-full border border-white/15 px-2.5 py-0.5 text-[11px] text-muted-foreground"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Link>
        )
      })}
    </main>
  )
}
