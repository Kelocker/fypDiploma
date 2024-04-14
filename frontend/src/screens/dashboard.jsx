import React from 'react'
import '../css/dashboard/dashboard.css'
import DashboardNavbar from '../components/dashboardNavbar'
import DashboardSidebar from '../components/dashboardSidebar'

const Dashboard = () => {
  return (
    <>
      {/* This is dashboard after login for client  */}
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
