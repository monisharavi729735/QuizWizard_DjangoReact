import React, { useState } from "react";
import * as Components from './Components.js';
import axios from "axios"; // Axios for API calls
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';

function LoginSignUpPage() {
  const [signIn, toggle] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  const handleRegister = async (e) => {
      e.preventDefault();
      setError(null); // Reset any previous error
      if (password !== confirmPassword) {
          toast.error("Passwords do not match.");
          return;
      }
      try {
          const response = await axios.post("http://localhost:8000/api/auth/register/", {
              email: email,
              password1: password,
              password2: confirmPassword,
          });
          console.log(response.data); // Log successful registration response
          navigate('/');
          toast.success('Registration successful!');
      } catch (error) {
          if (error.response) {
              const errors = error.response.data;
              
              if (errors.password1) {
                  errors.password1.forEach(err => {
                      if (err.includes("This password is too short")) {
                          toast.error("Password is too short, it must contain at least 8 characters.");
                      }
                      if (err.includes("This password is too common")) {
                          toast.error("Password is too common, please choose a more secure one.");
                      }
                      if (err.includes("Passwords do not match")) {
                          toast.error("Passwords do not match.");
                      }
                  });
              }
  
              if (errors.email) {
                  toast.error("Email is already in use. Please choose a different one.");
              }
              
          } else {
              console.error('Error:', error.message); // Handle other errors (network, etc.)
              toast.error('An error occurred. Please try again later.');
          }
      }
  };
  
  const handleLogin = async (e) => {
      e.preventDefault();
      setError(null); // Reset any previous error
      try {
          const response = await axios.post("http://localhost:8000/api/auth/login/", {
              email: email,
              password: password
          });
          console.log(response.data); // Log successful login response
          const token = response.data.key;  // or response.data.token depending on the backend response
          localStorage.setItem("authToken", token); // Store token in localStorage
          navigate('/');
          toast.success('You have logged in successfully.');
          if (response.status === 200) {
            // Handle successful login, e.g., store token
            localStorage.setItem('authToken', response.data.token);
            setUser(response.data.user); // Update user state if necessary
        }
      } catch (error) {
          if (error.response) {
              console.error(error.response.data); // Log error response
              toast.error('Login failed. Please check your credentials.');
          } else {
              console.error('Error:', error.message); // Handle any other error (network, etc.)
              toast.error('An error occurred. Please try again later.');
          }
      }
  };

    return (
        <Components.Container>
            <Components.SignUpContainer signinIn={signIn}>
                <Components.Form onSubmit={handleRegister}>
                    <Components.Title>Create Account</Components.Title>
                    <Components.Input type='text' 
                                      placeholder='Email' 
                                      onChange={(e) => setEmail(e.target.value)} />
                    <Components.Input type='password'
                                      placeholder='Password' 
                                      onChange={(e) => setPassword(e.target.value)} />
                    <Components.Input type='password'
                                      placeholder='Confirm Password'
                                      onChange={(e) => setConfirmPassword(e.target.value)} />
                    <Components.Button>Sign Up</Components.Button>
                </Components.Form>
            </Components.SignUpContainer>

            <Components.SignInContainer signinIn={signIn}>
                <Components.Form onSubmit={handleLogin}>
                    <Components.Title>Sign in</Components.Title>
                    <Components.Input type='text'
                                      placeholder='Email'
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)}/>
                    <Components.Input type='password'
                                      placeholder='Password'
                                      value={password}
                                      onChange={(e) => setPassword(e.target.value)}/>
                    {/* <Components.Anchor href='#'>Forgot your password?</Components.Anchor> */}
                    <Components.Button>Sign In</Components.Button>
                </Components.Form>
            </Components.SignInContainer>

            <Components.OverlayContainer signinIn={signIn}>
                <Components.Overlay signinIn={signIn}>
                    <Components.LeftOverlayPanel signinIn={signIn}>
                        <Components.Title>Welcome Back!</Components.Title>
                        <Components.Paragraph>
                            Please login with your personal info
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => toggle(true)}>
                            Sign In
                        </Components.GhostButton>
                    </Components.LeftOverlayPanel>

                    <Components.RightOverlayPanel signinIn={signIn}>
                        <Components.Title>First time here?</Components.Title>
                        <Components.Paragraph>
                            Please create an account to proceed further
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => toggle(false)}>
                            Sign Up
                        </Components.GhostButton>
                    </Components.RightOverlayPanel>
                </Components.Overlay>
            </Components.OverlayContainer>
        </Components.Container>
    );
}

export default LoginSignUpPage;
