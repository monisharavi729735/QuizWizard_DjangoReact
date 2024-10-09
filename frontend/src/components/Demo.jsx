import React from 'react';
import {Link} from 'react-router-dom';

const Demo = () => {

  const steps = [
    {
      title: "Step 1: Set Up Your Quiz",
      description: "Enter a description for your quiz, select the difficulty level (Easy, Medium, or Difficult), and choose the number of questions."
    },
    {
      title: "Step 2: Generate Your Quiz",
      description: "Click the 'Start Quiz!' button to create your customized quiz with your chosen settings."
    },
    {
      title: "Step 3: Take the Quiz and Get Instant Results",
      description: "Answer the questions, submit your answers, and receive instant feedback. You can find all your generated quizzes in the 'Quizzes' tab."
    },
  ];

  return (
    <>
      <section className="py-8 bg-cyan-100">
        <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl my-10 text-center">
          How Does It Work?
        </h1>
      </section>

      <section className="bg-cyan-100 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md relative">
                <div className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                  </div>
                  <div className="border border-gray-100 mb-5"></div>
                  <div className="text-xl mb-5">
                    {step.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='my-20 text-center'>
            <Link
                to={'/add-quiz'}
                className="text-2xl h-[36px] bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-6 rounded-lg text-center font-bold"
                >
                Try it out here
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Demo;
