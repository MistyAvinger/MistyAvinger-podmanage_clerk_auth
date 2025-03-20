"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { setCookie } from "@/lib/cookies"

export default function PreProductionPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("podcast-details")
  const [podcastName, setPodcastName] = useState("")
  const [podcastDescription, setPodcastDescription] = useState("")
  const [podcastCategory, setPodcastCategory] = useState("")
  const [podcastLanguage, setPodcastLanguage] = useState("")
  const [selectedMusic, setSelectedMusic] = useState<string | null>(null)
  const [customMusic, setCustomMusic] = useState<File | null>(null)
  const [coverArt, setCoverArt] = useState<File | null>(null)
  const [coverArtPreview, setCoverArtPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleCoverArtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setCoverArt(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setCoverArtPreview(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCustomMusicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCustomMusic(e.target.files[0])
      setSelectedMusic("custom")
    }
  }

  const handleSubmit = () => {
    setLoading(true)

    // Simulate form submission
    setTimeout(() => {
      // Set a cookie to mark pre-production as complete
      setCookie("pre_production_complete", "true", 30)

      // Redirect to production page
      router.push("/dashboard/production")
    }, 2000)
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="mb-6 text-3xl font-bold">Pre-Production</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="podcast-details">Podcast Details</TabsTrigger>
          <TabsTrigger value="music-selection">Music Selection</TabsTrigger>
        </TabsList>

        <TabsContent value="podcast-details">
          <Card>
            <CardHeader>
              <CardTitle>Podcast Details</CardTitle>
              <CardDescription>Enter the details for your podcast</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cover-art">Cover Art</Label>
                <div className="flex items-start space-x-4">
                  <div className="flex h-40 w-40 items-center justify-center rounded-md border border-dashed border-gray-300 dark:border-gray-700">
                    {coverArtPreview ? (
                      <img
                        src={coverArtPreview || "/placeholder.svg"}
                        alt="Cover Art Preview"
                        className="h-full w-full rounded-md object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Upload cover art</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">3000 x 3000px recommended</p>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <Input id="cover-art" type="file" accept="image/*" onChange={handleCoverArtChange} />
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Upload a square image for your podcast cover art. We recommend 3000 x 3000 pixels for best
                      quality.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="podcast-name">Podcast Name</Label>
                <Input
                  id="podcast-name"
                  value={podcastName}
                  onChange={(e) => setPodcastName(e.target.value)}
                  placeholder="Enter your podcast name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="podcast-description">Podcast Description</Label>
                <Textarea
                  id="podcast-description"
                  value={podcastDescription}
                  onChange={(e) => setPodcastDescription(e.target.value)}
                  placeholder="Enter a description for your podcast"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="podcast-category">Category</Label>
                  <select
                    id="podcast-category"
                    value={podcastCategory}
                    onChange={(e) => setPodcastCategory(e.target.value)}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
                  >
                    <option value="">Select a category</option>
                    <option value="arts">Arts</option>
                    <option value="business">Business</option>
                    <option value="comedy">Comedy</option>
                    <option value="education">Education</option>
                    <option value="fiction">Fiction</option>
                    <option value="health">Health & Fitness</option>
                    <option value="history">History</option>
                    <option value="leisure">Leisure</option>
                    <option value="music">Music</option>
                    <option value="news">News</option>
                    <option value="religion">Religion & Spirituality</option>
                    <option value="science">Science</option>
                    <option value="society">Society & Culture</option>
                    <option value="sports">Sports</option>
                    <option value="technology">Technology</option>
                    <option value="true-crime">True Crime</option>
                    <option value="tv-film">TV & Film</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="podcast-language">Language</Label>
                  <select
                    id="podcast-language"
                    value={podcastLanguage}
                    onChange={(e) => setPodcastLanguage(e.target.value)}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
                  >
                    <option value="">Select a language</option>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="it">Italian</option>
                    <option value="pt">Portuguese</option>
                    <option value="ru">Russian</option>
                    <option value="ja">Japanese</option>
                    <option value="ko">Korean</option>
                    <option value="zh">Chinese</option>
                  </select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setActiveTab("music-selection")}>Next: Music Selection</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="music-selection">
          <Card>
            <CardHeader>
              <CardTitle>Music Selection</CardTitle>
              <CardDescription>Choose music for your podcast</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Preset Music Options</Label>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {["Upbeat", "Relaxed", "Dramatic", "Corporate", "Inspirational", "Funky"].map((music) => (
                      <div
                        key={music}
                        className={`flex cursor-pointer items-center justify-between rounded-md border p-4 ${
                          selectedMusic === music
                            ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20"
                            : "border-gray-200 dark:border-gray-700"
                        }`}
                        onClick={() => setSelectedMusic(music)}
                      >
                        <div className="flex items-center space-x-2">
                          <div className="text-xl">🎵</div>
                          <div>
                            <h3 className="font-medium">{music}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{music} theme music</p>
                          </div>
                        </div>
                        <div>
                          <Button variant="outline" size="sm">
                            Preview
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custom-music">Upload Custom Music</Label>
                  <Input id="custom-music" type="file" accept="audio/*" onChange={handleCustomMusicChange} />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Upload your own music file. Make sure you have the rights to use this music in your podcast.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("podcast-details")}>
                Back
              </Button>
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

