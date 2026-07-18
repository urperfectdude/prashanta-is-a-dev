import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const educationDirectory = path.join(process.cwd(), 'content/education')

export type Education = {
  slug: string
  institution: string
  degree: string
  year: string
  score: string
  logo?: string
  description: string
  content: string
}

export function getAllEducation(): Education[] {
  if (!fs.existsSync(educationDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(educationDirectory)
  const allEducationData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(educationDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      content,
      ...(data as { institution: string; degree: string; year: string; score: string; logo?: string; description: string }),
    }
  })

  const order = ['gp-bramhapuri', 'uiuc-iot', 'iit-madras']
  return allEducationData.sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug))
}

export function getEducationData(slug: string): Education | null {
  const fullPath = path.join(educationDirectory, `${slug}.md`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    content,
    ...(data as { institution: string; degree: string; year: string; score: string; logo?: string; description: string }),
  }
}
