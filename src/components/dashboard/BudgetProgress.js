import React from 'react';

function BudgetProgress({ category, spent, limit }) {
    const progress = Math.min((spent / limit) * 100, 100) || 0;
    const remaining = limit - spent;
    const isOverBudget = spent > limit;

    return (
        <div className="budget-item">
            <div className="budget-info">
                <span>{category}</span>
                <span>₹{spent.toFixed(0)} / ₹{limit}</span>
            </div>
            <div className="progress-bar-background">
                <div
                    className={isOverBudget ? "progress-bar-foreground over-budget" : "progress-bar-foreground"}
                    style={{ width: `${progress}%` }}
                />
            </div>
            <div className={isOverBudget ? "budget-remaining over-budget-text" : "budget-remaining"}>
                {isOverBudget ? `₹${Math.abs(remaining).toFixed(0)} over` : `₹${remaining.toFixed(0)} left`}
            </div>
        </div>
    );
}

export default BudgetProgress;