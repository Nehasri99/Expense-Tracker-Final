import { useState, useEffect, useMemo, useCallback } from 'react';
import { toast } from 'react-toastify';

// Make sure this path is correct for your project structure
import { getExpenses, addTransaction, deleteExpense, getBudgets, setBudget } from '../api/apiService';

// This custom hook will manage all expense and budget data for your app.
const useExpenses = () => {
   const [allExpenses, setAllExpenses] = useState([]);
    // 2. CREATE a new state for the data that will be displayed and filtered.
    const [filteredExpenses, setFilteredExpenses] = useState([]); 
    const [budgets, setBudgets] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            // Fetch expenses and budgets at the same time
            const [expenseResult, budgetResult] = await Promise.all([
                getExpenses(),
                getBudgets()
            ]);

            if (expenseResult.success) {
                 const expensesData = expenseResult.data || [];
                // 3. UPDATE both states after fetching.
                setAllExpenses(expensesData);
                setFilteredExpenses(expensesData);
            }
            if (budgetResult.success) {
                setBudgets(budgetResult.data || []);
            }
        } catch (error) {
            toast.error("Failed to fetch initial data.");
            console.error("Fetch Data Error:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // This function will be passed to your ExpenseForm component
    const handleAddTransaction = async (data) => {
        try {
            const result = await addTransaction(data);
            toast.success(result.message);
            fetchData(); // Refetch all data after a change
        } catch (error) {
            toast.error(error.message || "Failed to add transaction.");
            throw error;
        }
    };

    // This function will be passed to your ExpenseTable component
    const handleDeleteExpense = async (id) => {
        try {
            const result = await deleteExpense(id);
            toast.success(result.message);
            fetchData(); // Refetch all data
        } catch (error) {
            toast.error(error.message || "Failed to delete transaction.");
        }
    };

    // Filter expenses by date range
    const handleFilterExpenses = (startDate, endDate) => {
        if (!startDate || !endDate) {
            toast.warn("Please select both start and end dates.");
            return;
        }

        const filtered = allExpenses.filter(exp => {
            const expDate = new Date(exp.date);
            const endOfDay = new Date(endDate);
            endOfDay.setHours(23, 59, 59, 999); // Ensure the full end day is included
            return expDate >= new Date(startDate) && expDate <= endOfDay;
        });
        // Update only the 'filteredExpenses' state.
        setFilteredExpenses(filtered);
        toast.info(`Displaying ${filtered.length} transactions.`);
    };
     const fetchAllExpenses = () => {
        // No API call needed. Just reset the filtered list from the master list.
        setFilteredExpenses(allExpenses);
        toast.info("Filters have been reset.");
    };

    // --- Data Processing with useMemo for performance ---
    const processedChartData = useMemo(() => {
        const expenseData = filteredExpenses.filter(item => item.amount < 0);
        const groupedData = expenseData.reduce((acc, current) => {
            const category = current.category || 'Other';
            acc[category] = (acc[category] || 0) + Math.abs(current.amount);
            return acc;
        }, {});
        return Object.entries(groupedData).map(([name, value]) => ({ name, value }));
    }, [filteredExpenses]);

   const spendingTrend = useMemo(() => {
        const last7Days = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = 6; i >= 0; i--) {
            const day = new Date(today);
            day.setDate(today.getDate() - i);
            last7Days.push(day);
        }

        // Add a check to ensure allExpenses is an array
        if (!Array.isArray(allExpenses)) {
            console.error("allExpenses is not an array:", allExpenses);
            return last7Days.map(date => ({ day: date.toLocaleDateString('en-US', { weekday: 'short' }), amount: 0 })); // Return default empty data
        }

        const expensesByDate = allExpenses
            .filter(e => e && typeof e === 'object' && e.amount < 0) // Ensure 'e' is an object
            .reduce((acc, expense) => {
                try {
                    // --- Start of Enhanced Robust Fix ---
                    // 1. Check if expense.date exists and is not null/undefined
                    if (expense.date != null) { // Use != to check for both null and undefined
                        const parsedDate = new Date(expense.date);
                        
                        // 2. Check if the parsed date is valid
                        if (!isNaN(parsedDate.getTime())) { 
                            parsedDate.setHours(0, 0, 0, 0);
                            const dateString = parsedDate.toISOString().split('T')[0]; 
                            acc[dateString] = (acc[dateString] || 0) + Math.abs(expense.amount);
                        } else {
                            // Log the specific problematic expense date
                            console.warn(`Skipping expense due to invalid date format: Date value was "${expense.date}"`, expense);
                        }
                    } else {
                         // Log if the date field is missing entirely
                         console.warn("Skipping expense because date field is missing or null:", expense);
                    }
                    // --- End of Enhanced Robust Fix ---
                } catch (error) {
                    console.error("Error processing date for expense:", expense, error);
                }
                return acc;
            }, {});

        return last7Days.map(date => {
            const dateString = date.toISOString().split('T')[0];
            return {
                day: date.toLocaleDateString('en-US', { weekday: 'short' }),
                amount: expensesByDate[dateString] || 0,
            };
        });
    }, [allExpenses]);
   const insights = useMemo(() => {
        if (filteredExpenses.length === 0) return [];

        const totalSpent = filteredExpenses
            .filter(e => e.amount < 0)
            .reduce((sum, e) => sum + Math.abs(e.amount), 0);

        const topCategory = processedChartData.sort((a, b) => b.value - a.value)[0];

        let generatedInsights = [];
        if (topCategory) {
            generatedInsights.push(`Your highest spending category is '${topCategory.name}'.`);
        }
        if (totalSpent > 0) {
            generatedInsights.push(`You have spent a total of ₹${totalSpent.toLocaleString('en-IN')} this month.`);
        }
        return generatedInsights;
    }, [filteredExpenses, processedChartData]);

    // Return everything your components will need
    return {
        expenses: filteredExpenses,
        budgets,
        loading,
        addTransaction: handleAddTransaction,
        deleteExpense: handleDeleteExpense,
        processedChartData,
        handleFilterExpenses,
        insights,
        fetchAllExpenses,
        spendingTrend
    };
};

export default useExpenses;
