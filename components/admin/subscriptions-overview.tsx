import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function SubscriptionsOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscriptions</CardTitle>
        <CardDescription>Active and pending subscriptions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Active Users</p>
              <p className="text-2xl font-bold">24</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Monthly Revenue</p>
              <p className="text-2xl font-bold">$1,200</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Payment Issues</span>
              <span className="text-sm font-medium text-red-500">3</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">New Subscribers</span>
              <span className="text-sm font-medium text-green-500">+5</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Churn Rate</span>
              <span className="text-sm font-medium">2.4%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

