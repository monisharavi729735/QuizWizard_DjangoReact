import React from 'react';

const Features = () => {
  const featureList = [
    {
      title: "User-Friendly Interface",
      description:
        "QuizWizard offers an intuitive and straightforward interface, allowing anyone to create quizzes in minutes—no technical skills required!",
      bgColor: "bg-gray-100",
    },
    {
      title: "Customizable Quiz Options",
      description:
        "Tailor your quizzes to meet specific needs with customizable number of questions and level of difficulty ensuring a personalized experience for every user.",
      bgColor: "bg-pink-100",
    },
    {
      title: "Instant Feedback and Results",
      description:
        "Get immediate feedback with real-time results for each quiz attempt, helping you assess knowledge and improve learning outcomes effectively.",
      bgColor: "bg-pink-100",
    },
    {
      title: "Save & Access Quizzes Anytime",
      description:
        "Find all your previously generated quizzes in the 'Quizzes' tab for quick access and review later, making quiz creation and participation a breeze.",
      bgColor: "bg-gray-100",
    },
  ];

  return (
    <section className="py-10">
      <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl my-10 text-center">
        Why QuizWizard?
      </h1>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 rounded-lg">
          {featureList.map((feature, index) => (
            <div
              key={index}
              className={`${feature.bgColor} p-6 rounded-lg shadow-md`}
            >
              <h2 className="text-2xl font-bold">{feature.title}</h2>
              <p className="mt-2 mb-4">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;