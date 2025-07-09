
import React from 'react';
import { Train, Factory, Users, Award, Calendar, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Train className="h-16 w-16 text-blue-600 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Banaras Locomotive Works
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            A cornerstone of Indian Railways manufacturing excellence, BLW has been at the forefront 
            of locomotive production and railway innovation for decades.
          </p>
        </div>

        {/* History Section */}
        <section className="mb-16">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Calendar className="h-6 w-6 mr-2 text-blue-600" />
                Our Heritage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none text-gray-700 leading-relaxed">
                <p className="text-lg mb-4">
                  Established as a premier locomotive manufacturing unit, Banaras Locomotive Works stands as 
                  a testament to India's industrial prowess and engineering excellence. Located in the historic 
                  city of Varanasi, BLW has been instrumental in powering India's railway network.
                </p>
                <p className="text-lg">
                  Our facility combines traditional craftsmanship with cutting-edge technology to produce 
                  world-class locomotives that serve millions of passengers across the Indian railway network.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Stats Section */}
        <section className="mb-16">
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Factory className="h-8 w-8 text-blue-600 mx-auto" />
                <CardTitle className="text-3xl font-bold text-blue-600">5000+</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">Locomotives Manufactured</CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Users className="h-8 w-8 text-blue-600 mx-auto" />
                <CardTitle className="text-3xl font-bold text-blue-600">15,000+</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">Dedicated Employees</CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Award className="h-8 w-8 text-blue-600 mx-auto" />
                <CardTitle className="text-3xl font-bold text-blue-600">50+</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">Years of Excellence</CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <MapPin className="h-8 w-8 text-blue-600 mx-auto" />
                <CardTitle className="text-3xl font-bold text-blue-600">Pan-India</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">Service Network</CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-center leading-relaxed">
                  To manufacture world-class locomotives and railway equipment that power India's growth, 
                  while fostering innovation, sustainability, and employee excellence in everything we do.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-center leading-relaxed">
                  To be the leading locomotive manufacturer in the world, recognized for our technological 
                  innovation, quality excellence, and contribution to sustainable transportation solutions.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Departments */}
        <section>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Departments</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Production', desc: 'Manufacturing excellence in locomotive production' },
              { name: 'Engineering', desc: 'Innovation and design leadership' },
              { name: 'Quality Control', desc: 'Ensuring world-class standards' },
              { name: 'Human Resources', desc: 'Empowering our workforce' },
              { name: 'Maintenance', desc: 'Keeping operations running smoothly' },
              { name: 'Administration', desc: 'Supporting organizational excellence' }
            ].map((dept, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{dept.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{dept.desc}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
