import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const workDirectory = path.join(process.cwd(), 'content/work')

export type WorkExperience = {
  slug: string
  company: string
  role: string
  period: string
  description: string
  logo?: string
  url?: string
  content: string
}

export function getAllWorkExperience(): WorkExperience[] {
  if (!fs.existsSync(workDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(workDirectory)
  const allWorkData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(workDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      content,
      ...(data as { company: string; role: string; period: string; description: string; logo?: string; url?: string }),
    }
  })

  return allWorkData.sort((a, b) => {
      // Custom sort: Enviu (Present) -> Driveo (2025) -> YourERPCoach (2024)
      if (a.period.includes('Present')) return -1;
      if (b.period.includes('Present')) return 1;
      return 0; 
  })
}

export function getWorkExperienceData(slug: string): WorkExperience | null {
  const fullPath = path.join(workDirectory, `${slug}.md`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    content,
    ...(data as { company: string; role: string; period: string; description: string; logo?: string; url?: string }),
  }
}

export function calculateDuration(period: string): string {
    // Expected format: "MMM'YY - MMM'YY" or "MMM'YY - Present"
    // Example: "Oct'25 - Present", "Sep'24 - Oct'25"
    
    try {
        const [startStr, endStr] = period.split(' - ').map(s => s.trim())
        
        if (!startStr || !endStr) return ""

        const parseDate = (dateStr: string) => {
            if (dateStr.toLowerCase() === 'present') return new Date()
            
            // Handle format MMM'YY (e.g., Oct'25)
            const parts = dateStr.split("'")
            if (parts.length !== 2) return null
            
            const monthStr = parts[0]
            const yearStr = "20" + parts[1]
            
            const month = new Date(Date.parse(monthStr + " 1, 2000")).getMonth()
            const year = parseInt(yearStr)
            
            return new Date(year, month, 1)
        }

        const startDate = parseDate(startStr)
        const endDate = parseDate(endStr)

        if (!startDate || !endDate) return ""

        // Calculate difference in months
        let months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth())
        
        // Add 1 month to include the partial month (inclusive range)
        months += 1

        if (months < 0) return ""

        const years = Math.floor(months / 12)
        const remainingMonths = months % 12

        const yearText = years > 0 ? `${years} yr${years > 1 ? 's' : ''}` : ''
        const monthText = remainingMonths > 0 ? `${remainingMonths} mo${remainingMonths > 1 ? 's' : ''}` : ''

        if (yearText && monthText) return `${yearText} ${monthText}`
        if (yearText) return yearText
        if (monthText) return monthText
        return "0 mos"
        
    } catch (e) {
        return ""
    }
}
