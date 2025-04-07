import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCheck, FiRefreshCw, FiClock } from 'react-icons/fi';

const SyntaxScramble = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [lines, setLines] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [timeLeft, setTimeLeft] = useState(120);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Sample scramble challenges
  const levels = [
    {
      title: 'Simple Function',
      description: 'Arrange the code to create a function that returns the square of a number.',
      correctOrder: [
        'function square(num) {',
        '  const result = num * num;',
        '  return result;',
        '}'
      ],
      hint: 'The function needs to start with a declaration, perform a calculation, return a value, and close with a curly brace.'
    },
    {
      title: 'For Loop',
      description: 'Create a for loop that prints numbers from 1 to 10.',
      correctOrder: [
        'for (let i = 1; i <= 10; i++) {',
        '  console.log(i);',
        '}'
      ],
      hint: 'Start with the for loop declaration including initialization, condition, and increment, then add the code to execute, and close with a curly brace.'
    },
    {
      title: 'Array Operations',
      description: 'Create a program that filters even numbers from an array and doubles them.',
      correctOrder: [
        'const numbers = [1, 2, 3, 4, 5, 6, 7, 8];',
        'const evenNumbers = numbers.filter(num => num % 2 === 0);',
        'const doubled = evenNumbers.map(num => num * 2);',
        'console.log(doubled);'
      ],
      hint: 'First define the array, then filter it for even numbers, then map over the result to double each value, and finally log the result.'
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
    // Shuffle the lines
    const shuffledLines = [...level.correctOrder].sort(() => Math.random() - 0.5);
    setLines(shuffledLines);
    setIsCorrect(null);
    setShowHint(false);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(lines);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setLines(items);
  };

  const checkAnswer = () => {
    const isOrderCorrect = lines.every(
      (line, index) => line === levels[currentLevel].correctOrder[index]
    );
    setIsCorrect(isOrderCorrect);

    if (isOrderCorrect) {
      // Add score based on time left and level difficulty
      const levelBonus = (currentLevel + 1) * 5;
      const timeBonus = Math.floor(timeLeft / 10);
      setScore(score + 10 + levelBonus + timeBonus);
    }
  };

  const nextLevel = () => {
    if (currentLevel + 1 < levels.length) {
      setCurrentLevel(currentLevel + 1);
      setTimeLeft(120);
    } else {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setCurrentLevel(0);
    setScore(0);
    setTimeLeft(120);
    setGameOver(false);
    startLevel(0);
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
          {gameOver ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Game Complete!
              </h2>
              <div className="text-5xl font-bold my-8 text-blue-600 dark:text-blue-400">
                Final Score: {score}
              </div>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                {score >= 100 
                  ? "Excellent job! Your code organization skills are top-notch!" 
                  : score >= 50 
                  ? "Good job! You've got solid code organization skills." 
                  : "Nice effort! Keep practicing your code organization."}
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
                  Syntax Scramble - Level {currentLevel + 1}
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
                  {levels[currentLevel].title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {levels[currentLevel].description}
                </p>

                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="scrambled-lines">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden"
                      >
                        {lines.map((line, index) => (
                          <Draggable key={line} draggableId={line} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`bg-gray-50 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600 last:border-b-0 p-3 ${
                                  isCorrect !== null
                                    ? line === levels[currentLevel].correctOrder[index]
                                      ? 'bg-green-50 dark:bg-green-900/30'
                                      : 'bg-red-50 dark:bg-red-900/30'
                                    : ''
                                }`}
                              >
                                <code className="font-mono text-sm text-gray-800 dark:text-gray-200">{line}</code>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>

                {showHint && (
                  <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-lg">
                    <p className="text-sm">
                      <strong>Hint:</strong> {levels[currentLevel].hint}
                    </p>
                  </div>
                )}
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
                  <h3 className="font-semibold">
                    {isCorrect ? 'Correct Order!' : 'Not quite right.'}
                  </h3>
                  <p>
                    {isCorrect
                      ? `Great job! You've correctly ordered the code.`
                      : `Try again! The lines are not in the correct order.`}
                  </p>
                </motion.div>
              )}
              
              <div className="flex justify-between">
                <div>
                  {!isCorrect && (
                    <>
                      <button
                        onClick={() => setShowHint(!showHint)}
                        className="px-4 py-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                      >
                        {showHint ? 'Hide Hint' : 'Show Hint'}
                      </button>
                      <button
                        onClick={() => startLevel(currentLevel)}
                        className="ml-3 px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-lg transition-colors flex items-center"
                      >
                        Shuffle <FiRefreshCw className="ml-2" />
                      </button>
                    </>
                  )}
                </div>
                <div>
                  {isCorrect ? (
                    <button
                      onClick={nextLevel}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center"
                    >
                      {currentLevel + 1 < levels.length ? 'Next Level' : 'Finish Game'} 
                      <FiCheck className="ml-2" />
                    </button>
                  ) : (
                    <button
                      onClick={checkAnswer}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    >
                      Check Order
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SyntaxScramble;