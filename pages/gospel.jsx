import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Heart, Cross, ArrowRight, Gift, AlertTriangle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function Gospel() {
  const sections = [
    {
      icon: Heart,
      title: "God's Love",
      content: "God loves you and created you to know Him personally. \"For God so loved the world that He gave His one and only Son, that whoever believes in Him shall not perish but have eternal life.\" (John 3:16)",
      color: "text-rose-500",
      bgColor: "bg-rose-50"
    },
    {
      icon: AlertTriangle,
      title: "The Problem of Sin",
      content: "We are all sinners and separated from God. \"For all have sinned and fall short of the glory of God.\" (Romans 3:23) Our sin creates a barrier between us and a holy God.",
      color: "text-orange-500",
      bgColor: "bg-orange-50"
    },
    {
      icon: Cross,
      title: "Christ's Sacrifice",
      content: "Jesus Christ is God's only provision for our sin. Through Him we can know and experience God's love and plan for our life. \"But God demonstrates His own love for us in this: While we were still sinners, Christ died for us.\" (Romans 5:8)",
      color: "text-[#c9a227]",
      bgColor: "bg-amber-50"
    },
    {
      icon: Gift,
      title: "The Gift of Salvation",
      content: "We must individually receive Jesus Christ as Savior and Lord. \"Yet to all who did receive Him, to those who believed in His name, He gave the right to become children of God.\" (John 1:12)",
      color: "text-emerald-500",
      bgColor: "bg-emerald-50"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] bg-[#1a1f36] overflow-hidden">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1600&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f36] via-transparent to-transparent" />
        
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <BookOpen className="w-16 h-16 text-[#c9a227] mx-auto" />
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            What is the <span className="text-[#c9a227]">Gospel</span>?
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            The word "Gospel" means "good news" — and it is the best news you will ever hear.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1f36] mb-4">
              The Core Message
            </h2>
            <p className="text-xl text-gray-600">
              The Gospel can be summarized in four simple truths:
            </p>
          </motion.div>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                className={`${section.bgColor} rounded-3xl p-8 md:p-10 shadow-sm`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-start gap-6">
                  <div className={`p-4 bg-white rounded-2xl shadow-sm ${section.color}`}>
                    <section.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#1a1f36] mb-3">
                      {index + 1}. {section.title}
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Response Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-12 h-12 text-[#c9a227] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1f36] mb-6">
              How to Respond
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              You can receive Christ right now by faith through prayer. Prayer is simply talking to God. 
              God knows your heart and is not so concerned with your words as He is with the attitude of your heart.
            </p>
            
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg max-w-2xl mx-auto text-left">
              <h3 className="text-xl font-bold text-[#1a1f36] mb-4">A Suggested Prayer:</h3>
              <p className="text-gray-700 italic leading-relaxed">
                "Lord Jesus, I need You. Thank You for dying on the cross for my sins. 
                I open the door of my life and receive You as my Savior and Lord. 
                Thank You for forgiving my sins and giving me eternal life. 
                Take control of my life. Make me the kind of person You want me to be. Amen."
              </p>
            </div>

            <p className="text-gray-500 mt-8">
              If you prayed this prayer and meant it from your heart, you have begun a personal relationship with Jesus Christ.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-20 px-6 bg-[#1a1f36]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Continue Your Journey
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Explore our resources to grow in your faith and understanding.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to={createPageUrl('Christianity')}
                className="inline-flex items-center gap-2 bg-[#c9a227] text-[#1a1f36] px-8 py-4 rounded-full font-semibold hover:bg-[#d4ad32] transition-colors"
              >
                Explore Christianity
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to={createPageUrl('Home')}
                className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#1a1f36] transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}