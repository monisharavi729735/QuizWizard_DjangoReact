import React, { useState } from "react";
import * as Components from './Components.js';
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function LoginSignUpPage() {
  const [signIn, toggle] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/register/`, {
        email,
        password1: password,
        password2: confirmPassword,
      });
      console.log(response.data);
      navigate('/');
      toast.success('Registration successful! Please log in with your credentials.');
    } catch (error) {
      if (error.response) {
        const errors = error.response.data;
        if (errors.password1) {
          errors.password1.forEach(err => {
            if (err.includes("too short")) toast.error("Password must be at least 8 characters.");
            if (err.includes("too common")) toast.error("Choose a more secure password.");
          });
        }
        if (errors.email) toast.error("Email is already in use.");
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/login/`, {
        email,
        password
      });
      const token = response.data.key;
      localStorage.setItem("authToken", token);
      navigate('/');
      setTimeout(function(){
        window.location.reload();
    }, 5000);
      toast.success('You have logged in successfully.');
    } catch (error) {
      if (error.response) {
        toast.error('Login failed. Check your credentials.');
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <Components.Container>
      <Components.SignUpContainer signinIn={signIn}>
        <Components.Form onSubmit={handleRegister}>
          <Components.Title>Create Account</Components.Title>
          <Components.Input 
            type='text' 
            placeholder='Email' 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <Components.Input 
            type='password'
            placeholder='Password' 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <Components.Input 
            type='password'
            placeholder='Confirm Password'
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
          <Components.Button>Sign Up</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>

      <Components.SignInContainer signinIn={signIn}>
        <Components.Form onSubmit={handleLogin}>
          <Components.Title>Sign in</Components.Title>
          <Components.Input 
            type='text'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Components.Input 
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
