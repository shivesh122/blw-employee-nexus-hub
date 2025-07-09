
import React, { useState } from 'react';
import { Users, FileText, Bell, Download, Plus, Search, Filter, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const stats = {
    totalEmployees: 15247,
    activeEmployees: 14890,
    pendingLeaves: 23,
    newApplications: 8
  };

  const employees = [
    { id: 'BLW001', name: 'Rajesh Kumar', department: 'Production', designation: 'Senior Engineer', status: 'Active', joinDate: '2020-01-15' },
    { id: 'BLW002', name: 'Priya Sharma', department: 'Quality Control', designation: 'QC Inspector', status: 'Active', joinDate: '2019-03-22' },
    { id: 'BLW003', name: 'Amit Singh', department: 'Maintenance', designation: 'Technician', status: 'On Leave', joinDate: '2021-07-10' },
    { id: 'BLW004', name: 'Sunita Devi', department: 'Administration', designation: 'HR Officer', status: 'Active', joinDate: '2018-11-05' },
    { id: 'BLW005', name: 'Manoj Yadav', department: 'Engineering', designation: 'Design Engineer', status: 'Active', joinDate: '2022-02-18' }
  ];

  const leaveRequests = [
    { id: 1, employee: 'Rajesh Kumar', type: 'Annual Leave', days: 5, from: '2024-01-15', to: '2024-01-19', status: 'Pending' },
    { id: 2, employee: 'Priya Sharma', type: 'Sick Leave', days: 2, from: '2024-01-10', to: '2024-01-11', status: 'Pending' },
    { id: 3, employee: 'Amit Singh', type: 'Personal Leave', days: 3, from: '2024-01-08', to: '2024-01-10', status: 'Approved' }
  ];

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">BLW Employee Management System</p>
          </div>
          <div className="flex space-x-2">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEmployees.toLocaleString()}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.activeEmployees.toLocaleString()}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Leaves</CardTitle>
              <FileText className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pendingLeaves}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Applications</CardTitle>
              <Bell className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.newApplications}</div>
            </CardContent>
          </Card>
        </div>

        {/* Employee Management */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Employee Records</CardTitle>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search employees..."
                      className="pl-10 w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">{employee.id}</TableCell>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>
                        <Badge variant={employee.status === 'Active' ? 'default' : 'secondary'}>
                          {employee.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Employee</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Remove Employee</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Leave Requests */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Leave Requests</CardTitle>
              <CardDescription>Requires your approval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaveRequests.filter(req => req.status === 'Pending').map((request) => (
                  <div key={request.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{request.employee}</h4>
                      <Badge variant="outline">{request.type}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {request.days} days ({request.from} to {request.to})
                    </p>
                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Approve
                      </Button>
                      <Button size="sm" variant="outline">
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications Panel */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Organization Notifications</CardTitle>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Post Notification
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900">Safety Protocol Update</h4>
                <p className="text-sm text-blue-700 mt-1">New safety guidelines effective from January 2024</p>
                <p className="text-xs text-blue-600 mt-2">Posted 2 hours ago • All Departments</p>
              </div>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-900">Annual Performance Reviews</h4>
                <p className="text-sm text-green-700 mt-1">Performance review cycle begins next week</p>
                <p className="text-xs text-green-600 mt-2">Posted 1 day ago • All Employees</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
