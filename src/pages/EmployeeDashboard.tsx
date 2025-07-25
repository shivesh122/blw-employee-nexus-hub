
import React from 'react';
import { User, Calendar, FileText, Bell, Clock, CheckCircle, AlertCircle, Users, LogOut, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useEmployeeData } from '@/hooks/useEmployeeData';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { EditProfileForm } from '@/components/EditProfileForm';
import { LeaveRequestForm } from '@/components/LeaveRequestForm';
import { DemoNotifications } from '@/components/DemoNotifications';
import { EmployeeMetrics } from '@/components/EmployeeMetrics';
import { RecentActivity } from '@/components/RecentActivity';
import { QuickActions } from '@/components/QuickActions';

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
    updateTaskStatus,
    refreshData
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
      <div className="min-h-screen bg-background flex items-center justify-center industrial-pattern">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading employee dashboard...</p>
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
    <div className="min-h-screen bg-background p-6 industrial-pattern">
      <div className="max-w-7xl mx-auto">
        {/* Modern Railway Header */}
        <div className="glass-card rounded-2xl p-8 mb-8 hover-lift">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-lg">
                  <User className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold railway-heading">Employee Dashboard</h1>
                  <p className="text-muted-foreground text-lg">
                    Welcome back, {profile?.first_name} {profile?.last_name}
                  </p>
                </div>
              </div>
              <div className="track-line w-64 h-1 mt-4"></div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={handleSignOut} className="glass-card border-border/50 hover-lift">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Employee Metrics */}
        <EmployeeMetrics attendanceStats={attendanceStats} tasks={tasks} />

        {/* Personal Info & Quick Actions */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Personal Information */}
          <Card className="glass-card border-0 hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2 text-primary" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Name</p>
                  <p className="text-base">{profile?.first_name} {profile?.last_name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Employee ID</p>
                  <p className="text-base font-mono text-primary">{profile?.employee_id || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Department</p>
                  <Badge variant="secondary" className="mt-1">{profile?.department || 'Not set'}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Designation</p>
                  <p className="text-base">{profile?.designation || 'Not set'}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Join Date</p>
                <p className="text-base">
                  {profile?.join_date 
                    ? new Date(profile.join_date).toLocaleDateString()
                    : 'Not set'
                  }
                </p>
              </div>
              <EditProfileForm profile={profile} onSuccess={refreshData} />
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <QuickActions onMarkAttendance={markAttendance} />

          {/* Recent Activity */}
          <RecentActivity 
            attendance={attendance}
            tasks={tasks}
            leaveRequests={leaveRequests}
          />
        </div>

        {/* Attendance Overview */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card className="glass-card border-0 hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                Attendance Overview
              </CardTitle>
              <CardDescription>Your attendance record for this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200">
                  <div className="text-2xl font-bold text-green-600">{attendanceStats.present}</div>
                  <div className="text-sm text-green-700">Present</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-red-50 border border-red-200">
                  <div className="text-2xl font-bold text-red-600">{attendanceStats.absent}</div>
                  <div className="text-sm text-red-700">Absent</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">{attendanceStats.leave}</div>
                  <div className="text-sm text-blue-700">Leave</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-gray-50 border border-gray-200">
                  <div className="text-2xl font-bold text-gray-900">{attendanceStats.total}</div>
                  <div className="text-sm text-gray-700">Total</div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => markAttendance('present')}
                  className="glass-card hover-lift"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Mark Present
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => markAttendance('absent')}
                  className="glass-card hover-lift"
                >
                  Mark Absent
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => markAttendance('leave')}
                  className="glass-card hover-lift"
                >
                  Mark Leave
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Leave Requests */}
          <Card className="glass-card border-0 hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                Leave Requests
              </CardTitle>
              <CardDescription>Manage your leave applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaveRequests.length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No leave requests found</p>
                  </div>
                ) : (
                  leaveRequests.slice(0, 3).map((request) => (
                    <div key={request.id} className="flex justify-between items-center p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                      <div>
                        <p className="font-medium">{request.leave_type.charAt(0).toUpperCase() + request.leave_type.slice(1)} Leave</p>
                        <p className="text-sm text-muted-foreground">
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
                <LeaveRequestForm onSuccess={refreshData} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications & Tasks */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card className="glass-card border-0 hover-lift">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-primary" />
                  Notifications
                </CardTitle>
                <DemoNotifications />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground">
                    <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No notifications</p>
                  </div>
                ) : (
                  notifications.slice(0, 5).map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`flex items-start space-x-3 p-3 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors ${!notification.read ? 'bg-primary/5 border border-primary/20' : ''}`}
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
                        <p className="text-xs text-muted-foreground">
                          {new Date(notification.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                  ))
                )}
                <Button variant="outline" className="w-full glass-card hover-lift">
                  View All Notifications
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tasks & Assignments */}
          <Card className="glass-card border-0 hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-primary" />
                Tasks & Assignments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tasks.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No tasks assigned</p>
                  </div>
                ) : (
                  tasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors">
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
                          <p className="text-sm text-muted-foreground">
                            {task.description && `${task.description.substring(0, 50)}${task.description.length > 50 ? '...' : ''}`}
                          </p>
                          {task.due_date && (
                            <p className="text-sm text-muted-foreground">
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
                            className="glass-card hover-lift"
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
    </div>
  );
};

export default EmployeeDashboard;
