import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  CheckCircle, 
  FileText, 
  Calendar,
  Bell,
  Activity
} from 'lucide-react';

interface RecentActivityProps {
  attendance: any[];
  tasks: any[];
  leaveRequests: any[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ attendance, tasks, leaveRequests }) => {
  // Combine and sort all activities by date
  const activities = [
    ...attendance.slice(0, 3).map(item => ({
      type: 'attendance',
      icon: Clock,
      title: `Marked ${item.status}`,
      time: new Date(item.created_at).toLocaleDateString(),
      status: item.status,
      color: item.status === 'present' ? 'green' : item.status === 'absent' ? 'red' : 'blue'
    })),
    ...tasks.slice(0, 3).map(task => ({
      type: 'task',
      icon: CheckCircle,
      title: `Task: ${task.title}`,
      time: task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No due date',
      status: task.status,
      color: task.status === 'completed' ? 'green' : task.status === 'in-progress' ? 'yellow' : 'gray'
    })),
    ...leaveRequests.slice(0, 2).map(leave => ({
      type: 'leave',
      icon: FileText,
      title: `${leave.leave_type} leave request`,
      time: new Date(leave.created_at).toLocaleDateString(),
      status: leave.status,
      color: leave.status === 'approved' ? 'green' : leave.status === 'rejected' ? 'red' : 'yellow'
    }))
  ].slice(0, 6); // Show only last 6 activities

  return (
    <Card className="glass-card border-0 hover-lift">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="h-5 w-5 mr-2 text-primary" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No recent activity</p>
            </div>
          ) : (
            activities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className={`p-2 rounded-lg ${
                  activity.color === 'green' ? 'bg-green-100 text-green-600' :
                  activity.color === 'red' ? 'bg-red-100 text-red-600' :
                  activity.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                  activity.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  <activity.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {activity.title}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        activity.color === 'green' ? 'bg-green-100 text-green-800' :
                        activity.color === 'red' ? 'bg-red-100 text-red-800' :
                        activity.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                        activity.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};