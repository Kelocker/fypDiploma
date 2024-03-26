import React from 'react';
import '../styles/userProfile.css';
// TO DO import header on top

const userProfile = () => {
  return (
   
    <div className="Setting">
      <h1>Settings</h1>
      
      <div className="User">
        <div class="avatar-container">
          <img src="{userAvatarUrl}" alt="" className='avatar-container'/>
          <div class="camera-icon"></div>
        </div>
        <div className='username'>
        Username:
        </div>
      </div>
      <div className='formContainer'>
        <table>
          <h2>Basic Info</h2>
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
              <label for="male">Male</label>
              <input type="radio" id="female" name="gender" value="female"/>
              <label for="female">Female</label>
            </td>
            <td>Edit</td>
          </tr>
          <tr>
            <td>Email</td>
            <td><input type="email" name="email" /></td>
            <td>Edit</td>
          </tr>
          <tr>
            <td>Password</td>
            <td><input type="password" name="password" /></td>
            <td>Edit</td>
          </tr>
        </table>
      </div>  
    </div>
    
  )
}

export default userProfile;

