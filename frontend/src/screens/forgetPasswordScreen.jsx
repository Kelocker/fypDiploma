import React from 'react'
import DashboardNavbar from '../components/dashboardNavbar'
import '../css/forgotPw/forgotPasswordScreen.css'
import { PasswordResetRequestForm, ResetPasswordConfirmForm } from '../components/forgetPassword'


const ForgetPasswordScreen = () => {
  return (

    <div>
        
        <DashboardNavbar />

        <div className="forget-password-screen">
          <PasswordResetRequestForm />
          {/* <ResetPasswordConfirmForm /> */}
          

        </div>

    </div>
  )
}

export default ForgetPasswordScreen

