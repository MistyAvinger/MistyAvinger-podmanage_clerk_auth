"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, MessageSquare, Clock, Search, MailCheck, RefreshCw, ChevronDown, ChevronUp } from "lucide-react"
import { motion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function SupportTickets() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const ticketId = searchParams.get("ticketId")

  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("active")
  const [searchQuery, setSearchQuery] = useState("")
  const [tickets, setTickets] = useState([
    {
      id: "TK-1001",
      issue: "Episode upload failed",
      status: "pending",
      priority: "medium",
      user: "John Doe",
      email: "john.doe@example.com",
      date: "2023-06-10",
      description: "I tried to upload my episode but it keeps failing at 80%. I've tried multiple times.",
      responses: [],
      projectId: 101,
      category: "technical",
    },
    {
      id: "TK-1002",
      issue: "Billing issue",
      status: "resolved",
      priority: "high",
      user: "Jane Smith",
      email: "jane.smith@example.com",
      date: "2023-06-05",
      description: "My credit card was charged twice for the monthly subscription.",
      responses: [
        {
          admin: true,
          text: "We've issued a refund for the duplicate charge. It should appear in your account in 3-5 business days.",
          date: "2023-06-06",
        },
      ],
      projectId: 102,
      category: "billing",
      resolvedDate: "2023-06-06",
      resolvedBy: "Admin",
    },
    {
      id: "TK-1003",
      issue: "Payment failed",
      status: "pending",
      priority: "high",
      user: "Robert Johnson",
      email: "robert.johnson@example.com",
      date: "2023-06-12",
      description: "I'm trying to update my payment method but keep getting an error.",
      responses: [],
      projectId: 103,
      category: "billing",
    },
    {
      id: "TK-5678",
      issue: "Subscription payment declined",
      status: "pending",
      priority: "critical",
      user: "Emily Wilson",
      email: "emily.wilson@example.com",
      date: "2023-06-05",
      description: "My subscription payment was declined but I've updated my card. Please help me resolve this issue.",
      responses: [],
      projectId: 104,
      category: "billing",
    },
  ])

  const [newIssue, setNewIssue] = useState("")
  const [responseText, setResponseText] = useState("")
  const [respondingTo, setRespondingTo] = useState<string | null>(null)
  const [resolveDialogOpen, setResolveDialogOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [resolveNote, setResolveNote] = useState("")
  const [notifyUser, setNotifyUser] = useState(true)
  const [ticketDetailsOpen, setTicketDetailsOpen] = useState(false)
  const [highlightedTicket, setHighlightedTicket] = useState<string | null>(null)
  const [expandedTickets, setExpandedTickets] = useState<string[]>([])

  // Highlight ticket if ticketId is provided in URL
  useEffect(() => {
    if (ticketId) {
      const ticket = tickets.find((t) => t.id === ticketId)
      if (ticket) {
        if (ticket.status === "resolved") {
          setActiveTab("resolved")
        } else {
          setActiveTab("active")
        }

        setHighlightedTicket(ticket.id)

        // Expand the highlighted ticket
        if (!expandedTickets.includes(ticket.id)) {
          setExpandedTickets([...expandedTickets, ticket.id])
        }

        // Remove highlight after 3 seconds
        const timer = setTimeout(() => {
          setHighlightedTicket(null)
        }, 3000)

        return () => clearTimeout(timer)
      }
    }
  }, [ticketId, tickets, expandedTickets])

  const toggleTicketExpansion = (ticketId: string) => {
    if (expandedTickets.includes(ticketId)) {
      setExpandedTickets(expandedTickets.filter((id) => id !== ticketId))
    } else {
      setExpandedTickets([...expandedTickets, ticketId])
    }
  }

  const submitTicket = () => {
    if (newIssue.trim()) {
      const newTicketId = `TK-${1000 + tickets.length + 1}`

      setTickets([
        ...tickets,
        {
          id: newTicketId,
          issue: newIssue,
          status: "pending",
          priority: "medium",
          user: "Admin Test",
          email: "admin@podmanage.com",
          date: new Date().toISOString().split("T")[0],
          description: newIssue,
          responses: [],
          projectId: 999,
          category: "other",
        },
      ])
      setNewIssue("")

      toast({
        title: "Ticket Created",
        description: "Your support ticket has been created successfully.",
      })
    }
  }

  const handleRespond = (ticketId: string) => {
    setRespondingTo(ticketId)
  }

  const submitResponse = (ticketId: string) => {
    if (!responseText.trim()) return

    const updatedTickets = tickets.map((ticket) => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          responses: [
            ...ticket.responses,
            {
              admin: true,
              text: responseText,
              date: new Date().toISOString().split("T")[0],
            },
          ],
        }
      }
      return ticket
    })

    setTickets(updatedTickets)
    setResponseText("")
    setRespondingTo(null)

    toast({
      title: "Response Sent",
      description: "Your response has been sent to the user.",
    })
  }

  const openResolveDialog = (ticket: any) => {
    setSelectedTicket(ticket)
    setResolveDialogOpen(true)
  }

  const handleResolveTicket = () => {
    if (!selectedTicket) return

    const updatedTickets = tickets.map((ticket) => {
      if (ticket.id === selectedTicket.id) {
        return {
          ...ticket,
          status: "resolved",
          resolvedDate: new Date().toISOString().split("T")[0],
          resolvedBy: "Admin",
          resolveNote: resolveNote,
        }
      }
      return ticket
    })

    setTickets(updatedTickets)
    setResolveDialogOpen(false)
    setResolveNote("")

    if (notifyUser) {
      toast({
        title: "User Notified",
        description: `${selectedTicket.user} has been notified that their ticket was resolved.`,
      })
    }

    toast({
      title: "Ticket Resolved",
      description: "The ticket has been marked as resolved.",
    })
  }

  const reopenTicket = (ticketId: string) => {
    const updatedTickets = tickets.map((ticket) => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          status: "pending",
          resolvedDate: undefined,
          resolvedBy: undefined,
          resolveNote: undefined,
        }
      }
      return ticket
    })

    setTickets(updatedTickets)

    toast({
      title: "Ticket Reopened",
      description: "The ticket has been reopened.",
    })
  }

  // Filter tickets based on search query and active tab
  const filteredTickets = tickets
    .filter(
      (ticket) =>
        ticket.issue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((ticket) => {
      if (activeTab === "active") return ticket.status === "pending"
      if (activeTab === "resolved") return ticket.status === "resolved"
      return true
    })

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800"
          >
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        )
      case "resolved":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
          >
            <CheckCircle className="mr-1 h-3 w-3" />
            Resolved
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Priority badge component
  const PriorityBadge = ({ priority }: { priority: string }) => {
    switch (priority) {
      case "low":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800"
          >
            Low
          </Badge>
        )
      case "medium":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800"
          >
            Medium
          </Badge>
        )
      case "high":
        return (
          <Badge
            variant="outline"
            className="bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800"
          >
            High
          </Badge>
        )
      case "critical":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800"
          >
            Critical
          </Badge>
        )
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Support Tickets</h1>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tickets..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active" className="relative">
            Active
            {tickets.filter((t) => t.status === "pending").length > 0 && (
              <Badge className="ml-2 bg-podmanage-orange">{tickets.filter((t) => t.status === "pending").length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
          <TabsTrigger value="new">New Ticket</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4 mt-4">
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={highlightedTicket === ticket.id ? "ring-2 ring-yellow-400 rounded-lg" : ""}
              >
                <Collapsible
                  open={expandedTickets.includes(ticket.id)}
                  onOpenChange={() => toggleTicketExpansion(ticket.id)}
                  className="w-full"
                >
                  <Card className="transition-all hover:shadow-md">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              {expandedTickets.includes(ticket.id) ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                              <span className="sr-only">Toggle</span>
                            </Button>
                          </CollapsibleTrigger>
                          <CardTitle className="text-lg">{ticket.issue}</CardTitle>
                        </div>
                        <div className="flex items-center gap-2">
                          <PriorityBadge priority={ticket.priority} />
                          <StatusBadge status={ticket.status} />
                        </div>
                      </div>
                      <CardDescription>
                        From: {ticket.user} ({ticket.email}) • Submitted: {ticket.date} • Ticket ID: {ticket.id}
                      </CardDescription>
                    </CardHeader>
                    <CollapsibleContent>
                      <CardContent className="space-y-4 pt-0">
                        <div className="bg-muted p-3 rounded-md">
                          <p className="text-sm">{ticket.description}</p>
                        </div>

                        {ticket.responses.length > 0 && (
                          <div className="space-y-3">
                            <h4 className="text-sm font-medium">Responses:</h4>
                            {ticket.responses.map((response, index) => (
                              <div
                                key={index}
                                className="bg-muted/50 p-3 rounded-md border-l-2 border-podmanage-orange"
                              >
                                <p className="text-sm">{response.text}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {response.admin ? "Admin" : ticket.user} • {response.date}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        {respondingTo === ticket.id ? (
                          <div className="space-y-2">
                            <Textarea
                              value={responseText}
                              onChange={(e) => setResponseText(e.target.value)}
                              placeholder="Type your response..."
                              className="min-h-[100px]"
                            />
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" onClick={() => setRespondingTo(null)}>
                                Cancel
                              </Button>
                              <Button onClick={() => submitResponse(ticket.id)}>
                                <MailCheck className="mr-2 h-4 w-4" />
                                Send Response
                              </Button>
                            </div>
                          </div>
                        ) : null}
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" onClick={() => handleRespond(ticket.id)}>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Respond
                        </Button>
                        <Button onClick={() => openResolveDialog(ticket)}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Mark as Resolved
                        </Button>
                      </CardFooter>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              </motion.div>
            ))
          ) : (
            <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
              <p className="text-muted-foreground">No active tickets</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="resolved" className="space-y-4 mt-4">
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={highlightedTicket === ticket.id ? "ring-2 ring-yellow-400 rounded-lg" : ""}
              >
                <Collapsible
                  open={expandedTickets.includes(ticket.id)}
                  onOpenChange={() => toggleTicketExpansion(ticket.id)}
                  className="w-full"
                >
                  <Card className="transition-all hover:shadow-md">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              {expandedTickets.includes(ticket.id) ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                              <span className="sr-only">Toggle</span>
                            </Button>
                          </CollapsibleTrigger>
                          <CardTitle className="text-lg">{ticket.issue}</CardTitle>
                        </div>
                        <div className="flex items-center gap-2">
                          <PriorityBadge priority={ticket.priority} />
                          <StatusBadge status={ticket.status} />
                        </div>
                      </div>
                      <CardDescription>
                        From: {ticket.user} ({ticket.email}) • Submitted: {ticket.date} • Resolved:{" "}
                        {ticket.resolvedDate}
                      </CardDescription>
                    </CardHeader>
                    <CollapsibleContent>
                      <CardContent className="space-y-4 pt-0">
                        <div className="bg-muted p-3 rounded-md">
                          <p className="text-sm">{ticket.description}</p>
                        </div>

                        {ticket.responses.length > 0 && (
                          <div className="space-y-3">
                            <h4 className="text-sm font-medium">Responses:</h4>
                            {ticket.responses.map((response, index) => (
                              <div
                                key={index}
                                className="bg-muted/50 p-3 rounded-md border-l-2 border-podmanage-orange"
                              >
                                <p className="text-sm">{response.text}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {response.admin ? "Admin" : ticket.user} • {response.date}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        {ticket.resolveNote && (
                          <div className="bg-green-50 p-3 rounded-md border border-green-200 dark:bg-green-900/20 dark:border-green-800">
                            <h4 className="text-sm font-medium text-green-800 dark:text-green-300">Resolution Note:</h4>
                            <p className="text-sm text-green-700 dark:text-green-200 mt-1">{ticket.resolveNote}</p>
                            <p className="text-xs text-green-600 dark:text-green-300 mt-1">
                              Resolved by: {ticket.resolvedBy} • {ticket.resolvedDate}
                            </p>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" onClick={() => reopenTicket(ticket.id)}>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Reopen Ticket
                        </Button>
                      </CardFooter>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              </motion.div>
            ))
          ) : (
            <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
              <p className="text-muted-foreground">No resolved tickets</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="new" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Ticket</CardTitle>
              <CardDescription>Use this form to create a new support ticket for testing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label htmlFor="ticket-issue" className="block text-sm font-medium mb-1">
                    Issue Title
                  </label>
                  <Input
                    id="ticket-issue"
                    placeholder="Brief description of the issue"
                    value={newIssue}
                    onChange={(e) => setNewIssue(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="ticket-description" className="block text-sm font-medium mb-1">
                    Detailed Description
                  </label>
                  <Textarea
                    id="ticket-description"
                    placeholder="Provide more details about the issue..."
                    className="min-h-[150px]"
                    value={newIssue}
                    onChange={(e) => setNewIssue(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={submitTicket}>Submit Ticket</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Resolve Ticket Dialog */}
      <Dialog open={resolveDialogOpen} onOpenChange={setResolveDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Resolve Ticket</DialogTitle>
            <DialogDescription>Mark this ticket as resolved and optionally add a resolution note</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <label htmlFor="resolve-note" className="block text-sm font-medium">
                  Resolution Note (Optional)
                </label>
                <Textarea
                  id="resolve-note"
                  placeholder="Add notes about how the issue was resolved..."
                  className="mt-1 min-h-[100px]"
                  value={resolveNote}
                  onChange={(e) => setResolveNote(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="notify-user"
                  checked={notifyUser}
                  onChange={(e) => setNotifyUser(e.target.checked)}
                  className="rounded border-gray-300 text-podmanage-orange focus:ring-podmanage-orange"
                />
                <label htmlFor="notify-user" className="text-sm font-medium">
                  Notify user that their ticket has been resolved
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setResolveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleResolveTicket}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark as Resolved
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

