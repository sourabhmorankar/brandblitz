'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DualPanelLayout from '@/components/layout/DualPanelLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';

export default function ProjectPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { user, loading } = useAuth();
  const router = useRouter();

  // Example of fetching project data
  useEffect(() => {
    // This would be where you'd fetch project data from Firebase
    // const fetchProject = async () => {
    //   try {
    //     const projectRef = doc(db, 'projects', id);
    //     const projectSnap = await getDoc(projectRef);
    //     
    //     if (!projectSnap.exists()) {
    //       router.push('/dashboard');
    //       return;
    //     }
    //     
    //     // Check if user has access to this project
    //     const projectData = projectSnap.data();
    //     if (projectData.clientId !== user?.uid && projectData.designerId !== user?.uid) {
    //       router.push('/dashboard');
    //       return;
    //     }
    //     
    //     setProject(projectData);
    //   } catch (error) {
    //     console.error('Error fetching project:', error);
    //   }
    // };
    // 
    // if (user && !loading) {
    //   fetchProject();
    // }
  }, [id, user, loading, router]);

  return (
    <ProtectedRoute>
      <div className="h-[calc(100vh-4rem)]">
        <DualPanelLayout projectId={id} />
      </div>
    </ProtectedRoute>
  );
}