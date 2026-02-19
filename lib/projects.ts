import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const projectsDirectory = path.join(process.cwd(), 'content/projects')

export type Project = {
  slug: string
  title: string
  date: string
  description: string
  image: string
  tags: string[]
  content: string
}

export function getAllProjects(): Project[] {
  if (!fs.existsSync(projectsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(projectsDirectory)
  const allProjectsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(projectsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      content,
      ...(data as { title: string; date: string; description: string; image: string; tags: string[] }),
    }
  })

  // Sort projects by date
  return allProjectsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getProjectData(slug: string): Project | null {
  const fullPath = path.join(projectsDirectory, `${slug}.md`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    content,
    ...(data as { title: string; date: string; description: string; image: string; tags: string[] }),
  }
}
