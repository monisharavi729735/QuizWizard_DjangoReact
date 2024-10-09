import React from 'react'

const Footer = () => {
  return (
    <div className="bg-cyan-700 text-white py-6">
    <div className="max-w-7xl mx-auto px-4">
        <div className='my-6'>
            <h4 className="text-2xl font-bold mb-4">About Us</h4>
            <p className='text-xl'>QuizWizard is dedicated to helping you create personalized quizzes 
                effortlessly with a mission to empower individuals by providing tools and resources 
                that make learning engaging and accessible. It aims to inspire curiosity and foster a 
                deeper understanding of subjects you are interested in.</p>
        </div>
        <div className="mt-4 text-center">
            <p>Copyright © {new Date().getFullYear()} Monisha R</p>
        </div>
    </div>
    </div>
  )
}

export default Footer
