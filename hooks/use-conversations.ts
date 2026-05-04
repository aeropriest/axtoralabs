import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { 
  createConversation, 
  addMessageToConversation, 
  getPersonaConversations, 
  getConversation,
  getRecentConversation,
  getOrCreatePersona,
  Conversation,
  Message,
  PersonaData
} from '@/lib/firestore';

export function useConversations(personaId: string) {
  const { user, isAnonymous } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [personaData, setPersonaData] = useState<PersonaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user conversations when user or personaId changes
  useEffect(() => {
    if (!user) {
      setConversations([]);
      setCurrentConversation(null);
      setPersonaData(null);
      setLoading(false);
      return;
    }

    const fetchConversations = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // First get or create the persona data
        const persona = await getOrCreatePersona(user.uid, personaId);
        setPersonaData(persona);
        
        // Get all conversations for this persona
        const personaConversations = await getPersonaConversations(user.uid, personaId);
        setConversations(personaConversations);
        
        // Set the most recent conversation as current, or create a new one if none exists
        if (personaConversations.length > 0) {
          // Try to get the last active conversation first
          const recentConversation = await getRecentConversation(user.uid, personaId);
          if (recentConversation) {
            setCurrentConversation(recentConversation);
          } else {
            setCurrentConversation(personaConversations[0]);
          }
        } else {
          // Create a new conversation for this persona
          const newConversation = await startNewConversation();
          setCurrentConversation(newConversation);
        }
      } catch (err) {
        console.error('Error fetching conversations:', err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [user, personaId]);

  // Start a new conversation
  const startNewConversation = async () => {
    if (!user) return null;
    
    try {
      setError(null);
      const title = `Conversation ${new Date().toLocaleString()}`;
      const newConversation = await createConversation(user.uid, personaId, title);
      
      setConversations(prev => [newConversation, ...prev]);
      setCurrentConversation(newConversation);
      
      return newConversation;
    } catch (err) {
      console.error('Error creating conversation:', err);
      setError((err as Error).message);
      return null;
    }
  };

  // Add a message to the current conversation
  const addMessage = async (role: 'user' | 'assistant', content: string) => {
    if (!user || !currentConversation) return null;
    
    try {
      setError(null);
      const message: Omit<Message, 'timestamp'> = { role, content };
      
      const updatedMessages = await addMessageToConversation(
        user.uid,
        personaId,
        currentConversation.id, 
        message
      );
      
      // Update the current conversation with the new message
      setCurrentConversation(prev => {
        if (!prev) return null;
        return { ...prev, messages: updatedMessages as Message[] };
      });
      
      return updatedMessages;
    } catch (err) {
      console.error('Error adding message:', err);
      setError((err as Error).message);
      return null;
    }
  };

  // Switch to a different conversation
  const switchConversation = async (conversationId: string) => {
    if (!user) return null;
    
    try {
      setError(null);
      const conversation = await getConversation(user.uid, personaId, conversationId);
      
      if (conversation) {
        setCurrentConversation(conversation);
      }
      
      return conversation;
    } catch (err) {
      console.error('Error switching conversation:', err);
      setError((err as Error).message);
      return null;
    }
  };

  return {
    conversations,
    currentConversation,
    personaData,
    loading,
    error,
    startNewConversation,
    addMessage,
    switchConversation
  };
}
