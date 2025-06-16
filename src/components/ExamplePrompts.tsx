
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Heart, Clock, Users } from 'lucide-react';

interface ExamplePromptsProps {
  onPromptSelect: (prompt: string) => void;
}

const ExamplePrompts = ({ onPromptSelect }: ExamplePromptsProps) => {
  const examplePrompts = [
    {
      category: 'Health Reminders',
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      prompts: [
        'Remind me to take my blood pressure pill at 6 PM',
        'I need help remembering to drink water throughout the day',
        'Can you remind me about my doctor appointment tomorrow?'
      ]
    },
    {
      category: 'Emotional Support',
      icon: Heart,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      prompts: [
        'I feel a bit lonely today...',
        'I\'m worried about my family',
        'Can we talk about something cheerful?'
      ]
    },
    {
      category: 'Daily Chat',
      icon: MessageSquare,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      prompts: [
        'How was my day yesterday?',
        'Tell me something interesting',
        'What\'s the weather like today?'
      ]
    },
    {
      category: 'Family & Social',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      prompts: [
        'Help me call my daughter',
        'I want to share a memory about my grandchildren',
        'Can you help me stay connected with friends?'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">How can I help you today?</h3>
        <p className="text-lg text-gray-600">Try one of these conversation starters:</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {examplePrompts.map((category, categoryIndex) => {
          const IconComponent = category.icon;
          return (
            <Card key={categoryIndex} className={`${category.bgColor} ${category.borderColor} border-2`}>
              <CardHeader className="pb-4">
                <CardTitle className={`flex items-center text-xl ${category.color}`}>
                  <IconComponent className="mr-3 h-6 w-6" />
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.prompts.map((prompt, promptIndex) => (
                    <Button
                      key={promptIndex}
                      onClick={() => onPromptSelect(prompt)}
                      variant="outline"
                      className="w-full text-left p-4 h-auto text-base justify-start bg-white hover:bg-gray-50 border-gray-300"
                    >
                      "{prompt}"
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ExamplePrompts;
