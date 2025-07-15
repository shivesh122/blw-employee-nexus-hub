import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Users
} from 'lucide-react';

export const EmployeeManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Mock employee data - in real app this would come from your database
  const employees = [
    { 
      id: 'BLW001', 
      name: 'Rajesh Kumar', 
      email: 'rajesh.kumar@blw.railway.gov.in',
      department: 'Production', 
      designation: 'Senior Engineer', 
      status: 'Active', 
      joinDate: '2020-01-15',
      phone: '+91-9876543210',
      salary: '₹85,000'
    },
    { 
      id: 'BLW002', 
      name: 'Priya Sharma', 
      email: 'priya.sharma@blw.railway.gov.in',
      department: 'Quality Control', 
      designation: 'QC Inspector', 
      status: 'Active', 
      joinDate: '2019-03-22',
      phone: '+91-9876543211',
      salary: '₹65,000'
    },
    { 
      id: 'BLW003', 
      name: 'Amit Singh', 
      email: 'amit.singh@blw.railway.gov.in',
      department: 'Maintenance', 
      designation: 'Technician', 
      status: 'On Leave', 
      joinDate: '2021-07-10',
      phone: '+91-9876543212',
      salary: '₹55,000'
    },
    { 
      id: 'BLW004', 
      name: 'Sunita Devi', 
      email: 'sunita.devi@blw.railway.gov.in',
      department: 'Administration', 
      designation: 'HR Officer', 
      status: 'Active', 
      joinDate: '2018-11-05',
      phone: '+91-9876543213',
      salary: '₹75,000'
    },
    { 
      id: 'BLW005', 
      name: 'Manoj Yadav', 
      email: 'manoj.yadav@blw.railway.gov.in',
      department: 'Engineering', 
      designation: 'Design Engineer', 
      status: 'Active', 
      joinDate: '2022-02-18',
      phone: '+91-9876543214',
      salary: '₹90,000'
    }
  ];

  const departments = ['All', 'Production', 'Quality Control', 'Maintenance', 'Engineering', 'Administration'];

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === 'all' || 
                             emp.department.toLowerCase() === selectedDepartment.toLowerCase();
    
    return matchesSearch && matchesDepartment;
  });

  return (
    <Card className="glass-card border-0 hover-lift">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <Users className="h-4 w-4 text-primary-foreground" />
            </div>
            <CardTitle className="text-xl font-semibold">Employee Management</CardTitle>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-gradient-to-r from-primary to-primary-glow">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Employee
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Employee</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="employeeId">Employee ID</Label>
                    <Input id="employeeId" placeholder="BLW006" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john.doe@blw.railway.gov.in" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="+91-9876543215" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="production">Production</SelectItem>
                        <SelectItem value="quality">Quality Control</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="administration">Administration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Input id="designation" placeholder="Senior Engineer" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="joinDate">Join Date</Label>
                    <Input id="joinDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salary">Salary</Label>
                    <Input id="salary" placeholder="₹75,000" />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddModalOpen(false)}>
                    Add Employee
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex space-x-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by ID, name, email, or department..."
              className="pl-10 glass-card border-border/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-48 glass-card border-border/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.slice(1).map(dept => (
                <SelectItem key={dept} value={dept.toLowerCase()}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="rounded-xl overflow-hidden border border-border/50">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Employee ID</TableHead>
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Department</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Salary</TableHead>
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
                  <TableCell>
                    <div>
                      <div className="font-medium">{employee.name}</div>
                      <div className="text-sm text-muted-foreground">{employee.designation}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{employee.email}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-secondary/80">
                      {employee.department}
                    </Badge>
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
                  <TableCell className="font-medium">{employee.salary}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="glass-card border-border/50">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Employee
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Attendance
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove Employee
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {filteredEmployees.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No employees found matching your criteria</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};