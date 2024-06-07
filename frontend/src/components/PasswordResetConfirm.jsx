import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/forgotPw/forgotPasswordScreen.css';
import toastNotifications from '../toastNotification';

export function PasswordResetConfirm() {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { uidb64, token } = useParams();  // Get these from the URL

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const errors = {};
        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 8) {
            errors.password = 'Password must be at least 8 characters.';
        } else if (/['";]+/.test(password)) {
            errors.password = `Password cannot contain ' " and ;.`;
        }

        if (Object.keys(errors).length > 0) {
            for (const error in errors) {
                toastNotifications('error', errors[error]);
            }
            setLoading(false);
            return;
        }

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
                toastNotifications('success', 'Password has been reset successfully.');
            } else {
                toastNotifications('error', data.error || 'Failed to reset password.');
            }
        } catch (error) {
            console.error('Error:', error);
            toastNotifications('error', 'Network error, please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forget-password-form">
            <form onSubmit={handleSubmit}>
                <span className="forget-password-title">Create New Password</span>
                <div className="new-password-label">
                    <label htmlFor="password">New Password</label>
                </div>
                <div className="forget-password-input">
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                <div className="forget-password-button">
                    <button type="submit" disabled={loading}>Reset Password</button>
                </div>
            </form>
        </div>
    );
}
