// App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// --- STEP 1: Import Your REAL Pages and Components ---
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import BudgetPage from './pages/BudgetPage';
import SettingsPage from './pages/SettingsPage';
import AddTransactionPage from './pages/AddTransactionPage';
import ProtectedRoute from './components/common/ProtectedRoute';
import MainLayout from './components/common/MainLayout';
import ChangePassword from './pages/ChangePassword';
// --- MAIN APP ROUTER ---
function App() {
    return (
        <>
            {/* Toast container at top-level */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <Routes>
                {/* --- Public Routes --- */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* --- Protected Routes --- */}
                <Route 
                    element={
                        <ProtectedRoute>
                            <MainLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/analytics" element={<AnalyticsPage />} />
                    <Route path="/budget" element={<BudgetPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/change-password" element={<ChangePassword />} />
                    <Route path="/add-transaction" element={<AddTransactionPage />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
