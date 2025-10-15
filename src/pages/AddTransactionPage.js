import React from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useExpenses from '../hooks/useExpenses';
import ExpenseForm from '../components/dashboard/ExpenseForm';

const AddTransactionPage = () => {
    const { addTransaction } = useExpenses();
    const navigate = useNavigate();

    // Handles form submission and redirects after success
    const handleAddNewTransaction = async (data) => {
        try {
            await addTransaction(data); // Call hook function
            navigate('/dashboard'); // Redirect after success
        } catch (error) {
            console.error("Submission failed", error);
            toast.error("Something went wrong while adding the transaction!");
        }
    };

    const pageStyle = {
        maxWidth: '600px',
        margin: '2rem auto',
        padding: '0 1rem',
        fontFamily: 'sans-serif'
    };

    return (
        <div style={pageStyle}>
            <ExpenseForm addTransaction={handleAddNewTransaction} />
        </div>
    );
};

export default AddTransactionPage;
