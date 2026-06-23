'use client'

import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { RedditEmbed } from '@/components/reddit-embed'
import type { Components } from 'react-markdown'

const markdownComponents: Components = {
  div: ({ node, ...props }) => {
    const attrs = props as Record<string, string | undefined>
    if (attrs['data-reddit-embed'] !== undefined) {
      return (
        <RedditEmbed
          url={attrs['data-url'] ?? ''}
          title={attrs['data-title'] ?? ''}
          author={attrs['data-author'] ?? ''}
          subreddit={attrs['data-subreddit'] ?? ''}
        />
      )
    }
    return <div {...props} />
  },
}

export function ProjectMarkdown({ content }: { content: string }) {
  return (
    <Markdown rehypePlugins={[rehypeRaw]} components={markdownComponents}>
      {content}
    </Markdown>
  )
}
