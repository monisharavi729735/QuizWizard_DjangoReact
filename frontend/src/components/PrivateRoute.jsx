import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
const apiBaseUrl = import.meta.env.VITE_API_URL;


const PrivateRoute = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          // Make a request to check if the token is valid
          await axios.get(`${apiBaseUrl}/api/auth/user/`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setUserLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (userLoading) {
    return <div>Loading...</div>;  // Show loading state while checking login status
  }

  if (!isLoggedIn) {
    return <Navigate to="/auth" replace />;  // Redirect to login page if not logged in
  }

  return children;  // Render the children components if logged in
};

export default PrivateRoute;
