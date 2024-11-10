import React, { useState } from 'react';

const AnswerQuiz = () => {
  const questions = [
    {
      question: "Which of the following is NOT a consequence of Einstein's theory of general relativity?",
      options: [
        "Gravitational lensing",
        "Time dilation",
        "The existence of black holes",
        "The expansion of the universe",
      ],
      correctAnswer: "The expansion of the universe",
      explanation:
        "While general relativity provides the framework for understanding the universe's expansion, the expansion itself was proposed by Hubble and is not a direct consequence of Einstein's theory.",
    },
    {
      question: "What is the primary force holding atomic nuclei together?",
      options: [
        "Electromagnetic force",
        "Gravitational force",
        "Strong nuclear force",
        "Weak nuclear force",
      ],
      correctAnswer: "Strong nuclear force",
      explanation:
        "The strong nuclear force binds protons and neutrons in the nucleus, counteracting the repulsive electromagnetic force between protons.",
    },
    // Add more questions as needed
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    // Check if selected answer is correct and update score
    if (option === currentQuestion.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const getOptionClass = (option) => {
    let baseClass = "w-full py-4 font-bold rounded-lg text-white ";
    if (selectedOption === null) {
      return baseClass + "bg-gray-400"; // Initial color for unselected options
    }
    if (option === currentQuestion.correctAnswer) {
      return baseClass + "bg-green-400"; // Correct answer color
    }
    return baseClass + "bg-red-400"; // Incorrect answer color
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setSelectedOption(null); // Reset selected option for the next question
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setQuizCompleted(true); // Mark quiz as completed
    }
  };

  const handleTryAgain = () => {
    setScore(0); // Reset score
    setCurrentQuestionIndex(0); // Reset to the first question
    setSelectedOption(null); // Reset selected option
    setQuizCompleted(false); // Reset quiz completion status
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center space-y-6 pb-20">
      {!quizCompleted ? (
        <>
          {/* Quiz Title */}
          <div className="font-bold text-3xl py-4 px-8 rounded-lg w-full max-w-3xl text-center">
            <h1>Physics Quiz</h1>
          </div>

          {/* Question Block */}
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl text-center border border-gray-300">
            <h1 className="text-2xl font-bold text-gray-800">
              {currentQuestion.question}
            </h1>
          </div>

          {/* Answer Options */}
          <div className="space-y-4 w-full max-w-3xl px-4">
            {currentQuestion.options.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                className={`${getOptionClass(option)} ${selectedOption === option ? "border-4 border-black" : ""}`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Explanation Section and Next Button */}
          {selectedOption && (
            <>
              <div className="w-full max-w-3xl px-4 mt-6 bg-gray-200 p-4 rounded-lg text-gray-700">
                <p>
                  <strong>Explanation:</strong> {currentQuestion.explanation}
                </p>
              </div>

              <div className="text-center mt-4 w-full max-w-3xl">
                <button
                  onClick={handleNextQuestion}
                  className="py-3 px-6 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg w-full"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </>
      ) : (
        // Display Score and Try Again button when quiz is completed
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold">Quiz Completed!</h2>
          <p className="text-xl">
            Your Score: {score} / {questions.length}
          </p>
          <button
            onClick={handleTryAgain}
            className="py-3 px-6 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default AnswerQuiz;
