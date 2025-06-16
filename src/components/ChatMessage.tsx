
import React from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Heart, User } from 'lucide-react';

interface ChatMessageProps {
  message: {
    id: number;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
    mood?: string;
    topic?: string;
  };
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex w-full mb-6 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-start space-x-3 max-w-4xl ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <Avatar className="w-12 h-12 flex-shrink-0">
          <AvatarFallback className={message.sender === 'user' ? 'bg-blue-100' : 'bg-rose-100'}>
            {message.sender === 'user' ? (
              <User className="h-6 w-6 text-blue-600" />
            ) : (
              <Heart className="h-6 w-6 text-rose-500" />
            )}
          </AvatarFallback>
        </Avatar>

        {/* Message Content */}
        <Card className={`flex-1 ${
          message.sender === 'user' 
            ? 'bg-blue-500 text-white border-blue-500' 
            : 'bg-white text-gray-800 shadow-md border-gray-200'
        }`}>
          <div className="p-6">
            {/* Sender Label */}
            <div className="flex items-center justify-between mb-3">
              <span className={`text-sm font-medium ${
                message.sender === 'user' ? 'text-blue-100' : 'text-rose-600'
              }`}>
                {message.sender === 'user' ? 'You' : 'AI Companion'}
              </span>
              <span className={`text-xs ${
                message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'
              }`}>
                {formatTime(message.timestamp)}
              </span>
            </div>

            {/* Message Text */}
            <p className="text-lg leading-relaxed whitespace-pre-line">
              {message.text}
            </p>

            {/* Mood/Topic Indicators */}
            {(message.mood || message.topic) && (
              <div className="flex gap-2 mt-3">
                {message.mood && (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    message.sender === 'user' 
                      ? 'bg-blue-400 text-blue-100' 
                      : 'bg-rose-100 text-rose-700'
                  }`}>
                    Mood: {message.mood}
                  </span>
                )}
                {message.topic && (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    message.sender === 'user' 
                      ? 'bg-blue-400 text-blue-100' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    Topic: {message.topic}
                  </span>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ChatMessage;
