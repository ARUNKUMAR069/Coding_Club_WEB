import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCheck, FiClock } from 'react-icons/fi';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const BugHunter = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [selectedLine, setSelectedLine] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Sample bug hunting challenges
  const levels = [
    {
      language: 'javascript',
      code: `function calculateSum(numbers) {
  let sum = 0;
  for (let i = 0; i <= numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
}

// Test
const test = [1, 2, 3, 4, 5];
console.log(calculateSum(test)); // Should output 15`,
      bugLine: 2,  // 0-indexed where the bug is
      explanation: "The bug is in the for loop condition. It should be 'i < numbers.length' instead of 'i <= numbers.length'. The current condition causes the loop to access an index that doesn't exist (numbers[5]), which is undefined, resulting in NaN."
    },
    {
      language: 'javascript',
      code: `function reverseString(str) {
  let reversed = "";
  for (let i = str.length; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

// Test
console.log(reverseString("hello")); // Should output "olleh"`,
      bugLine: 2,
      explanation: "The bug is in the for loop initialization. It should be 'i = str.length - 1' instead of 'i = str.length'. String indices go from 0 to length-1, so starting at length gives undefined for the first character."
    },
    {
      language: 'javascript',
      code: `function isPalindrome(str) {
  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  for (let i = 0; i < cleanStr.length / 2; i++) {
    if (cleanStr[i] !== cleanStr[cleanStr.length - i]) {
      return false;
    }
  }
  return true;
}

// Test
console.log(isPalindrome("racecar")); // Should output true`,
      bugLine: 3,
      explanation: "The bug is in the comparison inside the for loop. It should be 'cleanStr[cleanStr.length - 1 - i]' instead of 'cleanStr[cleanStr.length - i]'. Without the '- 1', it's comparing with an index beyond the string's length."
    },
  ];

  useEffect(() => {
    if (timeLeft > 0 && !isCorrect && !gameOver) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !gameOver) {
      setGameOver(true);
    }
  }, [timeLeft, isCorrect, gameOver]);

  const handleLineClick = (lineIndex) => {
    if (isCorrect !== null) return;
    
    setSelectedLine(lineIndex);
    if (lineIndex === levels[currentLevel].bugLine) {
      setIsCorrect(true);
      setScore(score + Math.max(10, Math.floor(timeLeft / 2))); // More time left = more points
    } else {
      setIsCorrect(false);
    }
  };

  const nextLevel = () => {
    if (currentLevel + 1 < levels.length) {
      setCurrentLevel(currentLevel + 1);
      setSelectedLine(null);
      setIsCorrect(null);
      setTimeLeft(60);
      setShowExplanation(false);
    } else {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setCurrentLevel(0);
    setSelectedLine(null);
    setTimeLeft(60);
    setIsCorrect(null);
    setScore(0);
    setGameOver(false);
    setShowExplanation(false);
  };

  const renderCodeWithLineNumbers = () => {
    const codeLines = levels[currentLevel].code.split('\n');
    
    return (
      <div className="bg-gray-900 rounded-lg overflow-hidden">
        {codeLines.map((line, index) => (
          <div
            key={index}
            onClick={() => handleLineClick(index)}
            className={`flex cursor-pointer hover:bg-gray-800 transition-colors ${
              selectedLine === index
                ? isCorrect
                  ? 'bg-green-900/50'
                  : 'bg-red-900/50'
                : ''
            }`}
          >
            <div className="text-gray-500 pr-4 pl-2 py-1 text-right select-none w-10 bg-gray-950">
              {index + 1}
            </div>
            <div className="px-4 py-1 overflow-x-auto w-full">
              <code className="font-mono text-gray-200">{line}</code>
            </div>
          </div>
        ))}
      </div>
    );
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

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
          {gameOver ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Game Over!
              </h2>
              <div className="text-5xl font-bold my-8 text-blue-600 dark:text-blue-400">
                Final Score: {score}
              </div>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                {score >= 100 
                  ? "Amazing job! You're a true debugging expert!" 
                  : score >= 50 
                  ? "Great debugging skills! Keep practicing!" 
                  : "Good effort! Keep practicing your debugging skills."}
              </p>
              <button
                onClick={restartGame}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Play Again
              </button>
            </motion.div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  Bug Hunter - Level {currentLevel + 1}
                </h1>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-sm font-medium px-3 py-1 rounded-full flex items-center">
                    <FiClock className="mr-1" /> {timeLeft}s
                  </div>
                  <div className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 text-sm font-medium px-3 py-1 rounded-full">
                    Score: {score}
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  Find the bug in this code:
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Click on the line that contains the bug.
                </p>
                
                {renderCodeWithLineNumbers()}
              </div>
              
              {isCorrect !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg mb-6 ${
                    isCorrect
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
                  }`}
                >
                  <h3 className="font-semibold mb-2">
                    {isCorrect ? 'Correct!' : 'Incorrect!'}
                  </h3>
                  <p>
                    {isCorrect
                      ? `Good job! You found the bug on line ${levels[currentLevel].bugLine + 1}.`
                      : `The bug is actually on line ${levels[currentLevel].bugLine + 1}. Try again!`}
                  </p>
                  
                  {!showExplanation && (
                    <button
                      onClick={() => setShowExplanation(true)}
                      className="mt-2 text-sm font-medium underline"
                    >
                      Show explanation
                    </button>
                  )}
                  
                  {showExplanation && (
                    <div className="mt-2 text-sm">
                      <p className="font-medium">Explanation:</p>
                      <p>{levels[currentLevel].explanation}</p>
                    </div>
                  )}
                </motion.div>
              )}
              
              <div className="flex justify-end">
                {isCorrect && (
                  <button
                    onClick={nextLevel}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center"
                  >
                    {currentLevel + 1 < levels.length ? 'Next Level' : 'Finish Game'} 
                    <FiCheck className="ml-2" />
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BugHunter;