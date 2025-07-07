import { useState, useEffect } from 'react';

interface VoiceConfig {
  onStartChat: () => void;
  onReadHealthSummary: () => void;
  onCallForHelp: () => void;
  onNavigateTo: (tab: string) => void;
}

const useVoiceCommands = (config: VoiceConfig) => {
  const [isListening, setIsListening] = useState(false);
  const isSupported = typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  const toggleListening = () => {
    setIsListening((prevState) => !prevState);
  };

  const speak = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (isSupported) {
      // Voice command logic would go here
    }
  }, [isSupported]);

  return { isListening, isSupported, toggleListening, speak };
};

export default useVoiceCommands;