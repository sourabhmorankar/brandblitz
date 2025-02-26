'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Download, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Check, 
  X, 
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  Calendar
} from 'lucide-react';
import Button from '@/components/ui/Button';

// Mock design asset type
type DesignAsset = {
  id: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  version: number;
  totalVersions: number;
  createdAt: Date;
  createdBy: string;
  status: 'draft' | 'review' | 'approved' | 'rejected';
  width: number;
  height: number;
  fileType: string;
};

interface DesignWorkspaceProps {
  projectId?: string;
  className?: string;
}

const DesignWorkspace: React.FC<DesignWorkspaceProps> = ({ 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  projectId, // Will be used for data fetching in production
  className 
}) => {
  // Mock design assets for demo
  const [designs] = useState<DesignAsset[]>([
    {
      id: '1',
      name: 'Logo Design - Primary Version',
      url: '/api/placeholder/800/600',
      thumbnailUrl: '/api/placeholder/200/150',
      version: 2,
      totalVersions: 3,
      createdAt: new Date(),
      createdBy: 'Jordan Lee',
      status: 'review',
      width: 800,
      height: 600,
      fileType: 'image/png'
    },
    {
      id: '2',
      name: 'Logo Design - Secondary Version',
      url: '/api/placeholder/800/600',
      thumbnailUrl: '/api/placeholder/200/150',
      version: 1,
      totalVersions: 1,
      createdAt: new Date(Date.now() - 86400000), // 1 day ago
      createdBy: 'Jordan Lee',
      status: 'draft',
      width: 800,
      height: 600,
      fileType: 'image/png'
    }
  ]);
  
  const [currentDesignIndex, setCurrentDesignIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<{id: string, text: string, position: {x: number, y: number}, author: string, timestamp: Date}[]>([]);
  const [commentPosition, setCommentPosition] = useState<{x: number, y: number} | null>(null);
  
  // Current design
  const currentDesign = designs[currentDesignIndex];
  
  // Format date
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Handle zoom in
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 3));
  };

  // Handle zoom out
  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.5));
  };

  // Handle rotation
  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  // Reset view
  const resetView = () => {
    setZoom(1);
    setRotation(0);
  };
  
  // Navigate to next design
  const nextDesign = () => {
    if (currentDesignIndex < designs.length - 1) {
      setCurrentDesignIndex(prev => prev + 1);
      resetView();
    }
  };
  
  // Navigate to previous design
  const prevDesign = () => {
    if (currentDesignIndex > 0) {
      setCurrentDesignIndex(prev => prev - 1);
      resetView();
    }
  };
  
  // Handle adding a comment
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!showComments) return;
    
    // Get relative position in the image
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setCommentPosition({ x, y });
  };
  
  // Submit a comment
  const submitComment = () => {
    if (comment.trim() && commentPosition) {
      const newComment = {
        id: Date.now().toString(),
        text: comment,
        position: commentPosition,
        author: 'You',
        timestamp: new Date()
      };
      
      setComments(prev => [...prev, newComment]);
      setComment('');
      setCommentPosition(null);
    }
  };
  
  // Cancel comment
  const cancelComment = () => {
    setComment('');
    setCommentPosition(null);
  };
  
  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-tertiary/20 text-tertiary';
      case 'review': return 'bg-secondary/20 text-secondary';
      case 'approved': return 'bg-green-500/20 text-green-500';
      case 'rejected': return 'bg-red-500/20 text-red-500';
      default: return 'bg-white/10 text-white';
    }
  };
  
  // Get status text
  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft': return 'Draft';
      case 'review': return 'In Review';
      case 'approved': return 'Approved';
      case 'rejected': return 'Needs Revision';
      default: return 'Unknown';
    }
  };

  return (
    <div className={`flex flex-col h-full bg-background/95 border border-white/10 rounded-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-background via-background to-primary/20">
        <div>
          <h3 className="font-bold text-white">{currentDesign.name}</h3>
          <div className="flex items-center space-x-3 mt-1 text-xs text-white/60">
            <span className="flex items-center">
              <User size={12} className="mr-1" />
              {currentDesign.createdBy}
            </span>
            <span className="flex items-center">
              <Calendar size={12} className="mr-1" />
              {formatDate(currentDesign.createdAt)}
            </span>
            <span className="flex items-center">
              <Clock size={12} className="mr-1" />
              Version {currentDesign.version} of {currentDesign.totalVersions}
            </span>
            <span className={`px-2 py-0.5 rounded text-xs ${getStatusColor(currentDesign.status)}`}>
              {getStatusText(currentDesign.status)}
            </span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="special"
            className="flex items-center bg-white/10 hover:bg-white/20 text-white"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageSquare size={16} className="mr-1" />
            {showComments ? 'Exit Comment Mode' : 'Add Comments'}
          </Button>
          
          <Button
            variant="special"
            className="flex items-center bg-primary hover:bg-primary/90 text-white"
          >
            <Download size={16} className="mr-1" />
            Download
          </Button>
        </div>
      </div>
      
      {/* Main Design View */}
      <div className="flex-1 overflow-auto relative bg-white/5">
        <div 
          className="min-h-full flex items-center justify-center p-4"
        >
          {/* Design Image */}
          <div 
            className="relative"
            onClick={handleImageClick}
          >
            <div
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg)`,
                transition: 'transform 0.2s ease'
              }}
            >
              <Image
                src={currentDesign.url}
                alt={currentDesign.name}
                width={currentDesign.width}
                height={currentDesign.height}
                className="max-w-full pointer-events-none"
              />
            </div>
            
            {/* Comment markers */}
            {showComments && comments.map(comment => (
              <div
                key={comment.id}
                className="absolute w-6 h-6 bg-secondary text-background rounded-full flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
                style={{
                  left: `${comment.position.x}%`,
                  top: `${comment.position.y}%`,
                  zIndex: 10
                }}
                title={comment.text}
              >
                <MessageSquare size={12} />
              </div>
            ))}
            
            {/* New comment input */}
            {commentPosition && (
              <div
                className="absolute bg-white/10 p-3 rounded-lg shadow-lg transform -translate-x-1/2 z-20"
                style={{
                  left: `${commentPosition.x}%`,
                  top: `${commentPosition.y + 5}%`,
                  width: '250px'
                }}
              >
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add your comment..."
                  className="w-full p-2 bg-background border border-white/20 rounded-md text-white text-sm mb-2"
                  rows={3}
                />
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="special"
                    className="bg-white/10 hover:bg-white/20 text-white text-xs py-1"
                    onClick={cancelComment}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="special"
                    className="bg-primary hover:bg-primary/90 text-white text-xs py-1"
                    onClick={submitComment}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Controls */}
      <div className="p-4 border-t border-white/10 bg-background flex justify-between">
        <div className="flex space-x-2">
          <Button
            variant="special"
            className="bg-white/10 hover:bg-white/20 text-white"
            onClick={handleZoomOut}
            aria-label="Zoom out"
          >
            <ZoomOut size={18} />
          </Button>
          
          <div className="px-2 flex items-center text-white/70">
            {Math.round(zoom * 100)}%
          </div>
          
          <Button
            variant="special"
            className="bg-white/10 hover:bg-white/20 text-white"
            onClick={handleZoomIn}
            aria-label="Zoom in"
          >
            <ZoomIn size={18} />
          </Button>
          
          <Button
            variant="special"
            className="bg-white/10 hover:bg-white/20 text-white"
            onClick={handleRotate}
            aria-label="Rotate"
          >
            <RotateCw size={18} />
          </Button>
          
          <Button
            variant="special"
            className="bg-white/10 hover:bg-white/20 text-white"
            onClick={resetView}
          >
            Reset
          </Button>
        </div>
        
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="special"
              className="bg-white/10 hover:bg-white/20 text-white"
              onClick={prevDesign}
              disabled={currentDesignIndex === 0}
            >
              <ChevronLeft size={18} />
            </Button>
            
            <span className="text-white/70">
              {currentDesignIndex + 1} of {designs.length}
            </span>
            
            <Button
              variant="special"
              className="bg-white/10 hover:bg-white/20 text-white"
              onClick={nextDesign}
              disabled={currentDesignIndex === designs.length - 1}
            >
              <ChevronRight size={18} />
            </Button>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="special"
              className="bg-green-500 hover:bg-green-600 text-white"
              aria-label="Approve design"
            >
              <Check size={18} className="mr-1" />
              Approve
            </Button>
            
            <Button
              variant="special"
              className="bg-red-500 hover:bg-red-600 text-white"
              aria-label="Request changes"
            >
              <X size={18} className="mr-1" />
              Request Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignWorkspace;