import React, { useState } from 'react';
import '../css/signup.css';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import { ToastContainer} from 'react-toastify';
import toastNotifications from '../toastNotification';

const Login = () => {

  const [userInput, setUserInput] = useState({
    username: '',
    password: '',
  });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


     // handle input change and update state above
    const handleInput = (e) => { 
    // extract the input
    const { name, value, type } = e.target;

    let finalValue; // Variable to hold the value that will be set in the state

    if (type === 'password') {
      // Preserve the original case for passwords
      finalValue = value;
    } else {
      // Convert other input types to lowercase
      finalValue = value.toLowerCase();
    }



    // update the state
    setUserInput(prev => ({

      ...prev,
      [name]: finalValue

  }));
  } 

  const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!userInput.username) {
            newErrors.username = 'Username is required';
        } 

        if (!userInput.password) {
            newErrors.password = 'Password is required';
        } 

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async(event) => {
        setLoading(true);
        event.preventDefault();

        if (validate()) {
        try {
            const res = await api.post("/api/token/", {
              username: userInput.username,
              password: userInput.password
            });
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/dashboard");
          
               
            
        }
        catch (error) {
            // alert("Combination do not match")
            toastNotifications("error", "Combination do not match");
           

        } finally {
            setLoading(false);
        }
      }
    }
  return (
    <div className="Login-container">
      <ToastContainer />
            <div>
              
            <div className="Login-Quote">
                <span className="LeftSpan">Login</span><br />
                <span className="SmallQuote">Please Login to continue</span>
              </div>

              <form onSubmit={handleSubmit}>

                <div className="LoginUsername">
                    <input 
                    type="text" 
                    name="username"
                    placeholder='Username'
                    value={userInput.username} 
                    onChange={handleInput}
                    />
                    {errors.username && <span className="SignUp-Login-message-Indicator">{errors.username}</span>}
                   
                </div>

                <br />


                <div className="LoginPassword">

                    <input 
                    type="password" 
                    name="password"
                    placeholder='Password' 
                    value={userInput.password} 
                    onChange={handleInput}
                    />
                    {errors.password && <span className="SignUp-Login-message-Indicator">{errors.password}</span>}
                </div>


                <div className="ForgotPassword">
                  <span><a href="/reset-password">Forgot Password?</a></span>
                </div>

                <br />
                <button className="Signup-Login-btn" type="submit">LOGIN</button>

              </form>





            </div>
          </div>
  )
}

export default Login