import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { InfoIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface EpisodeUsageTrackerProps {
  usedEpisodes: number
  totalEpisodes: number
  nextCycleDate: string
}

export function EpisodeUsageTracker({
  usedEpisodes = 2,
  totalEpisodes = 3,
  nextCycleDate = "June 1, 2025",
}: EpisodeUsageTrackerProps) {
  // Calculate percentage for progress bar
  const percentage = (usedEpisodes / totalEpisodes) * 100

  // Determine color based on usage
  const getColorClass = () => {
    if (usedEpisodes <= 1) return "bg-green-500" // Plenty left
    if (usedEpisodes === 2) return "bg-yellow-500" // Approaching limit
    return "bg-red-500" // Maxed out
  }

  // Determine message based on usage
  const getMessage = () => {
    if (usedEpisodes < totalEpisodes) {
      return `You have ${totalEpisodes - usedEpisodes} episode${totalEpisodes - usedEpisodes !== 1 ? "s" : ""} remaining this month.`
    }
    return `You've used all your uploads for this month! Next cycle begins on ${nextCycleDate}.`
  }

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-card-hover">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-podmanage-black dark:text-podmanage-dark-text">Monthly Episode Usage</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Your subscription allows {totalEpisodes} episode uploads per month</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription>Track your monthly episode uploads</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {usedEpisodes}/{totalEpisodes} Episodes Used
              </span>
              <span
                className={`text-sm font-medium ${
                  usedEpisodes === totalEpisodes
                    ? "text-red-500"
                    : usedEpisodes === totalEpisodes - 1
                      ? "text-yellow-500"
                      : "text-green-500"
                }`}
              >
                {totalEpisodes - usedEpisodes} Remaining
              </span>
            </div>
            <Progress value={percentage} className={`h-2 ${getColorClass()}`} animated={usedEpisodes < totalEpisodes} />
          </div>

          <div
            className={`rounded-md p-3 text-sm ${
              usedEpisodes === totalEpisodes
                ? "bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-300"
                : usedEpisodes === totalEpisodes - 1
                  ? "bg-yellow-500/10 border border-yellow-500/20 text-yellow-700 dark:text-yellow-300"
                  : "bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-300"
            }`}
          >
            {getMessage()}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

