import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCheck, FiClock, FiRefreshCw } from 'react-icons/fi';

const AlgorithmChallenge = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [userSolution, setUserSolution] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [testResults, setTestResults] = useState([]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes per challenge
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Sample algorithm challenges
  const levels = [
    {
      title: 'Fizz Buzz',
      description: 'Write a function that returns an array with numbers from 1 to n, but for multiples of 3 use "Fizz", for multiples of 5 use "Buzz", and for multiples of both 3 and 5 use "FizzBuzz".',
      initialCode: `function fizzBuzz(n) {
  // Your solution here
  
}`,
      testCases: [
        { input: 5, expected: [1, 2, 'Fizz', 4, 'Buzz'] },
        { input: 15, expected: [1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz', 11, 'Fizz', 13, 14, 'FizzBuzz'] }
      ],
      solution: `function fizzBuzz(n) {
  const result = [];
  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      result.push('FizzBuzz');
    } else if (i % 3 === 0) {
      result.push('Fizz');
    } else if (i % 5 === 0) {
      result.push('Buzz');
    } else {
      result.push(i);
    }
  }
  return result;
}`
    },
    {
      title: 'Palindrome Checker',
      description: 'Write a function that checks if a given string is a palindrome (reads the same forwards and backwards), ignoring spaces, punctuation, and capitalization.',
      initialCode: `function isPalindrome(str) {
  // Your solution here
  
}`,
      testCases: [
        { input: 'racecar', expected: true },
        { input: 'A man, a plan, a canal: Panama', expected: true },
        { input: 'hello world', expected: false }
      ],
      solution: `function isPalindrome(str) {
  // Remove non-alphanumeric characters and convert to lowercase
  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // Compare with reversed string
  return cleanStr === cleanStr.split('').reverse().join('');
}`
    }
  ];

  // Initialize the game
  useEffect(() => {
    startLevel(currentLevel);
  }, [currentLevel]);

  // Handle timer
  useEffect(() => {
    if (timeLeft > 0 && !isCorrect && !gameOver) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, isCorrect, gameOver]);

  const startLevel = (levelIndex) => {
    const level = levels[levelIndex];
    setUserSolution(level.initialCode);
    setIsCorrect(null);
    setTestResults([]);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const runTests = () => {
    try {
      // Evil eval, but this is just for a game
      const userFunction = new Function(`
        ${userSolution}
        return {
          run: ${levels[currentLevel].title.toLowerCase().replace(/\s+/g, '')}
        };
      `)();
      
      const results = levels[currentLevel].testCases.map((testCase, index) => {
        try {
          const result = userFunction.run(testCase.input);
          const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);
          return {
            testNumber: index + 1,
            passed,
            input: JSON.stringify(testCase.input),
            expected: JSON.stringify(testCase.expected),
            actual: JSON.stringify(result)
          };
        } catch (error) {
          return {
            testNumber: index + 1,
            passed: false,
            input: JSON.stringify(testCase.input),
            expected: JSON.stringify(testCase.expected),
            actual: `Error: ${error.message}`
          };
        }
      });
      
      setTestResults(results);
      
      const allPassed = results.every(r => r.passed);
      setIsCorrect(allPassed);
      
      if (allPassed) {
        // Add score based on time left and level difficulty
        const levelBonus = (currentLevel + 1) * 10;
        const timeBonus = Math.floor(timeLeft / 30);
        setScore(score + 20 + levelBonus + timeBonus);
      }
    } catch (error) {
      setTestResults([{
        testNumber: 0,
        passed: false,
        input: 'N/A',
        expected: 'N/A',
        actual: `Syntax Error: ${error.message}`
      }]);
      setIsCorrect(false);
    }
  };

  const nextLevel = () => {
    if (currentLevel + 1 < levels.length) {
      setCurrentLevel(currentLevel + 1);
      setTimeLeft(300);
    } else {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setCurrentLevel(0);
    setScore(0);
    setTimeLeft(300);
    setGameOver(false);
    startLevel(0);
  };

  const showSolution = () => {
    // Penalty for viewing solution
    setScore(Math.max(0, score - 10));
    setUserSolution(levels[currentLevel].solution);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/games"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-6"
        >
          <FiArrowLeft className="mr-2" /> Back to Games
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          {gameOver ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="text-center p-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Challenge Complete!
              </h2>
              <div className="text-5xl font-bold my-8 text-blue-600 dark:text-blue-400">
                Final Score: {score}
              </div>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                {score >= 80 
                  ? "Excellent job! You're a real algorithmic problem-solver!" 
                  : score >= 40 
                  ? "Good job! Your algorithm skills are solid." 
                  : "Nice effort! Keep practicing your algorithm skills."}
              </p>
              <button
                onClick={restartGame}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Try Again
              </button>
            </motion.div>
          ) : (
            <>
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                    Algorithm Challenge - Level {currentLevel + 1}
                  </h1>
                  <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <div className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-sm font-medium px-3 py-1 rounded-full flex items-center">
                      <FiClock className="mr-1" /> {formatTime(timeLeft)}
                    </div>
                    <div className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 text-sm font-medium px-3 py-1 rounded-full">
                      Score: {score}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {levels[currentLevel].title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {levels[currentLevel].description}
                  </p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Solution:
                  </label>
                  <textarea
                    value={userSolution}
                    onChange={(e) => setUserSolution(e.target.value)}
                    className="w-full h-64 font-mono p-4 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-md"
                    spellCheck="false"
                    disabled={isCorrect === true}
                  ></textarea>
                </div>
                
                {testResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mb-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                      Test Results:
                    </h3>
                    <div className="space-y-2">
                      {testResults.map((result) => (
                        <div
                          key={result.testNumber}
                          className={`p-3 rounded-md ${
                            result.passed
                              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                              : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                          }`}
                        >
                          <div className="flex items-center">
                            <span className={`font-medium ${
                              result.passed 
                                ? 'text-green-700 dark:text-green-300' 
                                : 'text-red-700 dark:text-red-300'
                            }`}>
                              Test {result.testNumber}: {result.passed ? 'Passed' : 'Failed'}
                            </span>
                          </div>
                          <div className="mt-1 text-sm">
                            <p>Input: {result.input}</p>
                            <p>Expected: {result.expected}</p>
                            <p>Actual: {result.actual}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                <div className="flex justify-between">
                  <div>
                    {!isCorrect && (
                      <button
                        onClick={showSolution}
                        className="px-4 py-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors flex items-center"
                      >
                        Show Solution (-10 points)
                      </button>
                    )}
                  </div>
                  <div>
                    {isCorrect ? (
                      <button
                        onClick={nextLevel}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center"
                      >
                        {currentLevel + 1 < levels.length ? 'Next Challenge' : 'Finish Game'} 
                        <FiCheck className="ml-2" />
                      </button>
                    ) : (
                      <button
                        onClick={runTests}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                      >
                        Run Tests
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlgorithmChallenge;