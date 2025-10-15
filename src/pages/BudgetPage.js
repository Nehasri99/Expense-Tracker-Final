import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { getBudgets, getExpenses } from '../api/apiService';

// Import your separate components
import BudgetManager from '../components/dashboard/BudgetManager';
import BudgetOverview from '../components/dashboard/BudgetOverview';

export default function BudgetPage() {
    const [expenses, setExpenses] = useState([]);
    const [budgets, setBudgets] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        // We don't set loading to true here to avoid a full-page flicker on save
        try {
            const [budgetResult, expenseResult] = await Promise.all([getBudgets(), getExpenses()]);
            
            const budgetsObj = budgetResult.data.reduce((obj, item) => {
                obj[item.category] = item.limit;
                return obj;
            }, {});
            setBudgets(budgetsObj);

            setExpenses(expenseResult.data);
        } catch (err) {
            toast.error("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    return (
        <div className="home-container">
            <ToastContainer />
            <h1>Budget Management</h1>
            {loading ? <p className="status-text">Loading...</p> : (
                <>
                    <BudgetManager initialBudgets={budgets} onSaveSuccess={fetchData} />
                    <BudgetOverview expenses={expenses} budgets={budgets} />
                </>
            )}
        </div>
    );
}