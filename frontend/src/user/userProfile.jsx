import React from 'react';
import '../styles/userProfile.css';
// TO DO import header on top

const userProfile = () => {
  return (
   
    <div className="Setting">
      <h1>Settings</h1>
      <div className="User">
        <div className="avatar-container">
          <img src="{userAvatarUrl}" alt="" className='avatar-container'/>
          <div className="camera-icon"></div>
        </div>
        <div className='username'>
          Username:
        </div>
      </div>
      <div className='formContainer'>
        <table>
          <thead>
            <tr>
              <th><h2>Basic Info</h2></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>First Name</td>
              <td><input type="text" name="firstName" /></td>
              <td>Edit</td>
            </tr>
            <tr>
              <td>Last Name</td>
              <td><input type="text" name="lastName" /></td>
              <td>Edit</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>
                <input type="radio" id="male" name="gender" value="male"/>
                <label htmlFor="male">Male</label>
                <input type="radio" id="female" name="gender" value="female"/>
                <label htmlFor="female">Female</label>
              </td>
              <td>Edit</td>
            </tr>
            <tr>
              <td>Email</td>
              <td><input type="email" name="email" autoComplete="email"/></td>
              <td>Edit</td>
            </tr>
            <tr>
              <td>Password</td>
              <td><input type="password" name="password" /></td>
              <td>Edit</td>
            </tr>
          </tbody>
        </table>
      </div>  
    </div>
    
  )
}

export default userProfile;

