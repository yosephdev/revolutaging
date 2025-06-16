
// Mock API service for backend integration
// Replace these with real API endpoints when backend is ready

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

// Enhanced mock data for better dashboard visualization
const mockHealthData: HealthMetrics = {
  sleepHours: 7.8,
  steps: 4250,
  moodRating: 8,
  heartRate: 72,
  bloodPressure: {
    systolic: 120,
    diastolic: 80
  },
  lastUpdated: new Date().toISOString(),
  weeklySteps: [3800, 4200, 3600, 4500, 4800, 5200, 4250],
  weeklySleep: [7.2, 8.1, 6.8, 7.9, 8.2, 8.5, 7.8],
  weeklyMood: [7, 8, 6, 9, 8, 9, 8],
  stepsGoal: 5000,
  sleepGoal: 8
};

const mockAlerts: CaregiverAlert[] = [
  {
    id: '1',
    type: 'activity',
    severity: 'medium',
    title: 'Low Activity Today',
    description: 'Only 500 steps recorded by 2 PM',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    resolved: false
  },
  {
    id: '2',
    type: 'medication',
    severity: 'high',
    title: 'Medication Reminder',
    description: 'Blood pressure medication due at 6 PM',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    resolved: false
  },
  {
    id: '3',
    type: 'health',
    severity: 'low',
    title: 'Sleep Pattern Change',
    description: 'Bedtime was 1 hour later than usual last night',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    resolved: false
  }
];

// API functions - replace URLs with real backend endpoints
export const healthAPI = {
  // GET /api/health/metrics
  getHealthMetrics: async (): Promise<HealthMetrics> => {
    console.log('API Call: GET /api/health/metrics (mock)');
    return new Promise(resolve => 
      setTimeout(() => resolve(mockHealthData), 500)
    );
  },

  // POST /api/health/metrics
  updateHealthMetrics: async (metrics: Partial<HealthMetrics>): Promise<HealthMetrics> => {
    console.log('API Call: POST /api/health/metrics (mock)', metrics);
    return new Promise(resolve => 
      setTimeout(() => resolve({ ...mockHealthData, ...metrics }), 500)
    );
  },

  // GET /api/health/trends
  getHealthTrends: async (period: 'week' | 'month'): Promise<any> => {
    console.log('API Call: GET /api/health/trends (mock)', { period });
    return new Promise(resolve => 
      setTimeout(() => resolve({
        steps: mockHealthData.weeklySteps,
        sleep: mockHealthData.weeklySleep,
        mood: mockHealthData.weeklyMood
      }), 500)
    );
  }
};

export const alertsAPI = {
  // GET /api/alerts
  getAlerts: async (): Promise<CaregiverAlert[]> => {
    console.log('API Call: GET /api/alerts (mock)');
    return new Promise(resolve => 
      setTimeout(() => resolve(mockAlerts), 500)
    );
  },

  // PUT /api/alerts/:id/resolve
  resolveAlert: async (alertId: string): Promise<CaregiverAlert> => {
    console.log('API Call: PUT /api/alerts/' + alertId + '/resolve (mock)');
    const alert = mockAlerts.find(a => a.id === alertId);
    if (alert) alert.resolved = true;
    return new Promise(resolve => 
      setTimeout(() => resolve(alert!), 500)
    );
  },

  // POST /api/alerts
  createAlert: async (alert: Omit<CaregiverAlert, 'id' | 'timestamp'>): Promise<CaregiverAlert> => {
    console.log('API Call: POST /api/alerts (mock)', alert);
    const newAlert: CaregiverAlert = {
      ...alert,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString()
    };
    return new Promise(resolve => 
      setTimeout(() => resolve(newAlert), 500)
    );
  }
};

export const chatAPI = {
  // POST /api/chat
  sendMessage: async (message: string): Promise<string> => {
    console.log('API Call: POST /api/chat (mock)', { message });
    
    // Enhanced AI responses based on message content
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
    
    return new Promise(resolve => 
      setTimeout(() => resolve(response), 1000)
    );
  },

  // GET /api/chat/history
  getChatHistory: async (): Promise<ChatMessage[]> => {
    console.log('API Call: GET /api/chat/history (mock)');
    return new Promise(resolve => 
      setTimeout(() => resolve([]), 500)
    );
  },

  // POST /api/chat/save
  saveChatMessage: async (message: ChatMessage): Promise<ChatMessage> => {
    console.log('API Call: POST /api/chat/save (mock)', message);
    return new Promise(resolve => 
      setTimeout(() => resolve(message), 300)
    );
  }
};
