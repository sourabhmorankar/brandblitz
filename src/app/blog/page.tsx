'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { Search, Calendar, Tag, ArrowRight } from 'lucide-react';

// Mock blog data
const blogPosts = [
  {
    id: 1,
    title: 'The Psychology of Color in Brand Design',
    excerpt: 'Discover how different colors evoke specific emotions and how to leverage this in your brand design for maximum impact.',
    category: 'Branding',
    tags: ['color theory', 'branding', 'psychology'],
    author: 'Alex Morgan',
    date: '2025-02-12',
    readTime: '5 min read',
    imageUrl: '/api/placeholder/800/400'
  },
  {
    id: 2,
    title: 'Designing for Accessibility: Best Practices',
    excerpt: 'Learn how to create inclusive designs that reach a wider audience and provide better experiences for people with disabilities.',
    category: 'Design Tips',
    tags: ['accessibility', 'inclusive design', 'UX'],
    author: 'Jordan Lee',
    date: '2025-02-08',
    readTime: '7 min read',
    imageUrl: '/api/placeholder/800/400'
  },
  {
    id: 3,
    title: 'How AI is Transforming the Design Industry',
    excerpt: 'Explore the ways artificial intelligence is changing how designers work and what this means for the future of creative industries.',
    category: 'Technology',
    tags: ['AI', 'future trends', 'technology'],
    author: 'Sam Wilson',
    date: '2025-01-28',
    readTime: '6 min read',
    imageUrl: '/api/placeholder/800/400'
  },
  {
    id: 4,
    title: 'The Art of Typography in Modern Web Design',
    excerpt: 'A deep dive into how typography choices can make or break your website design and tips for selecting the perfect fonts.',
    category: 'Web Design',
    tags: ['typography', 'fonts', 'web design'],
    author: 'Riley Chen',
    date: '2025-01-20',
    readTime: '8 min read',
    imageUrl: '/api/placeholder/800/400'
  },
  {
    id: 5,
    title: 'Building a Cohesive Brand Identity System',
    excerpt: 'Step-by-step guide to creating a comprehensive brand identity that maintains consistency across all touchpoints.',
    category: 'Branding',
    tags: ['brand identity', 'brand system', 'consistency'],
    author: 'Alex Morgan',
    date: '2025-01-15',
    readTime: '10 min read',
    imageUrl: '/api/placeholder/800/400'
  },
  {
    id: 6,
    title: 'Minimalism vs. Maximalism: Finding Your Brands Style',
    excerpt: 'Compare these contrasting design approaches and learn how to determine which aesthetic aligns with your brand values.',
    category: 'Design Tips',
    tags: ['minimalism', 'maximalism', 'brand aesthetics'],
    author: 'Jordan Lee',
    date: '2025-01-05',
    readTime: '6 min read',
    imageUrl: '/api/placeholder/800/400'
  }
];

// Categories for filtering
const categories = [
  'All',
  'Branding',
  'Design Tips',
  'Technology',
  'Web Design',
  'Marketing'
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  // Filter items based on selected category and search query
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Design Insights & Resources</h1>
        <p className="text-xl text-white/70 max-w-3xl mx-auto">
          Explore our collection of articles, guides, and insights about design, branding, and creative collaboration.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-white/40" />
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
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

      {/* Featured Post (First Post) */}
      {filteredPosts.length > 0 && (
        <div className="mb-16">
          <div className="bg-gradient-to-r from-primary/20 via-secondary/20 to-tertiary/20 p-1 rounded-xl">
            <div className="bg-background rounded-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative h-64 md:h-full">
                  <Image
                    src={filteredPosts[0].imageUrl}
                    alt={filteredPosts[0].title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col">
                  <div className="flex items-center text-sm text-white/60 mb-2">
                    <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs">
                      {filteredPosts[0].category}
                    </span>
                    <span className="mx-2">•</span>
                    <Calendar size={14} className="mr-1" />
                    <span>{formatDate(filteredPosts[0].date)}</span>
                    <span className="mx-2">•</span>
                    <span>{filteredPosts[0].readTime}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {filteredPosts[0].title}
                  </h2>
                  <p className="text-white/70 mb-6 flex-grow">
                    {filteredPosts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-2">
                        {filteredPosts[0].author.charAt(0)}
                      </div>
                      <span className="text-white">{filteredPosts[0].author}</span>
                    </div>
                    <Button
                      variant="default"
                      className="bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md transition-colors"
                      onClick={() => router.push(`/blog/${filteredPosts[0].id}`)}
                    >
                      Read More
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.slice(1).map(post => (
          <div
            key={post.id}
            className="bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:transform hover:scale-102 transition-transform"
          >
            <div className="relative h-48">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center text-sm text-white/60 mb-2">
                <span className="bg-white/10 text-white/80 px-2 py-1 rounded text-xs">
                  {post.category}
                </span>
                <span className="mx-2">•</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
              <p className="text-white/70 mb-4 line-clamp-3">{post.excerpt}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="flex items-center bg-white/5 text-white/60 text-xs px-2 py-1 rounded"
                  >
                    <Tag size={12} className="mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center text-sm">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white font-bold mr-2">
                    {post.author.charAt(0)}
                  </div>
                  <span className="text-white/60">{post.author}</span>
                </div>
                <span className="text-white/60 text-sm flex items-center">
                  <Calendar size={12} className="mr-1" />
                  {new Date(post.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
              </div>
              
              <Button
                variant="default"
                className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white py-2 rounded-md transition-colors"
                onClick={() => router.push(`/blog/${post.id}`)}
              >
                Read Article
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-16 bg-white/5 rounded-lg border border-white/10">
          <h3 className="text-xl font-bold text-white mb-2">No articles found</h3>
          <p className="text-white/70 mb-6">
            No articles match your current search or filter criteria.
          </p>
          <Button
            variant="default"
            className="bg-primary hover:bg-primary/90 text-white py-2 px-6 rounded-md transition-colors"
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
          >
            View All Articles
          </Button>
        </div>
      )}

      {/* Newsletter Section */}
      <div className="mt-20 p-8 bg-white/5 border border-white/10 rounded-xl">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Stay Updated with Design Trends</h2>
          <p className="text-white/70 mb-6">
            Subscribe to our newsletter to receive the latest design insights, tips, and resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Button
              variant="default"
              className="bg-primary hover:bg-primary/90 text-white py-2 px-6 rounded-md transition-colors whitespace-nowrap"
            >
              Subscribe
            </Button>
          </div>
          <p className="text-white/50 text-xs mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
}