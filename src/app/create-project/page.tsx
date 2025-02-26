'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Button from '@/components/ui/Button';
import { ChevronLeft, ChevronRight, Upload, Plus, Trash } from 'lucide-react';
import { db } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

// Project types
const projectTypes = [
  { id: 'logo', name: 'Logo Design', description: 'Create a unique visual identity for your brand' },
  { id: 'branding', name: 'Brand Identity', description: 'Develop a complete brand system, including logo, colors, and typography' },
  { id: 'web', name: 'Web Design', description: 'Design a website that showcases your brand and engages visitors' },
  { id: 'print', name: 'Print Materials', description: 'Create business cards, brochures, flyers, and other print materials' },
  { id: 'packaging', name: 'Packaging Design', description: 'Design packaging that stands out on shelves and protects your product' },
  { id: 'social', name: 'Social Media Graphics', description: 'Create eye-catching visuals for your social media platforms' }
];

export default function CreateProjectPage() {
  const router = useRouter();
  const { user } = useAuth();
  
  // Form state
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [audience, setAudience] = useState('');
  const [tone, setTone] = useState('');
  const [references, setReferences] = useState<string[]>([]);
  const [referenceInput, setReferenceInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Go to next step
  const nextStep = () => {
    if (step === 1 && !projectType) {
      alert('Please select a project type');
      return;
    }
    
    if (step === 2 && !projectName) {
      alert('Please enter a project name');
      return;
    }
    
    setStep(step + 1);
  };
  
  // Go to previous step
  const prevStep = () => {
    setStep(step - 1);
  };
  
  // Add reference
  const addReference = () => {
    if (referenceInput && !references.includes(referenceInput)) {
      setReferences([...references, referenceInput]);
      setReferenceInput('');
    }
  };
  
  // Remove reference
  const removeReference = (index: number) => {
    setReferences(references.filter((_, i) => i !== index));
  };
  
  // Submit form
  const handleSubmit = async () => {
    if (!user) return;
    
    setIsSubmitting(true);
    
    try {
      // Create project in Firestore
      const projectData = {
        clientId: user.uid,
        title: projectName,
        description: projectDescription,
        status: 'draft',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        type: projectType,
        brief: {
          requirements: projectDescription,
          audience,
          tone,
          references
        }
      };
      
      const projectRef = await addDoc(collection(db, 'projects'), projectData);
      
      // Redirect to the new project
      router.push(`/project/${projectRef.id}`);
    } catch (error) {
      console.error('Error creating project:', error);
      alert('There was an error creating your project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Create a New Design Project</h1>
          
          {/* Progress indicator */}
          <div className="mb-10">
            <div className="flex items-center justify-between">
              <div className={`text-sm font-medium ${step >= 1 ? 'text-primary' : 'text-white/40'}`}>1. Project Type</div>
              <div className={`text-sm font-medium ${step >= 2 ? 'text-primary' : 'text-white/40'}`}>2. Basic Info</div>
              <div className={`text-sm font-medium ${step >= 3 ? 'text-primary' : 'text-white/40'}`}>3. Details</div>
              <div className={`text-sm font-medium ${step >= 4 ? 'text-primary' : 'text-white/40'}`}>4. References</div>
              <div className={`text-sm font-medium ${step >= 5 ? 'text-primary' : 'text-white/40'}`}>5. Review</div>
            </div>
            <div className="mt-2 h-1 bg-white/10 rounded-full">
              <div 
                className="h-1 bg-primary rounded-full transition-all"
                style={{ width: `${(step / 5) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Step 1: Project Type */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-6">What type of design do you need?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projectTypes.map(type => (
                  <div 
                    key={type.id}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      projectType === type.id 
                        ? 'bg-primary/20 border border-primary' 
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                    onClick={() => setProjectType(type.id)}
                  >
                    <h3 className="text-lg font-bold text-white mb-1">{type.name}</h3>
                    <p className="text-white/70 text-sm">{type.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Step 2: Basic Info */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-6">Tell us about your project</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="projectName" className="block text-sm font-medium text-white mb-1">
                    Project Name *
                  </label>
                  <input
                    id="projectName"
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter a name for your project"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="projectDescription" className="block text-sm font-medium text-white mb-1">
                    Project Description *
                  </label>
                  <textarea
                    id="projectDescription"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Describe what you're looking for"
                    rows={4}
                    required
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Step 3: Details */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-6">Additional Details</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="audience" className="block text-sm font-medium text-white mb-1">
                    Target Audience
                  </label>
                  <textarea
                    id="audience"
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Describe your target audience (age, interests, demographics, etc.)"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label htmlFor="tone" className="block text-sm font-medium text-white mb-1">
                    Brand Voice & Tone
                  </label>
                  <textarea
                    id="tone"
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Describe the tone you want to convey (professional, playful, luxurious, etc.)"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Step 4: References */}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-6">Share References & Inspiration</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    Add URLs to designs you like
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      value={referenceInput}
                      onChange={(e) => setReferenceInput(e.target.value)}
                      className="flex-1 px-4 py-2 bg-white/5 border border-white/20 rounded-l-md text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="https://example.com/design-inspiration"
                    />
                    <Button
                      variant="default"
                      className="bg-primary hover:bg-primary/90 text-white rounded-l-none"
                      onClick={addReference}
                    >
                      <Plus size={18} />
                    </Button>
                  </div>
                </div>
                
                {/* Reference list */}
                {references.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Your References
                    </label>
                    <div className="space-y-2">
                      {references.map((ref, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-white/5 border border-white/10 rounded-md">
                          <a 
                            href={ref} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-primary hover:underline truncate flex-1"
                          >
                            {ref}
                          </a>
                          <Button
                            variant="special"
                            className="bg-transparent hover:bg-white/10 text-white/70 hover:text-white ml-2"
                            onClick={() => removeReference(index)}
                          >
                            <Trash size={16} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="p-4 border border-white/10 rounded-md bg-white/5">
                  <div className="flex items-center mb-3">
                    <Upload size={18} className="text-white/70 mr-2" />
                    <h3 className="text-white font-medium">Upload Inspiration Files</h3>
                  </div>
                  <p className="text-white/70 text-sm mb-3">
                    You will be able to upload files directly in the project workspace after creation.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 5: Review */}
          {step === 5 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-6">Review Your Project</h2>
              
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-white/70 mb-1">Project Type</h3>
                  <p className="text-white">
                    {projectTypes.find(type => type.id === projectType)?.name || 'Not specified'}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-white/70 mb-1">Project Name</h3>
                  <p className="text-white">{projectName || 'Not specified'}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-white/70 mb-1">Description</h3>
                  <p className="text-white whitespace-pre-line">{projectDescription || 'Not specified'}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-white/70 mb-1">Target Audience</h3>
                  <p className="text-white whitespace-pre-line">{audience || 'Not specified'}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-white/70 mb-1">Brand Voice & Tone</h3>
                  <p className="text-white whitespace-pre-line">{tone || 'Not specified'}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-white/70 mb-1">References</h3>
                  {references.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1">
                      {references.map((ref, index) => (
                        <li key={index} className="text-primary">
                          <a 
                            href={ref} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hover:underline"
                          >
                            {ref}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-white/70">No references provided</p>
                  )}
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-md">
                <p className="text-white">
                  After creating your project, you will be able to communicate with our team through the chat interface and collaborate on your designs in real-time.
                </p>
              </div>
            </div>
          )}
          
          {/* Navigation buttons */}
          <div className="flex justify-between mt-10">
            {step > 1 ? (
              <Button
                variant="special" 
                className="flex items-center bg-white/10 hover:bg-white/20 text-white"
                onClick={prevStep}
              >
                <ChevronLeft size={16} className="mr-1" />
                Back
              </Button>
            ) : (
              <Button
                variant="special" 
                className="bg-white/10 hover:bg-white/20 text-white"
                onClick={() => router.push('/dashboard')}
              >
                Cancel
              </Button>
            )}
            
            {step < 5 ? (
              <Button
                variant="special" 
                className="flex items-center bg-primary hover:bg-primary/90 text-white"
                onClick={nextStep}
              >
                Next
                <ChevronRight size={16} className="ml-1" />
              </Button>
            ) : (
              <Button
                variant="special" 
                className="bg-primary hover:bg-primary/90 text-white"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating Project...' : 'Create Project'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}