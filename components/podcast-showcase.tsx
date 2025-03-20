"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { useMediaQuery } from "@/hooks/use-media-query"

interface Podcast {
  id: number
  name: string
  host: string
  description: string
  coverArt: string
  category: string
  platforms: { name: string; url: string; icon: string }[]
  featured: boolean
  episodes: number
  publishDate: string
}

// Mock podcast data - in a real app, this would come from your API
const mockPodcasts: Podcast[] = [
  {
    id: 1,
    name: "Tech Insights",
    host: "Sarah Johnson",
    description: "Exploring the latest in technology and its impact on our daily lives.",
    coverArt: "/placeholder.svg?height=400&width=400&text=Tech+Insights",
    category: "Technology",
    platforms: [
      { name: "Spotify", url: "#", icon: "spotify" },
      { name: "Apple Podcasts", url: "#", icon: "apple" },
      { name: "Google Podcasts", url: "#", icon: "google" },
    ],
    featured: true,
    episodes: 12,
    publishDate: "2023-01-15",
  },
  {
    id: 2,
    name: "Health Matters",
    host: "Dr. Michael Chen",
    description: "A deep dive into health topics, wellness practices, and medical breakthroughs.",
    coverArt: "/placeholder.svg?height=400&width=400&text=Health+Matters",
    category: "Health & Wellness",
    platforms: [
      { name: "Spotify", url: "#", icon: "spotify" },
      { name: "Apple Podcasts", url: "#", icon: "apple" },
    ],
    featured: true,
    episodes: 24,
    publishDate: "2022-11-05",
  },
  {
    id: 3,
    name: "Business Leaders",
    host: "Alex Morgan",
    description: "Interviews with top business leaders sharing insights on success and innovation.",
    coverArt: "/placeholder.svg?height=400&width=400&text=Business+Leaders",
    category: "Business",
    platforms: [
      { name: "Spotify", url: "#", icon: "spotify" },
      { name: "Apple Podcasts", url: "#", icon: "apple" },
      { name: "Google Podcasts", url: "#", icon: "google" },
    ],
    featured: true,
    episodes: 18,
    publishDate: "2023-02-20",
  },
  {
    id: 4,
    name: "Creative Minds",
    host: "Jessica Lee",
    description: "Exploring creativity across various fields from art to entrepreneurship.",
    coverArt: "/placeholder.svg?height=400&width=400&text=Creative+Minds",
    category: "Arts",
    platforms: [
      { name: "Spotify", url: "#", icon: "spotify" },
      { name: "Apple Podcasts", url: "#", icon: "apple" },
    ],
    featured: false,
    episodes: 9,
    publishDate: "2023-03-10",
  },
  {
    id: 5,
    name: "Science Today",
    host: "Dr. Robert Williams",
    description: "Breaking down complex scientific concepts and recent discoveries.",
    coverArt: "/placeholder.svg?height=400&width=400&text=Science+Today",
    category: "Science",
    platforms: [
      { name: "Spotify", url: "#", icon: "spotify" },
      { name: "Apple Podcasts", url: "#", icon: "apple" },
      { name: "Google Podcasts", url: "#", icon: "google" },
    ],
    featured: false,
    episodes: 15,
    publishDate: "2023-01-25",
  },
  {
    id: 6,
    name: "History Uncovered",
    host: "Thomas Brown",
    description: "Revealing fascinating stories from history that you might not know about.",
    coverArt: "/placeholder.svg?height=400&width=400&text=History+Uncovered",
    category: "History",
    platforms: [
      { name: "Spotify", url: "#", icon: "spotify" },
      { name: "Apple Podcasts", url: "#", icon: "apple" },
    ],
    featured: false,
    episodes: 20,
    publishDate: "2022-12-15",
  },
]

// Platform icon component
const PlatformIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case "spotify":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
            fill="#1ED760"
          />
          <path
            d="M16.7917 16.5833C16.625 16.5833 16.4583 16.5417 16.2917 16.4167C14.9583 15.625 13.5 15.2083 11.9167 15.2083C10.5833 15.2083 9.25 15.4583 8 15.9583C7.75 16.0417 7.5 16.0833 7.25 16.0833C6.58333 16.0833 6 15.5 6 14.8333C6 14.375 6.25 13.9583 6.66667 13.7917C8.25 13.125 10 12.7917 11.9167 12.7917C13.9167 12.7917 15.7917 13.2917 17.5 14.2917C17.9167 14.5417 18.1667 14.9583 18.1667 15.4167C18.1667 16.0833 17.5833 16.5833 16.7917 16.5833ZM17.9167 12.9167C17.75 12.9167 17.5833 12.875 17.4167 12.7917C15.8333 11.875 13.9167 11.375 11.9167 11.375C10.3333 11.375 8.83333 11.6667 7.41667 12.25C7.16667 12.3333 6.91667 12.4167 6.66667 12.4167C5.83333 12.4167 5.16667 11.75 5.16667 10.9167C5.16667 10.375 5.5 9.91667 6 9.66667C7.75 8.91667 9.75 8.5 11.9167 8.5C14.3333 8.5 16.6667 9.08333 18.6667 10.25C19.1667 10.5 19.5 11 19.5 11.5833C19.5 12.3333 18.8333 12.9167 17.9167 12.9167ZM19.0833 9.25C18.9167 9.25 18.75 9.20833 18.5833 9.125C16.75 8.125 14.4167 7.58333 11.9167 7.58333C10.0833 7.58333 8.33333 7.875 6.66667 8.45833C6.41667 8.54167 6.16667 8.58333 5.91667 8.58333C4.91667 8.58333 4.08333 7.75 4.08333 6.75C4.08333 6.08333 4.5 5.5 5.08333 5.25C7.08333 4.5 9.41667 4.16667 11.8333 4.16667C14.8333 4.16667 17.6667 4.83333 20 6.08333C20.5833 6.33333 21 6.91667 21 7.58333C21 8.5 20.1667 9.25 19.0833 9.25Z"
            fill="white"
          />
        </svg>
      )
    case "apple":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
            fill="#B150E2"
          />
          <path
            d="M16.7917 16.5833C16.625 16.5833 16.4583 16.5417 16.2917 16.4167C14.9583 15.625 13.5 15.2083 11.9167 15.2083C10.5833 15.2083 9.25 15.4583 8 15.9583C7.75 16.0417 7.5 16.0833 7.25 16.0833C6.58333 16.0833 6 15.5 6 14.8333C6 14.375 6.25 13.9583 6.66667 13.7917C8.25 13.125 10 12.7917 11.9167 12.7917C13.9167 12.7917 15.7917 13.2917 17.5 14.2917C17.9167 14.5417 18.1667 14.9583 18.1667 15.4167C18.1667 16.0833 17.5833 16.5833 16.7917 16.5833ZM17.9167 12.9167C17.75 12.9167 17.5833 12.875 17.4167 12.7917C15.8333 11.875 13.9167 11.375 11.9167 11.375C10.3333 11.375 8.83333 11.6667 7.41667 12.25C7.16667 12.3333 6.91667 12.4167 6.66667 12.4167C5.83333 12.4167 5.16667 11.75 5.16667 10.9167C5.16667 10.375 5.5 9.91667 6 9.66667C7.75 8.91667 9.75 8.5 11.9167 8.5C14.3333 8.5 16.6667 9.08333 18.6667 10.25C19.1667 10.5 19.5 11 19.5 11.5833C19.5 12.3333 18.8333 12.9167 17.9167 12.9167ZM19.0833 9.25C18.9167 9.25 18.75 9.20833 18.5833 9.125C16.75 8.125 14.4167 7.58333 11.9167 7.58333C10.0833 7.58333 8.33333 7.875 6.66667 8.45833C6.41667 8.54167 6.16667 8.58333 5.91667 8.58333C4.91667 8.58333 4.08333 7.75 4.08333 6.75C4.08333 6.08333 4.5 5.5 5.08333 5.25C7.08333 4.5 9.41667 4.16667 11.8333 4.16667C14.8333 4.16667 17.6667 4.83333 20 6.08333C20.5833 6.33333 21 6.91667 21 7.58333C21 8.5 20.1667 9.25 19.0833 9.25Z"
            fill="white"
          />
        </svg>
      )
    case "google":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
            fill="#4285F4"
          />
          <path
            d="M16.7917 16.5833C16.625 16.5833 16.4583 16.5417 16.2917 16.4167C14.9583 15.625 13.5 15.2083 11.9167 15.2083C10.5833 15.2083 9.25 15.4583 8 15.9583C7.75 16.0417 7.5 16.0833 7.25 16.0833C6.58333 16.0833 6 15.5 6 14.8333C6 14.375 6.25 13.9583 6.66667 13.7917C8.25 13.125 10 12.7917 11.9167 12.7917C13.9167 12.7917 15.7917 13.2917 17.5 14.2917C17.9167 14.5417 18.1667 14.9583 18.1667 15.4167C18.1667 16.0833 17.5833 16.5833 16.7917 16.5833ZM17.9167 12.9167C17.75 12.9167 17.5833 12.875 17.4167 12.7917C15.8333 11.875 13.9167 11.375 11.9167 11.375C10.3333 11.375 8.83333 11.6667 7.41667 12.25C7.16667 12.3333 6.91667 12.4167 6.66667 12.4167C5.83333 12.4167 5.16667 11.75 5.16667 10.9167C5.16667 10.375 5.5 9.91667 6 9.66667C7.75 8.91667 9.75 8.5 11.9167 8.5C14.3333 8.5 16.6667 9.08333 18.6667 10.25C19.1667 10.5 19.5 11 19.5 11.5833C19.5 12.3333 18.8333 12.9167 17.9167 12.9167ZM19.0833 9.25C18.9167 9.25 18.75 9.20833 18.5833 9.125C16.75 8.125 14.4167 7.58333 11.9167 7.58333C10.0833 7.58333 8.33333 7.875 6.66667 8.45833C6.41667 8.54167 6.16667 8.58333 5.91667 8.58333C4.91667 8.58333 4.08333 7.75 4.08333 6.75C4.08333 6.08333 4.5 5.5 5.08333 5.25C7.08333 4.5 9.41667 4.16667 11.8333 4.16667C14.8333 4.16667 17.6667 4.83333 20 6.08333C20.5833 6.33333 21 6.91667 21 7.58333C21 8.5 20.1667 9.25 19.0833 9.25Z"
            fill="white"
          />
        </svg>
      )
    default:
      return null
  }
}

interface PodcastShowcaseProps {
  featured?: boolean
  limit?: number
}

export function PodcastShowcase({ featured, limit }: PodcastShowcaseProps) {
  const [podcasts, setPodcasts] = React.useState<Podcast[]>([])
  const isDesktop = useMediaQuery("(min-width: 768px)")

  React.useEffect(() => {
    let filteredPodcasts = [...mockPodcasts]

    if (featured) {
      filteredPodcasts = filteredPodcasts.filter((podcast) => podcast.featured)
    }

    if (limit) {
      filteredPodcasts = filteredPodcasts.slice(0, limit)
    }

    setPodcasts(filteredPodcasts)
  }, [featured, limit])

  const PodcastDetails = ({ podcast }: { podcast: Podcast }) => (
    <div className="flex flex-col space-y-4">
      <div className="relative w-full aspect-video rounded-md overflow-hidden">
        <Image
          src={podcast.coverArt || "/placeholder.svg"}
          alt={`${podcast.name} Cover Art`}
          fill
          className="object-cover"
        />
      </div>
      <p className="text-muted-foreground">{podcast.description}</p>
      <div>
        <h4 className="text-sm font-medium">Where to Listen:</h4>
        <div className="flex items-center gap-2 mt-2">
          {podcast.platforms.map((platform) => (
            <Link key={platform.name} href={platform.url} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon">
                <PlatformIcon platform={platform.icon} />
                <span className="sr-only">{platform.name}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )

  const PodcastModal = ({ podcast }: { podcast: Podcast }) => {
    return isDesktop ? (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Learn More</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{podcast.name}</DialogTitle>
          </DialogHeader>
          <PodcastDetails podcast={podcast} />
        </DialogContent>
      </Dialog>
    ) : (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Learn More</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{podcast.name}</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-4">
            <PodcastDetails podcast={podcast} />
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {podcasts.map((podcast) => (
        <Card
          key={podcast.id}
          className="group transition-all duration-300 hover:scale-[1.02] hover:border-orange-500/50 hover:shadow-[0_0_15px_rgba(249,115,22,0.2)]"
        >
          <CardContent className="flex flex-col space-y-4 p-4">
            <div className="relative w-full aspect-square rounded-md overflow-hidden">
              <Image
                src={podcast.coverArt || "/placeholder.svg"}
                alt={`${podcast.name} Cover Art`}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-podmanage-black dark:text-podmanage-dark-text group-hover:text-orange-500 transition-colors">
              {podcast.name}
            </h3>
            <p className="text-muted-foreground line-clamp-2">{podcast.description}</p>
            <div className="flex items-center justify-between">
              <Badge className="bg-secondary text-secondary-foreground group-hover:bg-orange-500/10 group-hover:text-orange-500 transition-colors">
                {podcast.category}
              </Badge>
              <PodcastModal podcast={podcast} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

