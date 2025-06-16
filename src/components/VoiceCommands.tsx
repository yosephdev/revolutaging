
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mic, Volume2 } from 'lucide-react';

interface VoiceCommandsProps {
  isListening: boolean;
  isSupported: boolean;
}

const VoiceCommands = ({ isListening, isSupported }: VoiceCommandsProps) => {
  if (!isSupported) {
    return null;
  }

  const commands = [
    { phrase: '"Start chat" or "Talk to companion"', action: 'Opens AI companion chat' },
    { phrase: '"Read health summary" or "My health"', action: 'Opens health dashboard' },
    { phrase: '"Call for help" or "Emergency"', action: 'Triggers emergency contact' },
    { phrase: '"Show caregivers" or "Family"', action: 'Opens family & caregivers' },
    { phrase: '"Show alerts"', action: 'Opens care alerts' }
  ];

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="h-5 w-5" />
          Voice Commands
          {isListening && (
            <Badge className="bg-red-500 animate-pulse">
              <Mic className="h-3 w-3 mr-1" />
              Listening
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-sm text-gray-600 mb-4">
            Press the microphone button and say one of these commands:
          </p>
          {commands.map((command, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-2">
              <Badge variant="outline" className="text-sm font-mono">
                {command.phrase}
              </Badge>
              <span className="text-sm text-gray-600">{command.action}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceCommands;
