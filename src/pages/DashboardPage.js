import React from 'react';
import { ToastContainer } from 'react-toastify';

// Import the custom hook that manages all state and API logic
import useExpenses from '../hooks/useExpenses'; 

// Import the UI components this page will use
import Header from '../components/common/Header';
import BalanceSummary from '../components/dashboard/BalanceSummary';
import ExpenseTable from '../components/dashboard/ExpenseTable';
import { useNavigate } from 'react-router-dom';
import '../styles/main.css'; // Ensure you have some basic styles
function DashboardPage() {
    // This single hook provides all the necessary data and functions for this page.
    const { 
        expenses, 
        loading, 
        deleteExpense, 
        handleFilterExpenses, 
        fetchAllExpenses 
    } = useExpenses();

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        // Use toast from your useExpenses hook or import it directly
        // toast.success('Logged out successfully 👋'); 
        setTimeout(() => navigate('/login'), 1000);
    };

    return (
        // The "home-container" class should be defined in your main.css
        <div className="home-container">
            <ToastContainer />  
            <Header 
            onFilter={handleFilterExpenses} 
            onResetFilter={fetchAllExpenses} 
            onLogout={handleLogout} 
            />
        
            <div className="main-content">
                <BalanceSummary expenses={expenses} />
                <ExpenseTable 
                    expenses={expenses} 
                    deleteExpense={deleteExpense} 
                    isLoading={loading} 
                />
            </div>
        </div>
    );
}

export default DashboardPage;

