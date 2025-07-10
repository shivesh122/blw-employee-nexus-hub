
import React from 'react';
import { User, Calendar, FileText, Bell, Clock, CheckCircle, AlertCircle, Users, LogOut } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useEmployeeData } from '@/hooks/useEmployeeData';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const EmployeeDashboard = () => {
  const { signOut } = useAuth();
  const { toast } = useToast();
  const {
    loading,
    profile,
    attendance,
    leaveRequests,
    tasks,
    notifications,
    markAttendance,
    markNotificationAsRead,
    updateTaskStatus
  } = useEmployeeData();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading employee dashboard...</p>
        </div>
      </div>
    );
  }

  // Calculate attendance statistics
  const attendanceStats = {
    present: attendance.filter(a => a.status === 'present').length,
    absent: attendance.filter(a => a.status === 'absent').length,
    leave: attendance.filter(a => a.status === 'leave').length,
    total: attendance.length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Employee Dashboard</h1>
            <p className="text-gray-600">
              Welcome back, {profile?.first_name} {profile?.last_name}
            </p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Personal Info Card */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p className="text-base">{profile?.first_name} {profile?.last_name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Employee ID</p>
                <p className="text-base">{profile?.employee_id || 'Not set'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Designation</p>
                <p className="text-base">{profile?.designation || 'Not set'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Department</p>
                <p className="text-base">{profile?.department || 'Not set'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Join Date</p>
                <p className="text-base">
                  {profile?.join_date 
                    ? new Date(profile.join_date).toLocaleDateString()
                    : 'Not set'
                  }
                </p>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          {/* Attendance Tracker */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Attendance Overview (This Month)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{attendanceStats.present}</div>
                  <div className="text-sm text-gray-500">Present</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{attendanceStats.absent}</div>
                  <div className="text-sm text-gray-500">Absent</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{attendanceStats.leave}</div>
                  <div className="text-sm text-gray-500">Leave</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{attendanceStats.total}</div>
                  <div className="text-sm text-gray-500">Total Days</div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => markAttendance('present')}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Mark Present
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => markAttendance('absent')}
                >
                  Mark Absent
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => markAttendance('leave')}
                >
                  Mark Leave
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leave Request & Notifications */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Recent Leave Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaveRequests.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No leave requests found</p>
                ) : (
                  leaveRequests.slice(0, 3).map((request) => (
                    <div key={request.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{request.leave_type.charAt(0).toUpperCase() + request.leave_type.slice(1)} Leave</p>
                        <p className="text-sm text-gray-500">
                          {new Date(request.start_date).toLocaleDateString()} - {new Date(request.end_date).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={
                        request.status === 'approved' ? 'default' :
                        request.status === 'rejected' ? 'destructive' : 'secondary'
                      }>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </Badge>
                    </div>
                  ))
                )}
                <Button className="w-full">
                  Request Leave
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No notifications</p>
                ) : (
                  notifications.slice(0, 5).map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
                      onClick={() => !notification.read && markNotificationAsRead(notification.id)}
                    >
                      <div className={`p-1 rounded-full ${
                        notification.priority === 'high' ? 'bg-red-100' :
                        notification.priority === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                      }`}>
                        <AlertCircle className={`h-4 w-4 ${
                          notification.priority === 'high' ? 'text-red-600' :
                          notification.priority === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm ${!notification.read ? 'font-medium' : ''}`}>
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(notification.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                  ))
                )}
                <Button variant="outline" className="w-full">
                  View All Notifications
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tasks & Assignments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Tasks & Assignments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tasks.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No tasks assigned</p>
              ) : (
                tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className={`p-1 rounded-full ${
                        task.status === 'completed' ? 'bg-green-100' :
                        task.status === 'in-progress' ? 'bg-yellow-100' : 'bg-gray-100'
                      }`}>
                        <CheckCircle className={`h-4 w-4 ${
                          task.status === 'completed' ? 'text-green-600' :
                          task.status === 'in-progress' ? 'text-yellow-600' : 'text-gray-600'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-gray-500">
                          {task.description && `${task.description.substring(0, 50)}${task.description.length > 50 ? '...' : ''}`}
                        </p>
                        {task.due_date && (
                          <p className="text-sm text-gray-500">
                            Due: {new Date(task.due_date).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={
                        task.status === 'completed' ? 'default' :
                        task.status === 'in-progress' ? 'secondary' : 'outline'
                      }>
                        {task.status === 'completed' ? 'Completed' :
                         task.status === 'in-progress' ? 'In Progress' : 'Pending'}
                      </Badge>
                      {task.status !== 'completed' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => updateTaskStatus(
                            task.id, 
                            task.status === 'pending' ? 'in-progress' : 'completed'
                          )}
                        >
                          {task.status === 'pending' ? 'Start' : 'Complete'}
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
