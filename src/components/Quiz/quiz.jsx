"use client";
import React, { useState } from "react";

const questions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 1,
  },
];

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerSelect = (optionIndex) => {
    if (!isSubmitted) {
      setSelectedAnswer(optionIndex);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer !== null && !isSubmitted) {
      setIsSubmitted(true);
      if (selectedAnswer === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
      setIsSubmitted(false);
    } else {
      setShowScore(true);
    }
  };

  const getOptionClassName = (index) => {
    if (!isSubmitted) {
      return `w-full p-4 text-left rounded-lg transition-colors ${
        selectedAnswer === index
          ? "bg-[#4173F2] text-white"
          : "bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
      }`;
    }

    if (index === questions[currentQuestion].correctAnswer) {
      return "w-full p-4 text-left rounded-lg transition-colors bg-green-500 text-white";
    }

    if (index === selectedAnswer) {
      return `w-full p-4 text-left rounded-lg transition-colors ${
        selectedAnswer === questions[currentQuestion].correctAnswer
          ? "bg-green-500 text-white"
          : "bg-red-500 text-white"
      }`;
    }

    return "w-full p-4 text-left rounded-lg transition-colors bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200";
  };

  if (showScore) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Quiz Completed!
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Your score: {score} out of {questions.length}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Score: {score}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {questions[currentQuestion].question}
            </h2>
          </div>

          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={isSubmitted}
                className={getOptionClassName(index)}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null || isSubmitted}
              className={`w-full py-3 rounded-lg transition-colors ${
                selectedAnswer === null || isSubmitted
                  ? "bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-[#4173F2] hover:bg-[#3461d1] text-white"
              }`}
            >
              Submit Answer
            </button>

            <button
              onClick={handleNextQuestion}
              disabled={!isSubmitted}
              className={`w-full py-3 rounded-lg transition-colors ${
                !isSubmitted
                  ? "bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-[#4173F2] hover:bg-[#3461d1] text-white"
              }`}
            >
              {currentQuestion === questions.length - 1
                ? "Finish Quiz"
                : "Next Question"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
