
import { db, auth } from '@/lib/firebase';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';

// Helper to get current user ID
const getCurrentUserId = () => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');
  return user.uid;
};

export interface HealthMetrics {
  sleepHours: number;
  steps: number;
  moodRating: number;
  heartRate: number;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  lastUpdated: string;
  // Enhanced metrics for dashboard
  weeklySteps?: number[];
  weeklySleep?: number[];
  weeklyMood?: number[];
  stepsGoal?: number;
  sleepGoal?: number;
}

export interface CaregiverAlert {
  id: string;
  type: 'health' | 'activity' | 'medication' | 'emergency';
  severity: 'low' | 'medium' | 'high' | 'urgent';
  title: string;
  description: string;
  timestamp: string;
  resolved: boolean;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
  mood?: string;
  topic?: string;
}

// API functions using Firebase
export const healthAPI = {
  getHealthMetrics: async (): Promise<HealthMetrics> => {
    const userId = getCurrentUserId();
    const docRef = doc(db, 'users', userId, 'health', 'metrics');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as HealthMetrics;
    } else {
      // Return default/empty state if no data
      return {
        sleepHours: 0,
        steps: 0,
        moodRating: 5,
        heartRate: 0,
        bloodPressure: { systolic: 0, diastolic: 0 },
        lastUpdated: new Date().toISOString(),
        weeklySteps: [],
        weeklySleep: [],
        weeklyMood: [],
        stepsGoal: 5000,
        sleepGoal: 8,
      };
    }
  },

  updateHealthMetrics: async (metrics: Partial<HealthMetrics>): Promise<HealthMetrics> => {
    const userId = getCurrentUserId();
    const docRef = doc(db, 'users', userId, 'health', 'metrics');
    await setDoc(docRef, { ...metrics, lastUpdated: serverTimestamp() }, { merge: true });
    return healthAPI.getHealthMetrics();
  },
};

export const alertsAPI = {
  getAlerts: async (): Promise<CaregiverAlert[]> => {
    const userId = getCurrentUserId();
    const q = query(collection(db, 'users', userId, 'alerts'), where('resolved', '==', false));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CaregiverAlert));
  },

  resolveAlert: async (alertId: string): Promise<void> => {
    const userId = getCurrentUserId();
    const alertRef = doc(db, 'users', userId, 'alerts', alertId);
    await updateDoc(alertRef, { resolved: true });
  },

  createAlert: async (alert: Omit<CaregiverAlert, 'id' | 'timestamp' | 'resolved'>): Promise<CaregiverAlert> => {
    const userId = getCurrentUserId();
    const newAlert = {
      ...alert,
      resolved: false,
      timestamp: serverTimestamp(),
    };
    const docRef = await addDoc(collection(db, 'users', userId, 'alerts'), newAlert);
    return { ...newAlert, id: docRef.id, timestamp: new Date().toISOString() };
  },
};

export const chatAPI = {
  sendMessage: async (message: string): Promise<string> => {
    // This would ideally call a backend service (e.g., Cloud Function) with the message
    // and get an AI-generated response. For now, we'll keep the mock response.
    console.log('API Call: POST /api/chat (mock)', { message });
    
    let response = "I understand how you're feeling. Would you like to talk about it?";
    
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('lonely') || lowerMessage.includes('sad')) {
      response = "I'm sorry you're feeling lonely. It's completely normal to feel this way sometimes. Would you like to talk about what's making you feel this way, or perhaps we could discuss something that usually brings you joy?";
    } else if (lowerMessage.includes('remind') && lowerMessage.includes('medication')) {
      response = "I'll help you remember your medication! I've noted your request. Taking medication on time is so important for your health. Is there a specific time you'd like me to remind you?";
    } else if (lowerMessage.includes('pain') || lowerMessage.includes('hurt')) {
      response = "I'm concerned about your pain. While I can provide emotional support, it's important to speak with your doctor about any physical discomfort. In the meantime, are you comfortable, and is there anything I can do to help you feel better?";
    } else if (lowerMessage.includes('family') || lowerMessage.includes('children')) {
      response = "Family is so important! I'd love to hear about your family. Sharing stories about loved ones often brings such joy. Would you like to tell me about them?";
    } else if (lowerMessage.includes('sleep') || lowerMessage.includes('tired')) {
      response = "Sleep is crucial for your wellbeing. I can see from your health data that your sleep patterns have been good lately. Are you having trouble sleeping, or would you like some tips for better rest?";
    }
    
    return Promise.resolve(response);
  },

  getChatHistory: async (): Promise<ChatMessage[]> => {
    const userId = getCurrentUserId();
    const q = query(collection(db, 'users', userId, 'chatHistory'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ChatMessage));
  },

  saveChatMessage: async (message: Omit<ChatMessage, 'id' | 'timestamp'>): Promise<ChatMessage> => {
    const userId = getCurrentUserId();
    const newMessage = {
      ...message,
      timestamp: serverTimestamp(),
    };
    const docRef = await addDoc(collection(db, 'users', userId, 'chatHistory'), newMessage);
    return { ...newMessage, id: docRef.id, timestamp: new Date().toISOString() };
  },
};
