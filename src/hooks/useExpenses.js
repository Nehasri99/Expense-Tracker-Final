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

        // Create an array of the last 7 days
        for (let i = 6; i >= 0; i--) {
            const day = new Date(today);
            day.setDate(today.getDate() - i);
            last7Days.push(day);
        }

        // Group expenses by date
        const expensesByDate = allExpenses
            .filter(e => e.amount < 0)
            .reduce((acc, expense) => {
                const expenseDate = new Date(expense.date).setHours(0, 0, 0, 0);
                const dateString = new Date(expenseDate).toISOString().split('T')[0];
                acc[dateString] = (acc[dateString] || 0) + Math.abs(expense.amount);
                return acc;
            }, {});

        // Map the last 7 days to the chart data format
        return last7Days.map(date => {
            const dateString = date.toISOString().split('T')[0];
            return {
                day: date.toLocaleDateString('en-US', { weekday: 'short' }), // e.g., "Mon"
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
