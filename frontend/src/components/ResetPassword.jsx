// Import necessary modules from React, React Router, and Redux
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

// Import the action creator for resetting passwords
import { reset_password } from './auth';  // Updated to avoid double slashes

// Define the ResetPassword component
const ResetPassword = ({ reset_password }) => {
    const [requestSent, setRequestSent] = useState(false);  // Tracks if the reset request was sent
    const [formData, setFormData] = useState({
        email: ''
    });

    // Destructure email from formData for easy access
    const { email } = formData;

    // Update state based on form input changes
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    // Handle form submission
    const onSubmit = e => {
        e.preventDefault();  // Prevent default form submission behavior
        reset_password(email);  // Call the reset_password action
        setRequestSent(true);  // Indicate that the request has been sent
    };

    // Redirect to home page once the request is sent
    if (requestSent) {
        return <Navigate to="/" />;
    }

    // Render the form
    return (
        <div className="container mt-5">
            <h1>Request Password Reset:</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        className="form-control"
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                    />
                </div>
                <button className="btn btn-primary" type="submit">Reset Password</button>
            </form>
        </div>
    );
};

// Connect the component to Redux
export default connect(null, { reset_password })(ResetPassword);
