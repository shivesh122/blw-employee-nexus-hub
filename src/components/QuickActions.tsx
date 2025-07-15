import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  FileText, 
  Calendar, 
  Bell,
  User,
  Settings,
  Download,
  MessageSquare
} from 'lucide-react';

interface QuickActionsProps {
  onMarkAttendance: (status: string) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onMarkAttendance }) => {
  const actions = [
    {
      icon: Clock,
      label: 'Mark Present',
      description: 'Record your attendance',
      action: () => onMarkAttendance('present'),
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: FileText,
      label: 'Leave Request',
      description: 'Apply for leave',
      action: () => {},
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: Calendar,
      label: 'View Schedule',
      description: 'Check your schedule',
      action: () => {},
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      icon: Download,
      label: 'Download Report',
      description: 'Get attendance report',
      action: () => {},
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      icon: MessageSquare,
      label: 'Contact HR',
      description: 'Send a message to HR',
      action: () => {},
      color: 'bg-pink-500 hover:bg-pink-600'
    },
    {
      icon: Settings,
      label: 'Settings',
      description: 'Update preferences',
      action: () => {},
      color: 'bg-gray-500 hover:bg-gray-600'
    }
  ];

  return (
    <Card className="glass-card border-0 hover-lift">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="h-5 w-5 mr-2 text-primary" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover-lift glass-card"
              onClick={action.action}
            >
              <div className={`p-3 rounded-lg ${action.color} transition-colors`}>
                <action.icon className="h-5 w-5 text-white" />
              </div>
              <div className="text-center">
                <div className="text-sm font-medium">{action.label}</div>
                <div className="text-xs text-muted-foreground">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};