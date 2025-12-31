import React from 'react';
import ArticleCard from './ArticleCard';
import QuizCard from './QuizCard';
import { motion } from 'framer-motion';

export default function ContentGrid({ articles, quizzes, category, searchTerm, activeFilter }) {
  // Filter articles
  const filteredArticles = articles.filter(article => {
    const matchesSearch = !searchTerm || 
      article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = activeFilter === 'all' || article.argument_type === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  // Filter quizzes
  const filteredQuizzes = quizzes.filter(quiz => {
    return !searchTerm || 
      quiz.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.description?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-fr">
        {/* Quiz Card - Takes 2 columns */}
        {filteredQuizzes.map((quiz, index) => (
          <motion.div
            key={quiz.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="col-span-2"
          >
            <QuizCard quiz={quiz} category={category} />
          </motion.div>
        ))}

        {/* Article Cards - 1 column each */}
        {filteredArticles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: (filteredQuizzes.length + index) * 0.05 }}
            className="col-span-1"
          >
            <ArticleCard article={article} category={category} />
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredArticles.length === 0 && filteredQuizzes.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No content found matching your criteria.</p>
          <p className="text-gray-400 mt-2">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}