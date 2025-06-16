
import { useState, useEffect, useCallback } from 'react';

interface VoiceCommandConfig {
  onStartChat: () => void;
  onReadHealthSummary: () => void;
  onCallForHelp: () => void;
  onNavigateTo: (tab: string) => void;
}

export const useVoiceCommands = (config: VoiceCommandConfig) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const speechSynth = window.speechSynthesis;
    
    if (SpeechRecognition && speechSynth) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';
      
      setRecognition(recognitionInstance);
      setSpeechSynthesis(speechSynth);
      setIsSupported(true);
    }
  }, []);

  const speak = useCallback((text: string) => {
    if (speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      speechSynthesis.speak(utterance);
    }
  }, [speechSynthesis]);

  const processCommand = useCallback((command: string) => {
    const lowerCommand = command.toLowerCase();
    console.log('Voice command received:', lowerCommand);

    if (lowerCommand.includes('start chat') || lowerCommand.includes('chat with ai') || lowerCommand.includes('talk to companion')) {
      config.onStartChat();
      config.onNavigateTo('companion');
      speak('Starting chat with your AI companion');
    } else if (lowerCommand.includes('read health') || lowerCommand.includes('health summary') || lowerCommand.includes('my health')) {
      config.onReadHealthSummary();
      config.onNavigateTo('health');
      speak('Opening your health summary');
    } else if (lowerCommand.includes('call for help') || lowerCommand.includes('emergency') || lowerCommand.includes('help')) {
      config.onCallForHelp();
      speak('Calling for emergency help');
    } else if (lowerCommand.includes('show caregivers') || lowerCommand.includes('family')) {
      config.onNavigateTo('caregivers');
      speak('Opening family and caregivers');
    } else if (lowerCommand.includes('show alerts') || lowerCommand.includes('care alerts')) {
      config.onNavigateTo('alerts');
      speak('Opening care alerts');
    } else {
      speak('I didn\'t understand that command. Try saying start chat, read health summary, or call for help');
    }
  }, [config, speak]);

  const startListening = useCallback(() => {
    if (recognition && !isListening) {
      setIsListening(true);
      recognition.start();
      speak('Listening for your command');

      recognition.onresult = (event: any) => {
        const lastResult = event.results[event.results.length - 1];
        if (lastResult.isFinal) {
          processCommand(lastResult[0].transcript);
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        speak('Sorry, I had trouble hearing you');
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    }
  }, [recognition, isListening, processCommand, speak]);

  const stopListening = useCallback(() => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
      speak('Stopped listening');
    }
  }, [recognition, isListening, speak]);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  return {
    isListening,
    isSupported,
    startListening,
    stopListening,
    toggleListening,
    speak
  };
};
