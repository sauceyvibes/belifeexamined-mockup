import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Calendar, Tag, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';

export default function ArticleView() {
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get('id');
  const category = urlParams.get('category');

  const { data: article, isLoading } = useQuery({
    queryKey: ['article', articleId],
    queryFn: async () => {
      const articles = await base44.entities.Article.filter({ id: articleId });
      return articles[0];
    },
    enabled: !!articleId
  });

  const getCategoryPage = () => {
    switch(category) {
      case 'islam': return 'Islam';
      case 'atheism': return 'Atheism';
      case 'christianity': return 'Christianity';
      default: return 'Home';
    }
  };

  const getCategoryLabel = () => {
    return category?.charAt(0).toUpperCase() + category?.slice(1) || 'Article';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="h-[400px] w-full rounded-2xl mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <Link 
            to={createPageUrl('Home')}
            className="text-[#c9a227] hover:underline"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Back Navigation */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link 
            to={createPageUrl(getCategoryPage())}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#c9a227] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to {getCategoryLabel()}
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <motion.div 
        className="max-w-4xl mx-auto px-6 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium ${
            article.argument_type === 'bad' 
              ? 'bg-red-50 text-red-600' 
              : 'bg-green-50 text-green-600'
          }`}>
            <Tag className="w-4 h-4" />
            {article.argument_type === 'bad' ? 'Bad Argument' : 'Strong Argument'}
          </span>
          
          {article.created_date && (
            <span className="flex items-center gap-1.5 text-gray-500 text-sm">
              <Calendar className="w-4 h-4" />
              {format(new Date(article.created_date), 'MMMM d, yyyy')}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#1a1f36] mb-6 leading-tight">
          {article.title}
        </h1>

        {/* Summary */}
        {article.summary && (
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {article.summary}
          </p>
        )}

        {/* Cover Image */}
        {article.image_url && (
          <div className="rounded-2xl overflow-hidden mb-12 shadow-lg">
            <img 
              src={article.image_url} 
              alt={article.title}
              className="w-full h-[400px] object-cover"
            />
          </div>
        )}

        {/* Article Content */}
        <article className="prose prose-lg max-w-none prose-headings:text-[#1a1f36] prose-a:text-[#c9a227] prose-strong:text-[#1a1f36]">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </article>

        {/* Share Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <Link 
              to={createPageUrl(getCategoryPage())}
              className="inline-flex items-center gap-2 text-[#1a1f36] hover:text-[#c9a227] transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              More Articles
            </Link>
            
            <button 
              onClick={() => navigator.share?.({ title: article.title, url: window.location.href })}
              className="inline-flex items-center gap-2 text-gray-500 hover:text-[#c9a227] transition-colors"
            >
              <Share2 className="w-5 h-5" />
              Share
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}