import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import SearchFilterBar from '@/components/SearchFilterBar';
import ContentGrid from '@/components/ContentGrid';
import { motion } from 'framer-motion';
import { Atom } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Atheism() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const { data: articles = [], isLoading: articlesLoading } = useQuery({
    queryKey: ['articles', 'atheism'],
    queryFn: () => base44.entities.Article.filter({ category: 'atheism' }),
  });

  const { data: quizzes = [], isLoading: quizzesLoading } = useQuery({
    queryKey: ['quizzes', 'atheism'],
    queryFn: () => base44.entities.Quiz.filter({ category: 'atheism' }),
  });

  const isLoading = articlesLoading || quizzesLoading;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-[250px] bg-gradient-to-r from-slate-900 to-slate-800 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1600&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <Atom className="w-12 h-12 text-[#c9a227] mb-4" />
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Atheism
          </motion.h1>
          <motion.p 
            className="text-slate-300 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Responding to secular and naturalistic arguments
          </motion.p>
        </div>
      </div>

      {/* Search & Filter */}
      <SearchFilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      {/* Content */}
      {isLoading ? (
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Skeleton className="col-span-2 h-[200px] rounded-2xl" />
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-2xl" />
            ))}
          </div>
        </div>
      ) : (
        <ContentGrid
          articles={articles}
          quizzes={quizzes}
          category="atheism"
          searchTerm={searchTerm}
          activeFilter={activeFilter}
        />
      )}
    </div>
  );
}