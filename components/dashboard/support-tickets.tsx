"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"

export function SupportTickets() {
  const [tickets, setTickets] = useState([
    { id: 1, issue: "Episode upload failed", status: "Pending" },
    { id: 2, issue: "Billing issue", status: "Resolved" },
  ])

  const [newIssue, setNewIssue] = useState("")

  const submitTicket = () => {
    if (newIssue.trim()) {
      setTickets([...tickets, { id: tickets.length + 1, issue: newIssue, status: "Pending" }])
      setNewIssue("")
    }
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Support Tickets</h2>
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Submit a New Ticket</h3>
        </CardHeader>
        <CardContent>
          <Textarea
            value={newIssue}
            onChange={(e) => setNewIssue(e.target.value)}
            placeholder="Describe your issue..."
          />
        </CardContent>
        <CardFooter>
          <Button onClick={submitTicket}>Submit</Button>
        </CardFooter>
      </Card>

      <h3 className="text-lg font-semibold mt-6">Your Tickets</h3>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id} className="p-2 border-b flex justify-between">
            <span>{ticket.issue}</span>
            <span className={ticket.status === "Resolved" ? "text-green-600" : "text-yellow-600"}>{ticket.status}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

