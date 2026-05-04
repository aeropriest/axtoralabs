"use client";

import { db } from '@/lib/firebase';
import { 
  collection, 
  // doc, 
  // setDoc, 
  // getDoc, 
  // updateDoc, 
  // serverTimestamp, 
  Timestamp,
  addDoc,
  query,
  where,
  getDocs,
  limit
} from 'firebase/firestore';

interface ConversationLog {
  question: string | null;
  answer: string | null;
  timestamp: string;
  voice?: string;
}

/**
 * Get a reference to the conversation logs collection for a specific persona
 */
const personaConversationLogsCollection = (userId: string, personaId: string) => 
  collection(db, 'users', userId, 'personas', personaId, 'conversation_logs');

/**
 * Check if a similar conversation log already exists
 * This helps prevent duplicate logs when the same Q&A is processed multiple times
 */
const checkForExistingLog = async (
  userId: string,
  personaId: string,
  question: string,
  timeWindow: number = 60000 // 1 minute in milliseconds
): Promise<string | null> => {
  try {
    // Get the collection reference
    const logsCollection = personaConversationLogsCollection(userId, personaId);
    
    // Calculate the time threshold (current time minus window)
    const timeThreshold = new Date(Date.now() - timeWindow);
    
    // Query for logs with the same question - using a simple query to avoid requiring an index
    const q = query(
      logsCollection,
      where('question', '==', question),
      limit(10)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      // Filter the results in memory to check the timestamp
      const recentLogs = querySnapshot.docs.filter(doc => {
        const data = doc.data();
        const createdAt = data.createdAt?.toDate?.() || new Date(0);
        return createdAt >= timeThreshold;
      });
      
      if (recentLogs.length > 0) {
        // Return the ID of the most recent matching log
        return recentLogs[0].id;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error checking for existing logs:', error);
    return null;
  }
};

/**
 * Save a conversation log (question-answer pair) to Firestore
 * 
 * @param userId - The user ID
 * @param personaId - The persona ID
 * @param data - The conversation log data containing question, answer, and timestamp
 * @param voice - Optional voice used for the conversation
 * @returns The ID of the created conversation log document
 */
export const saveConversationLog = async (
  userId: string,
  personaId: string,
  data: ConversationLog,
  voice?: string
): Promise<string> => {
  try {
    // Skip if question or answer is empty
    if (!data.question || !data.answer) {
      return '';
    }

    // Check if a similar log was recently created to avoid duplicates
    const existingLogId = await checkForExistingLog(userId, personaId, data.question);
    if (existingLogId) {
      return existingLogId;
    }

    const logData = {
      ...data,
      voice: voice || null,
      createdAt: Timestamp.fromDate(new Date())
    };

    const docRef = await addDoc(personaConversationLogsCollection(userId, personaId), logData);
    return docRef.id;
  } catch (error) {
    // Permission errors are common (Firestore rules disallow this user/path)
    // — they're transcript-saving failures and must NEVER affect the voice
    // session. Log once at debug level and swallow.
    const code = (error as { code?: string })?.code;
    if (code === 'permission-denied') {
      console.debug('[conversation-logger] permission-denied saving log; skipping');
    } else {
      console.warn('[conversation-logger] save failed:', error);
    }
    return '';
  }
};

/**
 * Save a conversation log directly from the WebRTC conversation reference
 * 
 * @param userId - The user ID (default: QM33oKDgqbXkIxvmoh2N3V7jq8B3)
 * @param personaId - The persona ID (default: space)
 * @param conversationRef - The conversation reference from WebRTC
 * @param voice - Optional voice used for the conversation
 * @returns The ID of the created conversation log document
 */
// Track the last logged conversation to prevent duplicates
let lastLoggedConversation: {
  question: string;
  answer: string;
  timestamp: number;
} | null = null;

const PLACEHOLDER_UID = 'QM33oKDgqbXkIxvmoh2N3V7jq8B3';

export const logWebRTCConversation = async (
  conversationRef: {
    question: string | null;
    answer: string | null;
  },
  userId: string = PLACEHOLDER_UID,
  personaId: string = 'space',
  voice?: string
): Promise<string | null> => {
  // Don't write under a foreign uid — Firestore rules will reject it and
  // it pollutes someone else's account. The caller passes the real uid for
  // signed-in users; for anonymous sessions we just skip persistence.
  if (!userId || userId === PLACEHOLDER_UID) {
    return null;
  }

  // Skip if either question or answer is missing
  if (!conversationRef.question || !conversationRef.answer) {
    return null;
  }
  
  // Trim the question and answer to remove whitespace
  const question = conversationRef.question.trim();
  const answer = conversationRef.answer.trim();
  
  // Skip if either is empty after trimming
  if (!question || !answer) {
    console.warn('Empty question or answer after trimming, skipping log');
    return null;
  }
  
  // Check if this is a duplicate of the last logged conversation
  const now = Date.now();
  if (lastLoggedConversation && 
      lastLoggedConversation.question === question && 
      lastLoggedConversation.answer === answer && 
      now - lastLoggedConversation.timestamp < 5000) { // Within 5 seconds
    console.log('Duplicate conversation detected, skipping log');
    return null;
  }
  
  // Update the last logged conversation
  lastLoggedConversation = {
    question,
    answer,
    timestamp: now
  };
  
  const logData: ConversationLog = {
    question,
    answer,
    timestamp: new Date().toISOString(),
    voice
  };
  
  // Only log the first few characters to avoid console clutter
  const previewQuestion = question.length > 30 ? question.substring(0, 30) + '...' : question;
  console.log(`Logging conversation with question: "${previewQuestion}"`);
  
  return await saveConversationLog(userId, personaId, logData, voice);
};
