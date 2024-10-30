import React from 'react'
import { NavLink } from 'react-router-dom'
import wizard from '../assets/images/wizard.png'
import { useState, useEffect } from 'react';

const Navbar = () => { 

  const [user, setUser] = useState(null);

  useEffect(() => {
      const fetchUserData = async () => {
          const token = localStorage.getItem('authToken'); // Check for the token
          if (token) {
              try {
                  const response = await axios.get('http://127.0.0.1:8000/api/auth/user/', {
                      headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `Token ${token}`,
                      }
                  });
                  setUser(response.data);
              } catch (error) {
                  setUser(null);
              }
          } else {
              setUser(null); // No token found, set user to null
          }
      };

      fetchUserData();
  }, []);

  const linkClass = ({isActive}) => isActive ? 
  "text-white bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2" : 
  "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"

  return (
    <>
      <nav className="bg-cyan-700 border-b border-cyan-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div
            className="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
          >
            {/* <!-- Logo --> */}
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
              <img
                className="h-10 w-auto"
                src={wizard}
                alt="QuizWizard"
              />
              <span className="hidden md:block text-white text-2xl font-bold ml-2"
                >QuizWizard</span
              >
            </NavLink>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <NavLink
                  to="/"
                  className={linkClass}
                  >Home</NavLink
                >
                <NavLink
                  to="/quizzes"
                  className={linkClass}
                  >Quizzes</NavLink
                >
                <NavLink
                  to="/add-quiz"
                  className={linkClass}
                  >New Quiz</NavLink
                >

                <NavLink
                  to="/auth"
                  className={linkClass}
                  >Login</NavLink
                >
                <div className={linkClass}>
                  {user 
                      ? <p className="text-white bg-cyan-800 rounded-md px-3 py-2 ml-6">{user.email}</p>
                      : <p className="text-white bg-cyan-800 rounded-md px-3 py-2 ml-6">Guest</p>
                  }
              </div>
              </div> 
            </div>
            </div>
            </div>
          </div>
    </nav>
    </>
  );
};

export default Navbar
