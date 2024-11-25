import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const StartQuiz = () => {
  const { id } = useParams();  // Extract quiz ID from the URL
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    // Fetch quiz data based on the quizId
    const fetchQuizData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/quiz/quiz-detail/${id}/`);  // Fetch specific quiz by ID
        if (!response.ok) {
          throw new Error('Failed to fetch quiz data');
        }
        const data = await response.json();
        
        setQuizData(data);  // Set the quiz data
      } catch (error) {
        setError(error.message);  // Handle any errors
      } finally {
        setLoading(false);  // Stop loading
      }
    };

    fetchQuizData();  // Fetch quiz data when component mounts
  }, [id]);

  // Access the questions from the nested structure
  const questions = quizData?.quiz_content?.quiz?.questions || [];

  // Handle when no questions are found
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-800 p-4 rounded-md">
        <h2 className="font-bold">Error</h2>
        <p>{error}</p>
        <Link to="/all-quizzes" className="text-blue-500">Go back to all quizzes</Link>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="bg-red-100 text-red-800 p-4 rounded-md">
        <h2 className="font-bold">Error</h2>
        <p>No questions found. Please go back and create a quiz.</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === currentQuestion.answer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const getOptionClass = (option) => {
    let baseClass = "w-full py-4 font-bold rounded-lg text-white ";
    if (selectedOption === null) {
      return baseClass + "bg-gray-400"; // Initial color for unselected options
    }
    if (option === currentQuestion.answer) {
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

  const getScoreMessage = () => {
    const scorePercentage = (score / questions.length) * 100;
    if (scorePercentage === 100) {
      return "Outstanding! You got a perfect score!";
    } else if (scorePercentage >= 50) {
      return "Good job! You scored more than 50%.";
    } else {
      return "Keep trying! Practice makes perfect.";
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
            <h1>{quizData?.title || "Quiz Title"}</h1>
          </div>

          {/* Progress Indicator */}
          <div className="text-gray-600 text-lg mr-0">
            Question {currentQuestionIndex + 1} of {questions.length}
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
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl text-center border border-gray-300">
          <div className="text-center space-y-6">
            <div className="text-6xl text-yellow-500 font-bold">
              <i className="fa-solid fa-award"></i>
            </div>
            <h2 className="text-3xl font-bold">Quiz Completed!</h2>
            <p className="text-xl">
              Your Score: {score} / {questions.length}
            </p>
            <p className="text-xl font-semibold">{getScoreMessage()}</p>
            <Link
              to="/quizzes"
              className="py-3 px-6 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-lg mr-2"
            >
              Explore more quizzes
            </Link>
            <button
              onClick={handleTryAgain}
              className="py-3 px-6 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartQuiz;
