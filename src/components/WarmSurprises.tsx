import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift, Music, BookOpen, Camera } from 'lucide-react';

interface WarmSurprisesProps {
  onSurpriseSelect: (surprise: string) => void;
}

const WarmSurprises = ({ onSurpriseSelect }: WarmSurprisesProps) => {
  const surprises = [
    {
      title: 'A Happy Memory',
      icon: Camera,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      content: 'Remember that time we talked about your favorite vacation? I found a beautiful picture of a similar place to bring back those happy memories.',
    },
    {
      title: 'Your Favorite Song',
      icon: Music,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      content: 'I remember you mentioning you love classical music. Here is a beautiful piece by Chopin to brighten your day.',
    },
    {
      title: 'A Poem for You',
      icon: BookOpen,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      content: 'I found a lovely poem about hope and resilience that reminded me of your strength. I hope you like it.',
    },
    {
      title: 'A Little Joke',
      icon: Gift,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      content: "Why don't scientists trust atoms? Because they make up everything! I hope that brought a little smile to your face.",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">A little surprise for you!</h3>
        <p className="text-md text-gray-600">I remembered something you might like:</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {surprises.map((surprise, index) => {
          const IconComponent = surprise.icon;
          return (
            <Card key={index} className={`${surprise.bgColor} border-2`}>
              <CardHeader className="pb-2">
                <CardTitle className={`flex items-center text-lg ${surprise.color}`}>
                  <IconComponent className="mr-2 h-5 w-5" />
                  {surprise.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-md text-gray-700 mb-3">{surprise.content}</p>
                <Button
                  onClick={() => onSurpriseSelect(surprise.content)}
                  variant="outline"
                  className="w-full text-left p-2 h-auto text-sm justify-start bg-white hover:bg-gray-50 border-gray-300"
                >
                  Talk about this
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default WarmSurprises;