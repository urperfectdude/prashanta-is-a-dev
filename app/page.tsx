import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ABOUT, SKILLS, ACHIEVEMENTS, CERTIFICATIONS, INTERESTS } from "@/lib/data"
import { getAllProjects } from "@/lib/projects"
import { getAllWorkExperience, calculateDuration } from "@/lib/experience"
import { getAllEducation } from "@/lib/education"
import { Mail, Globe, Github, Linkedin, Instagram, ChevronRight } from "lucide-react"
import Link from "next/link"
import { CompanyLink } from "@/components/company-link"

export default function Home() {
  const projects = getAllProjects()
  const workExperience = getAllWorkExperience()
  const education = getAllEducation()

  return (
    <main className="space-y-16 animate-in fade-in duration-500">
      
      {/* Hero Section - Description Only */}
      <section className="space-y-4">
        <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
          {ABOUT.description}
        </p>
        <p className="text-muted-foreground leading-snug max-w-2xl">
          If you want to know more about me, here are{" "}
          <Link href="/blog/260401-somethings-i-believe-in" className="text-foreground underline underline-offset-2 hover:text-primary transition-colors">
            somethings I believe in
          </Link>
          .
        </p>
      </section>

      {/* Work Experience - List */}
      <section className="space-y-6 -mt-8">
        <h3 className="text-xl font-semibold tracking-tight border-b pb-2">Work Experience</h3>
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
                        <div className="flex items-center justify-between gap-5">
                            <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                                {job.description}
                            </p>
                            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-primary transition-colors group-hover:translate-x-1 duration-200 shrink-0" />
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
            <h3 className="text-xl font-semibold tracking-tight">Projects</h3>
            <Link href="/projects" className="text-sm text-muted-foreground/50 font-normal hover:text-foreground transition-colors">View all</Link>
        </div>
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            {projects.map((project, index) => (
              <CarouselItem key={index} className="basis-full">
                <Link href={`/projects/${project.slug}`}>
                  <Card className="h-full hover:bg-zinc-800/80 transition-colors cursor-pointer group bg-zinc-900 border-none overflow-hidden relative">
                    <div className="flex flex-col md:flex-row h-full">
                       {/* Left Image Section */}
                       <div className="w-full md:w-48 h-48 md:h-auto bg-muted/20 shrink-0 relative flex items-center justify-center">
                          {/* Placeholder Image Logic */}
                          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900" />
                          <span className="relative text-xs text-muted-foreground font-medium">Image</span>
                       </div>
                       
                       {/* Right Content Section */}
                       <div className="flex flex-col justify-between p-6 w-full">
                          <div className="space-y-2">
                             <CardTitle className="group-hover:text-primary transition-colors text-xl">{project.title}</CardTitle>
                             <CardDescription className="line-clamp-2 text-muted-foreground/80 leading-relaxed">
                               {project.description}
                             </CardDescription>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {project.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs font-normal bg-zinc-800 text-zinc-300 hover:bg-zinc-700">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                       </div>
                    </div>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 md:-left-12 hover:bg-zinc-800 hover:text-white border-zinc-700 bg-zinc-900/50 backdrop-blur-sm" />
          <CarouselNext className="right-4 md:-right-12 hover:bg-zinc-800 hover:text-white border-zinc-700 bg-zinc-900/50 backdrop-blur-sm" />
        </Carousel>
      </section>



      {/* History (Education & Achievements) */}
      <section className="space-y-12">
        <div className="space-y-6">
           <h3 className="text-xl font-semibold tracking-tight border-b pb-2">Education</h3>
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
                            <div className="flex items-center justify-between gap-5">
                                <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                                    {edu.description}
                                </p>
                                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-primary transition-colors group-hover:translate-x-1 duration-200 shrink-0" />
                            </div>
                        </div>
                    </Link>
                    )
                })}
            </div>
        </div>

        <div className="space-y-6">
           <h3 className="text-xl font-semibold tracking-tight border-b pb-2">Achievements</h3>
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
           <h3 className="text-xl font-semibold tracking-tight border-b pb-2">Certifications</h3>
           <ul className="list-disc list-inside space-y-2 text-muted-foreground">
             {CERTIFICATIONS.map((cert, index) => (
               <li key={index}>{cert}</li>
             ))}
           </ul>
        </div>

        <div className="space-y-6">
           <h3 className="text-xl font-semibold tracking-tight border-b pb-2">Interests</h3>
           <ul className="list-disc list-inside space-y-2 text-muted-foreground">
             {INTERESTS.map((interest, index) => (
               <li key={index}>{interest}</li>
             ))}
           </ul>
        </div>
      </section>

      {/* Skills */}
      <section className="space-y-6">
        <div className="space-y-6">
          <div className="space-y-3">
             <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Technical</h4>
             <div className="flex flex-wrap gap-2">
               {SKILLS.technical.map((skill) => (
                 <Badge key={skill} variant="outline" className="font-normal text-muted-foreground hover:text-foreground transition-colors hover:border-primary/50">
                   {skill}
                 </Badge>
               ))}
             </div>
          </div>
          <div className="space-y-3">
             <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Non-Technical</h4>
             <div className="flex flex-wrap gap-2">
               {SKILLS.nonTechnical.map((skill) => (
                 <Badge key={skill} variant="outline" className="font-normal text-muted-foreground hover:text-foreground transition-colors hover:border-primary/50">
                   {skill}
                 </Badge>
               ))}
             </div>
          </div>
        </div>
      </section>

    </main>
  )
}
