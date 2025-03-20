"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Search, FileQuestion, MessageSquare, BookOpen, Mail, Download } from "lucide-react"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("faq")

  const faqs = [
    {
      question: "How many episodes can I upload per month?",
      answer:
        "With your current subscription, you can upload a maximum of 3 episodes per month. Unused episodes do not roll over to the next month.",
    },
    {
      question: "What is the maximum length for an episode?",
      answer:
        "Each episode is limited to 30 minutes of raw audio. If your content exceeds this limit, you may need to split it into multiple episodes.",
    },
    {
      question: "How many revisions can I request?",
      answer:
        "You are allowed one round of revisions per episode. Make sure to provide comprehensive feedback to ensure all your changes are addressed in a single revision.",
    },
    {
      question: "How do I change my release schedule?",
      answer:
        "Your release schedule is set during the Development phase. If you need to change it, please contact our support team who can adjust it for you.",
    },
    {
      question: "What audio formats are supported?",
      answer:
        "We support MP3 and WAV audio formats for episode uploads. For the best quality, we recommend uploading WAV files if available.",
    },
    {
      question: "How do I download my edited episodes?",
      answer:
        "You can download your edited episodes from the Production page by clicking on 'View Details' for a scheduled episode, or from the Downloads section in your Settings.",
    },
    {
      question: "What happens if I cancel my subscription?",
      answer:
        "If you cancel your subscription, you will maintain access until the end of your current billing period. After that, you will no longer be able to upload new episodes, but you can still download your existing content.",
    },
    {
      question: "Can I change my podcast details after setting them up?",
      answer:
        "Yes, you can update your podcast title, description, and other details in the Pre-Production phase. However, once episodes are published, maintaining consistency is recommended.",
    },
  ]

  const filteredFaqs = searchQuery
    ? faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : faqs

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Help & Support</h1>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search for help..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="faq">
            <FileQuestion className="mr-2 h-4 w-4" />
            FAQ
          </TabsTrigger>
          <TabsTrigger value="guides">
            <BookOpen className="mr-2 h-4 w-4" />
            Guides
          </TabsTrigger>
          <TabsTrigger value="contact">
            <MessageSquare className="mr-2 h-4 w-4" />
            Contact Us
          </TabsTrigger>
          <TabsTrigger value="resources">
            <Mail className="mr-2 h-4 w-4" />
            Resources
          </TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find answers to common questions about PodManage</CardDescription>
            </CardHeader>
            <CardContent>
              {searchQuery && filteredFaqs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
                  <p className="text-sm mt-2">Try a different search term or contact our support team</p>
                </div>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Guides</CardTitle>
              <CardDescription>Step-by-step guides to help you get the most out of PodManage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Getting Started</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">
                      Learn how to set up your podcast and navigate the platform
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button variant="outline" size="sm">
                      Read Guide
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Uploading Episodes</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">
                      How to upload, manage, and provide feedback on episodes
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button variant="outline" size="sm">
                      Read Guide
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Release Scheduling</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">
                      Understanding how episode scheduling and releases work
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button variant="outline" size="sm">
                      Read Guide
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Managing Your Subscription</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">
                      How to update billing information and manage your plan
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button variant="outline" size="sm">
                      Read Guide
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Get in touch with our support team for personalized assistance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="What do you need help with?" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Please describe your issue in detail..." className="min-h-32" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="attachment">Attachments (Optional)</Label>
                <Input id="attachment" type="file" />
                <p className="text-xs text-muted-foreground">
                  You can attach screenshots or files to help us understand your issue better
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Submit Support Request</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Other Ways to Reach Us</CardTitle>
              <CardDescription>Alternative methods to get support</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Email Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Send an email to <span className="text-podmanage-orange">support@podmanage.com</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Response time: Within 24 hours</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Live Chat</h3>
                  <p className="text-sm text-muted-foreground">Chat with our support team during business hours</p>
                  <p className="text-xs text-muted-foreground mt-1">Available Monday-Friday, 9am-5pm EST</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Start Chat
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resources & Downloads</CardTitle>
              <CardDescription>Helpful resources to improve your podcasting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Podcasting Guides</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-md border p-4">
                    <h4 className="font-medium">Podcast Recording Best Practices</h4>
                    <p className="text-sm text-muted-foreground mt-1">Tips for achieving professional sound quality</p>
                    <Button variant="outline" size="sm" className="mt-3">
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                  </div>

                  <div className="rounded-md border p-4">
                    <h4 className="font-medium">Interview Techniques</h4>
                    <p className="text-sm text-muted-foreground mt-1">How to conduct engaging podcast interviews</p>
                    <Button variant="outline" size="sm" className="mt-3">
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Templates</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-md border p-4">
                    <h4 className="font-medium">Episode Planning Template</h4>
                    <p className="text-sm text-muted-foreground mt-1">Structure your podcast episodes effectively</p>
                    <Button variant="outline" size="sm" className="mt-3">
                      <Download className="mr-2 h-4 w-4" />
                      Download DOCX
                    </Button>
                  </div>

                  <div className="rounded-md border p-4">
                    <h4 className="font-medium">Show Notes Template</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Create professional show notes for your episodes
                    </p>
                    <Button variant="outline" size="sm" className="mt-3">
                      <Download className="mr-2 h-4 w-4" />
                      Download DOCX
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Video Tutorials</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-md border p-4">
                    <h4 className="font-medium">Platform Walkthrough</h4>
                    <p className="text-sm text-muted-foreground mt-1">A complete tour of the PodManage platform</p>
                    <Button variant="outline" size="sm" className="mt-3">
                      Watch Video
                    </Button>
                  </div>

                  <div className="rounded-md border p-4">
                    <h4 className="font-medium">Advanced Features</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Get the most out of PodManage's advanced features
                    </p>
                    <Button variant="outline" size="sm" className="mt-3">
                      Watch Video
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

