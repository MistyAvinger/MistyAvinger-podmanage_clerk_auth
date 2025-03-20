"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { authService } from "@/lib/auth-service"

export default function ProductionPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("recording")
  const [recordingComplete, setRecordingComplete] = useState(false)
  const [editingComplete, setEditingComplete] = useState(false)
  const [mixingComplete, setMixingComplete] = useState(false)
  const [masteringComplete, setMasteringComplete] = useState(false)
  const [exportComplete, setExportComplete] = useState(false)

  // Check if user is authenticated
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      router.push("/login")
    }
  }, [router])

  const handleRecordingComplete = () => {
    setLoading(true)
    setTimeout(() => {
      setRecordingComplete(true)
      setActiveTab("editing")
      setLoading(false)
    }, 1500)
  }

  const handleEditingComplete = () => {
    setLoading(true)
    setTimeout(() => {
      setEditingComplete(true)
      setActiveTab("mixing")
      setLoading(false)
    }, 1500)
  }

  const handleMixingComplete = () => {
    setLoading(true)
    setTimeout(() => {
      setMixingComplete(true)
      setActiveTab("mastering")
      setLoading(false)
    }, 1500)
  }

  const handleMasteringComplete = () => {
    setLoading(true)
    setTimeout(() => {
      setMasteringComplete(true)
      setActiveTab("export")
      setLoading(false)
    }, 1500)
  }

  const handleExportComplete = () => {
    setLoading(true)
    setTimeout(() => {
      setExportComplete(true)

      // Set a cookie to mark production as complete
      document.cookie = "production_complete=true; path=/; max-age=31536000"

      // Redirect to schedule page
      router.push("/dashboard/schedule")
    }, 1500)
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="mb-6 text-3xl font-bold">Production Studio</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="recording" disabled={activeTab !== "recording" && !recordingComplete}>
            Recording
          </TabsTrigger>
          <TabsTrigger value="editing" disabled={!recordingComplete || (activeTab !== "editing" && !editingComplete)}>
            Editing
          </TabsTrigger>
          <TabsTrigger value="mixing" disabled={!editingComplete || (activeTab !== "mixing" && !mixingComplete)}>
            Mixing
          </TabsTrigger>
          <TabsTrigger
            value="mastering"
            disabled={!mixingComplete || (activeTab !== "mastering" && !masteringComplete)}
          >
            Mastering
          </TabsTrigger>
          <TabsTrigger value="export" disabled={!masteringComplete}>
            Export
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recording">
          <Card>
            <CardHeader>
              <CardTitle>Recording Studio</CardTitle>
              <CardDescription>Record your podcast episode</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Recording Controls</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Use these controls to record your podcast
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <span className="mr-1 h-2 w-2 rounded-full bg-red-500"></span>
                      Record
                    </Button>
                    <Button variant="outline" size="sm">
                      <span className="mr-1">⏸️</span>
                      Pause
                    </Button>
                    <Button variant="outline" size="sm">
                      <span className="mr-1">⏹️</span>
                      Stop
                    </Button>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="h-24 rounded-md bg-gray-200 dark:bg-gray-700">
                    <div className="flex h-full items-center justify-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Audio waveform will appear here</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recordingNotes">Recording Notes</Label>
                <Textarea id="recordingNotes" placeholder="Add notes about your recording session..." />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleRecordingComplete} disabled={loading}>
                {loading ? "Processing..." : "Complete Recording"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="editing">
          <Card>
            <CardHeader>
              <CardTitle>Editing Studio</CardTitle>
              <CardDescription>Edit your podcast recording</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Editing Tools</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Use these tools to edit your podcast</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <span className="mr-1">✂️</span>
                      Cut
                    </Button>
                    <Button variant="outline" size="sm">
                      <span className="mr-1">📋</span>
                      Copy
                    </Button>
                    <Button variant="outline" size="sm">
                      <span className="mr-1">📌</span>
                      Paste
                    </Button>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="h-32 rounded-md bg-gray-200 dark:bg-gray-700">
                    <div className="flex h-full items-center justify-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Editing timeline will appear here</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="editingNotes">Editing Notes</Label>
                <Textarea id="editingNotes" placeholder="Add notes about your editing process..." />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleEditingComplete} disabled={loading}>
                {loading ? "Processing..." : "Complete Editing"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="mixing">
          <Card>
            <CardHeader>
              <CardTitle>Mixing Studio</CardTitle>
              <CardDescription>Mix your podcast audio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Mixing Controls</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Adjust levels and apply effects</p>
                  </div>
                </div>

                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="voiceVolume">Voice Volume</Label>
                    <div className="flex items-center space-x-2">
                      <span>🔈</span>
                      <Input id="voiceVolume" type="range" min="0" max="100" defaultValue="80" />
                      <span>🔊</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="musicVolume">Music Volume</Label>
                    <div className="flex items-center space-x-2">
                      <span>🔈</span>
                      <Input id="musicVolume" type="range" min="0" max="100" defaultValue="40" />
                      <span>🔊</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="effectsVolume">Effects Volume</Label>
                    <div className="flex items-center space-x-2">
                      <span>🔈</span>
                      <Input id="effectsVolume" type="range" min="0" max="100" defaultValue="60" />
                      <span>🔊</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mixingNotes">Mixing Notes</Label>
                <Textarea id="mixingNotes" placeholder="Add notes about your mixing process..." />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleMixingComplete} disabled={loading}>
                {loading ? "Processing..." : "Complete Mixing"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="mastering">
          <Card>
            <CardHeader>
              <CardTitle>Mastering Studio</CardTitle>
              <CardDescription>Master your podcast for final output</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Mastering Tools</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Apply final touches to your podcast</p>
                  </div>
                </div>

                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="compression">Compression</Label>
                    <div className="flex items-center space-x-2">
                      <span>Min</span>
                      <Input id="compression" type="range" min="0" max="100" defaultValue="60" />
                      <span>Max</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="normalization">Normalization</Label>
                    <div className="flex items-center space-x-2">
                      <span>-12dB</span>
                      <Input id="normalization" type="range" min="0" max="100" defaultValue="70" />
                      <span>0dB</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="eq">Equalization</Label>
                    <div className="flex items-center space-x-2">
                      <span>Flat</span>
                      <Input id="eq" type="range" min="0" max="100" defaultValue="50" />
                      <span>Enhanced</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="masteringNotes">Mastering Notes</Label>
                <Textarea id="masteringNotes" placeholder="Add notes about your mastering process..." />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleMasteringComplete} disabled={loading}>
                {loading ? "Processing..." : "Complete Mastering"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="export">
          <Card>
            <CardHeader>
              <CardTitle>Export Studio</CardTitle>
              <CardDescription>Export your podcast for distribution</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Export Settings</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Configure your export settings</p>
                  </div>
                </div>

                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fileFormat">File Format</Label>
                    <select
                      id="fileFormat"
                      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
                    >
                      <option value="mp3">MP3</option>
                      <option value="wav">WAV</option>
                      <option value="aac">AAC</option>
                      <option value="flac">FLAC</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bitrate">Bitrate</Label>
                    <select
                      id="bitrate"
                      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
                    >
                      <option value="128">128 kbps</option>
                      <option value="192">192 kbps</option>
                      <option value="256">256 kbps</option>
                      <option value="320">320 kbps</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="metadata">Metadata</Label>
                    <div className="space-y-2">
                      <Input id="title" placeholder="Episode Title" />
                      <Input id="artist" placeholder="Artist/Host Name" />
                      <Input id="album" placeholder="Podcast Name" />
                      <Textarea id="description" placeholder="Episode Description" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleExportComplete} disabled={loading}>
                {loading ? "Exporting..." : "Export Podcast"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

