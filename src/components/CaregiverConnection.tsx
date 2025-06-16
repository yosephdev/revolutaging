
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Phone, MessageCircle, Heart, Bell, CheckCircle } from 'lucide-react';

const CaregiverConnection = () => {
  const [selectedCaregiver, setSelectedCaregiver] = useState<string | null>(null);

  const caregivers = [
    {
      id: '1',
      name: 'Sarah (Daughter)',
      relationship: 'Family',
      phone: '+1 (555) 123-4567',
      lastContact: '2 hours ago',
      status: 'Available',
      emergencyContact: true
    },
    {
      id: '2',
      name: 'Dr. Johnson',
      relationship: 'Primary Care Doctor',
      phone: '+1 (555) 987-6543',
      lastContact: '3 days ago',
      status: 'Office Hours',
      emergencyContact: false
    },
    {
      id: '3',
      name: 'Maria (Home Aide)',
      relationship: 'Care Assistant',
      phone: '+1 (555) 555-0123',
      lastContact: 'Yesterday',
      status: 'Available',
      emergencyContact: true
    }
  ];

  const recentAlerts = [
    {
      id: '1',
      message: 'Medication reminder completed on time',
      timestamp: '1 hour ago',
      type: 'success',
      sentTo: ['Sarah (Daughter)']
    },
    {
      id: '2',
      message: 'Daily check-in: Everything is going well today!',
      timestamp: '3 hours ago',
      type: 'info',
      sentTo: ['Sarah (Daughter)', 'Maria (Home Aide)']
    },
    {
      id: '3',
      message: 'Weekly health report ready for review',
      timestamp: '1 day ago',
      type: 'info',
      sentTo: ['Dr. Johnson']
    }
  ];

  const handleCall = (caregiverId: string) => {
    const caregiver = caregivers.find(c => c.id === caregiverId);
    console.log(`Calling ${caregiver?.name} at ${caregiver?.phone}`);
    // In a real app, this would initiate a call
  };

  const handleMessage = (caregiverId: string) => {
    const caregiver = caregivers.find(c => c.id === caregiverId);
    console.log(`Sending message to ${caregiver?.name}`);
    // In a real app, this would open a messaging interface
  };

  return (
    <div className="space-y-6">
      {/* Emergency Contacts */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-t-lg">
          <CardTitle className="flex items-center text-2xl text-gray-800">
            <Users className="mr-3 h-8 w-8 text-blue-600" />
            Your Care Team
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6">
            {caregivers.map((caregiver) => (
              <Card
                key={caregiver.id}
                className={`transition-all duration-300 cursor-pointer border-2 ${
                  selectedCaregiver === caregiver.id
                    ? 'border-blue-400 shadow-lg'
                    : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                } ${caregiver.emergencyContact ? 'bg-red-50' : 'bg-white'}`}
                onClick={() => setSelectedCaregiver(caregiver.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-full ${
                        caregiver.emergencyContact ? 'bg-red-200' : 'bg-blue-200'
                      }`}>
                        {caregiver.emergencyContact ? (
                          <Heart className="h-8 w-8 text-red-600" />
                        ) : (
                          <Users className="h-8 w-8 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">{caregiver.name}</h3>
                        <p className="text-lg text-gray-600">{caregiver.relationship}</p>
                        <p className="text-base text-gray-500">Last contact: {caregiver.lastContact}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                        caregiver.status === 'Available' 
                          ? 'bg-green-200 text-green-800'
                          : 'bg-yellow-200 text-yellow-800'
                      }`}>
                        {caregiver.status}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCall(caregiver.id);
                          }}
                          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full"
                        >
                          <Phone className="h-5 w-5" />
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMessage(caregiver.id);
                          }}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full"
                        >
                          <MessageCircle className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Alerts & Communications */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-t-lg">
          <CardTitle className="flex items-center text-2xl text-gray-800">
            <Bell className="mr-3 h-8 w-8 text-purple-600" />
            Recent Updates
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-6 rounded-xl border-l-4 ${
                  alert.type === 'success'
                    ? 'bg-green-50 border-green-400'
                    : 'bg-blue-50 border-blue-400'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {alert.type === 'success' ? (
                      <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
                    ) : (
                      <Bell className="h-6 w-6 text-blue-600 mt-1" />
                    )}
                    <div>
                      <p className="text-lg font-semibold text-gray-800">{alert.message}</p>
                      <p className="text-base text-gray-600 mt-2">Sent to: {alert.sentTo.join(', ')}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{alert.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-orange-100 to-red-100 rounded-t-lg">
          <CardTitle className="flex items-center text-2xl text-gray-800">
            <Heart className="mr-3 h-8 w-8 text-orange-600" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-xl rounded-2xl shadow-lg">
              <Phone className="mr-3 h-6 w-6" />
              Call Family
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-xl rounded-2xl shadow-lg">
              <MessageCircle className="mr-3 h-6 w-6" />
              Send Update
            </Button>
            <Button className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-6 text-xl rounded-2xl shadow-lg">
              <Bell className="mr-3 h-6 w-6" />
              Share Health Report
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-xl rounded-2xl shadow-lg">
              <Heart className="mr-3 h-6 w-6" />
              Schedule Check-in
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CaregiverConnection;
