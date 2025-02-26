'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/ui/Button';
import { Plus, Settings, FileText, MessageSquare, LayoutGrid } from 'lucide-react';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-primary rounded-full"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-white/60 mt-1">Welcome back, {user.displayName || 'Designer'}</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Button 
            className="flex items-center bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md transition-colors"
            variant="default"
          >
            <Plus size={18} className="mr-2" />
            New Design Request
          </Button>
        </div>
      </div>
      
      {/* Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Active Projects Card */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <FileText className="text-primary mr-3" size={24} />
            <h2 className="text-xl font-semibold text-white">Active Projects</h2>
          </div>
          <div className="text-3xl font-bold text-white mb-2">0</div>
          <p className="text-white/60">No active design projects yet.</p>
          <Button className="w-full mt-4 py-2" variant="default">View All Projects</Button>
        </div>
        
        {/* Messages Card */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <MessageSquare className="text-secondary mr-3" size={24} />
            <h2 className="text-xl font-semibold text-white">Messages</h2>
          </div>
          <div className="text-3xl font-bold text-white mb-2">0</div>
          <p className="text-white/60">No unread messages.</p>
          <Button className="w-full mt-4 py-2" variant="default">View Messages</Button>
        </div>
        
        {/* Design Boards Card */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <LayoutGrid className="text-tertiary mr-3" size={24} />
            <h2 className="text-xl font-semibold text-white">Design Boards</h2>
          </div>
          <div className="text-3xl font-bold text-white mb-2">0</div>
          <p className="text-white/60">No active design boards.</p>
          <Button className="w-full mt-4 py-2" variant="default">View Design Boards</Button>
        </div>
      </div>
      
      {/* Recent Activity Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <p className="text-white/60 mb-4">No recent activity to display.</p>
              <Button variant="default">
                <Plus size={18} className="mr-2" />
                Start Your First Project
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Links Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-white mb-6">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Button className="flex flex-col items-center justify-center h-32 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors" variant="special">
            <Plus size={24} className="mb-2" />
            <span>New Request</span>
          </Button>
          
          <Button className="flex flex-col items-center justify-center h-32 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors" variant="special">
            <FileText size={24} className="mb-2" />
            <span>My Projects</span>
          </Button>
          
          <Button className="flex flex-col items-center justify-center h-32 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors" variant="special">
            <MessageSquare size={24} className="mb-2" />
            <span>Messages</span>
          </Button>
          
          <Button className="flex flex-col items-center justify-center h-32 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors" variant="special">
            <Settings size={24} className="mb-2" />
            <span>Settings</span>
          </Button>
        </div>
      </div>
    </div>
  );
}