import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ProjectsOverview() {
  const projects = [
    { id: 1, name: "Tech Talk", progress: 75, episodes: 5 },
    { id: 2, name: "Health & Wellness", progress: 45, episodes: 3 },
    { id: 3, name: "Business Insights", progress: 90, episodes: 8 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects Overview</CardTitle>
        <CardDescription>Active podcast projects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{project.name}</span>
                <span className="text-sm font-medium">{project.progress}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-full rounded-full bg-[#FF6600]" style={{ width: `${project.progress}%` }} />
              </div>
              <div className="text-xs text-muted-foreground">{project.episodes} episodes</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

