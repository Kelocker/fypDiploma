import React, { useState } from 'react';

export function PasswordResetRequestForm() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
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
                setMessage(data.message);
            } else if (data.error) {
                setMessage(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Failed to send reset email. Please try again later.');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        await sendPasswordResetEmail(email);
        setLoading(false);
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



// export function ResetPasswordConfirmForm({ uid, token }) {
//     const [newPassword, setNewPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [message, setMessage] = useState('');
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setMessage('');
//         setLoading(true);
//         if (newPassword !== confirmPassword) {
//             setMessage('Passwords do not match!');
//             setLoading(false);
//             return;
//         }
//         try {
//             const response = await api.post('/users/reset_password_confirm/', {
//                 uid, token, new_password: newPassword, re_new_password: confirmPassword
//             });
//             setMessage('Your password has been successfully reset.');
//         } catch (error) {
//             if (error.response) {
//                 setMessage(error.response.data.detail || 'Failed to reset password. The link may have expired or is invalid.');
//             } else {
//                 setMessage('Network error, please try again later.');
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor="newPassword">New Password:</label>
//                 <input
//                     type="password"
//                     id="newPassword"
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                     required
//                     disabled={loading}
//                 />
//                 <label htmlFor="confirmPassword">Confirm Password:</label>
//                 <input
//                     type="password"
//                     id="confirmPassword"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     required
//                     disabled={loading}
//                 />
//                 <button type="submit" disabled={loading}>Reset Password</button>
//             </form>
//             {message && <p>{message}</p>}
//         </div>
//     );
// }
