
import React from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Heart } from 'lucide-react';

const TypingIndicator = () => {
  return (
    <div className="flex w-full mb-6 justify-start">
      <div className="flex items-start space-x-3 max-w-4xl">
        {/* Avatar */}
        <Avatar className="w-12 h-12 flex-shrink-0">
          <AvatarFallback className="bg-rose-100">
            <Heart className="h-6 w-6 text-rose-500" />
          </AvatarFallback>
        </Avatar>

        {/* Typing Content */}
        <Card className="bg-white text-gray-800 shadow-md border-gray-200">
          <div className="p-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-rose-600 mr-3">AI Companion</span>
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-rose-400 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-rose-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-3 h-3 bg-rose-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
              <span className="text-sm text-gray-500 ml-2">thinking...</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TypingIndicator;
