'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { ArrowRight, Filter } from 'lucide-react';

// Mock portfolio data
const portfolioItems = [
  {
    id: 1,
    title: 'Fusion Fitness',
    category: 'Logo Design',
    tags: ['fitness', 'health', 'modern'],
    imageUrl: '/api/placeholder/600/400',
    description: 'A vibrant and energetic logo for a fitness brand that combines strength training and cardio workouts.'
  },
  {
    id: 2,
    title: 'Evergreen Solutions',
    category: 'Brand Identity',
    tags: ['sustainability', 'eco-friendly', 'corporate'],
    imageUrl: '/api/placeholder/600/400',
    description: 'Complete brand identity for an eco-conscious consulting firm focused on sustainable business practices.'
  },
  {
    id: 3,
    title: 'Culinary Delights',
    category: 'Web Design',
    tags: ['food', 'restaurant', 'elegant'],
    imageUrl: '/api/placeholder/600/400',
    description: 'Website design for a high-end restaurant showcasing their menu and culinary expertise.'
  },
  {
    id: 4,
    title: 'TechWave Conference',
    category: 'Print Design',
    tags: ['technology', 'event', 'corporate'],
    imageUrl: '/api/placeholder/600/400',
    description: 'Print materials including flyers, banners, and badges for a major tech conference.'
  },
  {
    id: 5,
    title: 'Bloom Botanicals',
    category: 'Packaging',
    tags: ['beauty', 'organic', 'luxury'],
    imageUrl: '/api/placeholder/600/400',
    description: 'Elegant packaging design for a premium botanical skincare line emphasizing natural ingredients.'
  },
  {
    id: 6,
    title: 'Urban Insights',
    category: 'Logo Design',
    tags: ['real estate', 'urban', 'modern'],
    imageUrl: '/api/placeholder/600/400',
    description: 'Minimalist logo design for a real estate analytics company focused on urban development.'
  }
];

// Categories for filtering
const categories = [
  'All',
  'Logo Design',
  'Brand Identity',
  'Web Design',
  'Print Design',
  'Packaging'
];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();

  // Filter items based on selected category
  const filteredItems = selectedCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Design Portfolio</h1>
        <p className="text-xl text-white/70 max-w-3xl mx-auto">
          Explore our collection of design projects created for clients across various industries. Each project showcases our collaborative approach and attention to detail.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-4 md:mb-0">Projects</h2>
          
          <button 
            className="flex items-center text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md transition-colors md:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} className="mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
          
          <div className={`flex flex-wrap gap-2 w-full md:w-auto ${showFilters ? 'block' : 'hidden md:flex'}`}>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'special'}
                className={`${selectedCategory === category ? 'bg-primary text-white' : 'bg-white/10 text-white'} py-2 px-4 rounded-md transition-colors`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map(item => (
          <div 
            key={item.id} 
            className="bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform"
          >
            <div className="relative h-64">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <span className="bg-white/10 text-white text-xs px-2 py-1 rounded">
                  {item.category}
                </span>
              </div>
              <p className="text-white/70 mb-4">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="bg-white/5 text-white/70 text-xs px-2 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <Button
                variant="default"
                className="w-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white py-2 rounded-md transition-colors"
                onClick={() => router.push(`/portfolio/${item.id}`)}
              >
                View Details
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-16">
          <p className="text-white/70 mb-4">No portfolio items found in this category.</p>
          <Button
            variant="default"
            className="bg-primary hover:bg-primary/90 text-white py-2 px-6 rounded-md transition-colors"
            onClick={() => setSelectedCategory('All')}
          >
            View All Projects
          </Button>
        </div>
      )}

      {/* CTA Section */}
      <div className="mt-20 p-8 bg-gradient-to-r from-primary/20 via-secondary/20 to-tertiary/20 rounded-xl">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to create your own success story?</h2>
          <p className="text-xl text-white/70 mb-8">
            Let's collaborate on your next design project and create something amazing together.
          </p>
          <Button
            variant="default"
            className="bg-primary hover:bg-primary/90 text-white py-3 px-8 rounded-md text-lg transition-colors"
            onClick={() => router.push('/register')}
          >
            Start Your Project
            <ArrowRight size={20} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}