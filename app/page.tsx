import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ABOUT, EXPERIENCE, EDUCATION, SKILLS, ACHIEVEMENTS, CERTIFICATIONS, INTERESTS } from "@/lib/data"
import { Mail, Phone, Globe } from "lucide-react"

export default function Home() {
  return (
    <main className="container flex flex-col gap-8 py-8 md:py-12">
      <section className="flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-12">
        <Avatar className="h-32 w-32 border-2 border-border md:h-48 md:w-48">
          <AvatarImage src={ABOUT.avatar} alt={ABOUT.name} />
          <AvatarFallback className="text-4xl">{ABOUT.initials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-4 text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{ABOUT.name}</h1>
          <h2 className="text-2xl font-semibold text-muted-foreground">{ABOUT.title}</h2>
          <p className="max-w-2xl text-lg text-muted-foreground">{ABOUT.description}</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground md:justify-start">
            <a href={`tel:${ABOUT.contact.phone}`} className="flex items-center gap-2 hover:text-foreground transition-colors">
              <Phone className="h-4 w-4" />
              {ABOUT.contact.phone}
            </a>
            <a href={`mailto:${ABOUT.contact.email}`} className="flex items-center gap-2 hover:text-foreground transition-colors">
              <Mail className="h-4 w-4" />
              {ABOUT.contact.email}
            </a>
             <a href={ABOUT.contact.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors">
              <Globe className="h-4 w-4" />
              Portfolio
            </a>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-2xl font-bold tracking-tight border-b pb-2">Work Experience</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {EXPERIENCE.map((job, index) => (
            <Card key={index} className="flex flex-col justify-between hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{job.role}</CardTitle>
                    <p className="text-sm font-medium text-muted-foreground">{job.company}</p>
                  </div>
                  <Badge variant="secondary" className="whitespace-nowrap">{job.period}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{job.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-2xl font-bold tracking-tight border-b pb-2">Skills</h3>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Technical</h4>
            <div className="flex flex-wrap gap-2">
              {SKILLS.technical.map((skill) => (
                <Badge key={skill} variant="outline">{skill}</Badge>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Non-Technical</h4>
            <div className="flex flex-wrap gap-2">
              {SKILLS.nonTechnical.map((skill) => (
                <Badge key={skill} variant="secondary">{skill}</Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-2xl font-bold tracking-tight border-b pb-2">History</h3>
        <div className="grid gap-6 md:grid-cols-2">
           <div className="space-y-4">
            <h4 className="text-lg font-semibold">Education</h4>
            {EDUCATION.map((edu, index) => (
              <div key={index} className="flex flex-col gap-1 border-l-2 border-muted pl-4">
                <p className="font-semibold">{edu.degree}</p>
                <p className="text-sm text-muted-foreground">{edu.institution}, {edu.year}</p>
                 <p className="text-sm text-muted-foreground">{edu.score}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Achievements & Certifications</h4>
            <ul className="space-y-2 list-disc list-inside text-sm text-muted-foreground">
              {[...ACHIEVEMENTS, ...CERTIFICATIONS].slice(0, 6).map((item, i) => ( // limit to 6 to save space
                 <li key={i}>{item}</li>
              ))}
            </ul>
             <h4 className="text-lg font-semibold pt-4">Interests</h4>
             <ul className="space-y-2 list-disc list-inside text-sm text-muted-foreground">
              {INTERESTS.map((item, i) => (
                 <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
