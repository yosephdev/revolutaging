import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Heart, Send, Clock } from 'lucide-react';
import WarmSurprises from './WarmSurprises';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import ExamplePrompts from './ExamplePrompts';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  mood?: string;
  topic?: string;
}

interface ConversationMemory {
  lastMood: string;
  lastTopic: string;
  importantTopics: string[];
  userPreferences: string[];
  lastConversationDate: string;
}

const AICompanion = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showExamplePrompts, setShowExamplePrompts] = useState(true);
  const [conversationMemory, setConversationMemory] = useState<ConversationMemory>({
    lastMood: '',
    lastTopic: '',
    importantTopics: [],
    userPreferences: [],
    lastConversationDate: ''
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  // Load conversation history and memory from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('ai-companion-messages');
    const savedMemory = localStorage.getItem('ai-companion-memory');
    
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
      setMessages(parsedMessages);
      setShowExamplePrompts(parsedMessages.length === 0);
    } else {
      // Initialize with welcome message
      const welcomeMessage = getWelcomeMessage();
      setMessages([welcomeMessage]);
    }

    if (savedMemory) {
      setConversationMemory(JSON.parse(savedMemory));
    }
  }, []);

  // Save messages and memory to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('ai-companion-messages', JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('ai-companion-memory', JSON.stringify(conversationMemory));
  }, [conversationMemory]);

  const getWelcomeMessage = (): Message => {
    const memory = JSON.parse(localStorage.getItem('ai-companion-memory') || '{}');
    const lastDate = memory.lastConversationDate;
    const lastMood = memory.lastMood;
    const lastTopic = memory.lastTopic;

    let welcomeText = "Hello there! I'm so glad to see you today.";

    if (lastDate && lastMood) {
      const daysSince = Math.floor((Date.now() - new Date(lastDate).getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysSince === 0) {
        welcomeText = `Welcome back! Earlier you mentioned feeling ${lastMood}. How are you feeling now?`;
      } else if (daysSince === 1) {
        welcomeText = `Good to see you again! Yesterday you seemed ${lastMood}${lastTopic ? ` and we talked about ${lastTopic}` : ''}. How has your day been today?`;
      } else if (daysSince <= 7) {
        welcomeText = `It's wonderful to see you again! Last time we spoke, you were feeling ${lastMood}${lastTopic ? ` and we discussed ${lastTopic}` : ''}. How have you been since then?`;
      } else {
        welcomeText = `Hello, my dear friend! It's been a while since we last talked. I remember you mentioning ${lastTopic || 'some important things'}. I'd love to catch up - how have you been?`;
      }
    }

    return {
      id: 1,
      text: welcomeText,
      sender: 'ai',
      timestamp: new Date()
    };
  };

  const detectMoodAndTopic = (message: string): { mood: string, topic: string } => {
    const lowerMessage = message.toLowerCase();
    
    let mood = '';
    if (lowerMessage.includes('happy') || lowerMessage.includes('good') || lowerMessage.includes('great') || lowerMessage.includes('wonderful')) {
      mood = 'happy';
    } else if (lowerMessage.includes('sad') || lowerMessage.includes('down') || lowerMessage.includes('upset') || lowerMessage.includes('depressed')) {
      mood = 'sad';
    } else if (lowerMessage.includes('worried') || lowerMessage.includes('anxious') || lowerMessage.includes('nervous') || lowerMessage.includes('concerned')) {
      mood = 'worried';
    } else if (lowerMessage.includes('tired') || lowerMessage.includes('exhausted') || lowerMessage.includes('sleepy')) {
      mood = 'tired';
    } else if (lowerMessage.includes('lonely') || lowerMessage.includes('alone') || lowerMessage.includes('isolated')) {
      mood = 'lonely';
    }

    let topic = '';
    if (lowerMessage.includes('family') || lowerMessage.includes('children') || lowerMessage.includes('grandchildren')) {
      topic = 'family';
    } else if (lowerMessage.includes('health') || lowerMessage.includes('doctor') || lowerMessage.includes('medicine') || lowerMessage.includes('pain')) {
      topic = 'health';
    } else if (lowerMessage.includes('hobby') || lowerMessage.includes('garden') || lowerMessage.includes('reading') || lowerMessage.includes('music')) {
      topic = 'hobbies';
    } else if (lowerMessage.includes('friend') || lowerMessage.includes('neighbor') || lowerMessage.includes('social')) {
      topic = 'social';
    } else if (lowerMessage.includes('memory') || lowerMessage.includes('remember') || lowerMessage.includes('forget')) {
      topic = 'memories';
    }

    return { mood, topic };
  };

  const getContextualResponse = (userMessage: string, detectedMood: string, detectedTopic: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    const contextualResponses = {
      followUpMood: {
        happy: [
          `I'm so happy to hear you're feeling good! Last time you seemed ${conversationMemory.lastMood}, so it's wonderful to see this positive change. What's been bringing you joy?`,
          `Your happiness is contagious! I remember you were ${conversationMemory.lastMood} before, and I'm thrilled things are looking up. Tell me more about what's lifted your spirits.`
        ],
        sad: [
          `I can hear that you're feeling down, and that's okay. ${conversationMemory.lastMood === 'happy' ? "I know last time you were feeling much brighter, and that shows you have that happiness inside you." : "I'm here to listen and support you through this."} What's been weighing on your heart?`,
          `I'm sorry you're feeling sad today. ${conversationMemory.lastTopic ? `I remember we talked about ${conversationMemory.lastTopic} before - is that still on your mind?` : "Would you like to share what's troubling you?"}`
        ],
        worried: [
          `I can sense your worry, and I want you to know that's completely understandable. ${conversationMemory.lastMood === 'worried' ? "I remember you had some concerns last time too." : ""} Sometimes sharing our worries can help lighten the load. What's been on your mind?`,
          `Your concerns are valid, and I'm here to listen. ${conversationMemory.lastTopic === 'health' ? "Is this related to the health concerns we discussed before?" : "What's been causing you to feel this way?"}`
        ]
      },
      topicFollowUp: {
        family: [
          `Family is so important! ${conversationMemory.lastTopic === 'family' ? "I remember you mentioning your family before. How are they doing now?" : "Tell me about your family - they clearly mean a lot to you."}`,
          `It's lovely that you're thinking about family. ${conversationMemory.importantTopics.includes('family') ? "You've mentioned them before, and I can tell how much they mean to you." : ""} What's happening with them?`
        ],
        health: [
          `Your health is so important, and I'm glad you're thinking about it. ${conversationMemory.lastTopic === 'health' ? "How have you been feeling since we last talked about your health?" : "How are you feeling physically today?"}`,
          `Taking care of yourself is wonderful. ${conversationMemory.lastMood === 'tired' ? "Last time you mentioned feeling tired - has that improved?" : "What aspects of your health are on your mind?"}`
        ]
      },
      general: [
        `Thank you for sharing that with me. ${conversationMemory.lastTopic ? `Last time we talked about ${conversationMemory.lastTopic}, and` : ""} I always enjoy learning more about your experiences. Please, tell me more.`,
        `I really value our conversations. ${conversationMemory.lastMood ? `I remember you were feeling ${conversationMemory.lastMood} when we last spoke.` : ""} How are things with you today?`
      ]
    };

    if (detectedMood && contextualResponses.followUpMood[detectedMood as keyof typeof contextualResponses.followUpMood]) {
      const responses = contextualResponses.followUpMood[detectedMood as keyof typeof contextualResponses.followUpMood];
      return responses[Math.floor(Math.random() * responses.length)];
    } else if (detectedTopic && contextualResponses.topicFollowUp[detectedTopic as keyof typeof contextualResponses.topicFollowUp]) {
      const responses = contextualResponses.topicFollowUp[detectedTopic as keyof typeof contextualResponses.topicFollowUp];
      return responses[Math.floor(Math.random() * responses.length)];
    } else {
      return contextualResponses.general[Math.floor(Math.random() * contextualResponses.general.length)];
    }
  };

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputMessage;
    if (!textToSend.trim()) return;

    setShowExamplePrompts(false);
    const { mood, topic } = detectMoodAndTopic(textToSend);

    const userMessage: Message = {
      id: messages.length + 1,
      text: textToSend,
      sender: 'user',
      timestamp: new Date(),
      mood,
      topic
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Update conversation memory
    const updatedMemory = {
      ...conversationMemory,
      lastMood: mood || conversationMemory.lastMood,
      lastTopic: topic || conversationMemory.lastTopic,
      lastConversationDate: new Date().toISOString(),
      importantTopics: topic && !conversationMemory.importantTopics.includes(topic) 
        ? [...conversationMemory.importantTopics, topic] 
        : conversationMemory.importantTopics
    };
    setConversationMemory(updatedMemory);

    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: getContextualResponse(textToSend, mood, topic),
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const clearMemory = () => {
    localStorage.removeItem('ai-companion-messages');
    localStorage.removeItem('ai-companion-memory');
    const welcomeMessage = getWelcomeMessage();
    setMessages([welcomeMessage]);
    setConversationMemory({
      lastMood: '',
      lastTopic: '',
      importantTopics: [],
      userPreferences: [],
      lastConversationDate: ''
    });
    setShowExamplePrompts(true);
  };

  const handleSurpriseSelect = (surpriseContent: string) => {
    const surpriseMessage: Message = {
      id: messages.length + 1,
      text: surpriseContent,
      sender: 'ai',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, surpriseMessage]);
    setShowExamplePrompts(false);
  };

  const handlePromptSelect = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-rose-100 to-orange-100 rounded-t-lg">
          <CardTitle className="flex items-center justify-between text-2xl text-gray-800">
            <div className="flex items-center">
              <Heart className="mr-3 h-8 w-8 text-rose-500" />
              Your AI Companion
            </div>
            {conversationMemory.lastConversationDate && (
              <div className="text-sm text-gray-600 flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                Remembers your conversations
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Warm Surprises */}
          <WarmSurprises onSurpriseSelect={handleSurpriseSelect} />

          {/* Example Prompts */}
          {showExamplePrompts && messages.length <= 1 && (
            <div className="mb-6">
              <ExamplePrompts onPromptSelect={handlePromptSelect} />
            </div>
          )}

          {/* Messages */}
          <div className="min-h-96 max-h-96 overflow-y-auto mb-6 bg-gray-50 rounded-xl p-6">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Memory Indicator */}
          {conversationMemory.lastMood && (
            <div className="mb-4 p-4 bg-rose-50 rounded-xl border border-rose-200">
              <p className="text-base text-rose-700">
                <strong>I remember:</strong> Last time you were feeling {conversationMemory.lastMood}
                {conversationMemory.lastTopic && ` and we talked about ${conversationMemory.lastTopic}`}
              </p>
            </div>
          )}

          {/* Input */}
          <div className="flex space-x-4">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              className="text-lg px-6 py-4 rounded-full border-2 border-gray-200 focus:border-rose-300"
            />
            <Button
              onClick={() => handleSendMessage()}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 shadow-lg"
            >
              <Send className="h-6 w-6" />
            </Button>
          </div>

          {/* Clear Memory Button */}
          <div className="mt-4 text-center">
            <Button
              onClick={clearMemory}
              variant="outline"
              className="text-base px-6 py-3 text-gray-500 hover:text-gray-700"
            >
              Clear conversation memory
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AICompanion;
