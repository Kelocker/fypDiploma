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

  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState({ email: '', password: '' });
  const [originalEmail, setOriginalEmail] = useState('');

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
          setOriginalEmail(response.data.email);
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
    setEditState(prevState => {
      const newState = { ...prevState, [field]: !prevState[field] };
      if (!newState.email) {
        setUserData(prevData => ({
          ...prevData,
          email: originalEmail
        }));
      }
      return newState;
    });
    setError({ email: '', password: '' }); 
  };

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const validateInputs = (field) => {
    const newErrors = { email: '', password: '' };
    if (field === 'email') {
      if (!userData.email) {
        newErrors.email = 'Email is required';
      } else if (
        !/\S+@\S+\.\S+/.test(userData.email) || 
        !(
          userData.email.endsWith('@gmail.com') || 
          userData.email.endsWith('@yahoo.com') || 
          userData.email.endsWith('@hotmail.com') || 
          userData.email.endsWith('@icloud.com')
        )
      ) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }
    if (field === 'password') {
      if (!newPassword) {
        newErrors.password = 'Password is required';
      } else if (newPassword.length < 8) {
        newErrors.password = 'Password must be at least 8 characters.';
      } else if (/['";]+/.test(newPassword)) {
        newErrors.password = `Password cannot contain ' " and ;.`;
      }
    }
    return newErrors;
  };

  const handleSubmit = async (event, field) => {
    event.preventDefault();
    const token = localStorage.getItem(ACCESS_TOKEN); 

    const newErrors = validateInputs(field);
    if (newErrors.email || newErrors.password) {
      setError(newErrors);
      return;
    }

    if (token) {
      try {
        const updatedData = {};
        if (field === 'email') {
          updatedData.email = userData.email;
        }
        if (field === 'password') {
          updatedData.password = newPassword;
        }

        console.log('Sending updated data:', updatedData); // Log the data being sent

        const response = await api.put('/api/user/', updatedData, { 
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        console.log('User data updated successfully:', response.data);
        setEditState({
          email: false,
          password: false
        });
        setNewPassword('');
        setError({ email: '', password: '' }); // Clear error message on successful update
        if (field === 'email') {
          setOriginalEmail(userData.email);
        }
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
        <div className='Profileusername'>
          Username: {userData.username}
        </div>
      </div>
      <form className='userformContainer'>
        {error.email && <div className="error">{error.email}</div>} 
        {error.password && <div className="error">{error.password}</div>} 
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
                  <div className="userProfile">
                    <input
                      type="password"
                      name="password"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={handlePasswordChange}
                      autoComplete="new-password"
                    />
                  </div>
                ) : (
                  userData.email
                )}
              </td>
              <td>
                <div className="button-container">
                  <button type="button" className={`edit-button ${editState.email ? 'cancel' : 'edit'}`} 
                      onClick={() => handleEditClick('email')}
                    >
                      {editState.email ? 'Cancel' : 'Edit'}
                  </button>
                  {editState.email && userData.email && userData.email !== originalEmail && (
                    <button 
                      type="submit" 
                      className="edit-button save" 
                      onClick={(e) => handleSubmit(e, 'email')}
                      disabled={userData.email === originalEmail}
                    >
                      Save
                    </button>
                  )}
                </div>
              </td>
            </tr>
            <tr>
              <td>Password</td>
              <td>
                {editState.password ? (
                  <div className="userProfile">

                    <input
                      type="password"
                      name="password"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={handlePasswordChange}
                      autoComplete="new-password"
                    />
                  </div>
                ) : (
                  <div>Change Password?</div>
              
                )}
              </td>
              <td>
                <div className="button-container">
                  <button type="button" className={`edit-button ${editState.password ? 'cancel' : 'edit'}`} 
                      onClick={() => handleEditClick('password')}
                    >
                      {editState.password ? 'Cancel' : 'Edit'}
                  </button>
                  {editState.password && newPassword && (
                    <button 
                      type="submit" 
                      className="edit-button save" 
                      onClick={(e) => handleSubmit(e, 'password')}
                    >
                      Save
                    </button>
                  )}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default UserProfile;
