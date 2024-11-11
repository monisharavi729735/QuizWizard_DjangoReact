import React from 'react';
import QuizList from '../components/QuizList';

const quizzesData = [
  { title: 'Physics Quiz', description: 'Basics of physics', link: '/physics' },
  { title: 'Math Quiz', description: 'Algebra and Geometry basics', link: '/math' },
  { title: 'Chemistry Quiz', description: 'Introduction to chemistry', link: '/chemistry' },
  { title: 'Biology Quiz', description: 'Basics of biology', link: '/biology' },
  { title: 'Astronomy Quiz', description: 'The wonders of space', link: '/astronomy' },
  { title: 'Computer Science Quiz', description: 'Programming basics', link: '/cs' },
];

const AllQuizzes = () => {
  return (
    <div className="p-10">
      <h1 className="text-center text-3xl font-bold mb-8">My Quizzes</h1>
      <p className="text-center mb-3 font-normal text-gray-700 dark:text-gray-400">
          These are the quizzes that you have created
      </p>
      <br />
      <QuizList quizzes={quizzesData} />
    </div>
  );
};

export default AllQuizzes;
