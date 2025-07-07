import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, AlertTriangle } from 'lucide-react';

interface VoiceCommandsProps {
  isListening: boolean;
  isSupported: boolean;
}

const VoiceCommands = ({ isListening, isSupported }: VoiceCommandsProps) => {
  if (!isSupported) {
    return (
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4 flex items-center">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3" />
          <p className="text-yellow-800">Voice commands are not supported on this browser.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`transition-all duration-300 ${isListening ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
      <CardContent className="p-4 flex items-center justify-center">
        <Mic className={`h-5 w-5 mr-3 ${isListening ? 'text-green-600 animate-pulse' : 'text-gray-600'}`} />
        <p className={`text-md font-medium ${isListening ? 'text-green-800' : 'text-gray-800'}`}>
          {isListening ? 'Listening...' : 'Voice commands are available.'}
        </p>
      </CardContent>
    </Card>
  );
};

export default VoiceCommands;