import React from 'react';

const AnswerQuiz = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center space-y-6 pb-20">
      {/* Quiz Title */}
      <div className="font-bold text-3xl py-4 px-8 rounded-lg w-full max-w-3xl text-center">
        <h1>Physics Quiz</h1>
      </div>

      {/* Question Block */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl text-center border border-gray-300">
        <h1 className="text-2xl font-bold text-gray-800">
          Which of the following is NOT a consequence of Einstein's theory of general relativity?
        </h1>
      </div>

      {/* Answer Options */}
      <div className="space-y-4 w-full max-w-3xl px-4">
        <button className="w-full py-4 bg-red-400 text-white font-bold rounded-lg">
          Gravitational lensing
        </button>
        <button className="w-full py-4 bg-red-400 text-white font-bold rounded-lg">
          Time dilation
        </button>
        <button className="w-full py-4 bg-red-400 text-white font-bold rounded-lg">
          The existence of black holes
        </button>
        <button className="w-full py-4 bg-green-400 text-white font-bold rounded-lg">
          The expansion of the universe
        </button>
      </div>

      {/* Explanation Section */}
      <div className="w-full max-w-3xl px-4 mt-6 bg-gray-200 p-4 rounded-lg text-gray-700">
        <p>
          <strong>Explanation:</strong> While general relativity provides the framework for understanding the universe's expansion, the expansion itself was proposed by Hubble and is not a direct consequence of Einstein's theory.
        </p>
      </div>

      {/* Next Button */}
      <div className="text-center mt-4 w-full max-w-3xl">
        <button className="py-3 px-6 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg w-full">
          Next
        </button>
      </div>
    </div>
  );
};

export default AnswerQuiz;
