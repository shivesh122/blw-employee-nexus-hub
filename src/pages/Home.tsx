
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Users, 
  Shield, 
  Award,
  ArrowRight,
  Train,
  Clock,
  CheckCircle,
  BarChart3,
  Calendar,
  Bell,
  FileText,
  Zap,
  Star,
  TrendingUp,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Modern Hero Section with Railway Theme */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 industrial-pattern opacity-30"></div>
        <div className="glass-card min-h-screen flex items-center relative">
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="mb-8 inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Train className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">Banaras Locomotive Works</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 railway-heading">
              Modern Railway
              <br />
              <span className="text-primary">Management Hub</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience the future of railway workforce management with our cutting-edge digital platform. 
              Streamline operations, enhance productivity, and ensure seamless coordination across all departments.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="glass-card bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary shadow-xl hover-lift">
                <Link to="/employee-login">
                  <Users className="mr-2 h-5 w-5" />
                  Employee Portal
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="glass-card border-primary/30 text-primary hover:bg-primary/10 shadow-lg hover-lift">
                <Link to="/admin-login">
                  <Shield className="mr-2 h-5 w-5" />
                  Admin Control
                </Link>
              </Button>
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="glass-card p-4 rounded-xl hover-lift">
                <div className="text-2xl font-bold text-primary">1200+</div>
                <div className="text-sm text-muted-foreground">Active Personnel</div>
              </div>
              <div className="glass-card p-4 rounded-xl hover-lift">
                <div className="text-2xl font-bold text-green-600">98.5%</div>
                <div className="text-sm text-muted-foreground">Efficiency Rate</div>
              </div>
              <div className="glass-card p-4 rounded-xl hover-lift">
                <div className="text-2xl font-bold text-blue-600">24/7</div>
                <div className="text-sm text-muted-foreground">Operations</div>
              </div>
              <div className="glass-card p-4 rounded-xl hover-lift">
                <div className="text-2xl font-bold text-orange-500">50+</div>
                <div className="text-sm text-muted-foreground">Departments</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Star className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">Advanced Features</span>
            </div>
            <h2 className="text-4xl font-bold mb-4 railway-heading">
              Complete Railway Management Solution
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From workforce coordination to operational excellence, discover the tools that power modern railway operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Employee Portal */}
            <Card className="glass-card border-0 hover-lift group">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Employee Portal</CardTitle>
                <CardDescription>
                  Comprehensive dashboard for workforce management and daily operations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Real-time attendance tracking</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Leave request management</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Task assignment & tracking</span>
                </div>
                <Button asChild className="w-full mt-6 group-hover:bg-primary/90">
                  <Link to="/employee-login">
                    Access Portal
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Admin Dashboard */}
            <Card className="glass-card border-0 hover-lift group">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Admin Control Center</CardTitle>
                <CardDescription>
                  Advanced administrative tools and system-wide management capabilities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Workforce analytics & reporting</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Multi-department coordination</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Real-time notifications</span>
                </div>
                <Button asChild variant="outline" className="w-full mt-6 group-hover:bg-muted">
                  <Link to="/admin-login">
                    Admin Access
                    <Shield className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Analytics & Reporting */}
            <Card className="glass-card border-0 hover-lift group">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Smart Analytics</CardTitle>
                <CardDescription>
                  Data-driven insights for operational excellence and performance optimization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Performance metrics</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Operational insights</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Predictive analytics</span>
                </div>
                <Button asChild variant="outline" className="w-full mt-6 group-hover:bg-muted">
                  <Link to="/about">
                    Learn More
                    <TrendingUp className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Modern Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 railway-pattern opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trusted by Railway Professionals</h2>
            <p className="text-lg text-primary-foreground/80">Powering efficient operations across the railway network</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform">1200+</div>
              <div className="text-primary-foreground/80">Active Personnel</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform">50+</div>
              <div className="text-primary-foreground/80">Departments</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform">99.9%</div>
              <div className="text-primary-foreground/80">System Uptime</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform">24/7</div>
              <div className="text-primary-foreground/80">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Zap className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">Get Started Today</span>
            </div>
            
            <h2 className="text-4xl font-bold mb-6 railway-heading">
              Ready to Modernize Your Railway Operations?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of railway professionals who trust our platform for their daily operations 
              and management needs. Experience the future of railway workforce management.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="glass-card bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary shadow-xl hover-lift">
                <Link to="/employee-login">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="glass-card border-primary/30 hover:bg-primary/10 shadow-lg hover-lift">
                <Link to="/contact">
                  Contact Support
                  <Phone className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Contact Info */}
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="glass-card p-6 rounded-xl hover-lift">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Location</h3>
                <p className="text-sm text-muted-foreground">Banaras Locomotive Works<br />Varanasi, Uttar Pradesh</p>
              </div>
              <div className="glass-card p-6 rounded-xl hover-lift">
                <Phone className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Support</h3>
                <p className="text-sm text-muted-foreground">24/7 Technical Support<br />+91-542-XXX-XXXX</p>
              </div>
              <div className="glass-card p-6 rounded-xl hover-lift">
                <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-sm text-muted-foreground">support@blw.railway.gov.in<br />admin@blw.railway.gov.in</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
