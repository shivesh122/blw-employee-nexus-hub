
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Check, X, Loader2, RefreshCw } from 'lucide-react';

interface LeaveRequest {
  id: string;
  user_id: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  reason: string;
  status: string;
  created_at: string;
  profiles?: {
    first_name: string;
    last_name: string;
    employee_id: string;
  };
}

export const AdminLeaveRequests: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchLeaveRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('leave_requests')
        .select(`
          *,
          profiles (
            first_name,
            last_name,
            employee_id
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeaveRequests(data || []);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch leave requests',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const handleLeaveAction = async (requestId: string, action: 'approved' | 'rejected') => {
    if (!user) return;

    setActionLoading(requestId);
    try {
      const { error } = await supabase
        .from('leave_requests')
        .update({
          status: action,
          approved_by: user.id,
          updated_at: new Date().toISOString(),
        })
        .eq('id', requestId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: `Leave request ${action} successfully`,
      });

      // Refresh the list
      fetchLeaveRequests();
    } catch (error) {
      console.error(`Error ${action} leave request:`, error);
      toast({
        title: 'Error',
        description: `Failed to ${action.slice(0, -1)} leave request`,
        variant: 'destructive',
      });
    } finally {
      setActionLoading(null);
    }
  };

  const calculateDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Leave Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Leave Requests</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchLeaveRequests}
            disabled={loading}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaveRequests.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No leave requests found</p>
          ) : (
            leaveRequests.map((request) => (
              <div key={request.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">
                      {request.profiles?.first_name} {request.profiles?.last_name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {request.profiles?.employee_id && `ID: ${request.profiles.employee_id}`}
                    </p>
                  </div>
                  <Badge
                    variant={
                      request.status === 'approved' ? 'default' :
                      request.status === 'rejected' ? 'destructive' : 'secondary'
                    }
                  >
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Type:</span>{' '}
                    {request.leave_type.charAt(0).toUpperCase() + request.leave_type.slice(1)} Leave
                  </div>
                  <div>
                    <span className="font-medium">Duration:</span>{' '}
                    {calculateDays(request.start_date, request.end_date)} days
                  </div>
                  <div>
                    <span className="font-medium">From:</span>{' '}
                    {new Date(request.start_date).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="font-medium">To:</span>{' '}
                    {new Date(request.end_date).toLocaleDateString()}
                  </div>
                </div>

                <div>
                  <span className="font-medium text-sm">Reason:</span>
                  <p className="text-sm text-gray-600 mt-1">{request.reason}</p>
                </div>

                {request.status === 'pending' && (
                  <div className="flex space-x-2 pt-2">
                    <Button
                      size="sm"
                      onClick={() => handleLeaveAction(request.id, 'approved')}
                      disabled={actionLoading === request.id}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {actionLoading === request.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Check className="h-4 w-4" />
                      )}
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleLeaveAction(request.id, 'rejected')}
                      disabled={actionLoading === request.id}
                    >
                      {actionLoading === request.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <X className="h-4 w-4" />
                      )}
                      Reject
                    </Button>
                  </div>
                )}

                <div className="text-xs text-gray-500">
                  Submitted: {new Date(request.created_at).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
