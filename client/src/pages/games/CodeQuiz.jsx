import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const CodeQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Sample questions - in a real app, you'd fetch these from an API
  const questions = [
    {
      question: 'What does CSS stand for?',
      options: [
        'Computer Style Sheets',
        'Creative Style Sheets',
        'Cascading Style Sheets',
        'Colorful Style Sheets'
      ],
      correctAnswer: 2 // index of the correct answer
    },
    {
      question: 'Which of the following is not a JavaScript data type?',
      options: [
        'String',
        'Boolean',
        'Character',
        'Object'
      ],
      correctAnswer: 2
    },
    {
      question: 'What HTML tag is used to create a hyperlink?',
      options: [
        '<link>',
        '<a>',
        '<href>',
        '<url>'
      ],
      correctAnswer: 1
    },
    {
      question: 'Which operator is used to assign a value to a variable in JavaScript?',
      options: [
        ':',
        '*',
        '-',
        '='
      ],
      correctAnswer: 3
    },
    {
      question: 'What does the "C" in CSS stand for?',
      options: [
        'Cascading',
        'Computer',
        'Creative',
        'Colorful'
      ],
      correctAnswer: 0
    }
  ];

  useEffect(() => {
    if (!showScore && !isAnswered && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleAnswerClick(null);
    }
  }, [timeLeft, isAnswered, showScore]);

  const handleAnswerClick = (answerIndex) => {
    setIsAnswered(true);
    setSelectedAnswer(answerIndex);
    
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setIsAnswered(false);
        setSelectedAnswer(null);
        setTimeLeft(30);
      } else {
        setShowScore(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimeLeft(30);
    setIsAnswered(false);
    setSelectedAnswer(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link 
          to="/games"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-6"
        >
          <FiArrowLeft className="mr-2" /> Back to Games
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
          {showScore ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Quiz Complete!
              </h2>
              <div className="text-5xl font-bold my-8 text-blue-600 dark:text-blue-400">
                {score} / {questions.length}
              </div>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                {score === questions.length 
                  ? 'Perfect score! You\'re a coding genius!' 
                  : score >= questions.length / 2 
                  ? 'Good job! Keep practicing to improve your score.' 
                  : 'Keep learning and try again to improve your score!'}
              </p>
              <button
                onClick={resetQuiz}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Play Again
              </button>
            </motion.div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  Code Quiz
                </h1>
                <div className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-sm font-medium px-3 py-1 rounded-full">
                  Question {currentQuestion + 1} / {questions.length}
                </div>
              </div>
              
              <div className="mb-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${(timeLeft / 30) * 100}%` }}
                ></div>
              </div>
              
              <div className="text-right text-sm text-gray-500 dark:text-gray-400 mb-6">
                Time left: {timeLeft}s
              </div>
              
              <div className="mb-8">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  {questions[currentQuestion].question}
                </h2>
                
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => !isAnswered && handleAnswerClick(index)}
                      disabled={isAnswered}
                      className={`w-full text-left p-4 rounded-lg border transition-colors ${
                        isAnswered
                          ? index === questions[currentQuestion].correctAnswer
                            ? 'bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-500'
                            : index === selectedAnswer
                            ? 'bg-red-100 border-red-500 dark:bg-red-900/30 dark:border-red-500'
                            : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700'
                          : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-gray-800 dark:text-gray-200">{option}</span>
                        {isAnswered && (
                          index === questions[currentQuestion].correctAnswer ? (
                            <FiCheckCircle className="text-green-500" />
                          ) : index === selectedAnswer ? (
                            <FiXCircle className="text-red-500" />
                          ) : null
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Current score: {score}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeQuiz;