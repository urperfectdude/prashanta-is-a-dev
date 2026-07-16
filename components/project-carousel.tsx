"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Card, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/lib/projects"

interface ProjectCarouselProps {
  projects: Project[]
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setSelectedIndex(api.selectedScrollSnap())

    const onSelect = () => setSelectedIndex(api.selectedScrollSnap())
    api.on("select", onSelect)

    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  return (
    <Carousel className="w-full" opts={{ loop: true, align: "center" }} setApi={setApi}>
      <CarouselContent>
        {projects.map((project, index) => {
          const isActive = index === selectedIndex

          const cardContent = (
            <Card
              className={`h-full overflow-hidden border-none bg-zinc-900 flex flex-col transition-all duration-300 ease-out ${
                isActive
                  ? "opacity-100 scale-100 hover:bg-zinc-800/80"
                  : "opacity-45 scale-[0.94] hover:opacity-70 cursor-pointer"
              }`}
            >
              <div className="relative h-32 sm:h-36 md:h-40 w-full shrink-0 overflow-hidden bg-muted/20">
                {project.image?.startsWith("/projects/") ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900" />
                    <span className="relative text-xs text-muted-foreground font-medium">Image</span>
                  </>
                )}
              </div>
              <div className="flex flex-col gap-1.5 p-4">
                <CardTitle className="text-base md:text-lg leading-snug line-clamp-1 group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-xs md:text-sm line-clamp-2 text-muted-foreground/80">
                  {project.description}
                </CardDescription>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs font-normal bg-zinc-800 text-zinc-300">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          )

          return (
            <CarouselItem key={project.slug} className="basis-[84%] md:basis-[62%] pl-2 md:pl-4">
              {isActive ? (
                <Link href={`/projects/${project.slug}`} className="group block h-full">
                  {cardContent}
                </Link>
              ) : (
                <div
                  className="group block h-full"
                  onClick={() => api?.scrollTo(index)}
                >
                  {cardContent}
                </div>
              )}
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <CarouselPrevious className="left-4 md:-left-12 hover:bg-zinc-800 hover:text-white border-zinc-700 bg-zinc-900/50 backdrop-blur-sm" />
      <CarouselNext className="right-4 md:-right-12 hover:bg-zinc-800 hover:text-white border-zinc-700 bg-zinc-900/50 backdrop-blur-sm" />
    </Carousel>
  )
}
