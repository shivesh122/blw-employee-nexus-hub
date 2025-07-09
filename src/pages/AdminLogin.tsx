
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, Lock, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle admin sign in logic
    console.log('Admin sign in:', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Shield className="mx-auto h-12 w-12 text-red-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Admin Portal</h2>
          <p className="mt-2 text-sm text-gray-600">
            Restricted access for BLW administrators
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Administrator Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your administrative credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                This portal is restricted to authorized BLW administrators only. 
                Unauthorized access attempts are logged and monitored.
              </AlertDescription>
            </Alert>

            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-email">Administrator Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="admin-email"
                    name="email"
                    type="email"
                    required
                    className="pl-10"
                    placeholder="admin@blw.gov.in"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-password">Administrator Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="admin-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="pl-10 pr-10"
                    placeholder="Enter admin password"
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
                  <Link to="/admin-recovery" className="text-red-600 hover:text-red-500">
                    Account recovery
                  </Link>
                </div>
              </div>

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                Access Admin Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Not an administrator?{' '}
            <Link to="/employee-login" className="text-blue-600 hover:text-blue-500">
              Employee Portal
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
