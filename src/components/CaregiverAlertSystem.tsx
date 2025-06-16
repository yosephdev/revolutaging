
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock, Heart, Activity, Phone, Mail, MessageSquare, Filter, X, CheckCircle, Bell } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { alertsAPI, CaregiverAlert } from '@/services/api';
import { useIsMobile } from '@/hooks/use-mobile';

const CaregiverAlertSystem = () => {
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
  const [showResolved, setShowResolved] = useState(false);
  const isMobile = useIsMobile();

  const { data: alerts = [], isLoading } = useQuery({
    queryKey: ['caregiverAlerts'],
    queryFn: alertsAPI.getAlerts,
  });

  const filteredAlerts = (alerts as CaregiverAlert[]).filter(alert => {
    if (!showResolved && alert.resolved) return false;
    if (selectedPriority && alert.severity !== selectedPriority) return false;
    return true;
  });

  const priorityColors = {
    urgent: 'bg-red-100 text-red-800 border-red-200',
    high: 'bg-red-100 text-red-800 border-red-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-green-100 text-green-800 border-green-200'
  };

  const priorityIcons = {
    urgent: <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4" />,
    high: <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4" />,
    medium: <Clock className="h-3 w-3 sm:h-4 sm:w-4" />,
    low: <Bell className="h-3 w-3 sm:h-4 sm:w-4" />
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'health': return <Heart className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />;
      case 'activity': return <Activity className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />;
      case 'medication': return <Clock className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />;
      default: return <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-base sm:text-xl lg:text-2xl text-gray-600">Loading care alerts...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="text-center space-y-2 sm:space-y-3">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">Smart Care Alerts</h2>
        <p className="text-sm sm:text-base lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          AI-powered monitoring keeps your loved ones safe with intelligent health and activity alerts
        </p>
      </div>

      {/* Filter Controls */}
      <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="pb-2 sm:pb-4">
          <CardTitle className="flex items-center text-lg sm:text-xl lg:text-2xl text-gray-800">
            <Filter className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
            Filter Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 sm:space-y-4">
            {/* Priority Filter */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Priority Level</label>
              <div className="flex flex-wrap gap-2">
                {['urgent', 'high', 'medium', 'low'].map((priority) => (
                  <Button
                    key={priority}
                    onClick={() => setSelectedPriority(selectedPriority === priority ? null : priority)}
                    variant={selectedPriority === priority ? 'default' : 'outline'}
                    size={isMobile ? "sm" : "default"}
                    className="capitalize text-xs sm:text-sm"
                  >
                    {priorityIcons[priority as keyof typeof priorityIcons]}
                    <span className="ml-1 sm:ml-2">{priority}</span>
                    {selectedPriority === priority && <X className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />}
                  </Button>
                ))}
              </div>
            </div>

            {/* Show Resolved Toggle */}
            <div className="flex items-center justify-between">
              <label className="text-sm sm:text-base font-medium text-gray-700">Show Resolved Alerts</label>
              <Button
                onClick={() => setShowResolved(!showResolved)}
                variant={showResolved ? 'default' : 'outline'}
                size={isMobile ? "sm" : "default"}
                className="text-xs sm:text-sm"
              >
                {showResolved ? <CheckCircle className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> : null}
                {showResolved ? 'Hide Resolved' : 'Show Resolved'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-0 shadow-lg">
          <CardContent className="p-3 sm:p-4 lg:p-6 text-center">
            <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 lg:h-12 lg:w-12 text-red-600 mx-auto mb-2" />
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-800">
              {(alerts as CaregiverAlert[]).filter(a => (a.severity === 'urgent' || a.severity === 'high') && !a.resolved).length}
            </h3>
            <p className="text-xs sm:text-sm lg:text-base text-red-600">Urgent Alerts</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-0 shadow-lg">
          <CardContent className="p-3 sm:p-4 lg:p-6 text-center">
            <Clock className="h-6 w-6 sm:h-8 sm:w-8 lg:h-12 lg:w-12 text-yellow-600 mx-auto mb-2" />
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-800">
              {(alerts as CaregiverAlert[]).filter(a => a.severity === 'medium' && !a.resolved).length}
            </h3>
            <p className="text-xs sm:text-sm lg:text-base text-yellow-600">Medium Priority</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg">
          <CardContent className="p-3 sm:p-4 lg:p-6 text-center">
            <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 lg:h-12 lg:w-12 text-green-600 mx-auto mb-2" />
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-800">
              {(alerts as CaregiverAlert[]).filter(a => a.resolved).length}
            </h3>
            <p className="text-xs sm:text-sm lg:text-base text-green-600">Resolved</p>
          </CardContent>
        </Card>
      </div>

      {/* Alert List */}
      <div className="space-y-3 sm:space-y-4 lg:space-y-6">
        {filteredAlerts.length === 0 ? (
          <Card className="shadow-lg border-0 bg-white/95">
            <CardContent className="p-6 sm:p-8 lg:p-12 text-center">
              <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-2">All Clear!</h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                No alerts match your current filters. Everything looks good!
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredAlerts.map((alert) => (
            <Card key={alert.id} className={`shadow-xl border-0 ${alert.resolved ? 'opacity-75' : ''}`}>
              <CardHeader className="pb-2 sm:pb-3">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-2 sm:space-y-0">
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <div className={`p-2 sm:p-3 rounded-lg ${
                      alert.type === 'health' ? 'bg-red-100' :
                      alert.type === 'activity' ? 'bg-blue-100' : 'bg-purple-100'
                    }`}>
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base sm:text-lg lg:text-xl text-gray-800 leading-tight">
                        {alert.title}
                      </CardTitle>
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1 sm:mt-2">
                        <Badge className={`${priorityColors[alert.severity]} text-xs px-1.5 py-0.5`}>
                          {priorityIcons[alert.severity]}
                          <span className="ml-1 capitalize">{alert.severity}</span>
                        </Badge>
                        <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                          {new Date(alert.timestamp).toLocaleDateString()}
                        </Badge>
                        {alert.resolved && (
                          <Badge className="bg-green-100 text-green-800 text-xs px-1.5 py-0.5">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Resolved
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-3 sm:mb-4 leading-relaxed">
                  {alert.description}
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-3 sm:p-4 rounded-r-lg mb-3 sm:mb-4">
                  <p className="text-xs sm:text-sm lg:text-base text-blue-800 font-medium mb-1">AI Suggestion:</p>
                  <p className="text-xs sm:text-sm lg:text-base text-blue-700 leading-relaxed">
                    Consider monitoring this situation closely and contacting healthcare provider if condition persists.
                  </p>
                </div>

                {!alert.resolved && (
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <Button 
                      size={isMobile ? "sm" : "default"}
                      className="bg-blue-500 hover:bg-blue-600 text-xs sm:text-sm flex-1 sm:flex-none"
                    >
                      <Phone className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      Call
                    </Button>
                    <Button 
                      variant="outline" 
                      size={isMobile ? "sm" : "default"}
                      className="text-xs sm:text-sm flex-1 sm:flex-none"
                    >
                      <Mail className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      Email
                    </Button>
                    <Button 
                      variant="outline" 
                      size={isMobile ? "sm" : "default"}
                      className="text-xs sm:text-sm flex-1 sm:flex-none"
                    >
                      <MessageSquare className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      Message
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CaregiverAlertSystem;
