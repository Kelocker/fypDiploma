import React, { useState } from 'react'
import '../css/signup.css';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import toastNotifications from '../toastNotification';

const Signups = () => {

  // initialize state for input fields
  // State varible input and state updater function setInput
  const [userInput, setUserInput] = useState({
    username: '',
    email: '',
    password: '',
    terms: false
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();


   // handle input change and update state above
   const handleInput = (e) => { 
    // extract the input
    const { name, value, type, checked } = e.target;

    let finalValue; // Variable to hold the value that will be set in the state

    if (type === 'checkbox') {
      // Use the 'checked' value for checkboxes
      finalValue = checked;
    } else if (type === 'password') {
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
  

  const validate = () => {
    const newErrors = {};
    if (!userInput.username) {
      newErrors.username = 'Username is required';
    } else if (userInput.username.length < 8) {
      newErrors.username = 'Username must be at least 8 characters';
    }
    
    if (!userInput.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(userInput.email) || 
      (
        !(userInput.email.endsWith('@gmail.com')) && 
        !(userInput.email.endsWith('@yahoo.com')) &&
        !(userInput.email.endsWith('@hotmail.com')) &&
        !(userInput.email.endsWith('@iclould.com'))
      )
    )
    {
      newErrors.email = 'Please enter a valid email address.';
    }
    
    if (!userInput.password) {
      newErrors.password = 'Password is required';
    } else if (userInput.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    } else if (/['";]+/.test(userInput.password)) {
      // RegExp for special characters in the bracket [] which is ' " ; are not allowed + is for one or more this is to avoid SQL injection
      // test is being use to check if the password contains the special characters
      newErrors.password = `Password cannot contain ' " and ;.`;

    }
    
    if (!userInput.terms) {
      newErrors.terms = 'You must accept terms and conditions.';
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  


 


  // use for testing if the input is being updated
  const handleSubmit = async(event) => {
    event.preventDefault();
    if (validate()) {
      try{
        const res = await api.post("/api/user/register/", {
          username: userInput.username,
          email: userInput.email,
          password: userInput.password
      });
        

        // Reset form data after submission
        setUserInput({ username: '', email: '', password: '', termsAccepted: false });
        
        toastNotifications("success", "Registered successfully! Please login to continue.");


      } catch (error){
        if (error.response) {
            console.log('Error:', error.response.data);
            // Display error messages from the server, e.g., email already in use
            if(error.response.data.username) {

              toastNotifications("error", error.response.data.username[0]);
              

            }
            else if (error.response.data.email) {
                // Display the email error message
                // alert(error.response.data.email[0]); 
                // toast(error.response.data.email[0]);
                toastNotifications("error", error.response.data.email[0]);




            } 
        } else {
            console.log('Error:', error.message);
        }
      }
  }
}


  return (
    <div className="Signup-container">

            <ToastContainer />

            <div>

            <div className="Signup-Quote">
                <span className="LeftSpan">Create Account</span><br />
                <span className="SmallQuote">Your python journey start here</span><br />
                
              </div>

              <form onSubmit={handleSubmit}>
              
                <div>
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
                

                <div>
                  <input 
                  type="email" 
                  name="email" 
                  placeholder='Email' 
                  value={userInput.email} 
                  onChange={handleInput} />
                  {errors.email && <span className="SignUp-Login-message-Indicator">{errors.email}</span>}
                </div>

                <br />

                <div>
                  <input 
                  type="password" 
                  name="password" 
                  placeholder='Password' 
                  autoComplete="new-password" 
                  value={userInput.password} 
                  onChange={handleInput} 
                  />
                  {/* */}
                  {errors.password && <span className="SignUp-Login-message-Indicator">{errors.password}</span>}
                </div>


                <div className="Terms-cons">

                    <input type="checkbox" name="terms" id="Terms" checked={userInput.terms} onChange={handleInput} />
                    <label htmlFor="Terms">I agree to the Terms and Conditions
                    </label>

                </div>
                {errors.terms && <span className="SignUp-Login-message-Indicator">{errors.terms}</span>}
                

                <br />

                <button className="Signup-Login-btn" type="submit">SIGNUP</button>
              </form>
            </div>
          </div>
    
  );
}

export default Signups