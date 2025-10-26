import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // For the button link
import '../styles/Settings.css'; 
import { getUserProfile } from '../api/apiService';
import { toast } from 'react-toastify';

const SettingsPage = () => {
    // --- State Management ---
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode === 'true' ? true : document.body.classList.contains('dark-mode');
    });
    const [userProfile, setUserProfile] = useState({ name: 'Loading...', email: 'Loading...' });
    const [loadingProfile, setLoadingProfile] = useState(true);

    // --- Effects ---
    // Dark mode effect
    useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkMode);
        localStorage.setItem('darkMode', isDarkMode);
    }, [isDarkMode]);

    // Fetch user profile effect (runs once on mount)
    useEffect(() => {
        const fetchUserProfile = async () => {
            setLoadingProfile(true);
            try {
                const result = await getUserProfile();
                if (result.success && result.data) {
                    setUserProfile({ name: result.data.name, email: result.data.email });
                } else {
                    toast.error(result.message || "Failed to load profile.");
                    setUserProfile({ name: 'Error', email: 'Error' });
                }
            } catch (error) {
                toast.error("Failed to fetch user profile.");
                console.error("Fetch Profile Error:", error);
                setUserProfile({ name: 'Error', email: 'Error' });
            } finally {
                setLoadingProfile(false);
            }
        };
        fetchUserProfile();
    }, []); // Empty array means run only once

    // --- Event Handlers ---
    const toggleDarkMode = () => setIsDarkMode(prevMode => !prevMode);

    // --- Render ---
    return (
        <div className="home-container">
            <h1>Settings</h1>

            <div className="settings-grid">
                {/* --- Profile Card --- */}
                <div className="card">
                    <h2>Profile</h2>
                    {loadingProfile ? (
                        <p className="status-text">Loading profile...</p> 
                    ) : (
                        <div className="profile-info">
                            <label>Name</label>
                            {/* Display fetched name */}
                            <input type="text" value={userProfile.name} disabled />
                            
                            <label>Email</label>
                            {/* Display fetched email */}
                            <input type="email" value={userProfile.email} disabled />
                        </div>
                    )}
                    {/* Link component makes the button navigate */}
                    <Link to="/change-password">
                        <button className="btn-secondary">Change Password</button>
                    </Link>
                </div>

                {/* --- Appearance Card --- */}
                <div className="card">
                    <h2>Appearance</h2>
                    <div className="appearance-option">
                        <span>Dark Mode</span>
                        <button className="btn-primary" onClick={toggleDarkMode}>
                            {isDarkMode ? 'Disable' : 'Enable'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;