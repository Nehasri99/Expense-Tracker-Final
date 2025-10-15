// src/pages/AnalyticsPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// 1. Import your REAL hook and components
import useExpenses from '../hooks/useExpenses';
import ExpenseChart from '../components/dashboard/ExpenseChart';
import TrendChart from '../components/dashboard/TrendChart';
import Insights from '../components/dashboard/Insights';
import '../styles/main.css'; 

const AnalyticsPage = () => {
    // 2. Use the REAL hook to get your actual data
    const { processedChartData, insights,spendingTrend,loading } = useExpenses();
    const navigate = useNavigate();
    const loggedInUser = localStorage.getItem('loggedInUser') || 'User';

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        toast.success('Logged out successfully 👋');
        setTimeout(() => navigate('/login'), 1000);
    };

    return (
        <div className="home-container">
            <header className="card header-top">
                <h1>Analytics for {loggedInUser}</h1>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
                
                {/* 3. These components now display REAL data */}
                <ExpenseChart data={processedChartData} isLoading={loading} />
                <Insights insights={insights} isLoading={loading} />
                 <TrendChart data={spendingTrend} isLoading={loading} />
            </div>
            
        </div>
    );
};

export default AnalyticsPage;