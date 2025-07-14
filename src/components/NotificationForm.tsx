import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAdminData } from '@/hooks/useAdminData';
import { Send, Bell } from 'lucide-react';

export const NotificationForm = () => {
  const { createNotification } = useAdminData();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [targetEmployeeId, setTargetEmployeeId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      let targetUserId = undefined;
      
      if (targetEmployeeId.trim()) {
        // Get user_id from employee_id if targeting specific employee
        const { supabase } = await import('@/integrations/supabase/client');
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('user_id')
          .eq('employee_id', targetEmployeeId.trim())
          .single();
        
        if (error || !profile) {
          throw new Error('Employee not found');
        }
        targetUserId = profile.user_id;
      }

      await createNotification(title, message, priority, targetUserId);
      
      // Reset form
      setTitle('');
      setMessage('');
      setPriority('medium');
      setTargetEmployeeId('');
    } catch (error) {
      console.error('Error sending notification:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Publish Notification
        </CardTitle>
        <CardDescription>
          Send notifications to all employees or a specific employee
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              placeholder="Notification title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <Textarea
              id="message"
              placeholder="Notification message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="priority" className="text-sm font-medium">
                Priority
              </label>
              <Select value={priority} onValueChange={(value: 'low' | 'medium' | 'high') => setPriority(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="employee" className="text-sm font-medium">
                Target Employee (Optional)
              </label>
              <Input
                id="employee"
                placeholder="Employee ID (leave empty for all)"
                value={targetEmployeeId}
                onChange={(e) => setTargetEmployeeId(e.target.value)}
              />
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            <Send className="h-4 w-4 mr-2" />
            {isSubmitting ? 'Sending...' : 'Send Notification'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};