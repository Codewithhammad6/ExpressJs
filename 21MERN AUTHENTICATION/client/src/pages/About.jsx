import React from 'react';
import { Car, Users, ShieldCheck, Award, Clock } from 'lucide-react';

function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">About AutoMarket</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your trusted partner in finding the perfect vehicle for your lifestyle
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <div className="bg-base-200 p-6 rounded-lg text-center">
          <Car className="h-10 w-10 mx-auto text-primary mb-3" />
          <h3 className="text-2xl font-bold">10,000+</h3>
          <p className="text-gray-600">Vehicles in Stock</p>
        </div>
        <div className="bg-base-200 p-6 rounded-lg text-center">
          <Users className="h-10 w-10 mx-auto text-primary mb-3" />
          <h3 className="text-2xl font-bold">50,000+</h3>
          <p className="text-gray-600">Satisfied Customers</p>
        </div>
        <div className="bg-base-200 p-6 rounded-lg text-center">
          <ShieldCheck className="h-10 w-10 mx-auto text-primary mb-3" />
          <h3 className="text-2xl font-bold">100%</h3>
          <p className="text-gray-600">Quality Certified</p>
        </div>
        <div className="bg-base-200 p-6 rounded-lg text-center">
          <Clock className="h-10 w-10 mx-auto text-primary mb-3" />
          <h3 className="text-2xl font-bold">15+</h3>
          <p className="text-gray-600">Years in Business</p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
        <div className="md:w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
            alt="AutoMarket Dealership"
            className="rounded-lg shadow-xl w-full h-auto"
          />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold  mb-6">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded in 2008, AutoMarket began as a small family-owned dealership with a passion for connecting people with their dream cars. What started as a modest lot with just a dozen vehicles has grown into one of the most trusted names in the automotive industry.
          </p>
          <p className="text-gray-600 mb-4">
            Our mission has always been simple: to provide quality vehicles at fair prices with exceptional customer service. We believe buying a car should be an exciting experience, not a stressful one.
          </p>
          <p className="text-gray-600">
            Today, with multiple locations across the country and an award-winning online platform, we continue to innovate while staying true to our core values of honesty, transparency, and customer satisfaction.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center  mb-12">Our Core Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-base-100 p-6 rounded-lg shadow-sm border border-base-200">
            <Award className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-3">Quality Assurance</h3>
            <p className="text-gray-600">
              Every vehicle undergoes a rigorous 150-point inspection process by our certified technicians to ensure reliability and safety.
            </p>
          </div>
          <div className="bg-base-100 p-6 rounded-lg shadow-sm border border-base-200">
            <ShieldCheck className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-3">Transparent Pricing</h3>
            <p className="text-gray-600">
              No hidden fees or surprise charges. We provide clear, upfront pricing so you can make informed decisions.
            </p>
          </div>
          <div className="bg-base-100 p-6 rounded-lg shadow-sm border border-base-200">
            <Users className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-3">Customer First</h3>
            <p className="text-gray-600">
              Our team is dedicated to providing personalized service and support throughout your car buying journey.
            </p>
          </div>
        </div>
      </div>

      {/* Team CTA */}
      <div className="bg-primary/10 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold  mb-4">Meet Our Team</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Our experienced team of automotive professionals is here to guide you every step of the way, from finding the perfect vehicle to financing options and after-sales support.
        </p>
        <button className="btn btn-primary">Contact Our Team</button>
      </div>
    </div>
  );
}

export default About;