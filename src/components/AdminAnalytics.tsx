import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Clock,
  Target,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

export const AdminAnalytics = () => {
  const analyticsData = {
    departmentPerformance: [
      { name: 'Production', score: 94, trend: '+5%', color: 'bg-green-500' },
      { name: 'Quality Control', score: 91, trend: '+2%', color: 'bg-blue-500' },
      { name: 'Maintenance', score: 88, trend: '-1%', color: 'bg-yellow-500' },
      { name: 'Engineering', score: 96, trend: '+8%', color: 'bg-purple-500' },
      { name: 'Administration', score: 89, trend: '+3%', color: 'bg-pink-500' }
    ],
    productivity: {
      current: 87,
      target: 90,
      improvement: '+5%'
    },
    workforceDistribution: [
      { department: 'Production', count: 450, percentage: 37.5 },
      { department: 'Maintenance', count: 280, percentage: 23.3 },
      { department: 'Quality Control', count: 150, percentage: 12.5 },
      { department: 'Engineering', count: 200, percentage: 16.7 },
      { department: 'Administration', count: 120, percentage: 10.0 }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Productivity Overview */}
      <Card className="glass-card border-0 hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-primary" />
            Productivity Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{analyticsData.productivity.current}%</div>
              <div className="text-sm text-muted-foreground mb-3">Current Productivity</div>
              <Progress value={analyticsData.productivity.current} className="h-2" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{analyticsData.productivity.target}%</div>
              <div className="text-sm text-muted-foreground mb-3">Target Goal</div>
              <Progress value={analyticsData.productivity.target} className="h-2" />
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span className="text-2xl font-bold text-green-600">{analyticsData.productivity.improvement}</span>
              </div>
              <div className="text-sm text-muted-foreground">Month over Month</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Department Performance */}
      <Card className="glass-card border-0 hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2 text-primary" />
            Department Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.departmentPerformance.map((dept, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className={`w-3 h-8 rounded-full ${dept.color}`}></div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{dept.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold">{dept.score}%</span>
                      <Badge 
                        variant="secondary" 
                        className={`${
                          dept.trend.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {dept.trend.startsWith('+') ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                        {dept.trend}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={dept.score} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Workforce Distribution */}
      <Card className="glass-card border-0 hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center">
            <PieChart className="h-5 w-5 mr-2 text-primary" />
            Workforce Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              {analyticsData.workforceDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full bg-primary opacity-${100 - index * 15}`}></div>
                    <span className="font-medium">{item.department}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{item.count}</div>
                    <div className="text-sm text-muted-foreground">{item.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-40 h-40">
                {/* Simple visual representation - you could integrate a proper chart library */}
                <div className="absolute inset-0 rounded-full border-8 border-primary/20"></div>
                <div className="absolute inset-2 rounded-full border-4 border-primary/40"></div>
                <div className="absolute inset-4 rounded-full border-2 border-primary/60"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">1,200</div>
                    <div className="text-sm text-muted-foreground">Total</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};