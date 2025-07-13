import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Mail, Lock, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { signIn, userRole } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signIn(formData.email, formData.password);

      if (error) {
        toast({
          title: "Access Denied", 
          description: error.message.includes('Invalid login credentials')
            ? "Invalid administrator credentials. Please verify your email and password."
            : error.message.includes('Email not confirmed')
            ? "Please check your email and confirm your account before signing in."
            : error.message || "Authentication failed. Please contact IT support.",
          variant: "destructive"
        });
      } else {
        // Wait a moment for the auth context to update userRole
        setTimeout(() => {
          if (userRole !== 'admin') {
            toast({
              title: "Access Denied",
              description: "You are not authorized to access the admin dashboard. Admin privileges required.",
              variant: "destructive"
            });
            // Stay on login page for non-admin users
          } else {
            toast({
              title: "Admin Access Granted",
              description: "Welcome to the administrative dashboard."
            });
            navigate('/admin-dashboard');
          }
        }, 1000); // Give time for role to be fetched
      }
    } catch (err) {
      toast({
        title: "System Error",
        description: "An unexpected error occurred. Please contact IT support.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Shield className="mx-auto h-12 w-12 text-red-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Admin Portal</h2>
          <p className="mt-2 text-sm text-gray-600">Restricted access for BLW administrators</p>
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
                    disabled={loading}
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
                    disabled={loading}
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

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={loading}>
                {loading ? "Authenticating..." : "Access Admin Dashboard"}
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
