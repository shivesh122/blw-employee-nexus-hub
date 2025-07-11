
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Sparkles } from 'lucide-react';

const DEMO_NOTIFICATIONS = [
  {
    title: 'Welcome to BLW Employee Portal',
    message: 'Your account has been successfully set up. Please complete your profile information.',
    priority: 'medium' as const,
  },
  {
    title: 'Safety Training Reminder',
    message: 'Your annual safety training is due next week. Please schedule your session.',
    priority: 'high' as const,
  },
  {
    title: 'Team Meeting Tomorrow',
    message: 'Don\'t forget about the team meeting tomorrow at 10:00 AM in Conference Room A.',
    priority: 'medium' as const,
  },
  {
    title: 'System Maintenance',
    message: 'Scheduled system maintenance will occur this Saturday from 2:00 AM to 6:00 AM.',
    priority: 'low' as const,
  },
  {
    title: 'New Company Policy',
    message: 'Please review the updated remote work policy in the employee handbook.',
    priority: 'medium' as const,
  },
  {
    title: 'Birthday Celebration',
    message: 'Join us in celebrating Sarah\'s birthday in the break room at 3:00 PM today!',
    priority: 'low' as const,
  },
];

export const DemoNotifications: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const generateDemoNotifications = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      // Generate 3-5 random notifications
      const notificationCount = Math.floor(Math.random() * 3) + 3;
      const selectedNotifications = DEMO_NOTIFICATIONS
        .sort(() => Math.random() - 0.5)
        .slice(0, notificationCount)
        .map(notification => ({
          ...notification,
          user_id: user.id,
        }));

      const { error } = await supabase
        .from('notifications')
        .insert(selectedNotifications);

      if (error) throw error;

      toast({
        title: 'Success',
        description: `Generated ${notificationCount} demo notifications`,
      });
    } catch (error) {
      console.error('Error generating demo notifications:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate demo notifications',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={generateDemoNotifications}
      disabled={isLoading}
      variant="outline"
      size="sm"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <Sparkles className="h-4 w-4 mr-2" />
      )}
      Generate Demo Notifications
    </Button>
  );
};
