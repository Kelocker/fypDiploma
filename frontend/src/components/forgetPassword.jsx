import React, { useState } from 'react';
import '../css/forgotPw/forgotPasswordScreen.css';
import toastNotifications from '../toastNotification';


export function PasswordResetRequestForm() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    

    async function sendPasswordResetEmail(email) {
        try {
            const response = await fetch('http://localhost:8000/api/forget-password/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email }),
            });
            const data = await response.json();
            if (data.message) {
                toastNotifications('success', data.message);
            } else if (data.error) {
                toastNotifications('error', data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            toastNotifications('error', 'Failed to send reset email. Please try again later.');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await sendPasswordResetEmail(email);
        setLoading(false);
    };

    return (
        <div className="forget-password-form">
            
            <form onSubmit={handleSubmit}>
                <span className="forget-password-title">Forgot your password?</span>
                <div className="forget-password-label">
                    <label htmlFor="email">Email</label>
                </div>
                <div className="forget-password-input">
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                <div className="forget-password-button">
                    <button type="submit" disabled={loading}>Send Reset Email</button>
                </div>
            </form>
        </div>
    );
}
