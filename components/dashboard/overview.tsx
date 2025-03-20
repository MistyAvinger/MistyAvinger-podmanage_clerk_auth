import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function DashboardOverview() {
  // Get current date
  const currentDate = new Date()
  const currentMonth = currentDate.toLocaleString("default", { month: "long" })

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-card-hover">
      <CardHeader>
        <CardTitle className="text-podmanage-black dark:text-podmanage-dark-text">Podcast Overview</CardTitle>
        <CardDescription>Your podcast production status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Production Progress</span>
              <span className="text-sm font-medium">35%</span>
            </div>
            <Progress value={35} animated className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Episodes In Production</p>
              <div className="flex items-end gap-1">
                <p className="text-xl font-bold text-podmanage-black dark:text-podmanage-dark-text">2</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Awaiting Your Review</p>
              <p className="text-xl font-bold text-podmanage-black dark:text-podmanage-dark-text">1</p>
            </div>
          </div>

          <div className="rounded-md border border-podmanage-orange/20 bg-podmanage-orange/5 p-3 transition-all duration-300 hover:border-podmanage-orange/40">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-podmanage-black dark:text-podmanage-dark-text">Next Release</p>
                <p className="text-xs text-muted-foreground">
                  Episode 5 scheduled for{" "}
                  {new Date(currentDate.setDate(currentDate.getDate() + 5)).toLocaleDateString()}
                </p>
              </div>
              <div className="rounded-full bg-green-100 dark:bg-green-900 px-2 py-1 text-xs font-medium text-green-800 dark:text-green-100">
                On Track
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

