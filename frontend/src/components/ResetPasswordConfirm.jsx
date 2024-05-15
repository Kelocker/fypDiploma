import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password_confirm } from './auth'; // Make sure the path is correct

const ResetPasswordConfirm = ({ reset_password_confirm }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    });

    const { new_password, re_new_password } = formData;
    const { uid, token } = useParams(); // This replaces the older match.params method

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (new_password !== re_new_password) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        reset_password_confirm(uid, token, new_password, re_new_password)
            .then(() => {
                setRequestSent(true);
            })
            .catch(() => {
                setError("Failed to reset password. Please try again later.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    if (requestSent) {
        return <Navigate to="/" />
    }

    return (
        <div className="container mt-5">
            {error && <p className="alert alert-danger">{error}</p>}
            <h1>Reset Your Password:</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        className="form-control"
                        type="password"
                        placeholder="New Password"
                        name="new_password"
                        value={new_password}
                        onChange={onChange}
                        minLength="6"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        className="form-control"
                        type="password"
                        placeholder="Confirm New Password"
                        name="re_new_password"
                        value={re_new_password}
                        onChange={onChange}
                        minLength="6"
                        required
                    />
                </div>
                <button className="btn btn-primary" type="submit" disabled={loading}>
                    {loading ? 'Processing...' : 'Reset Password'}
                </button>
            </form>
        </div>
    );
};

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);
