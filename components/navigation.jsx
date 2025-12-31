import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function Navigation() {
  return (
    <nav className="w-full bg-[#1a1f36] text-white py-4 px-6 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Links */}
        <div className="flex items-center gap-8 flex-1 justify-end pr-8">
          <Link 
            to={createPageUrl('Islam')}
            className="text-sm font-medium tracking-wide hover:text-[#c9a227] transition-colors duration-300 uppercase"
          >
            Islam
          </Link>
          <Link 
            to={createPageUrl('Atheism')}
            className="text-sm font-medium tracking-wide hover:text-[#c9a227] transition-colors duration-300 uppercase"
          >
            Atheism
          </Link>
        </div>

        {/* Center Title */}
        <Link 
          to={createPageUrl('Home')}
          className="text-2xl md:text-3xl font-bold tracking-wider text-center whitespace-nowrap hover:text-[#c9a227] transition-colors duration-300"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          BELIEF EXAMINED
        </Link>

        {/* Right Links */}
        <div className="flex items-center gap-8 flex-1 justify-start pl-8">
          <Link 
            to={createPageUrl('Christianity')}
            className="text-sm font-medium tracking-wide hover:text-[#c9a227] transition-colors duration-300 uppercase"
          >
            Christianity
          </Link>
          <Link 
            to={createPageUrl('Gospel')}
            className="text-sm font-medium tracking-wide hover:text-[#c9a227] transition-colors duration-300 uppercase"
          >
            What is the Gospel
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden mt-4 flex flex-wrap justify-center gap-4">
        <Link 
          to={createPageUrl('Islam')}
          className="text-xs font-medium tracking-wide hover:text-[#c9a227] transition-colors uppercase"
        >
          Islam
        </Link>
        <Link 
          to={createPageUrl('Atheism')}
          className="text-xs font-medium tracking-wide hover:text-[#c9a227] transition-colors uppercase"
        >
          Atheism
        </Link>
        <Link 
          to={createPageUrl('Christianity')}
          className="text-xs font-medium tracking-wide hover:text-[#c9a227] transition-colors uppercase"
        >
          Christianity
        </Link>
        <Link 
          to={createPageUrl('Gospel')}
          className="text-xs font-medium tracking-wide hover:text-[#c9a227] transition-colors uppercase"
        >
          Gospel
        </Link>
      </div>
    </nav>
  );
}
