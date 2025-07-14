
import React, { useState } from 'react';
import { Users, FileText, Bell, Download, Plus, Search, Filter, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAdminData } from '@/hooks/useAdminData';
import { AdminLeaveRequests } from '@/components/AdminLeaveRequests';
import { NotificationForm } from '@/components/NotificationForm';
import { TaskAssignmentForm } from '@/components/TaskAssignmentForm';

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { loading, isAdmin, stats } = useAdminData();

  // Mock data for demonstration
  const employees = [
    { id: 'BLW001', name: 'Rajesh Kumar', department: 'Production', designation: 'Senior Engineer', status: 'Active', joinDate: '2020-01-15' },
    { id: 'BLW002', name: 'Priya Sharma', department: 'Quality Control', designation: 'QC Inspector', status: 'Active', joinDate: '2019-03-22' },
    { id: 'BLW003', name: 'Amit Singh', department: 'Maintenance', designation: 'Technician', status: 'On Leave', joinDate: '2021-07-10' },
    { id: 'BLW004', name: 'Sunita Devi', department: 'Administration', designation: 'HR Officer', status: 'Active', joinDate: '2018-11-05' },
    { id: 'BLW005', name: 'Manoj Yadav', department: 'Engineering', designation: 'Design Engineer', status: 'Active', joinDate: '2022-02-18' }
  ];

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 industrial-pattern">
      <div className="max-w-7xl mx-auto">
        {/* Modern Railway Header */}
        <div className="glass-card rounded-2xl p-8 mb-8 hover-lift">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-lg">
                  <Users className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold railway-heading">Admin Control Center</h1>
                  <p className="text-muted-foreground text-lg">Banaras Locomotive Works • Railway Operations</p>
                </div>
              </div>
              <div className="track-line w-64 h-1 mt-4"></div>
            </div>
            <div className="flex space-x-3">
              <Button className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary shadow-lg hover-lift">
                <Plus className="h-4 w-4 mr-2" />
                Add Employee
              </Button>
              <Button variant="outline" className="glass-card border-border/50 hover-lift">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Modern Railway Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card border-0 hover-lift signal-active group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Workforce</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-lg">
                <Users className="h-5 w-5 text-primary-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground mb-2">{stats.totalEmployees.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Railway Personnel</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card border-0 hover-lift group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Operations</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 mb-2">{stats.activeEmployees.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">On Duty Today</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card border-0 hover-lift group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-sm font-medium text-muted-foreground">Leave Requests</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
                <FileText className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600 mb-2">{stats.pendingLeaves}</div>
              <div className="text-xs text-muted-foreground">Pending Approval</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card border-0 hover-lift group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-sm font-medium text-muted-foreground">Applications</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Bell className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600 mb-2">{stats.newApplications}</div>
              <div className="text-xs text-muted-foreground">New Submissions</div>
            </CardContent>
          </Card>
        </div>

        {/* Modern Employee Management */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 glass-card border-0 hover-lift">
            <CardHeader className="pb-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                    <Users className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl font-semibold">Railway Personnel Database</CardTitle>
                </div>
                <div className="flex space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by ID, name, department..."
                      className="pl-10 w-72 glass-card border-border/50"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon" className="glass-card border-border/50">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="rounded-xl overflow-hidden border border-border/50">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Employee ID</TableHead>
                      <TableHead className="font-semibold">Name</TableHead>
                      <TableHead className="font-semibold">Department</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEmployees.map((employee, index) => (
                      <TableRow 
                        key={employee.id} 
                        className="hover:bg-muted/30 transition-colors group"
                      >
                        <TableCell className="font-mono font-medium text-primary">{employee.id}</TableCell>
                        <TableCell className="font-medium">{employee.name}</TableCell>
                        <TableCell>
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                            {employee.department}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={employee.status === 'Active' ? 'default' : 'secondary'}
                            className={employee.status === 'Active' ? 
                              'bg-green-100 text-green-800 border-green-200' : 
                              'bg-orange-100 text-orange-800 border-orange-200'
                            }
                          >
                            <div className={`w-2 h-2 rounded-full mr-2 ${
                              employee.status === 'Active' ? 'bg-green-500' : 'bg-orange-500'
                            }`}></div>
                            {employee.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="glass-card border-border/50">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Edit Employee</DropdownMenuItem>
                              <DropdownMenuItem>Edit Attendance</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Remove Employee</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Leave Requests */}
          <div className="lg:col-span-1">
            <AdminLeaveRequests />
          </div>
        </div>

        {/* Modern Admin Control Center */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Enhanced Notification System */}
          <div className="glass-card rounded-2xl p-6 hover-lift">
            <NotificationForm />
          </div>
          
          {/* Enhanced Task Assignment */}
          <div className="glass-card rounded-2xl p-6 hover-lift">
            <TaskAssignmentForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
