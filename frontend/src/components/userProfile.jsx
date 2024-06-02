import React, { useState, useEffect } from 'react';
import '../css/userProfile.css';
import api from '../api';
import { ACCESS_TOKEN } from '../constants';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [editState, setEditState] = useState({
    email: false,
    password: false
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN); 
      console.log('Fetching user data...');

      if (token) {
        try {
          const response = await api.get('/api/user/', { 
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          console.log('Fetched user data:', response.data);
          setUserData(response.data);
        } catch (error) {
          console.error("There was an error fetching the user data!", error);
        }
      } else {
        console.error("No token found");
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleEditClick = (field) => {
    setEditState(prevState => ({
      ...prevState,
      [field]: !prevState[field]
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem(ACCESS_TOKEN); 

    if (token) {
      try {
        const response = await api.put('/api/user/', {
          // username: userData.username,
          email: userData.email,
          // password: userData.password
        }, { // Ensure the endpoint is correct
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        console.log('User data updated successfully:', response.data);
        // Reset edit state after save
        setEditState({
          email: false,
          password: false
        });
      } catch (error) {
        console.error("There was an error updating the user data!", error);
      }
    } else {
      console.error("No token found for update");
    }
  };

  return (
    <div className="userSetting">
      <h1>Settings</h1>
      <div className="User">
        <div className="avatar-container">
          <img src="{userAvatarUrl}" className='avatar-container'/>
          <div className="camera-icon"></div>
        </div>
        <div className='Profileusername'>
          Username: {userData.username}
        </div>
      </div>
      <form onSubmit={handleSubmit} className='userformContainer'>
        <table>
          <thead>
            <tr>
              <th><h2>Basic Info</h2></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Email</td>
              <td>
                {editState.email ? (
                  <input
                    type="email"
                    name="email"
                    value={userData.email || ''}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                ) : (
                  userData.email
                )}
              </td>
              <td>
                <button type="button" onClick={() => handleEditClick('email')}>
                  {editState.email ? 'Cancel' : 'Edit'}
                </button>
              </td>
            </tr>
            <tr>
              <td>Password</td>
              <td>
                {editState.password ? (
                  <input
                    type="password"
                    name="password"
                    value={userData.password || ''}
                    onChange={handleChange}
                  />
                ) : (
                  '******'
                )}
              </td>
              <td>
                <button type="button" onClick={() => handleEditClick('password')}>
                  {editState.password ? 'Cancel' : 'Edit'}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        {editState.email || editState.password ? (
          <button type="submit">Save</button>
        ) : null}
      </form>
    </div>
  );
}

export default UserProfile;
