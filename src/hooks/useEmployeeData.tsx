
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useEmployeeData = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      fetchEmployeeData();
    }
  }, [user]);

  const fetchEmployeeData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Fetch profile data
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
      } else {
        setProfile(profileData);
      }

      // Fetch attendance data for current month
      const currentMonth = new Date();
      const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
      const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

      const { data: attendanceData, error: attendanceError } = await supabase
        .from('attendance')
        .select('*')
        .eq('user_id', user.id)
        .gte('date', firstDay.toISOString().split('T')[0])
        .lte('date', lastDay.toISOString().split('T')[0])
        .order('date', { ascending: false });

      if (attendanceError) {
        console.error('Attendance fetch error:', attendanceError);
      } else {
        setAttendance(attendanceData || []);
      }

      // Fetch leave requests
      const { data: leaveData, error: leaveError } = await supabase
        .from('leave_requests')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (leaveError) {
        console.error('Leave requests fetch error:', leaveError);
      } else {
        setLeaveRequests(leaveData || []);
      }

      // Fetch tasks
      const { data: tasksData, error: tasksError } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (tasksError) {
        console.error('Tasks fetch error:', tasksError);
      } else {
        setTasks(tasksData || []);
      }

      // Fetch notifications
      const { data: notificationsData, error: notificationsError } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (notificationsError) {
        console.error('Notifications fetch error:', notificationsError);
      } else {
        setNotifications(notificationsData || []);
      }

    } catch (error) {
      console.error('Error fetching employee data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch employee data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const markAttendance = async (status: 'present' | 'absent' | 'leave') => {
    if (!user) return;

    try {
      const today = new Date().toISOString().split('T')[0];
      const now = new Date().toISOString();

      const { error } = await supabase
        .from('attendance')
        .upsert({
          user_id: user.id,
          date: today,
          status,
          check_in_time: status === 'present' ? now : null,
          updated_at: now
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Attendance Marked",
        description: `Attendance marked as ${status} for today.`
      });

      fetchEmployeeData(); // Refresh data
    } catch (error) {
      console.error('Error marking attendance:', error);
      toast({
        title: "Error",
        description: "Failed to mark attendance. Please try again.",
        variant: "destructive"
      });
    }
  };

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId);

      if (error) {
        throw error;
      }

      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const updateTaskStatus = async (taskId: string, status: 'pending' | 'in-progress' | 'completed') => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', taskId);

      if (error) {
        throw error;
      }

      toast({
        title: "Task Updated",
        description: `Task status updated to ${status}.`
      });

      fetchEmployeeData(); // Refresh data
    } catch (error) {
      console.error('Error updating task:', error);
      toast({
        title: "Error",
        description: "Failed to update task. Please try again.",
        variant: "destructive"
      });
    }
  };

  return {
    loading,
    profile,
    attendance,
    leaveRequests,
    tasks,
    notifications,
    markAttendance,
    markNotificationAsRead,
    updateTaskStatus,
    refreshData: fetchEmployeeData
  };
};
