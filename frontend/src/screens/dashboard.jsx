import React from 'react'
import '../css/dashboard/dashboard.css'
import DashboardNavbar from '../components/dashboardNavbar'
import DashboardSidebar from '../components/dashboardSidebar'

const Dashboard = () => {
  return (
    <>
      <DashboardNavbar />
      <div className="DashboardWrapper">
          
        <div className="DashboardSidebar">
          <DashboardSidebar />
          
        </div>

        <div>
          
        </div>
      </div>
      
    </>
  )
}

export default Dashboard
