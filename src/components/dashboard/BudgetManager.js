import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { setBudget } from '../../api/apiService';

const categories = ['Food', 'Travel', 'Shopping', 'Bills', 'Entertainment', 'Other'];

function BudgetManager({ initialBudgets, onSaveSuccess }) {
    const [localBudgets, setLocalBudgets] = useState(initialBudgets);

    useEffect(() => {
        setLocalBudgets(initialBudgets);
    }, [initialBudgets]);

    const handleInputChange = (category, value) => {
        const numValue = value === '' ? '' : Number(value);
        setLocalBudgets(prev => ({ ...prev, [category]: numValue }));
    };

    const handleSave = async (category) => {
        const limit = localBudgets[category];
        if (limit === '' || limit <= 0 || isNaN(limit)) {
            return toast.error("Please enter a valid budget limit.");
        }
        try {
            await setBudget({ category, limit: Number(limit) });
            toast.success(`Budget for ${category} saved!`);
            onSaveSuccess(); // This tells the parent page to refresh its data
        } catch (error) {
            toast.error(`Failed to save budget for ${category}.`);
        }
    };

    return (
        <div className="card budget-manager">
            <h2>Manage Your Monthly Budgets</h2>
            {categories.map(category => {
                const value = localBudgets[category] || '';
                return (
                    <div key={category} className="budget-input-group">
                        <label>{category}</label>
                        <div className="input-with-button">
                            <input
                                type="number"
                                placeholder="e.g., 5000"
                                value={value}
                                onChange={e => handleInputChange(category, e.target.value)}
                            />
                            <button onClick={() => handleSave(category)} className="btn-primary">
                                Save
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default BudgetManager;