"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, CreditCard, AlertCircle, CheckCircle, MailCheck, XCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

export default function SubscriptionsPage() {
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const paymentId = searchParams.get("paymentId")

  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [subscriptions, setSubscriptions] = useState([
    {
      id: 1,
      user: "John Doe",
      email: "john.doe@example.com",
      plan: "Monthly",
      status: "active",
      nextBilling: "Jun 15, 2023",
      amount: "$149.00",
      startDate: "Jan 15, 2023",
      paymentId: "PM-12345",
    },
    {
      id: 2,
      user: "Jane Smith",
      email: "jane.smith@example.com",
      plan: "Monthly",
      status: "active",
      nextBilling: "Jun 20, 2023",
      amount: "$149.00",
      startDate: "Feb 20, 2023",
      paymentId: "PM-23456",
    },
    {
      id: 3,
      user: "Robert Johnson",
      email: "robert.johnson@example.com",
      plan: "Annual",
      status: "active",
      nextBilling: "Dec 10, 2023",
      amount: "$1,490.00",
      startDate: "Dec 10, 2022",
      paymentId: "PM-34567",
    },
    {
      id: 4,
      user: "Emily Wilson",
      email: "emily.wilson@example.com",
      plan: "Monthly",
      status: "payment_issue",
      nextBilling: "Jun 5, 2023",
      amount: "$149.00",
      startDate: "Mar 5, 2023",
      paymentId: "PM-45678",
      paymentFailureReason: "Card expired",
      lastAttempt: "Jun 5, 2023",
      retryCount: 2,
    },
    {
      id: 5,
      user: "Michael Brown",
      email: "michael.brown@example.com",
      plan: "Monthly",
      status: "cancelled",
      nextBilling: "N/A",
      amount: "$149.00",
      startDate: "Apr 12, 2023",
      endDate: "May 12, 2023",
      paymentId: "PM-56789",
      cancellationReason: "No longer needed",
    },
  ])

  const [selectedSubscription, setSelectedSubscription] = useState<any>(null)
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [reminderDialogOpen, setReminderDialogOpen] = useState(false)
  const [cancellationReason, setCancellationReason] = useState("")
  const [reminderMessage, setReminderMessage] = useState("")
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [highlightedSubscription, setHighlightedSubscription] = useState<number | null>(null)

  // Highlight subscription if paymentId is provided in URL
  useEffect(() => {
    if (paymentId) {
      const subscription = subscriptions.find((sub) => sub.paymentId === paymentId)
      if (subscription) {
        setSelectedSubscription(subscription)
        setDetailsOpen(true)
        setHighlightedSubscription(subscription.id)

        // Remove highlight after 3 seconds
        const timer = setTimeout(() => {
          setHighlightedSubscription(null)
        }, 3000)

        return () => clearTimeout(timer)
      }
    }
  }, [paymentId, subscriptions])

  // Filter subscriptions based on search query and active tab
  const filteredSubscriptions = subscriptions
    .filter(
      (subscription) =>
        subscription.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subscription.email.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((subscription) => {
      if (activeTab === "all") return true
      if (activeTab === "active") return subscription.status === "active"
      if (activeTab === "payment_issue") return subscription.status === "payment_issue"
      if (activeTab === "cancelled") return subscription.status === "cancelled"
      return true
    })

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "active":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
          >
            <CheckCircle className="mr-1 h-3 w-3" />
            Active
          </Badge>
        )
      case "payment_issue":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800"
          >
            <AlertCircle className="mr-1 h-3 w-3" />
            Payment Issue
          </Badge>
        )
      case "cancelled":
        return (
          <Badge
            variant="outline"
            className="bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
          >
            <XCircle className="mr-1 h-3 w-3" />
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleCancelSubscription = () => {
    if (!selectedSubscription) return

    // Update subscription status
    const updatedSubscriptions = subscriptions.map((sub) => {
      if (sub.id === selectedSubscription.id) {
        return {
          ...sub,
          status: "cancelled",
          nextBilling: "N/A",
          endDate: new Date().toISOString().split("T")[0],
          cancellationReason: cancellationReason || "Cancelled by admin",
        }
      }
      return sub
    })

    setSubscriptions(updatedSubscriptions)
    setCancelDialogOpen(false)
    setCancellationReason("")

    toast({
      title: "Subscription Cancelled",
      description: `${selectedSubscription.user}'s subscription has been cancelled.`,
    })

    // Close details dialog if open
    setDetailsOpen(false)
  }

  const handleSendPaymentReminder = () => {
    if (!selectedSubscription) return

    toast({
      title: "Payment Reminder Sent",
      description: `Payment reminder sent to ${selectedSubscription.user}.`,
    })

    setReminderDialogOpen(false)
    setReminderMessage("")
  }

  const handleReactivateSubscription = (subscriptionId: number) => {
    // Update subscription status
    const updatedSubscriptions = subscriptions.map((sub) => {
      if (sub.id === subscriptionId) {
        return {
          ...sub,
          status: "active",
          nextBilling: getNextBillingDate(),
          endDate: undefined,
          cancellationReason: undefined,
        }
      }
      return sub
    })

    setSubscriptions(updatedSubscriptions)

    toast({
      title: "Subscription Reactivated",
      description: `Subscription has been reactivated.`,
    })
  }

  const handleResolvePaymentIssue = (subscriptionId: number) => {
    // Update subscription status
    const updatedSubscriptions = subscriptions.map((sub) => {
      if (sub.id === subscriptionId) {
        return {
          ...sub,
          status: "active",
          paymentFailureReason: undefined,
          lastAttempt: undefined,
          retryCount: undefined,
        }
      }
      return sub
    })

    setSubscriptions(updatedSubscriptions)

    toast({
      title: "Payment Issue Resolved",
      description: `Payment issue has been marked as resolved.`,
    })
  }

  // Helper function to get a date 30 days from now
  const getNextBillingDate = () => {
    const date = new Date()
    date.setDate(date.getDate() + 30)
    return date.toISOString().split("T")[0].replace(/-/g, "/")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Subscriptions</h1>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search subscriptions..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="payment_issue">Payment Issues</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Subscriptions</CardTitle>
          <CardDescription>View and manage user subscriptions</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredSubscriptions.length > 0 ? (
            <div className="rounded-md border">
              <div className="grid grid-cols-12 gap-4 border-b bg-muted/50 p-4 font-medium">
                <div className="col-span-3">User</div>
                <div className="col-span-2">Plan</div>
                <div className="col-span-2">Amount</div>
                <div className="col-span-2">Next Billing</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1">Actions</div>
              </div>
              {filteredSubscriptions.map((subscription) => (
                <motion.div
                  key={subscription.id}
                  className={`grid grid-cols-12 gap-4 border-b p-4 last:border-0 ${
                    highlightedSubscription === subscription.id ? "bg-yellow-50 dark:bg-yellow-900/20" : ""
                  }`}
                  initial={
                    highlightedSubscription === subscription.id ? { backgroundColor: "rgba(254, 240, 138, 0.5)" } : {}
                  }
                  animate={
                    highlightedSubscription === subscription.id ? { backgroundColor: "rgba(254, 240, 138, 0)" } : {}
                  }
                  transition={{ duration: 3 }}
                >
                  <div className="col-span-3">
                    <div className="font-medium">{subscription.user}</div>
                    <div className="text-sm text-muted-foreground">{subscription.email}</div>
                  </div>
                  <div className="col-span-2 flex items-center">{subscription.plan}</div>
                  <div className="col-span-2 flex items-center">{subscription.amount}</div>
                  <div className="col-span-2 flex items-center">{subscription.nextBilling}</div>
                  <div className="col-span-2 flex items-center">
                    <StatusBadge status={subscription.status} />
                  </div>
                  <div className="col-span-1 flex items-center justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <span className="sr-only">Open menu</span>
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                          >
                            <path
                              d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z"
                              fill="currentColor"
                              fillRule="evenodd"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedSubscription(subscription)
                            setDetailsOpen(true)
                          }}
                        >
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {subscription.status === "active" && (
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedSubscription(subscription)
                              setCancelDialogOpen(true)
                            }}
                          >
                            Cancel Subscription
                          </DropdownMenuItem>
                        )}
                        {subscription.status === "payment_issue" && (
                          <>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedSubscription(subscription)
                                setReminderDialogOpen(true)
                              }}
                            >
                              Send Payment Reminder
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleResolvePaymentIssue(subscription.id)}>
                              Mark as Resolved
                            </DropdownMenuItem>
                          </>
                        )}
                        {subscription.status === "cancelled" && (
                          <DropdownMenuItem onClick={() => handleReactivateSubscription(subscription.id)}>
                            Reactivate Subscription
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
              <p className="text-muted-foreground">No subscriptions found</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Subscription Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Subscription Details</DialogTitle>
            <DialogDescription>
              Detailed information about {selectedSubscription?.user}'s subscription
            </DialogDescription>
          </DialogHeader>
          {selectedSubscription && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">User</h3>
                  <p className="text-base">{selectedSubscription.user}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                  <p className="text-base">{selectedSubscription.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Plan</h3>
                  <p className="text-base">{selectedSubscription.plan}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Amount</h3>
                  <p className="text-base">{selectedSubscription.amount}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Start Date</h3>
                  <p className="text-base">{selectedSubscription.startDate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Next Billing</h3>
                  <p className="text-base">{selectedSubscription.nextBilling}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                  <div className="mt-1">
                    <StatusBadge status={selectedSubscription.status} />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Payment ID</h3>
                  <p className="text-base">{selectedSubscription.paymentId}</p>
                </div>
              </div>

              {selectedSubscription.status === "payment_issue" && (
                <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-red-400 dark:text-red-300" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800 dark:text-red-300">Payment Issue Details</h3>
                      <div className="mt-2 text-sm text-red-700 dark:text-red-200">
                        <ul className="list-disc space-y-1 pl-5">
                          <li>Reason: {selectedSubscription.paymentFailureReason}</li>
                          <li>Last attempt: {selectedSubscription.lastAttempt}</li>
                          <li>Retry count: {selectedSubscription.retryCount}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedSubscription.status === "cancelled" && selectedSubscription.cancellationReason && (
                <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-800/50">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <XCircle className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-800 dark:text-gray-300">Cancellation Details</h3>
                      <div className="mt-2 text-sm text-gray-700 dark:text-gray-400">
                        <p>Reason: {selectedSubscription.cancellationReason}</p>
                        {selectedSubscription.endDate && <p>End date: {selectedSubscription.endDate}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-2">
            <Button variant="outline" onClick={() => setDetailsOpen(false)}>
              Close
            </Button>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
              {selectedSubscription?.status === "active" && (
                <Button
                  variant="destructive"
                  onClick={() => {
                    setDetailsOpen(false)
                    setCancelDialogOpen(true)
                  }}
                >
                  Cancel Subscription
                </Button>
              )}
              {selectedSubscription?.status === "payment_issue" && (
                <Button
                  onClick={() => {
                    setDetailsOpen(false)
                    setReminderDialogOpen(true)
                  }}
                >
                  Send Payment Reminder
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Subscription Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Cancel Subscription</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel {selectedSubscription?.user}'s subscription?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="rounded-md bg-amber-50 p-4 dark:bg-amber-900/20">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-amber-400 dark:text-amber-300" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-amber-800 dark:text-amber-300">Attention</h3>
                    <div className="mt-2 text-sm text-amber-700 dark:text-amber-200">
                      <p>
                        This will immediately cancel the subscription. The user will lose access to premium features at
                        the end of their current billing period.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="cancellation-reason" className="block text-sm font-medium">
                  Cancellation Reason (Optional)
                </label>
                <Input
                  id="cancellation-reason"
                  placeholder="Enter reason for cancellation"
                  className="mt-1"
                  value={cancellationReason}
                  onChange={(e) => setCancellationReason(e.target.value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleCancelSubscription}>
              Confirm Cancellation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Reminder Dialog */}
      <Dialog open={reminderDialogOpen} onOpenChange={setReminderDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Send Payment Reminder</DialogTitle>
            <DialogDescription>Send a payment reminder to {selectedSubscription?.user}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-900/20">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CreditCard className="h-5 w-5 text-blue-400 dark:text-blue-300" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">Payment Issue</h3>
                    <div className="mt-2 text-sm text-blue-700 dark:text-blue-200">
                      <p>Reason: {selectedSubscription?.paymentFailureReason}</p>
                      <p className="mt-1">Last attempt: {selectedSubscription?.lastAttempt}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="reminder-message" className="block text-sm font-medium">
                  Additional Message (Optional)
                </label>
                <Input
                  id="reminder-message"
                  placeholder="Add a personal message to the payment reminder"
                  className="mt-1"
                  value={reminderMessage}
                  onChange={(e) => setReminderMessage(e.target.value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReminderDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendPaymentReminder}>
              <MailCheck className="mr-2 h-4 w-4" />
              Send Reminder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

