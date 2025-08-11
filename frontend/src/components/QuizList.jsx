import React from "react";
import { Link } from "react-router-dom";

const QuizList = ({
  title,
  description,
  difficulty,
  numQuestions,
  created,
  link,
  isOwner,
  onDelete
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
      {/* Header */}
      <div className="h-24 bg-cyan-800 rounded-t-lg flex items-end justify-between">
        <h5 className="mb-4 ml-4 text-2xl font-bold tracking-tight text-white hover:text-cyan-200 transition duration-200">
          {title}
        </h5>
        {isOwner && (
          <button
            onClick={onDelete}
            className="mb-4 mr-4 px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition duration-200"
          >
            Delete
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="h-24 mb-3 font-normal text-gray-700 dark:text-gray-400">
          <span className="font-bold">Description:</span> {description}
        </p>
        <p className="mb-3 font-medium text-sm text-gray-500">
          <span className="font-bold">Difficulty:</span> {difficulty}
        </p>
        <p className="mb-3 font-medium text-sm text-gray-500">
          <span className="font-bold">Questions:</span> {numQuestions}
        </p>
        <p className="mb-3 font-medium text-sm text-gray-500">
          <span className="font-bold">Created on:</span>{" "}
          {new Date(created).toLocaleDateString()}
        </p>
      </div>

      {/* Footer */}
      <div className="p-5 pt-0 flex justify-end">
        <Link to={link}>
          <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition duration-200">
            Start Quiz
          </button>
        </Link>
      </div>
    </div>
  );
};

export default QuizList;
