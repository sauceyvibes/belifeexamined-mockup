import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function SearchFilterBar({ searchTerm, setSearchTerm, activeFilter, setActiveFilter }) {
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'bad', label: 'Bad Arguments' },
    { id: 'strong', label: 'Strong Arguments' }
  ];

  return (
    <div className="w-full bg-white border-b border-gray-100 py-6 px-6">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search articles and quizzes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 text-base border-gray-200 rounded-full focus:ring-[#c9a227] focus:border-[#c9a227] bg-gray-50"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-[#1a1f36] text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}