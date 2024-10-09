import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const CreateQuiz = () => {

    const navigate = useNavigate();

    const [quizData, setQuizData] = useState({
        title: '',
        prompt: '',
        difficulty: 'easy',
        numQuestions: 1,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuizData({
          ...quizData,
          [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Quiz Data:', quizData);
        // Add logic for backend
        navigate('/answer-quiz'); 
    };

  return (
    <>
    <form onSubmit={handleSubmit} className="px-10 py-10">
        <div className="container-xl lg:container m-auto">
            <div className="bg-cyan-50 rounded-xl shadow-xl relative py-10 px-20">

                <h1 className="text-xl font-extrabold sm:text-5xl md:text-6xl py-10 text-center">
                Create Quiz
                </h1>

                {/* Quiz Title */}
                <div className="my-4">
                    <label className="block text-xl font-semibold mb-2" htmlFor="prompt">
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
                    placeholder="Enter the quiz title"
                    />
                </div>

                {/* Quiz Prompt */}
                <div className="my-4">
                    <label className="block text-xl font-semibold mb-2" htmlFor="prompt">
                    Quiz Prompt
                    </label>
                    <textarea
                    id="prompt"
                    name="prompt"
                    value={quizData.prompt}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded h-40"
                    placeholder="Enter the quiz prompt"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 rounded-lg my-4">
                {/* Difficulty Level */}
                <div className="my-4">
                    <label className="block text-xl font-semibold mb-2" htmlFor="difficulty">
                    Difficulty Level
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
                    <label className="block text-xl font-semibold mb-2" htmlFor="numQuestions">
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
                    placeholder="Enter number of questions"
                    />
                </div>
                </div>
                <div className='my-10 text-center'>
                <button
                    type="submit"
                    className="text-xl bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-3 rounded-lg text-center"
                >
                    Start Quiz!
                </button>
                </div>
            </div>
        </div>
    </form>
    </>
  )
}

export default CreateQuiz
