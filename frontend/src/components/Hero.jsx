import React, {useState, useEffect} from 'react'
import wizard from '../assets/images/wizard.png'
import axios from 'axios';

const Hero = ({title='Design quizzes tailored to your needs',
  subtitle='Use QuizWizard to create personalized quizzes in seconds.'}) => {
  
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/greet/')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
    
  return (
    <>
      <section className="bg-cyan-700 py-20 mb-4">
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center"
      >
        <div className="text-center">
        <h1
            className="text-4xl text-white sm:text-5xl md:text-6xl mb-4"
          >
            Hey there, {message}
          </h1>       
          <h1
            className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl"
          >
            {title}
          </h1>
          <p className="my-4 text-xl text-white">
            {subtitle}
          </p>
          <img
                className="h-[15rem] w-[15rem]"
                src={wizard}
                alt="Wizard"
          />
        </div>
      </div>
    </section>
    </>
  )
}

export default Hero
