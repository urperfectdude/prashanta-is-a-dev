import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ABOUT, SKILLS, ACHIEVEMENTS, CERTIFICATIONS } from "@/lib/data"
import { getAllProjects } from "@/lib/projects"
import { getAllWorkExperience, calculateDuration } from "@/lib/experience"
import { getAllEducation } from "@/lib/education"
import { Mail, Globe, Github, Linkedin, Instagram } from "lucide-react"
import Link from "next/link"
import { CompanyLink } from "@/components/company-link"
import { ProjectCarousel } from "@/components/project-carousel"

const SKILL_CATEGORIES: { key: keyof typeof SKILLS; label: string }[] = [
  { key: "product", label: "Product" },
  { key: "analytics", label: "Analytics" },
  { key: "design", label: "Design" },
  { key: "technical", label: "Technical" },
]

export default function Home() {
  const projects = getAllProjects()
  const workExperience = getAllWorkExperience()
  const education = getAllEducation()

  return (
    <main className="space-y-12 animate-in fade-in duration-500">
      
      {/* Hero Section - Description Only */}
      <section className="space-y-4">
        <p className="text-muted-foreground text-base leading-relaxed max-w-2xl">
          {ABOUT.description} Here's{" "}
          <Link href="/blog/260401-more-about-me" className="text-foreground underline underline-offset-2 hover:text-primary transition-colors">
            more about me
          </Link>
        </p>
      </section>

      {/* Work Experience - List */}
      <section className="space-y-0">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider border-b pb-2">Work Experience</h3>
        <div className="flex flex-col gap-0">
            {workExperience.map((job, index) => {
                const isLast = index === workExperience.length - 1
                return (
                <Link key={job.slug} href={`/work/${job.slug}`} className="group block">
                    <div className={`flex flex-col gap-2 transition-colors hover:bg-muted/50 active:bg-muted/50 py-3 rounded-none px-2 -mx-2 border-white/5 ${!isLast ? 'border-b' : ''}`}>
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex flex-col min-w-0 gap-0.5">
                                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                                    {job.role}
                                </h4>
                                <div className="text-sm text-muted-foreground font-normal truncate">
                                    <span className="mr-1">at</span>
                                    <CompanyLink url={job.url} company={job.company} />
                                </div>
                            </div>
                            <div className="flex flex-col items-end shrink-0 gap-0.5">
                                 <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{job.period}</span>
                                 <span className="text-[10px] text-muted-foreground/60 whitespace-nowrap">{calculateDuration(job.period)}</span>
                            </div>
                        </div>
                    </div>
                </Link>
                )
            })}
        </div>
      </section>

      {/* Projects - Carousel */}
      <section className="space-y-6">
        <div className="flex items-baseline justify-between border-b pb-2">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Projects</h3>
            <Link href="/projects" className="text-sm text-muted-foreground/50 font-normal hover:text-foreground transition-colors">View all</Link>
        </div>
        <ProjectCarousel projects={projects} />
      </section>



      {/* History (Education & Achievements) */}
      <section className="space-y-8">
        <div className="space-y-0">
           <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider border-b pb-2">Education</h3>
            <div className="flex flex-col gap-0">
                {education.map((edu, index) => {
                    const isLast = index === education.length - 1
                    return (
                    <Link key={edu.slug} href={`/education/${edu.slug}`} className="group block">
                        <div className={`flex flex-col gap-2 transition-colors hover:bg-muted/50 active:bg-muted/50 py-3 rounded-none px-2 -mx-2 border-white/5 ${!isLast ? 'border-b' : ''}`}>
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex flex-col min-w-0 gap-0.5">
                                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                                        {edu.degree}
                                    </h4>
                                    <div className="text-sm text-muted-foreground font-normal truncate">
                                        at {edu.institution}
                                    </div>
                                </div>
                                <div className="flex flex-col items-end shrink-0 gap-0.5">
                                     <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{edu.year}</span>
                                     <span className="text-[10px] text-muted-foreground/60 whitespace-nowrap">{edu.score}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                    )
                })}
            </div>
        </div>

        <div className="space-y-6">
           <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider border-b pb-2">Achievements</h3>
           <ul className="space-y-3">
             {ACHIEVEMENTS.map((achievement, index) => (
               <li key={index} className="flex items-start text-muted-foreground">
                 <span className="mr-2 mt-1 shrink-0 text-yellow-500">🏆</span>
                 <span>{achievement}</span>
               </li>
             ))}
           </ul>
        </div>

        <div className="space-y-6">
           <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider border-b pb-2">Certifications</h3>
           <ul className="list-disc list-inside space-y-2 text-muted-foreground">
             {CERTIFICATIONS.map((cert, index) => (
               <li key={index}>{cert}</li>
             ))}
           </ul>
        </div>
      </section>

      <p className="text-center">
        <a href={ABOUT.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2 hover:text-primary transition-colors">
          connect on linkedin
        </a>
      </p>

      {/* Skills */}
      <section className="space-y-6">
        <div className="space-y-6">
          {SKILL_CATEGORIES.map(({ key, label }) => (
            <div key={key} className="group flex items-center gap-4">
               <h4 className="shrink-0 font-medium text-sm text-muted-foreground uppercase tracking-wider">{label}</h4>
               <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_1rem,black_calc(100%-1rem),transparent)]">
                 <div className="flex w-max gap-2 motion-safe:animate-marquee group-hover:[animation-play-state:paused]">
                   {[...SKILLS[key], ...SKILLS[key]].map((skill, i) => (
                     <Badge key={`${skill}-${i}`} variant="outline" className="shrink-0 font-normal text-muted-foreground hover:text-foreground transition-colors hover:border-primary/50">
                       {skill}
                     </Badge>
                   ))}
                 </div>
               </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  )
}
