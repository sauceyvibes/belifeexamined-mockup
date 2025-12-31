import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, Trophy, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function QuizView() {
  const urlParams = new URLSearchParams(window.location.search);
  const quizId = urlParams.get('id');
  const category = urlParams.get('category');

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizComplete, setQuizComplete] = useState(false);

  const { data: quiz, isLoading } = useQuery({
    queryKey: ['quiz', quizId],
    queryFn: async () => {
      const quizzes = await base44.entities.Quiz.filter({ id: quizId });
      return quizzes[0];
    },
    enabled: !!quizId
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
    return category?.charAt(0).toUpperCase() + category?.slice(1) || 'Quiz';
  };

  const handleAnswer = (answerIndex) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === quiz.questions[currentQuestion].correct_index;
    if (isCorrect) {
      setScore(score + 1);
    }
    setAnswers([...answers, { questionIndex: currentQuestion, selectedAnswer, isCorrect }]);
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setQuizComplete(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="h-12 w-3/4 mb-8" />
          <Skeleton className="h-4 w-full mb-4" />
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!quiz || !quiz.questions?.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Quiz Not Found</h1>
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

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + (showResult ? 1 : 0)) / quiz.questions.length) * 100;

  // Quiz Complete Screen
  if (quizComplete) {
    const percentage = Math.round((score / quiz.questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1f36] to-[#252b47]">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <motion.div 
            className="bg-white rounded-3xl p-8 md:p-12 text-center shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="mb-8">
              <Trophy className={`w-20 h-20 mx-auto mb-4 ${
                percentage >= 70 ? 'text-[#c9a227]' : 'text-gray-400'
              }`} />
              <h1 className="text-3xl md:text-4xl font-bold text-[#1a1f36] mb-2">
                Quiz Complete!
              </h1>
              <p className="text-gray-500">{quiz.title}</p>
            </div>

            <div className="mb-8">
              <div className="text-6xl font-bold text-[#1a1f36] mb-2">
                {score}/{quiz.questions.length}
              </div>
              <p className="text-xl text-gray-600">
                You scored {percentage}%
              </p>
            </div>

            <div className="mb-8 p-6 bg-gray-50 rounded-2xl">
              <p className="text-lg text-gray-700">
                {percentage >= 90 && "Excellent! You have a strong understanding of this topic!"}
                {percentage >= 70 && percentage < 90 && "Great job! You're well on your way to mastering this subject."}
                {percentage >= 50 && percentage < 70 && "Good effort! Review the material and try again."}
                {percentage < 50 && "Keep studying! Review the articles and give it another shot."}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                onClick={restartQuiz}
                className="bg-[#1a1f36] hover:bg-[#252b47] text-white px-8 py-6 rounded-full font-semibold"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Try Again
              </Button>
              <Link to={createPageUrl(getCategoryPage())}>
                <Button 
                  variant="outline"
                  className="px-8 py-6 rounded-full font-semibold border-2"
                >
                  Back to {getCategoryLabel()}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1a1f36] text-white py-6 px-6">
        <div className="max-w-3xl mx-auto">
          <Link 
            to={createPageUrl(getCategoryPage())}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Exit Quiz
          </Link>
          <h1 className="text-2xl font-bold">{quiz.title}</h1>
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2 bg-gray-700" />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg">
              <h2 className="text-xl md:text-2xl font-bold text-[#1a1f36] mb-8">
                {question.question}
              </h2>

              <div className="space-y-4">
                {question.options.map((option, index) => {
                  let buttonClass = "w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 ";
                  
                  if (showResult) {
                    if (index === question.correct_index) {
                      buttonClass += "border-green-500 bg-green-50 text-green-800";
                    } else if (index === selectedAnswer && index !== question.correct_index) {
                      buttonClass += "border-red-500 bg-red-50 text-red-800";
                    } else {
                      buttonClass += "border-gray-200 bg-gray-50 text-gray-500";
                    }
                  } else {
                    buttonClass += selectedAnswer === index 
                      ? "border-[#c9a227] bg-[#c9a227]/10 text-[#1a1f36]"
                      : "border-gray-200 hover:border-[#c9a227]/50 hover:bg-gray-50";
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={showResult}
                      className={buttonClass}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{option}</span>
                        {showResult && index === question.correct_index && (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        )}
                        {showResult && index === selectedAnswer && index !== question.correct_index && (
                          <XCircle className="w-6 h-6 text-red-500" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {showResult && question.explanation && (
                <motion.div 
                  className="mt-8 p-6 bg-blue-50 rounded-2xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h3 className="font-semibold text-blue-900 mb-2">Explanation:</h3>
                  <p className="text-blue-800">{question.explanation}</p>
                </motion.div>
              )}

              {/* Actions */}
              <div className="mt-8 flex justify-end">
                {!showResult ? (
                  <Button
                    onClick={submitAnswer}
                    disabled={selectedAnswer === null}
                    className="bg-[#c9a227] hover:bg-[#d4ad32] text-[#1a1f36] px-8 py-6 rounded-full font-semibold"
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button
                    onClick={nextQuestion}
                    className="bg-[#1a1f36] hover:bg-[#252b47] text-white px-8 py-6 rounded-full font-semibold"
                  >
                    {currentQuestion < quiz.questions.length - 1 ? (
                      <>
                        Next Question
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    ) : (
                      'See Results'
                    )}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}