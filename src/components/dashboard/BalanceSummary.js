import React, { useMemo } from 'react';

// This is a small, self-contained display component.
function ExpenseDetails({ income, expense }) {
    return (
        <div className="summary-details">
            <div className="income-card">
                <h3 className="summary-title">Income</h3>
                <p className="summary-value">₹{income}</p>
            </div>
            <div className="expense-card">
                <h3 className="summary-title">Expense</h3>
                <p className="summary-value">₹{expense}</p>
            </div>
        </div>
    );
}

function BalanceSummary({ expenses }) {
    // useMemo ensures this calculation only runs when the 'expenses' prop changes.
    const { income, expense, balance } = useMemo(() => {
        const income = expenses
            .filter(item => item.amount > 0)
            .reduce((acc, item) => acc + item.amount, 0);

        const expense = expenses
            .filter(item => item.amount < 0)
            .reduce((acc, item) => acc + Math.abs(item.amount), 0);
        
        const balance = income - expense;

        return {
            income: income.toFixed(2),
            expense: expense.toFixed(2),
            balance: balance.toFixed(2)
        };
    }, [expenses]);

    return (
        <div className="card balance-section">
            <h2>Your Balance</h2>
            <p className="balance-amount">₹{balance}</p>
            <ExpenseDetails income={income} expense={expense} />
        </div>
    );
}

export default BalanceSummary;