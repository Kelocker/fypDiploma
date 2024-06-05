import React from 'react'
import UserProfile from './userProfile.jsx';
const Preference = () => {




  return (
    <div>
        <div>
          <UserProfile/>
        </div>
        
        <a href="/logout" className="logout-button">logout</a>
    </div>
  )
}

export default Preference