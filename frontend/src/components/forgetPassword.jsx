import React, { useState } from 'react';
import api from '../api';

export function PasswordResetRequestForm() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            const response = await api.post('/users/reset_password/', { email });
            setMessage('If the email is registered, you will receive a password reset link.');
        } catch (error) {
            if (error.response) {
                // Specific error from backend
                setMessage(error.response.data.detail || 'Failed to send reset email. Please try again later.');
            } else {
                // Generic error handling
                setMessage('Network error, please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                />
                <button type="submit" disabled={loading}>Send Reset Email</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export function ResetPasswordConfirmForm({ uid, token }) {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);
        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match!');
            setLoading(false);
            return;
        }
        try {
            const response = await api.post('/users/reset_password_confirm/', {
                uid, token, new_password: newPassword, re_new_password: confirmPassword
            });
            setMessage('Your password has been successfully reset.');
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.detail || 'Failed to reset password. The link may have expired or is invalid.');
            } else {
                setMessage('Network error, please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="newPassword">New Password:</label>
                <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    disabled={loading}
                />
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={loading}
                />
                <button type="submit" disabled={loading}>Reset Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
