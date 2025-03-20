"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  recordingLocation: z.string({
    required_error: "Please select a recording location",
  }),
  otherLocation: z.string().optional(),
  equipment: z
    .string({
      required_error: "Please describe your equipment",
    })
    .min(5, {
      message: "Equipment description must be at least 5 characters",
    }),
  remoteRecordingExperience: z.enum(["yes", "no"], {
    required_error: "Please select yes or no",
  }),
  podcastFormat: z.enum(["solo", "interview", "both"], {
    required_error: "Please select a podcast format",
  }),
  releaseDay: z.string({
    required_error: "Please select a release day",
  }),
  editingPreferences: z.string().optional(),
})

export default function DevelopmentPage() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const { toast } = useToast()

  // Check if development is already completed
  useEffect(() => {
    const developmentCompleted = document.cookie.includes("development_completed=true")
    if (developmentCompleted) {
      // If already completed, set form to 100% progress
      setProgress(100)
    }
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recordingLocation: "",
      otherLocation: "",
      equipment: "",
      remoteRecordingExperience: undefined,
      podcastFormat: undefined,
      releaseDay: "",
      editingPreferences: "",
    },
  })

  const watchRecordingLocation = form.watch("recordingLocation")

  // Update progress as form fields are completed
  const updateProgress = () => {
    const values = form.getValues()
    const totalFields = 6 // Total number of required fields
    let completedFields = 0

    if (values.recordingLocation) completedFields++
    if (values.equipment) completedFields++
    if (values.remoteRecordingExperience) completedFields++
    if (values.podcastFormat) completedFields++
    if (values.releaseDay) completedFields++
    if (values.editingPreferences) completedFields++

    setProgress(Math.round((completedFields / totalFields) * 100))
  }

  // Subscribe to form changes to update progress
  form.watch(() => {
    updateProgress()
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, you would save this data to your backend
    console.log(values)

    // Set a cookie to mark development as completed
    document.cookie = "development_completed=true; path=/; max-age=31536000" // 1 year expiry

    // Force the cookie to be set immediately
    setProgress(100)

    toast({
      title: "Development Phase Completed",
      description: "You've successfully completed the development phase. Moving to pre-production.",
    })

    // Add a small delay to ensure the cookie is set before navigation
    setTimeout(() => {
      router.push("/dashboard/pre-production")
    }, 500)
  }

  function onSave() {
    // Save current progress without validation
    const values = form.getValues()
    console.log("Saving progress:", values)
    // In a real app, you would save this data to your backend

    toast({
      title: "Progress Saved",
      description: "Your development progress has been saved.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Podcast Setup</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{progress}% Complete</span>
          <Progress value={progress} className="w-32" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Production Information</CardTitle>
          <CardDescription>Help our production team understand your podcast needs</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="recordingLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Where will you be recording your podcast?
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="ml-1 h-4 w-4 inline-block text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              Your recording environment affects sound quality. Our editors will optimize based on your
                              setup.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="home">Home</SelectItem>
                        <SelectItem value="office">Office</SelectItem>
                        <SelectItem value="studio">Studio</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {watchRecordingLocation === "other" && (
                      <FormField
                        control={form.control}
                        name="otherLocation"
                        render={({ field }) => (
                          <FormItem className="mt-2">
                            <FormControl>
                              <Input placeholder="Please specify" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="equipment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      What equipment will you be using?
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="ml-1 h-4 w-4 inline-block text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              List your microphone, headphones, audio interface, and any other recording equipment. This
                              helps our editors optimize your audio.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe your recording equipment" className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="remoteRecordingExperience"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>
                      Have you used a remote recording platform before?
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="ml-1 h-4 w-4 inline-block text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              Remote recording platforms like Riverside.fm, Squadcast, or Zoom allow you to record with
                              guests in different locations.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-x-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="podcastFormat"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Is your podcast solo or interview-based?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-x-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="solo" />
                          </FormControl>
                          <FormLabel className="font-normal">Solo</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="interview" />
                          </FormControl>
                          <FormLabel className="font-normal">Interview</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="both" />
                          </FormControl>
                          <FormLabel className="font-normal">Both</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="releaseDay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      What day of the week will your podcast be released?
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="ml-1 h-4 w-4 inline-block text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              Consistency is key for building an audience. We'll schedule your production timeline
                              around your release day.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a day" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="monday">Monday</SelectItem>
                        <SelectItem value="tuesday">Tuesday</SelectItem>
                        <SelectItem value="wednesday">Wednesday</SelectItem>
                        <SelectItem value="thursday">Thursday</SelectItem>
                        <SelectItem value="friday">Friday</SelectItem>
                        <SelectItem value="saturday">Saturday</SelectItem>
                        <SelectItem value="sunday">Sunday</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="editingPreferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Editing Preferences
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="ml-1 h-4 w-4 inline-block text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              Let us know your preferences for editing style, music, sound effects, etc. This helps our
                              production team deliver what you want.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your editing preferences (e.g., light editing to preserve natural conversation, heavy editing to remove all pauses, specific music style preferences, etc.)"
                        className="resize-none min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onSave}>
            Save Progress
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={progress < 100}>
            {progress < 100 ? "Complete All Fields to Continue" : "Continue to Podcast Details"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

