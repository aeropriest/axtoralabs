"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { UserHeader } from "@/components/user-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ConversationLogItem, getPersonaConversationLogs, getAllPersonas, FirestorePersona } from "@/lib/firestore";
import { personas as hardcodedPersonas } from "@/lib/personas";
import { format } from "date-fns";
import { Loader2, Volume2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";





export default function HistoryPage() {
  const { user, loading } = useAuth();
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const [conversationLogs, setConversationLogs] = useState<ConversationLogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [personas, setPersonas] = useState<FirestorePersona[]>([]);


  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      redirect("/");
    }
  }, [user, loading]);

  // Initialize with first persona and load logs when component mounts
  useEffect(() => {
    const initializeHistory = async () => {
      if (!user) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Load personas from Firestore
        const firestorePersonas = await getAllPersonas();
        
        // If no personas in Firestore, use hardcoded ones as fallback
        const personasList = firestorePersonas.length > 0 
          ? firestorePersonas 
          : hardcodedPersonas as FirestorePersona[];
        
        setPersonas(personasList);
        
        // Set the first persona as selected by default
        if (personasList.length > 0) {
          const firstPersonaId = personasList[0].id;
          setSelectedPersona(firstPersonaId);
          
          // Load logs for the first persona
          await loadLogsForPersona(firstPersonaId);
        }
      } catch (err) {
        console.error("Error initializing history:", err);
        setError("Failed to load conversation history.");
        
        // Fallback to hardcoded personas on error
        setPersonas(hardcodedPersonas as FirestorePersona[]);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Helper function to load logs for a persona
    const loadLogsForPersona = async (personaId: string) => {
      if (!user) return;
      
      setIsLoadingLogs(true);
      
      try {
        console.log(`Loading logs for persona: ${personaId}`);
        console.log(`Firestore path: /users/${user.uid}/personas/${personaId}/conversation_logs`);
        
        // Get all logs for the selected persona
        const logs = await getPersonaConversationLogs(user.uid, personaId);
        console.log(`Retrieved ${logs.length} conversation logs for ${personaId}:`, logs);
        setConversationLogs(logs);
      } catch (err) {
        console.error(`Error loading conversation logs for ${personaId}:`, err);
        setConversationLogs([]);
      } finally {
        setIsLoadingLogs(false);
      }
    };
    
    initializeHistory();
  }, [user]);
  
  // Load logs when selected persona changes
  useEffect(() => {
    if (!user || !selectedPersona) return;
    
    const loadLogsForSelectedPersona = async () => {
      setIsLoadingLogs(true);
      
      try {
        console.log(`Loading logs for persona: ${selectedPersona}`);
        console.log(`Firestore path: /users/${user.uid}/personas/${selectedPersona}/conversation_logs`);
        
        // Get all logs for the selected persona
        const logs = await getPersonaConversationLogs(user.uid, selectedPersona);
        console.log(`Retrieved ${logs.length} conversation logs for ${selectedPersona}:`, logs);
        setConversationLogs(logs);
      } catch (err) {
        console.error('Error loading conversation logs:', err);
        setError('Failed to load conversation logs');
        setConversationLogs([]);
      } finally {
        setIsLoadingLogs(false);
      }
    };
    
    loadLogsForSelectedPersona();
  }, [user, selectedPersona]);

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <UserHeader />
        
        <div className="flex-1 container mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold mb-6">Conversation History</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Error Loading Conversations</CardTitle>
              <CardDescription>
                {error}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">This could be due to Firestore permissions not being properly set up.</p>
              <Link href="/">
                <Button>Return to Home</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <UserHeader />
      
      <div className="flex-1 container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Conversation History</h1>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading conversation history...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Personas sidebar */}
            <div className="lg:col-span-3">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Personas</CardTitle>
                  <CardDescription>Select a persona to view conversations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {personas.map((persona: FirestorePersona) => (
                      <Button
                        key={persona.id}
                        variant={selectedPersona === persona.id ? "default" : "outline"}
                        className="w-full justify-start"
                        onClick={() => setSelectedPersona(persona.id)}
                      >
                        <Image 
                          src={persona.image || "/personas/default.png"} 
                          alt={persona.name} 
                          width={32}
                          height={32}
                          className="rounded-full mr-2" 
                        />
                        <span>{persona.name}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Conversation logs */}
            <div className="lg:col-span-9">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>
                    {selectedPersona && personas.find(p => p.id === selectedPersona)?.name} Conversation History
                  </CardTitle>
                  <CardDescription>
                    {conversationLogs.length > 0 ? 
                      `${conversationLogs.length} messages` : 
                      'No conversation history available'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingLogs ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : conversationLogs.length > 0 ? (
                    <ScrollArea className="h-[600px] pr-4">
                      <div className="space-y-6">
                        {conversationLogs.map((log) => (
                          <div key={log.id} className="space-y-4">
                            {/* User message */}
                            <div className="flex items-start gap-3">
                              <Avatar className="h-8 w-8 bg-muted">
                                <AvatarImage src="/avatars/user.png" alt="User" />
                              </Avatar>
                              <div className="rounded-lg bg-muted p-3 flex-1">
                                <p>{log.question}</p>
                              </div>
                            </div>
                            
                            {/* Assistant message */}
                            <div className="flex items-start gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage 
                                  src={personas.find(p => p.id === selectedPersona)?.image || '/placeholder.png'} 
                                  alt="Assistant" 
                                />
                              </Avatar>
                              <div className="rounded-lg bg-primary/10 p-3 flex-1">
                                <p>{log.answer}</p>
                                {log.voice && (
                                  <div className="flex items-center mt-2 text-xs text-muted-foreground">
                                    <Volume2 className="h-3 w-3 mr-1" />
                                    Voice: {log.voice}
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {/* Timestamp */}
                            <div className="text-xs text-center text-muted-foreground">
                              {log.createdAt && format(log.createdAt.toDate(), 'PPpp')}
                            </div>
                            
                            {/* Divider */}
                            <hr className="my-4 border-t border-border" />
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No conversation history available for this persona
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
