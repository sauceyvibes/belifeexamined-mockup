import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Play, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export default function QuizCard({ quiz, category }) {
  return (
    <Link 
      to={createPageUrl(`QuizView?id=${quiz.id}&category=${category}`)}
      className="group block col-span-2 row-span-1 bg-gradient-to-br from-[#1a1f36] via-[#252b47] to-[#1a1f36] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden relative"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a227]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#c9a227]/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative h-full p-6 flex flex-col justify-between min-h-[200px]">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-5 h-5 text-[#c9a227]" />
            <span className="text-[#c9a227] text-sm font-semibold uppercase tracking-wider">Quiz</span>
          </div>
          
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-[#c9a227] transition-colors">
            {quiz.title}
          </h3>
          
          {quiz.description && (
            <p className="text-gray-400 text-sm line-clamp-2">
              {quiz.description}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-gray-500 text-sm">
            {quiz.questions?.length || 0} Questions
          </span>
          
          <motion.div 
            className="flex items-center gap-2 bg-[#c9a227] text-[#1a1f36] px-4 py-2 rounded-full font-semibold text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-4 h-4" />
            Start Quiz
          </motion.div>
        </div>
      </div>
    </Link>
  );
}