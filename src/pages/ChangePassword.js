// inside ChangePasswordPage.js
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () => {
    const [current, setCurrent] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirm, setConfirm] = useState('');

    const handleChangePassword = () => {
        if (newPass !== confirm) {
            toast.error('Passwords do not match!');
            return;
        }
        // Call your backend API here
        toast.success('Password changed successfully!');
        setCurrent('');
        setNewPass('');
        setConfirm('');
    };

    return (
        <div className="change-password-container">
            <h2>Change Password</h2>
            <input
                placeholder="Current Password"
                type="password"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
            />
            <input
                placeholder="New Password"
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
            />
            <input
                placeholder="Confirm New Password"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
            />
            <button onClick={handleChangePassword}>Submit</button>

            <ToastContainer position="top-right" />

            {/* --- Embedded CSS --- */}
            <style>{`
                .change-password-container {
                    max-width: 400px;
                    margin: 60px auto;
                    background-color: #fff;
                    padding: 25px;
                    border-radius: 12px;
                    box-shadow: 0 3px 6px rgba(0,0,0,0.1);
                    font-family: Arial, sans-serif;
                }

                .change-password-container h2 {
                    text-align: center;
                    margin-bottom: 20px;
                }

                .change-password-container input {
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 15px;
                    border-radius: 6px;
                    border: 1px solid #ccc;
                    font-size: 1rem;
                    transition: border 0.3s, background-color 0.3s;
                }

                .change-password-container input:focus {
                    border-color: #007bff;
                    outline: none;
                }

                .change-password-container button {
                    width: 100%;
                    padding: 12px;
                    background-color: #007bff;
                    color: white;
                    font-weight: bold;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }

                .change-password-container button:hover {
                    background-color: #0056b3;
                }

                /* Dark Mode support */
                body.dark-mode .change-password-container {
                    background-color: #1e1e1e;
                    color: #f5f5f5;
                }

                body.dark-mode .change-password-container input {
                    background-color: #2a2a2a;
                    color: #f5f5f5;
                    border: 1px solid #555;
                }

                body.dark-mode .change-password-container button {
                    background-color: #17a2b8;
                }

                body.dark-mode .change-password-container button:hover {
                    background-color: #117a8b;
                }
            `}</style>
        </div>
    );
};

export default ChangePassword;
