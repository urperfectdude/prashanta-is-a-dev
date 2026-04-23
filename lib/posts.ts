import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export type Post = {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  content: string
}

type PostFrontmatter = {
  title: string
  date: string
  description: string
  tags?: string[] | string
}

function normalizeTags(rawTags: PostFrontmatter['tags']): string[] {
  if (Array.isArray(rawTags)) {
    return [...new Set(rawTags.map((tag) => tag.trim()).filter(Boolean))]
  }

  if (typeof rawTags === 'string') {
    return [...new Set(rawTags.split(',').map((tag) => tag.trim()).filter(Boolean))]
  }

  return []
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const frontmatter = data as PostFrontmatter

    return {
      slug,
      content,
      title: frontmatter.title,
      date: frontmatter.date,
      description: frontmatter.description,
      tags: normalizeTags(frontmatter.tags),
    }
  })

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getPostData(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const frontmatter = data as PostFrontmatter

  return {
    slug,
    content,
    title: frontmatter.title,
    date: frontmatter.date,
    description: frontmatter.description,
    tags: normalizeTags(frontmatter.tags),
  }
}
