import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateQuiz = () => {
  async function sendQuizRequest(data) {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/quiz/generate-quiz/', data);
      console.log('Quiz Data:', response.data);
      return response.data; // Return the quiz data
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      return null; // Return null if there's an error
    }
  }  

  const [quizData, setQuizData] = useState({
    title: '',
    prompt: '',
    difficulty: 'easy',
    numQuestions: 1,
  });

  const navigate = useNavigate(); // Corrected position inside the component

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizData({
      ...quizData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from submitting normally
    
    const quizDataResponse = await sendQuizRequest(quizData); // Get the quiz data
    
    if (quizDataResponse) {
      console.log("Submit Quiz");
      navigate('/answer-quiz', { state: { quizData: quizDataResponse } }); // Pass data using navigate state
    } else {
      console.error("Failed to generate quiz.");
    }
  };  

  return (
    <>
      <form onSubmit={handleSubmit} className="px-10 py-10">
        <div className="container-xl lg:container m-auto">
          <div className="bg-cyan-100 rounded-xl shadow-xl relative py-10 px-20">

            <h1 className="text-2xl font-extrabold sm:text-4xl md:text-5xl py-10 text-center">
              Design Your Quiz
            </h1>

            {/* Quiz Title */}
            <div className="my-4">
              <label className="block text-lg font-semibold mb-2" htmlFor="prompt">
                Quiz Title
              </label>
              <input
                type='text'
                id="title"
                name="title"
                value={quizData.title}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Give a memorable name to your quiz, e.g., Physics Fundamentals Quiz"
              />
            </div>

            {/* Quiz Prompt */}
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
            <div className='my-10 text-center'>
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
    </>
  );
};

export default CreateQuiz;
