import React from 'react'

const Features = () => {
  return (
    <section className="py-10">
    <h1
    className="text-4xl font-extrabold sm:text-5xl md:text-6xl my-10 text-center"
    >
    Why QuizWizard?
    </h1>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 rounded-lg">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">User-Friendly Interface</h2>
            <p className="mt-2 mb-4">
            QuizWizard offers an intuitive and straightforward interface, allowing anyone
             to create quizzes in minutes—no technical skills required!
            </p>
          </div>
          <div className="bg-pink-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Customizable Quiz Options</h2>
            <p className="mt-2 mb-4">
            Tailor your quizzes to meet specific needs with customizable number of questions
            and level of difficulty ensuring a personalized experience for every user.
            </p>
          </div>
          <div className="bg-pink-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Instant Feedback and Results</h2>
            <p className="mt-2 mb-4">
            Get immediate feedback with real-time results for each quiz attempt, helping you 
            assess knowledge and improve learning outcomes effectively.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Save & Access Quizzes Anytime</h2>
            <p className="mt-2 mb-4">
            Find all your previously generated quizzes in the 'Quizzes' tab for quick access 
            and review later, making quiz creation and participation a breeze.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
