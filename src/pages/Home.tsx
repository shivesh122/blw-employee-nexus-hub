
import React from 'react';
import { Link } from 'react-router-dom';
import { Train, Users, Shield, Award, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Train className="h-16 w-16" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Banaras Locomotive Works
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Employee Management System
            </p>
            <p className="text-lg mb-12 max-w-3xl mx-auto text-blue-50">
              Streamlining operations and empowering our workforce with modern digital solutions. 
              Connecting every employee to the heart of Indian Railways manufacturing excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link to="/employee-login">
                  Employee Portal <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Link to="/admin-login">
                  Admin Portal <Shield className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Empowering BLW Operations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive employee management system streamlines HR processes and enhances productivity across all departments.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-xl">Employee Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Complete employee lifecycle management from onboarding to performance tracking
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-xl">Secure Access</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Role-based authentication ensuring data security and proper access control
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-xl">Performance Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Advanced reporting and analytics to drive operational excellence and growth
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of BLW employees already using our platform to streamline their work experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/employee-signup">
                Create Employee Account
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/about">
                Learn More About BLW
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
