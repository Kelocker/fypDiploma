
import React from 'react'
import '../css/signup.css';

const Signup = () => {
  return (
    <div>

      <div>
        left
      </div>

    
      <div>
        <div>
          <span>Already have an account? <a href="/login">Login</a></span>
        </div>

        

        <div>
          <span>Some signup quote</span>

          <br />
          
          <span>Some signup quote</span>
        </div>

              <div>
                <form>
                  <div>
                    <input type="text" placeholder='Username'/>
                  </div>

                  <br />
                  

                  <div>
                    <input type="password" placeholder='Password'/>
                  </div>

                  <br />

                  <div>
                    <input type="password" placeholder='Confirm Password'/>
                  </div>

                  <br />
                  <br />

                  <button type="submit">SIGNUP</button>

                </form>
              </div>

      </div>
    </div>
  )
}

export default Signup