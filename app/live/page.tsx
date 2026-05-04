"use client";

import React, { useState, useRef, useEffect } from "react";

const SpeechRecognition: React.FC = () => {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wsStatus, setWsStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  const startRecording = async () => {
    setTranscript("");
    setError(null);
    setConnecting(true);
    
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError("Microphone access not supported in this browser");
      setConnecting(false);
      return;
    }
    
    try {
      // Request microphone access
      console.log("Requesting microphone access...");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: "audio/webm" });
      console.log("Microphone access granted");

      // Connect to WebSocket server for streaming
      console.log("Connecting to WebSocket server...");
      setWsStatus('connecting');
      wsRef.current = new WebSocket("ws://localhost:3000/api/live");

      wsRef.current.onopen = () => {
        console.log("WebSocket connected successfully");
        setWsStatus('connected');
        setConnecting(false);
        
        // Start recording once WebSocket is connected
        if (mediaRecorderRef.current) {
          // Send audio chunks every 3 seconds for more responsive transcription
          mediaRecorderRef.current.start(3000);
          setRecording(true);
        }
      };

      wsRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.transcription) {
            console.log("Received transcription:", data.transcription);
            setTranscript((prev) => prev + (prev ? " " : "") + data.transcription);
          } else if (data.error) {
            console.error("Transcription error:", data.error);
            setError(`Transcription error: ${data.error}`);
          }
        } catch (err) {
          console.error("Error parsing WebSocket message:", err);
        }
      };

      wsRef.current.onerror = (error) => {
        console.error("WebSocket error:", error);
        setError("WebSocket connection failed. Please try again.");
        setWsStatus('disconnected');
        setConnecting(false);
        stopRecording();
      };

      wsRef.current.onclose = () => {
        console.log("WebSocket closed");
        setWsStatus('disconnected');
        if (recording) {
          stopRecording();
        }
      };

      // Send audio chunks when available
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          console.log(`Audio chunk received: ${event.data.size} bytes`);
          audioChunksRef.current.push(event.data);
          const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
          audioChunksRef.current = []; // Reset chunks after sending
          
          audioBlob.arrayBuffer().then((buffer) => {
            if (wsRef.current?.readyState === WebSocket.OPEN) {
              console.log(`Sending audio chunk: ${buffer.byteLength} bytes`);
              wsRef.current.send(buffer);
            } else {
              console.warn("WebSocket not open, can't send audio data");
            }
          });
        }
      };
      
    } catch (err) {
      console.error("Error setting up recording:", err);
      setError("Error accessing microphone. Please check permissions.");
      setConnecting(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      console.log("Stopping recording...");
      mediaRecorderRef.current.stop();
      
      // Stop all audio tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    
    if (wsRef.current) {
      console.log("Closing WebSocket connection...");
      wsRef.current.close();
    }
    
    setRecording(false);
  };

  useEffect(() => {
    // Cleanup function
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <button 
            onClick={recording ? stopRecording : startRecording}
            disabled={connecting}
            className={`px-4 py-2 rounded-md font-medium ${recording 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'} 
              ${connecting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {connecting ? "Connecting..." : recording ? "Stop Recording" : "Start Recording"}
          </button>
          
          <div className="text-sm">
            WebSocket: <span className={`font-medium ${wsStatus === 'connected' 
              ? 'text-green-600' 
              : wsStatus === 'connecting' 
                ? 'text-yellow-600' 
                : 'text-gray-600'}`}>
              {wsStatus}
            </span>
          </div>
        </div>
        
        {error && (
          <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Transcript:</h3>
          <div className="p-4 bg-gray-50 border rounded-md min-h-[200px] max-h-[400px] overflow-y-auto">
            {transcript ? (
              <p className="whitespace-pre-wrap">{transcript}</p>
            ) : (
              <p className="text-gray-500 italic">
                {recording ? "Listening... speak now" : "No transcription yet. Click 'Start Recording' to begin."}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Live Speech-to-Text with OpenAI Whisper</h1>
      <SpeechRecognition />
    </main>
  );
}