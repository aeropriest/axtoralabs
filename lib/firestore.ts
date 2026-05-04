import { db } from '@/lib/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  orderBy, 
  serverTimestamp, 
  addDoc, 
  Timestamp,
  updateDoc,
  limit,
} from 'firebase/firestore';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Timestamp;
}

export interface Conversation {
  id: string;
  title: string;
  lastUpdated: Timestamp;
  messages: Message[];
}

export interface ConversationLogItem {
  id: string;
  question: string;
  answer: string;
  timestamp: string;
  createdAt: Timestamp;
  voice?: string;
}

export interface UserProfile {
  id: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  isAnonymous: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface FirestorePersona {
  id: string;
  name: string;
  description: string;
  image: string;
  prompt: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface PersonaData {
  id: string;
  lastConversationId?: string;
  lastUpdated: Timestamp;
}

// Collection references
const usersCollection = () => collection(db, 'users');

// Get a reference to a user's personas collection
const userPersonasCollection = (userId: string) => 
  collection(db, 'users', userId, 'personas');

// Get a reference to conversations collection for a specific persona
const personaConversationsCollection = (userId: string, personaId: string) => 
  collection(db, 'users', userId, 'personas', personaId, 'conversations');

// Get a reference to conversation logs collection for a specific persona
const personaConversationLogsCollection = (userId: string, personaId: string) => 
  collection(db, 'users', userId, 'personas', personaId, 'conversation_logs');
  
// Global personas collection (not user-specific)
const personasCollection = () => collection(db, 'personas');
const personaGlobalDoc = (personaId: string) => doc(personasCollection(), personaId);

// Persona operations
export const getAllPersonas = async (): Promise<FirestorePersona[]> => {
  try {
    const querySnapshot = await getDocs(personasCollection());
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as FirestorePersona[];
  } catch (error) {
    console.error('Error getting all personas:', error);
    throw error;
  }
};

export const getPersona = async (personaId: string): Promise<FirestorePersona | null> => {
  try {
    const docSnapshot = await getDoc(personaGlobalDoc(personaId));
    if (docSnapshot.exists()) {
      return {
        id: docSnapshot.id,
        ...docSnapshot.data()
      } as FirestorePersona;
    }
    return null;
  } catch (error) {
    console.error(`Error getting persona ${personaId}:`, error);
    throw error;
  }
};

export const addPersona = async (persona: FirestorePersona): Promise<string> => {
  try {
    const personaRef = personaGlobalDoc(persona.id);
    await setDoc(personaRef, {
      ...persona,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return persona.id;
  } catch (error) {
    console.error('Error adding persona:', error);
    throw error;
  }
};

// User operations
export const createUserProfile = async (userId: string, data: UserProfile) => {
  await setDoc(doc(usersCollection(), userId), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

export const getUserProfile = async (userId: string) => {
  const docRef = doc(usersCollection(), userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as UserProfile : null;
};

export const updateUserProfile = async (userId: string, data: Partial<UserProfile>) => {
  const userRef = doc(usersCollection(), userId);
  await updateDoc(userRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

// Persona operations
export const getOrCreatePersona = async (userId: string, personaId: string) => {
  const personaRef = doc(userPersonasCollection(userId), personaId);
  const personaSnap = await getDoc(personaRef);
  
  if (!personaSnap.exists()) {
    // Create new persona data if it doesn't exist
    const newPersonaData: Omit<PersonaData, 'id'> = {
      lastUpdated: serverTimestamp() as Timestamp
    };
    
    await setDoc(personaRef, newPersonaData);
    return { id: personaId, ...newPersonaData } as PersonaData;
  }
  
  return { id: personaId, ...personaSnap.data() } as PersonaData;
};

export const updatePersonaData = async (userId: string, personaId: string, data: Partial<PersonaData>) => {
  const personaRef = doc(userPersonasCollection(userId), personaId);
  await updateDoc(personaRef, {
    ...data,
    lastUpdated: serverTimestamp()
  });
};

export const getUserPersonas = async (userId: string) => {
  const personasSnap = await getDocs(userPersonasCollection(userId));
  return personasSnap.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as PersonaData[];
};

// Conversation operations
export const createConversation = async (userId: string, personaId: string, title: string) => {
  // First ensure the persona exists
  await getOrCreatePersona(userId, personaId);
  
  const newConversation = {
    title,
    messages: [],
    createdAt: serverTimestamp(),
    lastUpdated: serverTimestamp(),
  };
  
  // Add to the persona's conversations collection
  const conversationsRef = personaConversationsCollection(userId, personaId);
  const docRef = await addDoc(conversationsRef, newConversation);
  
  // Update the persona with the latest conversation ID
  await updatePersonaData(userId, personaId, {
    lastConversationId: docRef.id,
    lastUpdated: serverTimestamp() as Timestamp
  });
  
  // Cast to Conversation type with proper typing
  return { 
    id: docRef.id, 
    title: newConversation.title,
    messages: newConversation.messages,
    lastUpdated: serverTimestamp() as unknown as Timestamp,
    createdAt: serverTimestamp() as unknown as Timestamp
  } as Conversation;
};

export const addMessageToConversation = async (
  userId: string,
  personaId: string,
  conversationId: string, 
  message: Omit<Message, 'timestamp'>
) => {
  console.log('Adding message to conversation:', { userId, personaId, conversationId, message });
  
  const conversationRef = doc(personaConversationsCollection(userId, personaId), conversationId);
  const conversationSnap = await getDoc(conversationRef);
  
  if (!conversationSnap.exists()) {
    console.error('Conversation not found:', conversationId);
    throw new Error('Conversation not found');
  }
  
  const conversation = conversationSnap.data();
  console.log('Current conversation data:', conversation);
  
  // Ensure messages is always an array
  const currentMessages = Array.isArray(conversation.messages) ? conversation.messages : [];
  console.log('Current messages array:', currentMessages);
  
  // Create a properly formatted message object
  const newMessage = {
    role: message.role,
    content: message.content,
    timestamp: Timestamp.fromDate(new Date())
  };
  
  const updatedMessages = [...currentMessages, newMessage];
  console.log('Updated messages array:', updatedMessages);
  
  try {
    await updateDoc(conversationRef, {
      messages: updatedMessages,
      lastUpdated: serverTimestamp() // Server timestamp is fine for document fields
    });
    
    console.log('Successfully updated conversation with new message');
    
    // Also update the persona's lastUpdated timestamp
    await updatePersonaData(userId, personaId, {
      lastUpdated: serverTimestamp() as Timestamp
    });
    
    return updatedMessages;
  } catch (error) {
    console.error('Error updating conversation with message:', error);
    throw error;
  }
};

export const getPersonaConversations = async (userId: string, personaId: string) => {
  const q = query(
    personaConversationsCollection(userId, personaId),
    orderBy('lastUpdated', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Conversation[];
};

export const getConversation = async (userId: string, personaId: string, conversationId: string) => {
  const docRef = doc(personaConversationsCollection(userId, personaId), conversationId);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    return null;
  }
  
  return {
    id: docSnap.id,
    ...docSnap.data()
  } as Conversation;
};

// Get the most recent conversation for a persona
export const getRecentConversation = async (userId: string, personaId: string) => {
  // First check if we have a stored lastConversationId
  const personaRef = doc(userPersonasCollection(userId), personaId);
  const personaSnap = await getDoc(personaRef);
  
  if (personaSnap.exists()) {
    const personaData = personaSnap.data() as PersonaData;
    if (personaData.lastConversationId) {
      const conversation = await getConversation(userId, personaId, personaData.lastConversationId);
      if (conversation) {
        return conversation;
      }
    }
  }
  
  // If no stored ID or conversation not found, get the most recent one
  const q = query(
    personaConversationsCollection(userId, personaId),
    orderBy('lastUpdated', 'desc'),
    limit(1)
  );
  
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return null;
  }
  
  const docSnapshot = querySnapshot.docs[0];
  return {
    id: docSnapshot.id,
    ...docSnapshot.data()
  } as Conversation;
};

/**
 * Get conversation logs for a specific persona
 * @param userId - The user ID
 * @param personaId - The persona ID
 * @returns Array of conversation logs
 */
export const getPersonaConversationLogs = async (userId: string, personaId: string) => {
  try {
    console.log(`Fetching logs for persona: ${personaId} at path: users/${userId}/personas/${personaId}/conversation_logs`);
    
    const q = query(
      personaConversationLogsCollection(userId, personaId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    console.log(`Found ${querySnapshot.docs.length} logs for persona ${personaId}`);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ConversationLogItem[];
  } catch (error) {
    console.error(`Error fetching conversation logs for persona ${personaId}:`, error);
    throw error;
  }
};

/**
 * Get conversation logs for a specific conversation
 * This function returns all logs for a persona since we don't have conversation-specific logs
 */
export const getConversationLogs = async (userId: string, personaId: string, conversationId: string) => {
  console.log(`Getting logs for user ${userId}, persona ${personaId}, conversation ${conversationId}`);
  // Return all logs for the persona since we don't have conversation-specific logs
  return getPersonaConversationLogs(userId, personaId);
};
