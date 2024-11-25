import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizList from '../components/QuizList';

const AllQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [myQuizzes, setMyQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showMyQuizzes, setShowMyQuizzes] = useState(false);
  const navigate = useNavigate();

  const loggedInUserId = 1; // Replace with dynamic user ID from authentication context

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/quiz/quiz-list/');
        const data = await response.json();

        setQuizzes(data);
        setFilteredQuizzes(data); // Initialize with all quizzes
        console.log(loggedInUserId);
        setMyQuizzes(data.filter((quiz) => quiz.user === loggedInUserId));
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [loggedInUserId]);

  // Filter quizzes based on difficulty
  const handleFilterChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
    const list = showMyQuizzes ? myQuizzes : quizzes;

    if (difficulty === 'all') {
      setFilteredQuizzes(list);
    } else {
      const filtered = list.filter((quiz) => quiz.difficulty === difficulty);
      setFilteredQuizzes(filtered);
    }
  };

  // Toggle between all quizzes and my quizzes
  const handleToggleMyQuizzes = () => {
    setShowMyQuizzes(!showMyQuizzes);
    const list = !showMyQuizzes ? myQuizzes : quizzes;

    // Apply the current difficulty filter to the toggled list
    if (selectedDifficulty === 'all') {
      setFilteredQuizzes(list);
    } else {
      const filtered = list.filter((quiz) => quiz.difficulty === selectedDifficulty);
      setFilteredQuizzes(filtered);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold text-center">Loading Quizzes...</h1>
      </div>
    );
  }

  if (filteredQuizzes.length === 0) {
    return (
      <div className="text-center p-10">
      <h1 className="text-3xl font-bold mb-5">No Quizzes Available</h1>
      <button
        onClick={() => {
          setFilteredQuizzes(quizzes); // Reset filtered quizzes to all quizzes
          setSelectedDifficulty('all'); // Reset difficulty filter
          setShowMyQuizzes(false); // Reset "My Quizzes" toggle
        }}
        className="px-5 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-800 transition duration-200"
      >
        Show All Quizzes
      </button>
    </div>
    );
  }

  return (
    <div className="container mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-5 text-center">Available Quizzes</h1>

      {/* Difficulty Filter Buttons */}
      <div className="flex justify-center space-x-4 mb-8">
      <button
          onClick={handleToggleMyQuizzes}
          className={`px-4 py-2 rounded-lg font-bold ${
            showMyQuizzes
              ? 'bg-purple-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-purple-200'
          }`}
        >
          {showMyQuizzes ? 'Show All Quizzes' : 'Show My Quizzes'}
        </button>
        <button
          onClick={() => handleFilterChange('all')}
          className={`px-4 py-2 rounded-lg font-bold ${
            selectedDifficulty === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-blue-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => handleFilterChange('easy')}
          className={`px-4 py-2 rounded-lg font-bold ${
            selectedDifficulty === 'easy'
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-green-200'
          }`}
        >
          Easy
        </button>
        <button
          onClick={() => handleFilterChange('medium')}
          className={`px-4 py-2 rounded-lg font-bold ${
            selectedDifficulty === 'medium'
              ? 'bg-yellow-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-yellow-200'
          }`}
        >
          Medium
        </button>
        <button
          onClick={() => handleFilterChange('hard')}
          className={`px-4 py-2 rounded-lg font-bold ${
            selectedDifficulty === 'hard'
              ? 'bg-red-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-red-200'
          }`}
        >
          Hard
        </button>
      </div>

      {/* Quizzes Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredQuizzes.map((quiz) => (
          <QuizList
            key={quiz.id}
            title={quiz.quiz_content.quiz.title}
            description={quiz.quiz_content.quiz.description}
            difficulty={quiz.difficulty}
            numQuestions={quiz.num_questions}
            created={quiz.date_created}
            link={`/quiz/${quiz.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AllQuizzes;
