import React, { useState } from 'react';
// import axios from 'axios';
import '../css/login.css';


const login = () => {
  return (
    <div className="Loginwrapper">

      <div className="LoginContainer">

      
        <div className="LoginLeftContent">

          <div className="loginIMG">

            <img src="/loginWelcome.png" alt="" />

          </div>

      
        </div>
        

          <div className="LoginRightContent">

              <div className="LoginQuote">
                <span className="LeftSpan">Login</span><br />
                <span className="SmallQuote">Please Login to continue</span>
              </div>

              <form>

                <div className="LoginUsername">
                    <input type="text" placeholder='Username'/>
                   
                </div>

                <br />


                <div className="LoginPassword">

                    <input type="password" placeholder='Password'/>
                    
                </div>
                <div className="ForgotPassword">
                  <span><a href="/forgotPassword">Forgot Password?</a></span>
                </div>

                <br />
                <button className="Login-btn" type="submit">LOGIN</button>

              </form>

              <div className="SignUp">
                <span className="SignUpQuote">Don't have an account? <a href="/signup">Sign Up</a></span>
                <br />
                
              </div>

          </div>
        


      </div>
        
        


    </div>
  )
}

export default login