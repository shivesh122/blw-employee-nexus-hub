
import React from 'react';
import { User, Calendar, FileText, Bell, Clock, CheckCircle, AlertCircle, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const EmployeeDashboard = () => {
  // Mock data
  const employee = {
    name: "Rajesh Kumar",
    empId: "BLW001",
    designation: "Senior Engineer",
    department: "Production",
    email: "rajesh.kumar@blw.gov.in",
    phone: "+91 98765 43210",
    joinDate: "January 15, 2020"
  };

  const attendance = {
    present: 22,
    absent: 2,
    leave: 1,
    total: 25
  };

  const notifications = [
    { id: 1, title: "New Safety Protocol Update", time: "2 hours ago", priority: "high" },
    { id: 2, title: "Monthly Team Meeting - Tomorrow", time: "1 day ago", priority: "medium" },
    { id: 3, title: "Performance Review Scheduled", time: "3 days ago", priority: "low" }
  ];

  const tasks = [
    { id: 1, title: "Complete Quality Audit Report", due: "Today", status: "pending" },
    { id: 2, title: "Review New Equipment Specifications", due: "Tomorrow", status: "in-progress" },
    { id: 3, title: "Attend Safety Training Session", due: "Dec 15", status: "completed" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Employee Dashboard</h1>
          <p className="text-gray-600">Welcome back, {employee.name}</p>
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
                <p className="text-base">{employee.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Employee ID</p>
                <p className="text-base">{employee.empId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Designation</p>
                <p className="text-base">{employee.designation}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Department</p>
                <p className="text-base">{employee.department}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Join Date</p>
                <p className="text-base">{employee.joinDate}</p>
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
                  <div className="text-2xl font-bold text-green-600">{attendance.present}</div>
                  <div className="text-sm text-gray-500">Present</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{attendance.absent}</div>
                  <div className="text-sm text-gray-500">Absent</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{attendance.leave}</div>
                  <div className="text-sm text-gray-500">Leave</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{attendance.total}</div>
                  <div className="text-sm text-gray-500">Total Days</div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Clock className="h-4 w-4 mr-2" />
                  Mark Attendance
                </Button>
                <Button variant="outline" size="sm">
                  View History
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
                Leave Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Annual Leave</p>
                    <p className="text-sm text-gray-500">15 days remaining</p>
                  </div>
                  <Badge variant="secondary">Available</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Sick Leave</p>
                    <p className="text-sm text-gray-500">8 days remaining</p>
                  </div>
                  <Badge variant="secondary">Available</Badge>
                </div>
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
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
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
                      <p className="text-sm font-medium">{notification.title}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  </div>
                ))}
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
              {tasks.map((task) => (
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
                      <p className="text-sm text-gray-500">Due: {task.due}</p>
                    </div>
                  </div>
                  <Badge variant={
                    task.status === 'completed' ? 'default' :
                    task.status === 'in-progress' ? 'secondary' : 'outline'
                  }>
                    {task.status === 'completed' ? 'Completed' :
                     task.status === 'in-progress' ? 'In Progress' : 'Pending'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
