"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Users, Clock, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ProjectsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock projects data with more production-focused details
  const projects = [
    {
      id: 1,
      name: "Tech Talk",
      owner: "John Doe",
      email: "john.doe@example.com",
      members: 3,
      episodes: [
        {
          id: 101,
          title: "The Future of AI",
          status: "raw_uploaded",
        },
        {
          id: 102,
          title: "Blockchain Explained",
          status: "editing_in_progress",
        },
      ],
      status: "active",
      lastUpdated: "2 days ago",
      nextRelease: "Tomorrow",
      unreadMessages: 2,
      description: "A podcast about emerging technologies and their impact on society",
      coverArt: "/placeholder.svg?height=300&width=300",
      pendingTasks: 3,
    },
    {
      id: 2,
      name: "Health & Wellness",
      owner: "Jane Smith",
      email: "jane.smith@example.com",
      members: 2,
      episodes: [
        {
          id: 201,
          title: "Nutrition Myths Debunked",
          status: "ready_for_approval",
        },
      ],
      status: "active",
      lastUpdated: "1 week ago",
      nextRelease: "In 3 days",
      unreadMessages: 0,
      description: "A podcast focused on health tips, nutrition, and wellness practices",
      coverArt: "/placeholder.svg?height=300&width=300",
      pendingTasks: 1,
    },
    {
      id: 3,
      name: "Business Insights",
      owner: "Robert Johnson",
      email: "robert.johnson@example.com",
      members: 4,
      episodes: [
        {
          id: 301,
          title: "Startup Funding Strategies",
          status: "approved",
        },
        {
          id: 302,
          title: "Leadership in Crisis",
          status: "raw_uploaded",
        },
      ],
      status: "active",
      lastUpdated: "Yesterday",
      nextRelease: "Today",
      unreadMessages: 3,
      description: "A podcast featuring interviews with business leaders and entrepreneurs",
      coverArt: "/placeholder.svg?height=300&width=300",
      pendingTasks: 4,
    },
    {
      id: 4,
      name: "Creative Writing",
      owner: "Emily Wilson",
      email: "emily.wilson@example.com",
      members: 1,
      episodes: [],
      status: "paused",
      lastUpdated: "3 weeks ago",
      nextRelease: "N/A",
      unreadMessages: 0,
      description: "A podcast about creative writing techniques and author interviews",
      coverArt: "/placeholder.svg?height=300&width=300",
      pendingTasks: 0,
    },
    {
      id: 5,
      name: "Science Explained",
      owner: "Michael Brown",
      email: "michael.brown@example.com",
      members: 2,
      episodes: [
        {
          id: 501,
          title: "The Mystery of Black Holes",
          status: "editing_in_progress",
        },
      ],
      status: "active",
      lastUpdated: "4 days ago",
      nextRelease: "In 5 days",
      unreadMessages: 1,
      description: "A podcast that breaks down complex scientific concepts for general audiences",
      coverArt: "/placeholder.svg?height=300&width=300",
      pendingTasks: 2,
    },
  ]

  // Filter projects based on search query and active tab
  const filteredProjects = projects
    .filter(
      (project) =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.owner.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((project) => {
      if (activeTab === "all") return true
      if (activeTab === "active") return project.status === "active"
      if (activeTab === "paused") return project.status === "paused"
      if (activeTab === "needs_attention") {
        return project.episodes.some((ep) => ep.status === "raw_uploaded" || ep.status === "ready_for_approval")
      }
      return true
    })

  // Status badge component for projects
  const ProjectStatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "paused":
        return <Badge className="bg-yellow-500">Paused</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const handleCreateProject = () => {
    toast({
      title: "Create Project",
      description: "This would open a form to create a new project.",
    })
  }

  const handleViewProject = (projectId: number) => {
    router.push(`/admin/projects/${projectId}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button className="bg-podmanage-orange hover:bg-podmanage-orange/90" onClick={handleCreateProject}>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="needs_attention">Needs Attention</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="paused">Paused</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Podcast Projects</CardTitle>
          <CardDescription>View and manage all podcast projects on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredProjects.length > 0 ? (
            <div className="space-y-4">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-lg border p-4 hover:border-podmanage-orange/50 transition-colors cursor-pointer"
                  onClick={() => handleViewProject(project.id)}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="md:w-1/4">
                      <div className="font-medium text-lg">{project.name}</div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Users className="mr-1 h-3 w-3" />
                          {project.members} members
                        </div>
                        <div>{project.episodes.length} episodes</div>
                      </div>
                    </div>
                    <div className="md:w-1/4">
                      <div className="text-sm font-medium">Owner</div>
                      <div className="text-sm">{project.owner}</div>
                    </div>
                    <div className="md:w-1/4">
                      <div className="flex items-center gap-2">
                        <ProjectStatusBadge status={project.status} />
                        {project.episodes.some((ep) => ep.status === "raw_uploaded") && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            <Upload className="mr-1 h-3 w-3" />
                            New Upload
                          </Badge>
                        )}
                        {project.episodes.some((ep) => ep.status === "ready_for_approval") && (
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                            <Clock className="mr-1 h-3 w-3" />
                            Awaiting Approval
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm mt-1">Next release: {project.nextRelease}</div>
                    </div>
                    <div className="md:w-1/4 flex justify-end">
                      <Button variant="outline" size="sm" onClick={() => handleViewProject(project.id)}>
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
              <p className="text-muted-foreground">No projects found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

