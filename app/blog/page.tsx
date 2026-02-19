import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default function BlogIndex() {
  const posts = getAllPosts()

  return (
    <main className="flex flex-col gap-0">
      {posts.map((post, index) => {
        const date = new Date(post.date)
        const day = date.getDate().toString().padStart(2, '0')
        const monthYear = date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
        const isLast = index === posts.length - 1

        return (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
            <div className={`flex gap-6 md:gap-10 items-start transition-colors hover:bg-muted/50 active:bg-muted/50 py-4 px-4 -mx-4 rounded-none border-white/5 ${!isLast ? 'border-b' : ''}`}>
              <div className="flex flex-col items-end shrink-0 w-[4.5rem] pt-1">
                <span className="text-2xl font-serif font-medium leading-none">{day}</span>
                <span className="text-xs text-muted-foreground text-right mt-1">{monthYear}</span>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-medium leading-tight text-foreground group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed line-clamp-2">
                  {post.description}
                </p>
              </div>
            </div>
          </Link>
        )
      })}
    </main>
  )
}
