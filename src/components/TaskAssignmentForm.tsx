import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ClipboardList, UserPlus } from 'lucide-react';

export const TaskAssignmentForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [employeeId, setEmployeeId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !employeeId.trim()) return;

    setIsSubmitting(true);
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      
      // Get user_id from employee_id
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('user_id')
        .eq('employee_id', employeeId.trim())
        .single();
      
      if (profileError || !profile) {
        throw new Error('Employee not found');
      }

      // Create the task
      const { error } = await supabase
        .from('tasks')
        .insert({
          title,
          description: description || null,
          priority,
          user_id: profile.user_id,
          assigned_by: user?.id,
          due_date: dueDate || null,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Task assigned successfully."
      });
      
      // Reset form
      setTitle('');
      setDescription('');
      setPriority('medium');
      setEmployeeId('');
      setDueDate('');
    } catch (error) {
      console.error('Error assigning task:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to assign task.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5" />
          Assign Task
        </CardTitle>
        <CardDescription>
          Assign a new task to an employee using their Employee ID
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="task-title" className="text-sm font-medium">
              Task Title
            </label>
            <Input
              id="task-title"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="task-description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="task-description"
              placeholder="Task description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="task-priority" className="text-sm font-medium">
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
              <label htmlFor="due-date" className="text-sm font-medium">
                Due Date (Optional)
              </label>
              <Input
                id="due-date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="task-employee" className="text-sm font-medium">
              Employee ID
            </label>
            <Input
              id="task-employee"
              placeholder="Enter employee ID (e.g., BLW001)"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            <UserPlus className="h-4 w-4 mr-2" />
            {isSubmitting ? 'Assigning...' : 'Assign Task'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};