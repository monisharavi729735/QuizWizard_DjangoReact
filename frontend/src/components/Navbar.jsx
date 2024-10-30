import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import wizard from '../assets/images/wizard.png';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/auth/user/', {
            headers: {
              'Authorization': `Token ${token}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error("Failed to fetch user data:", error.response);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');  // Remove token from localStorage
    setUser(null);  // Clear user state
    navigate('/');  // Redirect to home or login page
  };

  const linkClass = "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2";
  const activeLinkClass = "text-white bg-black";

  return (
    <nav className="bg-cyan-700 border-b border-cyan-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
              <img className="h-10 w-auto" src={wizard} alt="QuizWizard" />
              <span className="hidden md:block text-white text-2xl font-bold ml-2">QuizWizard</span>
            </NavLink>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                {user ? (
                  <div className="text-white bg-cyan-800 rounded-md px-3 py-2 ml-6">{user.email}</div>
                ) : (
                  <div className="text-white bg-cyan-800 rounded-md px-3 py-2 ml-6">Guest</div>
                )}
                <NavLink 
                  to="/" 
                  className={({ isActive }) => isActive ? `${linkClass} ${activeLinkClass}` : linkClass}>
                  Home
                </NavLink>
                <NavLink 
                  to="/quizzes" 
                  className={({ isActive }) => isActive ? `${linkClass} ${activeLinkClass}` : linkClass}>
                  Quizzes
                </NavLink>
                <NavLink 
                  to="/add-quiz" 
                  className={({ isActive }) => isActive ? `${linkClass} ${activeLinkClass}` : linkClass}>
                  New Quiz
                </NavLink>
                
                {/* Conditional rendering for Login and Logout */}
                {user ? (
                  <button onClick={handleLogout} className={linkClass}>Logout</button>
                ) : (
                  <NavLink to="/auth" className={linkClass}>Login</NavLink>
                )}
              </div> 
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
