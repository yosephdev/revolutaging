
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Heart, Calendar, Clock, TrendingUp, TrendingDown, Smile } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { healthAPI } from '@/services/api';
import { useIsMobile } from '@/hooks/use-mobile';

const HealthDashboard = () => {
  const isMobile = useIsMobile();
  
  // Fetch health data from API service
  const { data: healthMetrics, isLoading } = useQuery({
    queryKey: ['healthMetrics'],
    queryFn: healthAPI.getHealthMetrics,
  });

  // Mock weekly trend data - this will come from backend later
  const weeklyTrends = {
    mood: [
      { day: 'Mon', value: 7, label: 'Good', emoji: '😊' },
      { day: 'Tue', value: 8, label: 'Great', emoji: '😄' },
      { day: 'Wed', value: 6, label: 'Okay', emoji: '😐' },
      { day: 'Thu', value: 9, label: 'Excellent', emoji: '😁' },
      { day: 'Fri', value: 8, label: 'Great', emoji: '😄' },
      { day: 'Sat', value: 9, label: 'Excellent', emoji: '😁' },
      { day: 'Sun', value: 8, label: 'Great', emoji: '😄' }
    ],
    sleep: [
      { day: 'Mon', value: 7.2, quality: 'Good' },
      { day: 'Tue', value: 8.1, quality: 'Excellent' },
      { day: 'Wed', value: 6.8, quality: 'Fair' },
      { day: 'Thu', value: 7.9, quality: 'Good' },
      { day: 'Fri', value: 8.2, quality: 'Excellent' },
      { day: 'Sat', value: 8.5, quality: 'Excellent' },
      { day: 'Sun', value: 7.8, quality: 'Good' }
    ],
    steps: [
      { day: 'Mon', value: 3800, goal: 5000 },
      { day: 'Tue', value: 4200, goal: 5000 },
      { day: 'Wed', value: 3600, goal: 5000 },
      { day: 'Thu', value: 4500, goal: 5000 },
      { day: 'Fri', value: 4800, goal: 5000 },
      { day: 'Sat', value: 5200, goal: 5000 },
      { day: 'Sun', value: 4250, goal: 5000 }
    ]
  };

  const chartConfig = {
    value: {
      label: "Value",
      color: "hsl(var(--primary))",
    },
  };

  // Calculate trend improvements
  const moodImprovement = weeklyTrends.mood[6].value - weeklyTrends.mood[0].value;
  const sleepImprovement = weeklyTrends.sleep[6].value - weeklyTrends.sleep[0].value;
  const stepsImprovement = weeklyTrends.steps[6].value - weeklyTrends.steps[0].value;
  const averageSteps = Math.round(weeklyTrends.steps.reduce((sum, day) => sum + day.value, 0) / 7);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-xl sm:text-2xl text-gray-600">Loading your health summary...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Current Health Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-xl">
          <CardContent className="p-4 sm:p-8 text-center">
            <Activity className="h-10 w-10 sm:h-16 sm:w-16 text-blue-600 mx-auto mb-2 sm:mb-4" />
            <h3 className="text-2xl sm:text-4xl font-bold text-blue-800 mb-1 sm:mb-2">{healthMetrics?.steps || 4250}</h3>
            <p className="text-sm sm:text-xl text-blue-600 mb-1 sm:mb-2">Steps Today</p>
            <p className="text-xs sm:text-lg text-blue-500">Goal: 5,000 steps</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-0 shadow-xl">
          <CardContent className="p-4 sm:p-8 text-center">
            <Heart className="h-10 w-10 sm:h-16 sm:w-16 text-red-600 mx-auto mb-2 sm:mb-4" />
            <h3 className="text-2xl sm:text-4xl font-bold text-red-800 mb-1 sm:mb-2">{healthMetrics?.heartRate || 72}</h3>
            <p className="text-sm sm:text-xl text-red-600 mb-1 sm:mb-2">Heart Rate</p>
            <p className="text-xs sm:text-lg text-red-500">Nice and steady</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-xl">
          <CardContent className="p-4 sm:p-8 text-center">
            <Clock className="h-10 w-10 sm:h-16 sm:w-16 text-purple-600 mx-auto mb-2 sm:mb-4" />
            <h3 className="text-2xl sm:text-4xl font-bold text-purple-800 mb-1 sm:mb-2">{healthMetrics?.sleepHours || 7.5}h</h3>
            <p className="text-sm sm:text-xl text-purple-600 mb-1 sm:mb-2">Sleep Last Night</p>
            <p className="text-xs sm:text-lg text-purple-500">Well rested!</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-0 shadow-xl">
          <CardContent className="p-4 sm:p-8 text-center">
            <Smile className="h-10 w-10 sm:h-16 sm:w-16 text-yellow-600 mx-auto mb-2 sm:mb-4" />
            <h3 className="text-2xl sm:text-4xl font-bold text-yellow-800 mb-1 sm:mb-2">{weeklyTrends.mood[6].value}/10</h3>
            <p className="text-sm sm:text-xl text-yellow-600 mb-1 sm:mb-2">Today's Mood</p>
            <p className="text-xl sm:text-2xl">{weeklyTrends.mood[6].emoji}</p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Trends Dashboard */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
        {/* Steps Trends */}
        <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="flex items-center text-xl sm:text-3xl text-gray-800">
              <Activity className="mr-2 sm:mr-4 h-6 w-6 sm:h-10 sm:w-10 text-green-600" />
              Weekly Steps
            </CardTitle>
            <div className="flex items-center space-x-2 sm:space-x-3">
              {stepsImprovement > 0 ? (
                <TrendingUp className="h-5 w-5 sm:h-8 sm:w-8 text-green-600" />
              ) : (
                <TrendingDown className="h-5 w-5 sm:h-8 sm:w-8 text-orange-600" />
              )}
              <p className="text-sm sm:text-xl font-semibold text-green-700">
                Average: {averageSteps.toLocaleString()} steps/day
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className={isMobile ? "h-48" : "h-64"}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyTrends.steps}>
                  <XAxis dataKey="day" className={`${isMobile ? 'text-sm' : 'text-lg'} font-medium`} />
                  <YAxis className={isMobile ? 'text-sm' : 'text-lg'} />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value, name) => [`${value.toLocaleString()} steps`, 'Daily Steps']}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#10b981" 
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="goal" 
                    fill="#d1fae5" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 sm:mt-6 p-3 sm:p-6 bg-green-100 rounded-2xl">
              <p className="text-sm sm:text-xl text-gray-800 leading-relaxed">
                {stepsImprovement > 0 
                  ? `Wonderful progress! You've increased your daily steps by ${stepsImprovement.toLocaleString()} since Monday. Keep up the fantastic work!`
                  : `You're maintaining great activity levels! Try taking a short walk after meals to boost your daily steps.`
                }
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Sleep Trends */}
        <Card className="shadow-2xl border-0 bg-gradient-to-br from-purple-50 to-indigo-50">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="flex items-center text-xl sm:text-3xl text-gray-800">
              <Clock className="mr-2 sm:mr-4 h-6 w-6 sm:h-10 sm:w-10 text-purple-600" />
              Sleep Pattern
            </CardTitle>
            <div className="flex items-center space-x-2 sm:space-x-3">
              {sleepImprovement > 0 ? (
                <TrendingUp className="h-5 w-5 sm:h-8 sm:w-8 text-green-600" />
              ) : (
                <TrendingDown className="h-5 w-5 sm:h-8 sm:w-8 text-orange-600" />
              )}
              <p className="text-sm sm:text-xl font-semibold text-purple-700">
                {sleepImprovement > 0 ? "Sleep improved!" : "Consistent sleep"}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className={isMobile ? "h-48" : "h-64"}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyTrends.sleep}>
                  <XAxis dataKey="day" className={`${isMobile ? 'text-sm' : 'text-lg'} font-medium`} />
                  <YAxis domain={[5, 10]} className={isMobile ? 'text-sm' : 'text-lg'} />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value, name) => [`${value} hours (${weeklyTrends.sleep.find(d => d.value === value)?.quality})`, 'Sleep']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#8b5cf6" 
                    strokeWidth={isMobile ? 4 : 6}
                    dot={{ r: isMobile ? 6 : 8, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 sm:mt-6 p-3 sm:p-6 bg-purple-100 rounded-2xl">
              <p className="text-sm sm:text-xl text-gray-800 leading-relaxed">
                {sleepImprovement > 0 
                  ? `Excellent sleep progress! You're getting ${sleepImprovement.toFixed(1)} more hours of rest than Monday. Your sleep quality is improving!`
                  : `Your sleep schedule looks steady and healthy. Most nights you're getting quality rest - that's wonderful for your wellbeing!`
                }
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mood Trends - Full Width */}
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-yellow-50 to-orange-50">
        <CardHeader className="pb-2 sm:pb-4">
          <CardTitle className="flex items-center text-xl sm:text-3xl text-gray-800">
            <Smile className="mr-2 sm:mr-4 h-6 w-6 sm:h-10 sm:w-10 text-yellow-600" />
            Weekly Mood Journey
          </CardTitle>
          <div className="flex items-center space-x-2 sm:space-x-3">
            {moodImprovement > 0 ? (
              <TrendingUp className="h-5 w-5 sm:h-8 sm:w-8 text-green-600" />
            ) : (
              <TrendingDown className="h-5 w-5 sm:h-8 sm:w-8 text-orange-600" />
            )}
            <p className="text-sm sm:text-xl font-semibold text-yellow-700">
              {moodImprovement > 0 ? "Mood brightening!" : "Stay positive!"}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className={isMobile ? "h-56" : "h-72"}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyTrends.mood}>
                <XAxis dataKey="day" className={`${isMobile ? 'text-sm' : 'text-lg'} font-medium`} />
                <YAxis domain={[0, 10]} className={isMobile ? 'text-sm' : 'text-lg'} />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  formatter={(value, name) => {
                    const moodData = weeklyTrends.mood.find(d => d.value === value);
                    return [`${value}/10 - ${moodData?.label} ${moodData?.emoji}`, 'Mood Rating'];
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#f59e0b" 
                  strokeWidth={isMobile ? 4 : 6}
                  dot={{ r: isMobile ? 6 : 8, fill: '#f59e0b', strokeWidth: 2, stroke: '#fff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="mt-4 sm:mt-6 p-3 sm:p-6 bg-yellow-100 rounded-2xl">
            <p className="text-sm sm:text-xl text-gray-800 leading-relaxed">
              {moodImprovement > 0 
                ? `Your spirits are lifting! You've improved by ${moodImprovement} points since Monday. It's wonderful to see your mood brightening throughout the week! 🌟`
                : `Your mood has been consistently positive this week! You're maintaining a great outlook, which is so important for your overall wellbeing. Keep smiling! 😊`
              }
            </p>
          </div>
        </CardContent>
      </Card>

      {/* AI Health Summary */}
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-t-lg">
          <CardTitle className="flex items-center text-xl sm:text-3xl text-gray-800">
            <Heart className="mr-2 sm:mr-4 h-6 w-6 sm:h-10 sm:w-10 text-green-600" />
            Your Personal Health Story This Week
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-8">
          <div className="bg-green-50 rounded-2xl p-4 sm:p-8 border-l-4 sm:border-l-8 border-green-400">
            <p className="text-lg sm:text-2xl leading-relaxed text-gray-800 mb-4 sm:mb-6">
              You're doing wonderfully this week! Your health journey shows real progress and dedication to your wellbeing.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div className="text-center p-3 sm:p-4 bg-white rounded-xl shadow-sm">
                <Activity className="h-8 w-8 sm:h-12 sm:w-12 text-green-600 mx-auto mb-2" />
                <p className="font-semibold text-sm sm:text-lg text-gray-800">More Active</p>
                <p className="text-xs sm:text-base text-gray-600">Walking has increased 15%</p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-white rounded-xl shadow-sm">
                <Clock className="h-8 w-8 sm:h-12 sm:w-12 text-purple-600 mx-auto mb-2" />
                <p className="font-semibold text-sm sm:text-lg text-gray-800">Better Sleep</p>
                <p className="text-xs sm:text-base text-gray-600">Consistent 7-8 hours nightly</p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-white rounded-xl shadow-sm">
                <Smile className="h-8 w-8 sm:h-12 sm:w-12 text-yellow-600 mx-auto mb-2" />
                <p className="font-semibold text-sm sm:text-lg text-gray-800">Positive Mood</p>
                <p className="text-xs sm:text-base text-gray-600">Great emotional wellbeing</p>
              </div>
            </div>
            <p className="text-sm sm:text-xl text-gray-800 leading-relaxed">
              Your heart rate has been nice and steady, showing you're staying calm and relaxed. Keep up the great work with your daily walks - they're really making a difference in how you feel!
            </p>
          </div>
          <div className="mt-6 sm:mt-8 text-right">
            <p className="text-sm sm:text-xl text-gray-600">Last updated: {healthMetrics?.lastUpdated ? new Date(healthMetrics.lastUpdated).toLocaleString() : '2 hours ago'}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthDashboard;
