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
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
        }

        try {
        const response = await axios.post("http://localhost:8000/users/register/", {
            email: email,
            password1: password,  // Password1 for dj-rest-auth
            password2: confirmPassword  // Password2 for confirmation
        });
        console.log(response.data); // Handle success, e.g. navigate to login page
        toggle(true);
        toast.success('Created account successfully, login with your credentials to continue.')

        } catch (error) {
        console.error(error.response.data); // Handle error
        setError(error.response.data);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post("http://localhost:8000/users/login/", {
            email: email,
            password: password
          });
          console.log(response.data); // Handle successful login
          navigate('/');
          toast.success('You have logged in successfully.')
        } catch (error) {
            // Check if error.response exists
            if (error.response) {
              console.error(error.response.data); // Handle error response
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
