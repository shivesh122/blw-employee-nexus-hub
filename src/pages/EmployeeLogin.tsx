
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const EmployeeLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    empId: '',
    department: '',
    designation: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign in logic
    console.log('Sign in:', { email: formData.email, password: formData.password });
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign up logic
    console.log('Sign up:', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <User className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Employee Portal</h2>
          <p className="mt-2 text-sm text-gray-600">
            Access your BLW employee dashboard
          </p>
        </div>

        <Card>
          <Tabs defaultValue="signin" className="w-full">
            <CardHeader>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent>
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signin-email"
                        name="email"
                        type="email"
                        required
                        className="pl-10"
                        placeholder="your.email@blw.gov.in"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signin-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        className="pl-10 pr-10"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <Link to="/forgot-password" className="text-blue-600 hover:text-blue-500">
                        Forgot your password?
                      </Link>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Sign In to Dashboard
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="empId">Employee ID</Label>
                      <Input
                        id="empId"
                        name="empId"
                        required
                        placeholder="BLW001"
                        value={formData.empId}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Official Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-email"
                        name="email"
                        type="email"
                        required
                        className="pl-10"
                        placeholder="your.email@blw.gov.in"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        name="department"
                        required
                        placeholder="Production"
                        value={formData.department}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="designation">Designation</Label>
                      <Input
                        id="designation"
                        name="designation"
                        required
                        placeholder="Engineer"
                        value={formData.designation}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        className="pl-10 pr-10"
                        placeholder="Create password"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Create Employee Account
                  </Button>
                </form>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Need help? Contact{' '}
            <Link to="/contact" className="text-blue-600 hover:text-blue-500">
              IT Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLogin;
