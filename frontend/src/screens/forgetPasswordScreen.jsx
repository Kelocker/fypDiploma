import React from 'react'
import DashboardNavbar from '../components/dashboardNavbar'
import '../css/forgotPw/forgotPasswordScreen.css'
import { PasswordResetRequestForm } from '../components/forgetPassword'
import { useNavigate } from 'react-router-dom';
import '../css/backButton.css';

const ForgetPasswordScreen = () => {

  const navigate = useNavigate();

    const handleBackToDashboard = () => {
        
        navigate('/');
    };
  return (

    <div>
        
        <DashboardNavbar />
        <button onClick={handleBackToDashboard} className="back-button">Home</button>
        <div className="forget-password-screen">
        
          <PasswordResetRequestForm />
          

        </div>

    </div>
  )
}

export default ForgetPasswordScreen

