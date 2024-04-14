import React from 'react'
import '../css/signup.css';

const login = () => {
  return (
    <div className="Login-container">
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
          </div>
  )
}

export default login