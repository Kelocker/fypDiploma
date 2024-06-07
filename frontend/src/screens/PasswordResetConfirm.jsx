import React from 'react'
import { PasswordResetConfirm } from '../components/PasswordResetConfirm'
import '../css/forgotPw/forgotPasswordScreen.css'
import DashboardNavbar from '../components/dashboardNavbar'

const PasswordResetConfirmScreen = () => {
  return (
    <div>

        

        <DashboardNavbar />

        <div className="forget-password-screen">
          
          <PasswordResetConfirm/>
          

        </div>

    </div>
  )
}

export default PasswordResetConfirmScreen