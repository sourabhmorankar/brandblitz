'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import Badge from '@/components/atoms/Badge';
import {
  Download,
  ZoomIn,
  ZoomOut,
  RotateCw,
  X,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  Check,
  Calendar,
  User,
  FileText,
  MessageSquare,
  Loader2,
} from 'lucide-react';

export interface DesignAsset {
  id: string;
  fileName: string;
  fileType: string;
  previewUrl: string;
  downloadUrl?: string;
  createdAt: Date;
  createdBy?: {
    name: string;
    avatarUrl?: string;
  };
  status?: 'draft' | 'review' | 'approved' | 'rejected';
  version?: number;
  totalVersions?: number;
  description?: string;
  tags?: string[];
  width?: number;
  height?: number;
  commentCount?: number;
}

export interface DesignAssetViewerProps {
  /** Current asset being viewed */
  asset: DesignAsset;
  /** Array of assets for navigation */
  assets?: DesignAsset[];
  /** Is the viewer in fullscreen mode */
  isFullscreen?: boolean;
  /** Is loading */
  isLoading?: boolean;
  /** On download click */
  onDownload?: (asset: DesignAsset) => void;
  /** On approve click */
  onApprove?: (asset: DesignAsset) => void;
  /** On reject click */
  onReject?: (asset: DesignAsset) => void;
  /** On comment click */
  onComment?: (asset: DesignAsset) => void;
  /** On version change */
  onVersionChange?: (asset: DesignAsset, version: number) => void;
  /** On asset change (when navigating through assets) */
  onAssetChange?: (asset: DesignAsset) => void;
  /** On toggle fullscreen */
  onToggleFullscreen?: () => void;
  /** Show metadata panel */
  showMetadata?: boolean;
  /** Allow adding comments/annotations */
  allowComments?: boolean;
  /** Allow approving/rejecting designs */
  allowApproval?: boolean;
  /** Show version history */
  showVersionHistory?: boolean;
  /** Additional class name */
  className?: string;
}

/**
 * DesignAssetViewer component for viewing and interacting with design assets
 */
const DesignAssetViewer = ({
  asset,
  assets = [],
  isFullscreen = false,
  isLoading = false,
  onDownload,
  onApprove,
  onReject,
  onComment,
  onVersionChange,
  onAssetChange,
  onToggleFullscreen,
  showMetadata = true,
  allowComments = true,
  allowApproval = true,
  showVersionHistory = true,
  className,
}: DesignAssetViewerProps) => {
  // State for image controls
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isCommenting, setIsCommenting] = useState(false);
  
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Find current asset index in assets array
  const currentIndex = assets.findIndex(a => a.id === asset.id);
  
  // Get file extension
  const getFileExtension = (fileName: string) => {
    return fileName.split('.').pop()?.toUpperCase() || '';
  };
  
  // Get status color
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'draft': return 'tertiary';
      case 'review': return 'info';
      case 'approved': return 'success';
      case 'rejected': return 'danger';
      default: return 'primary';
    }
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
  
  // Handle previous asset
  const handlePrevious = () => {
    if (currentIndex > 0 && onAssetChange) {
      onAssetChange(assets[currentIndex - 1]);
    }
  };
  
  // Handle next asset
  const handleNext = () => {
    if (currentIndex < assets.length - 1 && onAssetChange) {
      onAssetChange(assets[currentIndex + 1]);
    }
  };
  
  // Toggle commenting mode
  const toggleCommenting = () => {
    setIsCommenting(prev => !prev);
  };
  
  // Handle click on image (for commenting)
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isCommenting) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    console.log(`Comment at position: ${x.toFixed(2)}%, ${y.toFixed(2)}%`);
    // You would typically show a comment form at this position
    
    if (onComment) {
      onComment(asset);
    }
  };
  
  // Is the asset an image
  const isImage = asset.fileType.startsWith('image/');
  
  return (
    <div
      className={cn(
        "flex flex-col",
        isFullscreen ? "fixed inset-0 z-50 bg-background" : "relative w-full h-full",
        className
      )}
      ref={containerRef}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between p-2 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <Text weight="medium" truncate className="max-w-[200px]">
            {asset.fileName}
          </Text>
          <Badge variant={getStatusColor(asset.status)} size="sm">
            {asset.status || 'Draft'}
          </Badge>
          {asset.version && (
            <Badge variant="outline" size="sm">
              v{asset.version}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {allowComments && (
            <Button
              variant={isCommenting ? 'primary' : 'ghost'}
              size="sm"
              onClick={toggleCommenting}
              leftIcon={<MessageSquare size={16} />}
              aria-label="Comment mode"
            >
              Comment
            </Button>
          )}
          
          {onDownload && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDownload(asset)}
              leftIcon={<Download size={16} />}
              aria-label="Download asset"
            >
              Download
            </Button>
          )}
          
          {onToggleFullscreen && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleFullscreen}
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </Button>
          )}
          
          {isFullscreen && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleFullscreen}
              aria-label="Close"
            >
              <X size={16} />
            </Button>
          )}
        </div>
      </div>
      
      <div className="flex flex-1 min-h-0">
        {/* Main content area */}
        <div className="flex-1 flex flex-col relative overflow-hidden">
          {/* Asset viewer */}
          <div
            className="flex-1 flex items-center justify-center relative overflow-hidden"
            onClick={handleImageClick}
          >
            {isLoading ? (
              <div className="flex items-center justify-center w-full h-full">
                <Loader2 className="animate-spin text-white/50" size={32} />
              </div>
            ) : isImage ? (
              <div
                className="relative transition-transform cursor-move"
                style={{
                  transform: `scale(${zoom}) rotate(${rotation}deg)`,
                }}
              >
                <Image
                  src={asset.previewUrl}
                  alt={asset.fileName}
                  width={asset.width || 800}
                  height={asset.height || 600}
                  className="pointer-events-none"
                />
                
                {/* Comment indicators would go here */}
                {isCommenting && (
                  <div className="absolute inset-0 bg-black/20 pointer-events-none flex items-center justify-center">
                    <Text color="white" size="lg">Click to add comment</Text>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 flex items-center justify-center bg-white/10 rounded-lg mb-4">
                  <FileText size={32} className="text-white/70" />
                </div>
                <Text size="lg" weight="medium">{asset.fileName}</Text>
                <Text size="sm" color="muted">{getFileExtension(asset.fileName)} file</Text>
                <Button
                  variant="primary"
                  className="mt-4"
                  leftIcon={<Download size={16} />}
                  onClick={() => onDownload && onDownload(asset)}
                >
                  Download to view
                </Button>
              </div>
            )}
          </div>
          
          {/* Image controls */}
          {isImage && (
            <div className="p-2 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleZoomOut}
                  disabled={zoom <= 0.5}
                  aria-label="Zoom out"
                >
                  <ZoomOut size={16} />
                </Button>
                <Text size="sm">{Math.round(zoom * 100)}%</Text>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleZoomIn}
                  disabled={zoom >= 3}
                  aria-label="Zoom in"
                >
                  <ZoomIn size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRotate}
                  aria-label="Rotate"
                >
                  <RotateCw size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetView}
                  aria-label="Reset view"
                >
                  Reset
                </Button>
              </div>
              
              {/* Navigation between assets */}
              {assets.length > 1 && (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePrevious}
                    disabled={currentIndex <= 0}
                    aria-label="Previous asset"
                  >
                    <ChevronLeft size={16} />
                  </Button>
                  <Text size="sm">
                    {currentIndex + 1} / {assets.length}
                  </Text>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleNext}
                    disabled={currentIndex >= assets.length - 1}
                    aria-label="Next asset"
                  >
                    <ChevronRight size={16} />
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Metadata sidebar */}
        {showMetadata && (
          <div className="w-64 border-l border-white/10 flex flex-col bg-white/5 overflow-y-auto">
            <div className="p-3 border-b border-white/10">
              <Text weight="medium" size="sm">Details</Text>
            </div>
            
            <div className="p-3 space-y-4 flex-1">
              {/* Creator */}
              {asset.createdBy && (
                <div>
                  <Text size="xs" color="muted" className="mb-1 flex items-center">
                    <User size={12} className="mr-1" /> Created by
                  </Text>
                  <Text size="sm">{asset.createdBy.name}</Text>
                </div>
              )}
              
              {/* Date */}
              <div>
                <Text size="xs" color="muted" className="mb-1 flex items-center">
                  <Calendar size={12} className="mr-1" /> Date
                </Text>
                <Text size="sm">
                  {asset.createdAt.toLocaleDateString()}
                </Text>
              </div>
              
              {/* File info */}
              <div>
                <Text size="xs" color="muted" className="mb-1 flex items-center">
                  <FileText size={12} className="mr-1" /> File info
                </Text>
                <Text size="sm">
                  {getFileExtension(asset.fileName)} • {asset.width}×{asset.height}
                </Text>
              </div>
              
              {/* Description */}
              {asset.description && (
                <div>
                  <Text size="xs" color="muted" className="mb-1">Description</Text>
                  <Text size="sm">{asset.description}</Text>
                </div>
              )}
              
              {/* Tags */}
              {asset.tags && asset.tags.length > 0 && (
                <div>
                  <Text size="xs" color="muted" className="mb-1">Tags</Text>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {asset.tags.map((tag, index) => (
                      <Badge key={index} size="sm" variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Comments */}
              {asset.commentCount !== undefined && (
                <div>
                  <Text size="xs" color="muted" className="mb-1 flex items-center">
                    <MessageSquare size={12} className="mr-1" /> Comments
                  </Text>
                  <Text size="sm">{asset.commentCount}</Text>
                </div>
              )}
            </div>
            
            {/* Version history */}
            {showVersionHistory && asset.totalVersions && asset.totalVersions > 1 && (
              <div className="border-t border-white/10">
                <div className="p-3 border-b border-white/10">
                  <Text weight="medium" size="sm">Version History</Text>
                </div>
                
                <div className="p-2 max-h-40 overflow-y-auto">
                  {Array.from({ length: asset.totalVersions }).map((_, index) => {
                    const version = asset.totalVersions ? asset.totalVersions - index : 0;
                    const isCurrent = version === asset.version;
                    
                    return (
                      <button
                        key={index}
                        className={cn(
                          "w-full text-left p-2 rounded-md flex items-center justify-between",
                          isCurrent ? "bg-primary/20" : "hover:bg-white/10"
                        )}
                        onClick={() => onVersionChange && onVersionChange(asset, version)}
                        disabled={isCurrent}
                      >
                        <Text size="sm">Version {version}</Text>
                        {isCurrent && <Check size={16} className="text-primary" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Approval actions */}
            {allowApproval && (
              <div className="p-3 border-t border-white/10">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onApprove && onApprove(asset)}
                    leftIcon={<Check size={16} />}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onReject && onReject(asset)}
                    leftIcon={<X size={16} />}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DesignAssetViewer;