import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
// Import your API service function (we'll create this next)
import { changeUserPassword } from '../api/apiService'; 
import '../styles/main.css'; // Assuming common styles

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (newPassword !== confirmPassword) {
            toast.error('New passwords do not match!');
            setIsLoading(false);
            return;
        }

        if (!currentPassword || !newPassword) {
             toast.error('All password fields are required.');
             setIsLoading(false);
             return;
        }

        try {
            // Call the API service function
            const result = await changeUserPassword({ currentPassword, newPassword });
            if (result.success) {
                toast.success('Password changed successfully! Redirecting...');
                // Clear fields and navigate back to settings after a delay
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setTimeout(() => navigate('/settings'), 2000); 
            } else {
                // Display error message from backend
                toast.error(result.message || 'Failed to change password.');
            }
        } catch (error) {
            // Display network or unexpected errors
            toast.error(error.message || 'An error occurred. Please try again.');
            console.error("Change Password Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="home-container">
            <h1>Change Password</h1>
            <div className="card" style={{ maxWidth: '500px', margin: '1rem auto' }}>
                <form onSubmit={handleSubmit} className="expense-form"> {/* Reuse expense-form styling */}
                    <div>
                        <label htmlFor="currentPassword">Current Password</label>
                        <input
                            id="currentPassword"
                            placeholder="Enter your current password"
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="newPassword">New Password</label>
                        <input
                            id="newPassword"
                            placeholder="Enter your new password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                     <div>
                        <label htmlFor="confirmPassword">Confirm New Password</label>
                        <input
                            id="confirmPassword"
                            placeholder="Confirm your new password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary" disabled={isLoading} style={{ width: '100%', marginTop: '1rem' }}>
                        {isLoading ? 'Updating...' : 'Change Password'}
                    </button>
                </form>
            </div>
            <ToastContainer position="top-right" />
        </div>
    );
};

export default ChangePassword;