import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/forgotPw/forgotPasswordScreen.css';

export function PasswordResetConfirm() {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { uidb64, token } = useParams();  // Get these from the URL

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch(`http://localhost:8000/api/reset-password/${uidb64}/${token}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password: password }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Password has been reset successfully.');
            } else {
                setMessage(data.error || 'Failed to reset password.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Network error, please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forget-password-screen">

        
        <div className="forget-password-form">
            <form onSubmit={handleSubmit}>
                <label htmlFor="password">New Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                />
                <button type="submit" disabled={loading}>Reset Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>

        </div>
    );
}
