import React, { useMemo } from 'react';
import BudgetProgress from './BudgetProgress';

function BudgetOverview({ expenses, budgets }) {
    const budgetData = useMemo(() => {
        if (!budgets || Object.keys(budgets).length === 0) return [];
        
        const budgetArray = Object.entries(budgets).map(([category, limit]) => ({ category, limit }));
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const currentMonthExpenses = expenses.filter(e => new Date(e.date) >= startOfMonth && e.amount < 0);

        return budgetArray.map(b => {
            const spent = currentMonthExpenses
                .filter(e => e.category === b.category)
                .reduce((sum, e) => sum + Math.abs(e.amount), 0);
            return { ...b, spent };
        });
    }, [expenses, budgets]);

    if (!budgetData || budgetData.length === 0) {
        return <div className="card"><p className="status-text">No budgets set yet.</p></div>;
    }

    return (
        <div className="card">
            <h2>This Month's Budget Progress</h2>
            {budgetData.map(b => (
                <BudgetProgress key={b.category} category={b.category} spent={b.spent} limit={b.limit} />
            ))}
        </div>
    );
}

export default BudgetOverview;