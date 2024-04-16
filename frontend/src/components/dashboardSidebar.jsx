import React, { useState } from 'react'
import Preference from './preference'
import '../css/dashboard/dashboardSidebar.css'

const DashboardSidebar = () => {



  const [activeContent, setActiveContent] = useState("Overview");

  const handleContentChange = (content) => {
    setActiveContent(content);
  };

 
  const getButtonClass = (content) => {
    if (activeContent === content) {
      return "active";
    }
    return "";
  }

  return (
    <div className="dashboard-content">
    <div className="dashBoard-Sidebar-Wrapper">
      <ul>


         
        <li className="dashBoard-option-special">
          <button>
            <img className="dashboard-profile" src="/defaultProfilePicture.jpg" alt="" />
            Coolest User
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>
          </button>
        </li>



        {/* Dashboard */}
        <li className="dashBoard-option">
          <button
          onClick={() => handleContentChange("Overview")}
          className={getButtonClass("Overview")}
          >
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M441-82Q287-97 184-211T81-480q0-155 103-269t257-129v120q-104 14-172 93t-68 185q0 106 68 185t172 93v120Zm80 0v-120q94-12 159-78t79-160h120q-14 143-114.5 243.5T521-82Zm238-438q-14-94-79-160t-159-78v-120q143 14 243.5 114.5T879-520H759Z"/></svg>
              Overview
          </button>
        </li>


        {/* Learning */}
        <li className="dashBoard-option">
          <button
          onClick={() => handleContentChange("Dashboard")}
          className={getButtonClass("Dashboard")}
          >
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z"/></svg>
            Learning
          </button>
        </li>


        {/* Excercise */}
        <li className="dashBoard-option">
          <button
          onClick={() => handleContentChange("Excercise")}
          className={getButtonClass("Excercise")}
          >
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m82-120 258-360h202l298-348v708H82Zm70-233-64-46 172-241h202l188-219 60 52-212 247H300L152-353Zm86 153h522v-412L578-400H380L238-200Zm522 0Z"/></svg>
            Exersice
          </button>
        </li>



        {/* Rank */}
        <li className="dashBoard-option">
          <button
          onClick={() => handleContentChange("Rank")}
          className={getButtonClass("Rank")}
          >
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-880h400v314q0 23-10 41t-28 29l-142 84 28 92h152l-124 88 48 152-124-94-124 94 48-152-124-88h152l28-92-142-84q-18-11-28-29t-10-41v-314Zm80 80v234l80 48v-282h-80Zm240 0h-80v282l80-48v-234ZM480-647Zm-40-12Zm80 0Z"/></svg>
            Rank
          </button>
        </li>


        {/* Compiler */}
        <li className="dashBoard-option">
          <button
          onClick={() => handleContentChange("Compiler")}
          className={getButtonClass("Compiler")}
          >
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H160v400Zm140-40-56-56 103-104-104-104 57-56 160 160-160 160Zm180 0v-80h240v80H480Z"/></svg>
            Compiler
          </button>
        </li>



        {/* Preference */}
        <li className="dashBoard-option">
          <button 
          onClick={() => handleContentChange("Preference")}
          className={getButtonClass("Preference")}
          >
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/></svg>
            
          Preference
          </button>
        </li>
        
      </ul>


    </div>
    <div className="dashboard-content-render">

      {activeContent === "Preference" && < Preference />}

    </div>
    </div>
   
  )
}

export default DashboardSidebar