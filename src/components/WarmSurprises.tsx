
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, BookOpen, Sun, Wind } from 'lucide-react';

interface WarmSurprisesProps {
  onSurpriseSelect: (surprise: string) => void;
}

const WarmSurprises = ({ onSurpriseSelect }: WarmSurprisesProps) => {
  const [selectedSurprise, setSelectedSurprise] = useState<string | null>(null);

  const surprises = [
    {
      id: 'poem',
      title: 'Bedtime Poem',
      icon: BookOpen,
      description: 'A gentle poem to end your day',
      content: `
The day has been both long and sweet,
With moments that made life complete.
As evening's gentle curtain falls,
And peaceful quiet softly calls,

Let worries drift away like clouds,
Let silence comfort what once was loud.
Tomorrow brings a fresh new start,
With hope and joy within your heart.

Rest now, dear friend, in slumber deep,
While angels guard the dreams you keep.
Sweet dreams until the morning light
Brings warmth and wonder, fresh and bright.
      `
    },
    {
      id: 'affirmation',
      title: 'Daily Affirmation',
      icon: Sun,
      description: 'Positive words to brighten your day',
      content: `
You are valued, you are loved, you are enough.

Every day, you bring something special to this world - your wisdom, your kindness, your unique perspective that comes from a lifetime of experiences.

Your stories matter. Your laughter lights up rooms. Your gentle words have comforted others more times than you know.

You have weathered many storms and still you shine. You have loved deeply and been deeply loved in return.

Today is a gift, and you are a gift to everyone whose life you touch.

Remember: You are stronger than you know, braver than you feel, and more loved than you could ever imagine.
      `
    },
    {
      id: 'breathing',
      title: 'Breathing Exercise',
      icon: Wind,
      description: 'A calming 2-minute breathing practice',
      content: `
Let's take a few moments together for some peaceful breathing.

Find a comfortable position, whether sitting or lying down. Place one hand on your chest, and one on your belly.

**Breathe In (4 counts)**: Slowly breathe in through your nose... 1... 2... 3... 4...
Feel your belly gently rise.

**Hold (4 counts)**: Hold this breath gently... 1... 2... 3... 4...

**Breathe Out (6 counts)**: Slowly exhale through your mouth... 1... 2... 3... 4... 5... 6...
Feel your shoulders relax.

**Let's continue**: 
- In... 2... 3... 4...
- Hold... 2... 3... 4...
- Out... 2... 3... 4... 5... 6...

**One more time**:
- In... 2... 3... 4...
- Hold... 2... 3... 4...
- Out... 2... 3... 4... 5... 6...

Beautiful. Notice how your body feels now - more relaxed, more centered. You can return to this peaceful breathing anytime you need a moment of calm.
      `
    }
  ];

  const handleSurpriseClick = (surprise: any) => {
    setSelectedSurprise(surprise.id);
    onSurpriseSelect(surprise.content);
  };

  return (
    <Card className="mb-4 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
      <CardHeader>
        <CardTitle className="flex items-center text-amber-800">
          <Heart className="mr-2 h-5 w-5 text-amber-600" />
          Daily Warm Surprises
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-amber-700 mb-4 text-sm">
          Sometimes we all need a little extra warmth and comfort. Choose something special for yourself:
        </p>
        <div className="grid gap-3">
          {surprises.map((surprise) => {
            const Icon = surprise.icon;
            return (
              <Button
                key={surprise.id}
                onClick={() => handleSurpriseClick(surprise)}
                variant="outline"
                className="flex items-center justify-start p-4 h-auto text-left hover:bg-amber-100 border-amber-300"
              >
                <Icon className="mr-3 h-5 w-5 text-amber-600 flex-shrink-0" />
                <div>
                  <div className="font-medium text-amber-800">{surprise.title}</div>
                  <div className="text-sm text-amber-600">{surprise.description}</div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default WarmSurprises;
