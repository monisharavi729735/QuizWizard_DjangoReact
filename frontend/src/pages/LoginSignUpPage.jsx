import React, { useState } from "react";
import * as Components from './Components.js';

function LoginSignUpPage() {
    const [signIn, toggle] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        // Send a POST request to the Django API with the form data
        
    }

    const handleSignInSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <Components.Container>
            <Components.SignUpContainer signinIn={signIn}>
                <Components.Form onSubmit={handleSignUpSubmit}>
                    <Components.Title>Create Account</Components.Title>
                    <Components.Input type='text' 
                                      placeholder='Email' 
                                      onChange={(e) => setEmail(e.target.value)} />
                    <Components.Input type='password'
                                      placeholder='Password' 
                                      onChange={(e) => setPassword(e.target.value)} />
                    <Components.Input type='password'
                                      placeholder='Confirm Password' />
                    <Components.Button>Sign Up</Components.Button>
                </Components.Form>
            </Components.SignUpContainer>

            <Components.SignInContainer signinIn={signIn}>
                <Components.Form onSubmit={handleSignInSubmit}>
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
