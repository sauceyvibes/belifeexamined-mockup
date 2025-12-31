import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Cross, Moon, Atom } from 'lucide-react';

export default function Home() {
  const sections = [
    {
      id: 'islam',
      title: 'Islam',
      subtitle: 'Examining Islamic claims',
      image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80',
      icon: Moon,
      page: 'Islam',
      gradient: 'from-emerald-900/80 to-emerald-950/90'
    },
    {
      id: 'atheism',
      title: 'Atheism',
      subtitle: 'Responding to secular arguments',
      image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80',
      icon: Atom,
      page: 'Atheism',
      gradient: 'from-slate-900/80 to-slate-950/90'
    },
    {
      id: 'christianity',
      title: 'Christianity',
      subtitle: 'Defending the faith',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
      icon: Cross,
      page: 'Christianity',
      gradient: 'from-amber-900/80 to-amber-950/90'
    },
    {
      id: 'gospel',
      title: 'The Gospel',
      subtitle: 'The good news of salvation',
      image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&q=80',
      icon: BookOpen,
      page: 'Gospel',
      gradient: 'from-[#1a1f36]/80 to-[#1a1f36]/95'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] bg-[#1a1f36] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a1f36]/50" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            BELIEF <span className="text-[#c9a227]">EXAMINED</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Testing worldviews through reason, evidence, and truth
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8"
          >
            <Link 
              to={createPageUrl('Gospel')}
              className="inline-flex items-center gap-2 bg-[#c9a227] text-[#1a1f36] px-8 py-4 rounded-full font-semibold hover:bg-[#d4ad32] transition-colors"
            >
              Discover the Gospel
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Topic Sections Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center text-[#1a1f36] mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Explore Topics
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link 
                  to={createPageUrl(section.page)}
                  className="group block relative h-[300px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${section.image})` }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${section.gradient}`} />
                  
                  {/* Content */}
                  <div className="relative h-full p-8 flex flex-col justify-end">
                    <section.icon className="w-10 h-10 text-[#c9a227] mb-4" />
                    <h3 className="text-3xl font-bold text-white mb-2">{section.title}</h3>
                    <p className="text-gray-300">{section.subtitle}</p>
                    
                    <div className="mt-4 flex items-center text-[#c9a227] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Explore
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1f36] mb-6">
              Ready to Test Your Beliefs?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Take our interactive quizzes and challenge what you think you know about faith, reason, and truth.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to={createPageUrl('Christianity')}
                className="inline-flex items-center gap-2 bg-[#1a1f36] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#252b47] transition-colors"
              >
                Browse Articles
              </Link>
              <Link 
                to={createPageUrl('Gospel')}
                className="inline-flex items-center gap-2 border-2 border-[#1a1f36] text-[#1a1f36] px-8 py-4 rounded-full font-semibold hover:bg-[#1a1f36] hover:text-white transition-colors"
              >
                Learn About the Gospel
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}