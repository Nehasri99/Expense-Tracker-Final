import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Settings.css';

// --- Header Component ---
const Header = ({ onLogout }) => {
    const loggedInUser = localStorage.getItem('loggedInUser') || 'User';
    return (
        <header className="settings-header">
            <h1>Welcome, {loggedInUser}</h1>
            <button className="btn-logout" onClick={onLogout}>Logout</button>
        </header>
    );
};

// --- Reusable Card Component ---
const SettingsCard = ({ title, children }) => (
    <div className="card settings-card">
        <h2 className="settings-card-title">{title}</h2>
        {children}
    </div>
);

// --- Profile Settings ---
const ProfileSettings = ({ navigate }) => {
    const user = {
        name: localStorage.getItem('loggedInUser') || 'User',
        email: 'user@example.com'
    };

    return (
        <SettingsCard title="Profile">
            <div className="form-group">
                <label>Name</label>
                <input type="text" value={user.name} disabled />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input type="email" value={user.email} disabled />
            </div>
            <button
                className="btn-secondary"
                onClick={() => navigate('/change-password')}
            >
                Change Password
            </button>
        </SettingsCard>
    );
};

// --- Appearance Settings with Dark Mode ---
const AppearanceSettings = () => {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('darkMode') === 'true';
    });

    const handleThemeToggle = () => {
        setDarkMode(prev => {
            const newMode = !prev;
            document.body.classList.toggle('dark-mode', newMode);
            localStorage.setItem('darkMode', newMode);
            toast.info(newMode ? '🌙 Switched to Dark Mode' : '☀️ Switched to Light Mode');
            return newMode;
        });
    };

    useEffect(() => {
        document.body.classList.toggle('dark-mode', darkMode);
    }, [darkMode]);

    return (
        <SettingsCard title="Appearance">
            <div className="setting-item">
                <span>Dark Mode</span>
                <button className="btn-toggle" onClick={handleThemeToggle}>
                    {darkMode ? 'Disable' : 'Enable'}
                </button>
            </div>
        </SettingsCard>
    );
};

// // --- Data Management with Export ---
// const DataSettings = () => {
//     const handleExport = (format) => {
//         const data = [
//             { name: "Item1", amount: 100 },
//             { name: "Item2", amount: 200 },
//         ];

//         if (format === 'CSV') {
//             const csv = data.map(row => Object.values(row).join(",")).join("\n");
//             const blob = new Blob([csv], { type: 'text/csv' });
//             const url = URL.createObjectURL(blob);
//             const a = document.createElement('a');
//             a.href = url;
//             a.download = 'transactions.csv';
//             a.click();
//             URL.revokeObjectURL(url);
//         } else if (format === 'PDF') {
//             import('jspdf').then(jsPDF => {
//                 const doc = new jsPDF.default();
//                 doc.text('Transactions Report', 10, 10);
//                 data.forEach((item, i) => {
//                     doc.text(`${item.name} - ${item.amount}`, 10, 20 + i * 10);
//                 });
//                 doc.save('transactions.pdf');
//             });
//         }

//         toast.success(`✅ Exported as ${format}`);
//     };

//     return (
//         <SettingsCard title="Data Management">
//             <div className="setting-item">
//                 <span>Export Transactions</span>
//                 <div className="button-group">
//                     <button className="btn-primary" onClick={() => handleExport('CSV')}>Export as CSV</button>
//                     <button className="btn-primary" onClick={() => handleExport('PDF')}>Export as PDF</button>
//                 </div>
//             </div>
//         </SettingsCard>
//     );
// };

// --- Main Settings Page ---
const SettingsPage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        toast.success('Logged out successfully 👋');
        setTimeout(() => navigate('/login'), 1000);
    };

    return (
        <div className="home-container">
            <Header onLogout={handleLogout} />
            <div className="settings-grid">
                <ProfileSettings navigate={navigate} />
                <AppearanceSettings />
                {/* <DataSettings /> */}
            </div>
            <ToastContainer position="top-right" />
        </div>
    );
};

export default SettingsPage;
