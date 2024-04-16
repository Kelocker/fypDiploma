import React from 'react'
import DashboardNavbar from '../components/dashboardNavbar'
import '../css/notfound.css'

const NotFound = () => {
  return (
    <div>

      <DashboardNavbar />
      
      <div className="not-found-wrapper">
        <div className="not-found-img">
          <img src="404.png" alt="" />
        </div>

        <div className="not-found-text">
          <span className="whoop"> Whoops...</span>
          <br />
          <span>let's bring you <a href="/dashboard">Home</a></span>
        </div>
  

      </div>
      
    </div>
  )
}

export default NotFound