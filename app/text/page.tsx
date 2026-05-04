"use client"

import React, { useState, useRef } from "react"
import { VoiceCards } from "@/components/voice-cards"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Download } from "lucide-react"

const App: React.FC = () => {
  const [voice, setVoice] = useState("alloy")
  const [text, setText] = useState("")
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const convertToSpeech = async () => {
    if (!text.trim()) return
    
    setIsLoading(true)
    try {
      // If there's an existing audio URL, revoke it to free up memory
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
        setAudioUrl(null)
      }
      
      // Pause the audio if it's playing
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
      
      const response = await fetch('/api/text-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, voice }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to convert text to speech')
      }
      
      const audioBlob = await response.blob()
      const url = URL.createObjectURL(audioBlob)
      setAudioUrl(url)
      
      // Add an event listener to play the audio once it's loaded
      if (audioRef.current) {
        audioRef.current.onloadedmetadata = () => {
          audioRef.current?.play().catch(err => {
            console.error('Error playing audio:', err)
          })
        }
      }
    } catch (error) {
      console.error('Error converting text to speech:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    if (!audioUrl) return
    
    const a = document.createElement('a')
    a.href = audioUrl
    a.download = `text-to-speech-${Date.now()}.mp3`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <main className="min-h-screen flex flex-col px-4">
      <div className="flex-1 flex flex-col py-8 gap-6 max-w mx-auto w-full">
        <div className="w-full">
          <VoiceCards value={voice} onValueChange={setVoice} />
        </div>
        
        <div className="w-full">
          <Textarea 
            placeholder="Enter text to convert to speech..."
            className="min-h-[250px] w-full p-4"
            value={text}
            onChange={handleTextChange}
          />
        </div>
        
        <div className="w-full flex items-center gap-2">
          <div className="flex-1 bg-muted rounded-md overflow-hidden">
            <audio 
              ref={audioRef}
              controls 
              className={`w-full ${!audioUrl ? 'opacity-50 pointer-events-none' : ''}`} 
              src={audioUrl || undefined}
            />
          </div>
          
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12"
            disabled={!audioUrl}
            onClick={handleDownload}
          >
            <Download className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="w-full">
          <Button 
            className="w-full" 
            onClick={convertToSpeech}
            disabled={isLoading || !text.trim()}
          >
            {isLoading ? 'Converting...' : 'Convert To Speech'}
          </Button>
        </div>
      </div>
    </main>
  )
}

export default App;