
import React from 'react'
import '../css/signup.css';
import Signups from '../components/signup';
import Login from '../components/login';

const Signup = () => {

    

  function showSignup(){
    const Signupform = document.querySelector('.overlay-left')
    const Loginform = document.querySelector('.overlay-right')
    
    
    Signupform.style.visibility = 'hidden'
    Loginform.style.visibility = 'visible'
  }

  function showLogin(){
    
    const Signupform = document.querySelector('.overlay-left')
    const Loginform = document.querySelector('.overlay-right')

    
    Signupform.style.visibility = 'visible'
    Loginform.style.visibility = 'hidden'
  }

  return (

    
    <div className="login-Signup-Wrapper">

      <div className="login-Signup-content">

          {/* <div className="Signup-container">
            <div>

            <div className="Signup-Quote">
                <span className="LeftSpan">Create Account</span><br />
                <span className="SmallQuote">Your python journey start here</span>
              </div>

              <form action="">
                <div>
                  <input type="text" placeholder='Username'/>
                  <span className="SignUp-Login-message-Indicator"></span>
                </div>

                <br />
                

                <div>
                  <input type="email" placeholder='E-mail'/>
                  <span className="SignUp-Login-message-Indicator"></span>
                </div>

                <br />

                <div>
                  <input type="password" placeholder='Password'/>
                  <span className="SignUp-Login-message-Indicator">test</span> 
                </div>


                <div className="Terms-cons">

                    <input type="checkbox" id="Terms" required />
                    <label for="Terms"> I agree to the Terms and Conditions
                    </label>

                </div>
                
                

                <br />

                <button className="Signup-Login-btn" type="submit">SIGNUP</button>
              </form>
            </div>
          </div> */}
          < Signups />

          {/* <div className="Login-container">
            <div>
              
            <div className="Login-Quote">
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
                <button className="Signup-Login-btn" type="submit">LOGIN</button>

              </form>





            </div>
          </div> */}
          < Login />

          <div class="overlay-container" id="overlayCon">
            <div class="overlay-content">
                <div class="overlay-panel overlay-left">
                    <h1>Hello, Friend!</h1>
                    <p>Join us and tame a python today!</p>
                    <button onClick = { () => showSignup()}>Sign Up</button>
                </div>
                <div class="overlay-panel overlay-right">
                    <h1>Welcome Back!</h1>
                    <p>Hissss.... Help a python just escape!</p>
                    <button onClick = { () => showLogin()}>Login</button>
                </div>
            </div>
        </div>



    
    
      </div>
    </div>
  )
}

export default Signup