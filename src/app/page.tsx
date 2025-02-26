'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { ArrowRight, Zap, Users, Star, PenTool, MessageCircle } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { useAuth } from '@/contexts/AuthContext';

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/register');
    }
  };

  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section id="overview" className="py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              The Conversational Design Studio Your Brand Deserves
            </h1>
            <p className="text-xl text-white/70 mb-8">
              Seamlessly collaborate with professional designers through our innovative chat-based platform. Get high-quality designs that perfectly align with your brand vision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="flex items-center justify-center bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md text-lg transition-colors"
                onClick={handleGetStarted}
                variant="default"
              >
                Get Started
                <ArrowRight size={20} className="ml-2" />
              </Button>
              <Button 
                className="flex items-center justify-center bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-md text-lg transition-colors"
                onClick={() => router.push('/portfolio')}
                variant="default"
              >
                View Our Work
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="w-full max-w-md">
              <div className="rounded-xl overflow-hidden border border-white/10 shadow-xl">
                <div className="p-1 bg-gradient-to-r from-primary via-secondary to-tertiary">
                  <div className="bg-background p-6 rounded-lg">
                    <div className="flex items-start mb-4">
                      <div className="flex-shrink-0 mr-4">
                        <Logo type="icon" className="w-10 h-10" />
                      </div>
                      <div className="bg-white/10 rounded-lg p-4 max-w-[80%]">
                        <p className="text-white text-sm">
                          Hi there! I'm Blaze, your AI design assistant. How can I help with your design project today?
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start flex-row-reverse mb-4">
                      <div className="flex-shrink-0 ml-4">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-background font-bold">
                          U
                        </div>
                      </div>
                      <div className="bg-primary rounded-lg p-4 max-w-[80%]">
                        <p className="text-white text-sm">
                          I need a new logo for my fitness brand "PowerFit". Something energetic and modern!
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start mb-4">
                      <div className="flex-shrink-0 mr-4">
                        <Logo type="icon" className="w-10 h-10" />
                      </div>
                      <div className="bg-white/10 rounded-lg p-4 max-w-[80%]">
                        <p className="text-white text-sm">
                          Great! I'll connect you with our design team. Meanwhile, let's gather some details about your brand vision, colors, and style preferences...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 border-t border-white/10">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose BrandBlitz?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
            <div className="p-3 bg-primary/10 rounded-full inline-block mb-4">
              <MessageCircle size={28} className="text-primary" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Conversational Design</h3>
            <p className="text-white/70">
              No more complicated briefs. Simply chat with our Blaze AI assistant and design team to bring your vision to life.
            </p>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
            <div className="p-3 bg-secondary/10 rounded-full inline-block mb-4">
              <Zap size={28} className="text-secondary" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Lightning Fast Delivery</h3>
            <p className="text-white/70">
              Get high-quality designs within days, not weeks. Our streamlined process ensures quick turnarounds without sacrificing quality.
            </p>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
            <div className="p-3 bg-tertiary/10 rounded-full inline-block mb-4">
              <PenTool size={28} className="text-tertiary" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Professional Designers</h3>
            <p className="text-white/70">
              Work with experienced designers who understand your industry and create designs that resonate with your audience.
            </p>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
            <div className="p-3 bg-green-500/10 rounded-full inline-block mb-4">
              <Users size={28} className="text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Collaborative Workspace</h3>
            <p className="text-white/70">
              Our dual-panel interface makes it easy to provide feedback and see revisions in real-time, ensuring your satisfaction.
            </p>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
            <div className="p-3 bg-blue-500/10 rounded-full inline-block mb-4">
              <Star size={28} className="text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Premium Quality</h3>
            <p className="text-white/70">
              Every design is crafted to the highest standards, ensuring your brand stands out in today's competitive market.
            </p>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
            <div className="p-3 bg-purple-500/10 rounded-full inline-block mb-4">
              <Zap size={28} className="text-purple-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">AI-Powered Insights</h3>
            <p className="text-white/70">
              Our Blaze AI assistant helps streamline the design process, offering suggestions and gathering requirements efficiently.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 border-t border-white/10">
        <h2 className="text-3xl font-bold text-white text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">1</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Chat with Blaze AI</h3>
            <p className="text-white/70">
              Begin by discussing your design needs with our AI assistant who will gather your requirements and preferences.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-secondary">2</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Meet Your Designer</h3>
            <p className="text-white/70">
              Get connected with a professional designer who specializes in your type of project.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-tertiary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-tertiary">3</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Collaborate & Review</h3>
            <p className="text-white/70">
              Provide feedback on designs through our interactive workspace and see revisions in real-time.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-500">4</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Receive Final Designs</h3>
            <p className="text-white/70">
              Get your completed designs in all the formats you need, ready to use for your brand.
            </p>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Button 
            className="flex items-center justify-center bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md text-lg transition-colors mx-auto"
            onClick={handleGetStarted}
            variant="default"
          >
            Start Your Design Journey
            <ArrowRight size={20} className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 border-t border-white/10">
        <h2 className="text-3xl font-bold text-white text-center mb-4">Simple, Transparent Pricing</h2>
        <p className="text-xl text-white/70 text-center mb-12 max-w-2xl mx-auto">
          Choose the plan that fits your design needs. All plans include access to our AI assistant and professional designers.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Starter Plan */}
          <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden transition-transform hover:transform hover:scale-105">
            <div className="p-6 border-b border-white/10">
              <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
              <div className="flex items-end mb-4">
                <span className="text-4xl font-bold text-white">$99</span>
                <span className="text-white/70 ml-2">/month</span>
              </div>
              <p className="text-white/70">Perfect for small businesses and startups.</p>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                <li className="flex items-center text-white">
                  <span className="mr-2 text-green-500">✓</span>
                  2 Design Requests
                </li>
                <li className="flex items-center text-white">
                  <span className="mr-2 text-green-500">✓</span>
                  3-Day Turnaround
                </li>
                <li className="flex items-center text-white">
                  <span className="mr-2 text-green-500">✓</span>
                  Unlimited Revisions
                </li>
                <li className="flex items-center text-white">
                  <span className="mr-2 text-green-500">✓</span>
                  Blaze AI Assistant
                </li>
                <li className="flex items-center text-white/50">
                  <span className="mr-2 text-red-500">✗</span>
                  Priority Support
                </li>
                <li className="flex items-center text-white/50">
                  <span className="mr-2 text-red-500">✗</span>
                  Source Files
                </li>
              </ul>
              <Button 
                className="w-full mt-6 bg-white/10 hover:bg-white/20 text-white py-2 rounded-md transition-colors"
                onClick={handleGetStarted}
                variant="default"
              >
                Get Started
              </Button>
            </div>
          </div>
          
          {/* Growth Plan */}
          <div className="bg-gradient-to-b from-primary/20 to-background border border-primary/30 rounded-lg overflow-hidden transform scale-105 shadow-lg shadow-primary/10 relative z-10">
            <div className="absolute top-0 left-0 right-0 py-1 bg-primary text-center text-white text-sm font-medium">
              Most Popular
            </div>
            <div className="p-6 border-b border-white/10 mt-6">
              <h3 className="text-2xl font-bold text-white mb-2">Growth</h3>
              <div className="flex items-end mb-4">
                <span className="text-4xl font-bold text-white">$199</span>
                <span className="text-white/70 ml-2">/month</span>
              </div>
              <p className="text-white/70">Ideal for growing businesses with regular design needs.</p>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                <li className="flex items-center text-white">
                  <span className="mr-2 text-green-500">✓</span>
                  5 Design Requests
                </li>
                <li className="flex items-center text-white">
                  <span className="mr-2 text-green-500">✓</span>
                  2-Day Turnaround
                </li>
                <li className="flex items-center text-white">
                  <span className="mr-2 text-green-500">✓</span>
                  Unlimited Revisions
                </li>
                <li className="flex items-center text-white">
                  <span className="mr-2 text-green-500">✓</span>
                  Blaze AI Assistant
                </li>
                <li className="flex items-center text-white">
                  <span className="mr-2 text-green-500">✓</span>
                  Priority Support
                </li>
                <li className="flex items-center text-white/50">
                  <span className="mr-2 text-red-500">✗</span>
                  Source Files
                </li>
              </ul>
              <Button 
                className="w-full mt-6 bg-primary hover:bg-primary/90 text-white py-2 rounded-md transition-colors"
                onClick={handleGetStarted}
                variant="default"
              >
                Get Started
              </Button>
            </div>
          </div>
          
          {/* Premium Plan */}
          <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden transition-transform hover:transform hover:scale-105">
            <div className="p-6 border-b border-white/10">
              <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
              <div className="flex items-end mb-4">
                <span className="text-4xl font-bold text-white">$399</span>
                <span className="text-white/70 ml-2">/month</span>
              </div>
              <p className="text-white/70">For businesses with high-volume design requirements.</p>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                <li className="flex items-center text-white">
                  <span className="mr-2 text-green-500">✓</span>
                  12 Design Requests
                </li>
                <li className="flex items-center text-white">
                  <span className="mr-2 text-green-500">✓</span>
                  1-Day Turnaround
                </li>
                <li className="flex items-center text-white">
                  <span className="mr-2 text-green-500">✓</span>
                  Unlimited Revisions
                </li>
                <li className="flex items-center text-white">
                  <span className="mr-2 text-green-500">✓</span>
                  Blaze AI Assistant
                </li>
                <li className="flex items-center text-white">
                  <span className="mr-2 text-green-500">✓</span>
                  Priority Support
                </li>
                <li className="flex items-center text-white">
                  <span className="mr-2 text-green-500">✓</span>
                  Source Files Included
                </li>
              </ul>
              <Button 
                className="w-full mt-6 bg-white/10 hover:bg-white/20 text-white py-2 rounded-md transition-colors"
                onClick={handleGetStarted}
                variant="default"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 border-t border-white/10">
        <div className="bg-gradient-to-r from-primary/20 via-secondary/20 to-tertiary/20 rounded-xl p-1">
          <div className="bg-background rounded-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Brand?</h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Join BrandBlitz today and experience the future of design collaboration. No complicated briefs, just simple conversations that lead to amazing designs.
            </p>
            <Button 
              className="flex items-center justify-center bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-md text-lg transition-colors mx-auto"
              onClick={handleGetStarted}
              variant="default"
            >
              Start Your Free Consultation
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}