
import React, { useState } from 'react';
import { Heart, MessageCircle, Activity, Users, Mic, MicOff, AlertTriangle, Menu, Pill } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import AICompanion from '@/components/AICompanion';
import HealthDashboard from '@/components/HealthDashboard';
import CaregiverConnection from '@/components/CaregiverConnection';
import CaregiverAlertSystem from '@/components/CaregiverAlertSystem';
import VoiceCommands from '@/components/VoiceCommands';
import { useVoiceCommands } from '@/hooks/useVoiceCommands';
import MedicationPage from './MedicationPage';

const Index = () => {
  const [activeTab, setActiveTab] = useState('companion');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const voiceConfig = {
    onStartChat: () => {
      console.log('Voice command: Start chat');
      toast({
        title: "Starting Chat",
        description: "Opening AI companion chat",
      });
    },
    onReadHealthSummary: () => {
      console.log('Voice command: Read health summary');
      toast({
        title: "Health Summary",
        description: "Opening your health dashboard",
      });
    },
    onCallForHelp: () => {
      console.log('Voice command: Call for help');
      toast({
        title: "Emergency Help",
        description: "Contacting emergency services",
        variant: "destructive"
      });
    },
    onNavigateTo: (tab: string) => {
      setActiveTab(tab);
    }
  };

  const { isListening, isSupported, toggleListening, speak } = useVoiceCommands(voiceConfig);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    
    const tabNames = {
      companion: 'AI companion',
      health: 'health summary',
      caregivers: 'family and caregivers',
      alerts: 'care alerts',
      medication: 'medication tracker'
    };
    speak(`Switched to ${tabNames[tab as keyof typeof tabNames]}`);
  };

  const navigationItems = [
    { key: 'companion', icon: MessageCircle, label: 'Chat with AI Friend' },
    { key: 'health', icon: Activity, label: 'Health Summary' },
    { key: 'medication', icon: Pill, label: 'Medication Tracker' },
    { key: 'caregivers', icon: Users, label: 'Family & Caregivers' },
    { key: 'alerts', icon: AlertTriangle, label: 'Care Alerts' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50">
      {/* Header - Fully Responsive */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-rose-100 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="bg-gradient-to-r from-rose-400 to-orange-400 p-1.5 sm:p-2 lg:p-3 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg">
                <Heart className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl lg:text-3xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
                  RevolutAging
                </h1>
                <p className="text-xs sm:text-sm lg:text-lg text-gray-600 hidden sm:block">Your caring AI companion</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-1 sm:space-x-2">
              {isSupported && (
                <Button
                  onClick={toggleListening}
                  size={isMobile ? "sm" : "default"}
                  className={`p-2 sm:p-3 lg:p-4 rounded-full shadow-lg transition-all duration-300 ${
                    isListening 
                      ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {isListening ? 
                    <MicOff className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" /> : 
                    <Mic className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                  }
                </Button>
              )}
              
              <Button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                variant="outline"
                size={isMobile ? "sm" : "default"}
                className="p-2 sm:p-3 rounded-full md:hidden"
              >
                <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation - Fully Responsive */}
      <nav className="container mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-6">
        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-wrap gap-2 sm:gap-3 lg:gap-4 justify-center">
          {navigationItems.map(({ key, icon: Icon, label }) => (
            <Button
              key={key}
              onClick={() => handleTabChange(key)}
              variant={activeTab === key ? 'default' : 'outline'}
              size="lg"
              className="px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-xl rounded-xl lg:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Icon className="mr-1.5 sm:mr-2 lg:mr-3 h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{label.split(' ')[0]}</span>
            </Button>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          {/* Mobile Tab Grid */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            {navigationItems.map(({ key, icon: Icon, label }) => (
              <Button
                key={key}
                onClick={() => handleTabchange(key)}
                variant={activeTab === key ? 'default' : 'outline'}
                className="p-3 sm:p-4 text-xs sm:text-sm rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center space-y-1 h-auto min-h-[4rem] sm:min-h-[5rem]"
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5 mb-1" />
                <span className="text-center leading-tight text-xs sm:text-sm font-medium">
                  {label.length > 15 ? label.split(' ').slice(0, 2).join(' ') : label}
                </span>
              </Button>
            ))}
          </div>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-rose-100 overflow-hidden mb-4">
              {navigationItems.map(({ key, icon: Icon, label }) => (
                <button
                  key={key}
                  onClick={() => handleTabChange(key)}
                  className={`w-full flex items-center px-4 sm:px-6 py-3 sm:py-4 text-left transition-colors ${
                    activeTab === key 
                      ? 'bg-rose-50 text-rose-700 border-l-4 border-rose-400' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="text-sm sm:text-lg font-medium">{label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Voice Commands Info - Responsive */}
      {isSupported && (
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 mb-4">
          <VoiceCommands isListening={isListening} isSupported={isSupported} />
        </div>
      )}

      {/* Main Content - Fully Responsive Container */}
      <main className="container mx-auto px-3 sm:px-4 lg:px-6 pb-20 sm:pb-24">
        <div className="w-full">
          {activeTab === 'companion' && <AICompanion />}
          {activeTab === 'health' && <HealthDashboard />}
          {activeTab === 'caregivers' && <CaregiverConnection />}
          {activeTab === 'alerts' && <CaregiverAlertSystem />}
          {activeTab === 'medication' && <MedicationPage />}
        </div>
      </main>

      {/* Emergency Button - Fully Responsive */}
      <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 lg:bottom-8 lg:right-8 z-50">
        <Button 
          onClick={() => {
            voiceConfig.onCallForHelp();
            speak('Emergency help requested');
          }}
          size={isMobile ? "default" : "lg"}
          className="bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-full text-sm sm:text-base lg:text-xl shadow-2xl animate-pulse hover:animate-none transition-all duration-300"
        >
          <Heart className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
          <span className="hidden xs:inline sm:hidden lg:inline">Emergency Help</span>
          <span className="xs:hidden sm:inline lg:hidden">Help</span>
        </Button>
      </div>
    </div>
  );
};

export default Index;
