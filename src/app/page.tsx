'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
// Dynamically import components that use client-side features
// This ensures they're only rendered on the client side
const Button = dynamic(() => import('@/components/atoms/Button'), { ssr: false });
const Text = dynamic(() => import('@/components/atoms/Text'), { ssr: false });
const Avatar = dynamic(() => import('@/components/atoms/Avatar'), { ssr: false });
const Badge = dynamic(() => import('@/components/atoms/Badge'), { ssr: false });
const Checkbox = dynamic(() => import('@/components/atoms/Checkbox'), { ssr: false });
const Divider = dynamic(() => import('@/components/atoms/Divider'), { ssr: false });
const Input = dynamic(() => import('@/components/atoms/Input'), { ssr: false });
const Label = dynamic(() => import('@/components/atoms/Label'), { ssr: false });
const Switch = dynamic(() => import('@/components/atoms/Switch'), { ssr: false });
const Tooltip = dynamic(() => import('@/components/atoms/Tooltip'), { ssr: false });
const Icon = dynamic(() => import('@/components/atoms/Icon'), { ssr: false });
const Spinner = dynamic(() => import('@/components/atoms/Spinner'), { ssr: false });

const ChatBubble = dynamic(() => import('@/components/molecules/ChatBubble'), { ssr: false });
const CommentBox = dynamic(() => import('@/components/molecules/CommentBox'), { ssr: false });
const DropdownMenu = dynamic(() => import('@/components/molecules/DropdownMenu'), { ssr: false });
const FormField = dynamic(() => import('@/components/molecules/FormField'), { ssr: false });
const IconButton = dynamic(() => import('@/components/molecules/IconButton'), { ssr: false });
const Notification = dynamic(() => import('@/components/molecules/Notification'), { ssr: false });
const SearchBar = dynamic(() => import('@/components/molecules/SearchBar'), { ssr: false });
const Tag = dynamic(() => import('@/components/molecules/Tag'), { ssr: false });
const UserCard = dynamic(() => import('@/components/molecules/UserCard'), { ssr: false });

import { 
  ChevronDown, 
  Search, 
  CheckCircle, 
  ArrowRight, 
  Bell,
  Edit,
  Trash
} from 'lucide-react';

export default function ComponentShowcase() {
  // Only initialize state after component mounts
  const [isClient, setIsClient] = useState(false);
  const [checked, setChecked] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  
  // Ensure component only renders on client
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const dropdownItems = [
    { id: 'item1', label: 'Profile Settings', icon: isClient ? <Icon name="User" size={16} /> : null },
    { id: 'item2', label: 'Notifications', icon: isClient ? <Icon name="Bell" size={16} /> : null },
    { id: 'item3', label: 'Log Out', icon: isClient ? <Icon name="LogOut" size={16} /> : null, danger: true },
  ];
  
  return (
    <div className="p-8 bg-background text-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <Text as="h1" size="4xl" weight="bold" className="mb-8">
          BrandBlitz UI Component Library
        </Text>

        {/* Atoms Section */}
        <Text as="h2" size="2xl" weight="bold" className="mb-4 text-primary">
          Atomic Components
        </Text>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          {/* Button Showcase */}
          <section className="space-y-4">
            <Text as="h3" size="xl" weight="bold">Buttons</Text>
            <div className="flex flex-wrap gap-2">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="tertiary">Tertiary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="primary" leftIcon={<ChevronDown size={16} />}>With Icon</Button>
              <Button variant="primary" rightIcon={<ArrowRight size={16} />}>Icon Right</Button>
              <Button variant="primary" isLoading>Loading</Button>
            </div>
          </section>
          
          {/* Text Showcase */}
          <section className="space-y-4">
            <Text as="h3" size="xl" weight="bold">Text</Text>
            <Text as="h1" size="4xl" weight="bold">Heading 1</Text>
            <Text as="h2" size="3xl" weight="semibold">Heading 2</Text>
            <Text as="h3" size="2xl" weight="medium">Heading 3</Text>
            <Text as="p" size="lg">Large paragraph text</Text>
            <Text as="p" size="md">Normal paragraph text</Text>
            <Text as="p" size="sm" color="muted">Small muted text</Text>
          </section>
          
          {/* Avatar Showcase */}
          <section className="space-y-4">
            <Text as="h3" size="xl" weight="bold">Avatars</Text>
            <div className="flex gap-4 items-center">
              <Avatar size="xs" initials="JD" />
              <Avatar size="sm" initials="JD" />
              <Avatar size="md" initials="JD" />
              <Avatar size="lg" initials="JD" />
              <Avatar size="xl" initials="JD" />
            </div>
            <div className="flex gap-4 items-center">
              <Avatar size="md" initials="A" status="online" />
              <Avatar size="md" initials="B" status="away" />
              <Avatar size="md" initials="C" status="busy" />
              <Avatar size="md" initials="D" status="offline" />
            </div>
          </section>
          
          {/* Badge Showcase */}
          <section className="space-y-4">
            <Text as="h3" size="xl" weight="bold">Badges</Text>
            <div className="flex flex-wrap gap-2">
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="tertiary">Tertiary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="primary" size="sm">Small</Badge>
              <Badge variant="primary" size="md">Medium</Badge>
              <Badge variant="primary" size="lg">Large</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="primary" rounded>Rounded</Badge>
              <Badge variant="primary" icon={<CheckCircle size={12} />}>With Icon</Badge>
            </div>
          </section>
          
          {/* Form Controls */}
          <section className="space-y-4">
            <Text as="h3" size="xl" weight="bold">Form Controls</Text>
            <div className="space-y-2">
              <Label htmlFor="sample-input" required>Input Label</Label>
              <Input
                id="sample-input"
                placeholder="Enter text here..."
                inputSize="md"
                leftIcon={<Search size={16} />}
              />
            </div>
            <div className="space-y-2">
              <Checkbox
                label="Remember me"
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
            </div>
            <div className="space-y-2">
              <Switch
                label="Enable notifications"
                checked={switchOn}
                onChange={() => setSwitchOn(!switchOn)}
              />
            </div>
          </section>
          
          {/* Misc Atoms */}
          <section className="space-y-4">
            <Text as="h3" size="xl" weight="bold">Miscellaneous</Text>
            <div className="space-y-4">
              <Divider label="Section Divider" />
              
              <div className="flex space-x-6">
                <Spinner size="sm" label="Loading..." />
                <Spinner size="md" variant="secondary" />
                <Spinner size="lg" variant="tertiary" />
              </div>
              
              <div className="flex space-x-4">
                <Tooltip content="This is a tooltip">
                  <Button variant="ghost">Hover Me</Button>
                </Tooltip>
                
                <Icon name="Settings" size={24} />
              </div>
            </div>
          </section>
        </div>
        
        {/* Molecules Section */}
        <Text as="h2" size="2xl" weight="bold" className="mb-4 text-secondary">
          Molecular Components
        </Text>
        
        <div className="grid grid-cols-1 gap-10 mb-16">
          {/* DropdownMenu */}
          <section className="space-y-4">
            <Text as="h3" size="xl" weight="bold">Dropdown Menu</Text>
            <div className="flex space-x-4">
              <DropdownMenu
                trigger="Open Dropdown"
                items={dropdownItems}
              />
            </div>
          </section>
          
          {/* Search Bar */}
          <section className="space-y-4">
            <Text as="h3" size="xl" weight="bold">Search Bar</Text>
            <div className="max-w-md">
              <SearchBar 
                placeholder="Search..." 
                onSearch={(query) => console.log('Search:', query)} 
              />
            </div>
          </section>
          
          {/* Form Field */}
          <section className="space-y-4">
            <Text as="h3" size="xl" weight="bold">Form Field</Text>
            <div className="max-w-md space-y-4">
              <FormField
                label="Email Address"
                placeholder="example@email.com"
                helperText="We'll never share your email with anyone else."
                isRequired
              />
              
              <FormField
                label="Password"
                type="password"
                placeholder="Enter your password"
                errorMessage="Password must be at least 8 characters"
                isError
              />
            </div>
          </section>
          
          {/* Tags */}
          <section className="space-y-4">
            <Text as="h3" size="xl" weight="bold">Tags</Text>
            <div className="flex flex-wrap gap-2">
              <Tag label="Design" variant="primary" />
              <Tag label="Development" variant="secondary" />
              <Tag label="Marketing" variant="tertiary" />
              <Tag label="Removable" variant="success" removable onRemove={() => console.log('Removed')} />
              <Tag label="With Icon" icon={<CheckCircle size={14} />} variant="info" />
            </div>
          </section>
          
          {/* Icon Buttons */}
          <section className="space-y-4">
            <Text as="h3" size="xl" weight="bold">Icon Buttons</Text>
            <div className="flex flex-wrap gap-4">
              <IconButton icon="Settings" tooltip="Settings" />
              <IconButton icon="Bell" variant="primary" badge={3} />
              <IconButton icon="Heart" variant="tertiary" shape="square" isActive />
              <IconButton icon="Trash" variant="danger" size="lg" />
            </div>
          </section>
          
          {/* Chat & Comments */}
          <section className="space-y-4">
            <Text as="h3" size="xl" weight="bold">Chat & Comments</Text>
            
            <div className="space-y-4 max-w-2xl">
              <ChatBubble
                content="Hey, how's the design coming along?"
                sender="other"
                username="John Designer"
                initials="JD"
                timestamp={new Date(Date.now() - 3600000)}
              />
              
              <ChatBubble
                content="I'm making good progress! Will share the first draft later today."
                sender="user"
                username="You"
                timestamp={new Date()}
                isRead
              />
              
              <CommentBox
                placeholder="Add a comment..."
                onSubmit={(text) => console.log('Comment submitted:', text)}
                userInitials="YO"
              />
            </div>
          </section>
          
          {/* Notifications */}
          <section className="space-y-4">
            <Text as="h3" size="xl" weight="bold">Notifications</Text>
            <div className="space-y-4 max-w-md">
              <Button 
                variant="primary" 
                onClick={() => setShowNotification(true)}
                leftIcon={<Bell size={16} />}
              >
                Show Notification
              </Button>
              
              {showNotification && (
                <Notification
                  title="Design Updates Available"
                  description="New version of your logo design has been uploaded."
                  type="success"
                  dismissible
                  autoDismiss
                  onClose={() => setShowNotification(false)}
                  action={{
                    label: "View Design",
                    onClick: () => console.log("Viewing design")
                  }}
                />
              )}
            </div>
          </section>
          
          {/* User Card */}
          <section className="space-y-4">
            <Text as="h3" size="xl" weight="bold">User Card</Text>
            <div className="max-w-md">
              <UserCard
                name="Jane Smith"
                role="Senior Designer"
                initials="JS"
                status="online"
                badges={[
                  { label: "Pro", variant: "primary" },
                  { label: "Design", variant: "secondary" }
                ]}
                actions={
                  <div className="flex gap-1">
                    <IconButton icon={<Edit size={16} />} size="sm" variant="ghost" tooltip="Edit" />
                    <IconButton icon={<Trash size={16} />} size="sm" variant="ghost" tooltip="Delete" />
                  </div>
                }
                metadata={[
                  { label: "Projects", value: "12 Active" },
                  { label: "Joined", value: "Jan 2023" }
                ]}
                onClick={() => console.log("User card clicked")}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}