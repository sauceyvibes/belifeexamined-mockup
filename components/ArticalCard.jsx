import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight } from 'lucide-react';

export default function ArticleCard({ article, category }) {
  return (
    <Link 
      to={createPageUrl(`ArticleView?id=${article.id}&category=${category}`)}
      className="group block aspect-square bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100"
    >
      <div className="h-full flex flex-col">
        {/* Image */}
        <div className="h-1/2 overflow-hidden bg-gray-100">
          {article.image_url ? (
            <img 
              src={article.image_url} 
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1a1f36] to-[#2a3152] flex items-center justify-center">
              <span className="text-4xl text-white/20 font-bold">BE</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${
              article.argument_type === 'bad' 
                ? 'bg-red-50 text-red-600' 
                : 'bg-green-50 text-green-600'
            }`}>
              {article.argument_type === 'bad' ? 'Bad Argument' : 'Strong Argument'}
            </span>
            <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-[#c9a227] transition-colors">
              {article.title}
            </h3>
          </div>
          
          <div className="flex items-center text-[#c9a227] text-sm font-medium mt-2">
            Read More
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}