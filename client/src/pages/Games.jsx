import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCode, FiTerminal, FiAward, FiChevronRight } from 'react-icons/fi';
import { GiPuzzle } from 'react-icons/gi';

const Games = () => {
  const games = [
    {
      id: 'code-quiz',
      title: 'Code Quiz',
      description: 'Test your programming knowledge with our interactive quiz',
      icon: <FiCode className="h-8 w-8 text-blue-500" />,
      level: 'All Levels',
      path: '/games/code-quiz'
    },
    {
      id: 'bug-hunter',
      title: 'Bug Hunter',
      description: 'Find and fix bugs in code snippets before time runs out',
      icon: <FiTerminal className="h-8 w-8 text-green-500" />,
      level: 'Intermediate',
      path: '/games/bug-hunter'
    },
    {
      id: 'syntax-scramble',
      title: 'Syntax Scramble',
      description: 'Arrange code snippets in the correct order to solve problems',
      icon: <GiPuzzle className="h-8 w-8 text-purple-500" />,
      level: 'Beginner',
      path: '/games/syntax-scramble'
    },
    {
      id: 'algorithm-challenge',
      title: 'Algorithm Challenge',
      description: 'Race against time to solve algorithm challenges',
      icon: <FiAward className="h-8 w-8 text-orange-500" />,
      level: 'Advanced',
      path: '/games/algorithm-challenge'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Coding Games
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-blue-100">
              Have fun while sharpening your coding skills with these interactive games
            </p>
          </motion.div>
        </div>
        
        {/* Wave SVG separator */}
        <div className="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
              className="dark:fill-gray-900"
            ></path>
          </svg>
        </div>
      </div>

      {/* Games Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {games.map((game) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                      {game.icon}
                    </div>
                    <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs font-semibold px-2.5 py-0.5 rounded">
                      {game.level}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
                    {game.title}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {game.description}
                  </p>
                  <div className="mt-6">
                    <Link
                      to={game.path}
                      className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Play Now 
                      <FiChevronRight className="ml-2" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Why Play Coding Games?
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Playing coding games can improve your problem-solving skills, reinforce programming concepts,
              and make learning to code more enjoyable. Challenge yourself and have fun while growing your abilities!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Games;