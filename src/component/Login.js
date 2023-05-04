import './Login.css';
import React from "react";
import  * as Components from './Components';


 export function Login() {
     const [signIn, toggle] = React.useState(true);
      return(
        <div className='akj'>
          <Components.Container>
              <Components.SignUpContainer signinIn={signIn}>
                  <Components.Form>
                  <h1 className='af'>Sign Up</h1>
                      <Components.Title></Components.Title>
                      <Components.Input type='text' placeholder='User Name' />
                      <Components.Input type='email' placeholder='Email' />
                      <Components.Input type='password' placeholder='Password' />
                      <Components.Button >Sign Up</Components.Button>
                  </Components.Form>
              </Components.SignUpContainer>

              <Components.SignInContainer signinIn={signIn}>
                   <Components.Form>
                    <h1 className='af'>Login</h1>
                       <Components.Title ></Components.Title>
                       <Components.Input type='email' placeholder='Email' />
                       <Components.Input type='password' placeholder='Password' />
                       <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                       <Components.Button  >Login</Components.Button>
                   </Components.Form>
              </Components.SignInContainer>

              <Components.OverlayContainer signinIn={signIn}>
                  <Components.Overlay signinIn={signIn}>

                  <Components.LeftOverlayPanel signinIn={signIn}>
                  <h1 className='ag'>Welcome Back!</h1>
                      <Components.Title ></Components.Title>
                      <Components.Paragraph>
                          To keep connected with us please login with your personal info
                      </Components.Paragraph>
                      <Components.GhostButton onClick={() => toggle(true)}  >
                          Sign In
                      </Components.GhostButton>
                      </Components.LeftOverlayPanel>

                      <Components.RightOverlayPanel signinIn={signIn}>
                        <h1 className='ag'>Hello, Friend!</h1>
                        <Components.Title ></Components.Title>
                        <Components.Paragraph>
                            Enter Your personal details and start journey with us
                        </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(false)} >
                                Sigin Up
                            </Components.GhostButton> 
                      </Components.RightOverlayPanel>
  
                  </Components.Overlay>
              </Components.OverlayContainer>

          </Components.Container>
          </div>
      )
 }
