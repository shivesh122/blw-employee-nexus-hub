import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Clock, 
  Target, 
  Award,
  Calendar,
  CheckCircle,
  Zap
} from 'lucide-react';

interface EmployeeMetricsProps {
  attendanceStats: {
    present: number;
    absent: number;
    leave: number;
    total: number;
  };
  tasks: any[];
}

export const EmployeeMetrics: React.FC<EmployeeMetricsProps> = ({ attendanceStats, tasks }) => {
  const attendanceRate = attendanceStats.total > 0 ? (attendanceStats.present / attendanceStats.total) * 100 : 0;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const taskCompletionRate = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;
  
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Attendance Rate */}
      <Card className="glass-card border-0 hover-lift group">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Attendance Rate</CardTitle>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
            <Calendar className="h-4 w-4 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600 mb-2">{attendanceRate.toFixed(1)}%</div>
          <Progress value={attendanceRate} className="h-2 mb-2" />
          <p className="text-xs text-muted-foreground">
            {attendanceStats.present} days present this month
          </p>
        </CardContent>
      </Card>

      {/* Task Completion */}
      <Card className="glass-card border-0 hover-lift group">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Task Completion</CardTitle>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <CheckCircle className="h-4 w-4 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600 mb-2">{taskCompletionRate.toFixed(1)}%</div>
          <Progress value={taskCompletionRate} className="h-2 mb-2" />
          <p className="text-xs text-muted-foreground">
            {completedTasks}/{tasks.length} tasks completed
          </p>
        </CardContent>
      </Card>

      {/* Performance Score */}
      <Card className="glass-card border-0 hover-lift group">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Performance Score</CardTitle>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600 mb-2">92</div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <TrendingUp className="h-3 w-3 mr-1" />
              +5%
            </Badge>
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
        </CardContent>
      </Card>

      {/* Hours Worked */}
      <Card className="glass-card border-0 hover-lift group">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Hours This Month</CardTitle>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
            <Clock className="h-4 w-4 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600 mb-2">168</div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              <Target className="h-3 w-3 mr-1" />
              On Target
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};