'use client'

import Script from 'next/script'

type RedditEmbedProps = {
  url: string
  title: string
  author: string
  subreddit: string
}

export function RedditEmbed({ url, title, author, subreddit }: RedditEmbedProps) {
  return (
    <div className="not-prose my-8">
      <blockquote className="reddit-embed-bq" data-embed-height="740">
        <a href={url}>{title}</a>
        <br />
        by <a href={`https://www.reddit.com/user/${author}/`}>u/{author}</a> in{' '}
        <a href={`https://www.reddit.com/r/${subreddit}/`}>{subreddit}</a>
      </blockquote>
      <Script src="https://embed.reddit.com/widgets.js" strategy="lazyOnload" />
    </div>
  )
}
