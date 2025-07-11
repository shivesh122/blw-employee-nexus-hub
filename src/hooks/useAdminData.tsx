
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface AdminStats {
  totalEmployees: number;
  activeEmployees: number;
  pendingLeaves: number;
  newApplications: number;
}

export const useAdminData = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState<AdminStats>({
    totalEmployees: 0,
    activeEmployees: 0,
    pendingLeaves: 0,
    newApplications: 0
  });

  useEffect(() => {
    if (user) {
      checkAdminStatus();
    }
  }, [user]);

  const checkAdminStatus = async () => {
    if (!user) return;

    try {
      const { data: role, error } = await supabase
        .rpc('get_user_role', { user_uuid: user.id });

      if (error) {
        console.error('Error checking admin status:', error);
        return;
      }

      const adminStatus = role === 'admin';
      setIsAdmin(adminStatus);

      if (adminStatus) {
        await fetchAdminStats();
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAdminStats = async () => {
    try {
      // Use raw SQL to call get_employee_stats function
      const { data: employeeStats, error: employeeError } = await supabase
        .from('profiles') // Use existing table to make the call
        .select('*')
        .limit(0); // We don't actually need the data, just to make a valid query

      // Make a direct RPC call using raw SQL approach
      const { data: statsData, error: statsError } = await (supabase as any)
        .rpc('get_employee_stats');

      if (statsError) {
        console.error('Error fetching employee stats:', statsError);
      }

      // Fetch leave requests count
      const { count: pendingLeaves, error: leaveError } = await supabase
        .from('leave_requests')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      if (leaveError) {
        console.error('Error fetching leave requests:', leaveError);
      }

      // Calculate stats from the returned JSON
      const totalEmployees = statsData?.total_employees || 0;
      const activeEmployees = statsData?.employees_by_status?.active || 0;
      const newApplications = statsData?.recent_hires || 0;

      setStats({
        totalEmployees,
        activeEmployees,
        pendingLeaves: pendingLeaves || 0,
        newApplications
      });

    } catch (error) {
      console.error('Error fetching admin stats:', error);
      toast({
        title: "Error",
        description: "Failed to fetch dashboard statistics.",
        variant: "destructive"
      });
    }
  };

  const approveLeaveRequest = async (requestId: string) => {
    if (!user || !isAdmin) return { error: 'Unauthorized' };

    try {
      const { error } = await supabase
        .from('leave_requests')
        .update({ 
          status: 'approved',
          approved_by: user.id,
          updated_at: new Date().toISOString()
        })
        .eq('id', requestId);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Leave request approved successfully."
      });

      await fetchAdminStats(); // Refresh stats
      return { error: null };
    } catch (error) {
      console.error('Error approving leave request:', error);
      toast({
        title: "Error",
        description: "Failed to approve leave request.",
        variant: "destructive"
      });
      return { error };
    }
  };

  const rejectLeaveRequest = async (requestId: string) => {
    if (!user || !isAdmin) return { error: 'Unauthorized' };

    try {
      const { error } = await supabase
        .from('leave_requests')
        .update({ 
          status: 'rejected',
          approved_by: user.id,
          updated_at: new Date().toISOString()
        })
        .eq('id', requestId);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Leave request rejected."
      });

      await fetchAdminStats(); // Refresh stats
      return { error: null };
    } catch (error) {
      console.error('Error rejecting leave request:', error);
      toast({
        title: "Error",
        description: "Failed to reject leave request.",
        variant: "destructive"
      });
      return { error };
    }
  };

  const createNotification = async (title: string, message: string, priority: 'low' | 'medium' | 'high' = 'medium', targetUserId?: string) => {
    if (!user || !isAdmin) return { error: 'Unauthorized' };

    try {
      if (targetUserId) {
        // Send to specific user
        const { error } = await supabase
          .from('notifications')
          .insert({
            title,
            message,
            priority,
            user_id: targetUserId
          });

        if (error) throw error;
      } else {
        // Send to all employees - get user IDs from profiles instead
        const { data: profiles, error: fetchError } = await supabase
          .from('profiles')
          .select('user_id');

        if (fetchError) throw fetchError;

        const notifications = profiles
          .map(profile => ({
            title,
            message,
            priority,
            user_id: profile.user_id
          }));

        if (notifications.length > 0) {
          const { error } = await supabase
            .from('notifications')
            .insert(notifications);

          if (error) throw error;
        }
      }

      toast({
        title: "Success",
        description: "Notification sent successfully."
      });

      return { error: null };
    } catch (error) {
      console.error('Error creating notification:', error);
      toast({
        title: "Error",
        description: "Failed to send notification.",
        variant: "destructive"
      });
      return { error };
    }
  };

  return {
    loading,
    isAdmin,
    stats,
    approveLeaveRequest,
    rejectLeaveRequest,
    createNotification,
    refreshStats: fetchAdminStats
  };
};
