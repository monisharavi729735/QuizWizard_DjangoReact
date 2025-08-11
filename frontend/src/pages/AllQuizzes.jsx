import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import QuizList from '../components/QuizList';
const apiBaseUrl = import.meta.env.VITE_API_URL;

const AllQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [myQuizzes, setMyQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showMyQuizzes, setShowMyQuizzes] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Added state to track login status
  const [visibleQuizzes, setVisibleQuizzes] = useState(9); // Number of quizzes to display
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/api/quiz/quiz-list/`);
        setQuizzes(response.data);
        setFilteredQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('authToken');

        if (!token) {
          setIsLoggedIn(false);  // User is not logged in
          setUserLoading(false);
          return;
        }

        const response = await axios.get(`${apiBaseUrl}/api/auth/user/`, {
          withCredentials: true,
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        setUserId(response.data.pk);
        setIsLoggedIn(true);  // User is logged in
      } catch (error) {
        console.error('Failed to fetch user data:', error.response?.data || error.message);
        setIsLoggedIn(false);  // In case of error, assume user is not logged in
      } finally {
        setUserLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userId) {
      setMyQuizzes(quizzes.filter((quiz) => quiz.creator_id === userId));
    }
  }, [userId, quizzes]);

  const handleFilterChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
    const list = showMyQuizzes ? myQuizzes : quizzes;

    if (difficulty === 'all') {
      setFilteredQuizzes(list);
    } else {
      setFilteredQuizzes(list.filter((quiz) => quiz.difficulty === difficulty));
    }

    // Reset visible quizzes to initial count
    setVisibleQuizzes(9);
  };

  const handleToggleMyQuizzes = () => {
    setShowMyQuizzes(!showMyQuizzes);
    const list = !showMyQuizzes ? myQuizzes : quizzes;

    if (selectedDifficulty === 'all') {
      setFilteredQuizzes(list);
    } else {
      setFilteredQuizzes(list.filter((quiz) => quiz.difficulty === selectedDifficulty));
    }

    // Reset visible quizzes to initial count
    setVisibleQuizzes(9);
  };

  const handleDeleteQuiz = async (quizId) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;

    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`${apiBaseUrl}/api/quiz/quiz-detail/${quizId}/`, {
        headers: { Authorization: `Token ${token}` }
      });


      // Remove deleted quiz from state
      setQuizzes((prev) => prev.filter((quiz) => quiz.id !== quizId));
      setFilteredQuizzes((prev) => prev.filter((quiz) => quiz.id !== quizId));
      setMyQuizzes((prev) => prev.filter((quiz) => quiz.id !== quizId));

    } catch (error) {
      console.error("Error deleting quiz:", error.response?.data || error.message);
    }
  };

  const handleLoadMore = () => {
    setVisibleQuizzes((prev) => prev + 9);
  };

  if (loading || userLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold text-center">Loading...</h1>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold text-center">
          Please <a href="/login" className="text-blue-600">login</a> or <a href="/signup" className="text-blue-600">signup</a> to view all quizzes.
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-5 text-center">Available Quizzes</h1>
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
      
      {/* Conditional message if no quizzes are available */}
      {filteredQuizzes.length === 0 ? (
        <div className="text-center mt-10 text-lg text-gray-600">
          No quizzes available yet
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredQuizzes.slice(0, visibleQuizzes).map((quiz) => (
            <QuizList
              key={quiz.id}
              title={quiz.quiz_content.quiz.title}
              description={quiz.quiz_content.quiz.description}
              difficulty={quiz.difficulty}
              numQuestions={quiz.num_questions}
              created={quiz.date_created}
              link={`/start-quiz/${quiz.id}`}
              isOwner={quiz.creator_id === userId}  
              onDelete={() => handleDeleteQuiz(quiz.id)}
            />
          ))}
        </div>
      )}

      {visibleQuizzes < filteredQuizzes.length && (
        <div className="text-center mt-8">
          <button
            onClick={handleLoadMore}
            className="px-5 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-800 transition duration-200"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default AllQuizzes;
