import React from 'react';
import { Link } from 'react-router-dom';

// Single Quiz Card Component
const AllQuizzes = ({ title = 'Physics Quiz', description = 'Basics of physics', link = '/' }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
      <div className="h-48 bg-cyan-800 rounded-t-lg flex items-end">
        <Link to={link} className="w-full" aria-label={`View quiz titled ${title}`}>
          <h5 className="mb-4 ml-4 text-2xl font-bold tracking-tight text-white hover:text-cyan-200 transition duration-200">
            {title}
          </h5>
        </Link>
      </div>
      <div className="p-5">
        <p className="h-24 mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
};

// Quiz List Component
const QuizList = ({ quizzes }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {quizzes.map((quiz, index) => (
        <AllQuizzes
          key={index}
          title={quiz.title}
          description={quiz.description}
          link={quiz.link}
        />
      ))}
    </div>
  );
};

export default QuizList;
