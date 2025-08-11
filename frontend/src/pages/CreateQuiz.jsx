import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinners';
const apiBaseUrl = import.meta.env.VITE_API_URL;

const CreateQuiz = () => {
  const [quizData, setQuizData] = useState({
    title: '',
    prompt: '',
    difficulty: 'easy',
    numQuestions: 1,
    userId: null,
  });

  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(true);  // Add a loading state for user data
  const navigate = useNavigate();

  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        console.log("Auth Token:", token);

        const response = await axios.get(`${apiBaseUrl}/api/auth/user/`, {
          withCredentials: true,
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        console.log('Fetched User Data:', response.data);
        setQuizData((prevState) => ({
          ...prevState,
          userId: response.data.pk,  // Set the userId after data is fetched
        }));
      } catch (error) {
        console.error('Failed to fetch user data:', error.response?.data || error.message);
      } finally {
        setUserLoading(false);  // Set userLoading to false after data is fetched
      }
    };

    fetchUserData();
  }, []);  // Only run on mount

  const sendQuizRequest = async (data) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `${apiBaseUrl}/api/quiz/generate-quiz/`,
        data,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'),
          },
        }
      );
      console.log('Quiz Data:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizData({
      ...quizData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!quizData.userId) {
      console.error('User ID is missing. Cannot create quiz.');
      return;
    }
  
    // Log the quiz data before submitting
    console.log('Updated Quiz Data:', quizData);
  
    const quizDataResponse = await sendQuizRequest(quizData);
    if (quizDataResponse) {
      navigate('/answer-quiz', { state: { quizData: quizDataResponse } });
    } else {
      console.error('Failed to generate quiz.');
    }
  };
  

  // Return early if the user data is still loading
  if (userLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner loading={true} />
      </div>
    );
  }

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold sm:text-4xl md:text-5xl mb-5 animate-pulse">
              Crafting your quiz...
            </h1>
            <div className="flex justify-center items-center">
              <Spinner loading={loading} />
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="px-10 py-10">
          <div className="container-xl lg:container m-auto">
            <div className="bg-cyan-100 rounded-xl shadow-xl relative py-10 px-20">
              <h1 className="text-2xl font-extrabold sm:text-4xl md:text-5xl py-10 text-center">
                Design Your Quiz
              </h1>

              {/* Quiz Title */}
              <div className="my-4">
                <label className="block text-lg font-semibold mb-2" htmlFor="title">
                  Quiz Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={quizData.title}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Give a memorable name to your quiz, e.g., Physics Fundamentals Quiz"
                />
              </div>

              {/* Quiz Description */}
              <div className="my-4">
                <label className="block text-lg font-semibold mb-2" htmlFor="prompt">
                  Quiz Description
                </label>
                <textarea
                  id="prompt"
                  name="prompt"
                  value={quizData.prompt}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded h-40"
                  placeholder="Describe the purpose of the quiz or the topics it covers, e.g., This quiz will assess knowledge of basic physics principles."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 rounded-lg my-4">
                {/* Difficulty Level */}
                <div className="my-4">
                  <label className="block text-lg font-semibold mb-2" htmlFor="difficulty">
                    Select Difficulty Level
                  </label>
                  <select
                    id="difficulty"
                    name="difficulty"
                    value={quizData.difficulty}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border bg-white border-gray-300 rounded"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                {/* Number of Questions */}
                <div className="my-4">
                  <label className="block text-lg font-semibold mb-2" htmlFor="numQuestions">
                    Number of Questions
                  </label>
                  <input
                    type="number"
                    id="numQuestions"
                    name="numQuestions"
                    value={quizData.numQuestions}
                    onChange={handleChange}
                    min="1"
                    max="50"
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter the number of questions"
                  />
                </div>
              </div>

              <div className="my-10 text-center">
                <button
                  type="submit"
                  className="text-lg bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg"
                >
                  Create Quiz
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default CreateQuiz;
