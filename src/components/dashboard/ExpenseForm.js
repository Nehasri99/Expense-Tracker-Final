import React, { useState, useEffect } from 'react';

// --- 1. Define the keywords for smart categorization ---
const categoryKeywordMap = {
    Food: ['zomato', 'swiggy', 'restaurant', 'food', 'coffee', 'cafe', 'dinner', 'lunch'],
    Travel: ['uber', 'ola', 'flight', 'train', 'bus', 'auto', 'taxi', 'travel'],
    Shopping: ['amazon', 'flipkart', 'myntra', 'mall', 'store', 'groceries'],
    Bills: ['electricity', 'water', 'internet', 'phone', 'bill', 'recharge'],
    Entertainment: ['movie', 'tickets', 'bookmyshow', 'concert', 'pvr'],
};

// --- 2. Create the helper function to find the category ---
const getSuggestedCategory = (text) => {
    const lowerCaseText = text.toLowerCase();
    for (const category in categoryKeywordMap) {
        // .some() checks if at least one keyword in the array is found in the text
        if (categoryKeywordMap[category].some(keyword => lowerCaseText.includes(keyword))) {
            return category;
        }
    }
    return null; // Return null if no match is found
};


function ExpenseForm({ addTransaction }) {
    const getTodayString = () => new Date().toISOString().split('T')[0];

    const [expenseInfo, setExpenseInfo] = useState({
        amount: '',
        text: '',
        type: 'expense',
        category: 'Food',
        date: getTodayString(),
        paymentMethod: 'GPay'
    });
    
    const paymentMethods = ['GPay', 'PhonePe', 'Paytm', 'Credit Card', 'Debit Card', 'Cash', 'Other'];
    const categories = ['Food', 'Travel', 'Shopping', 'Bills', 'Entertainment', 'Other'];

    // --- 3. Add the useEffect hook to watch for changes ---
    useEffect(() => {
        // Only suggest a category if the type is 'expense'
        if (expenseInfo.type === 'expense') {
            const suggestedCategory = getSuggestedCategory(expenseInfo.text);
            if (suggestedCategory) {
                // Update the state if a suggestion is found
                setExpenseInfo(prevState => ({ ...prevState, category: suggestedCategory }));
            }
        }
    }, [expenseInfo.text, expenseInfo.type]); // This runs every time the text or type changes

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpenseInfo(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { amount, text, type, category, date, paymentMethod } = expenseInfo;
        const transactionAmount = type === 'income' ? Math.abs(parseFloat(amount)) : -Math.abs(parseFloat(amount));

        const dataToSend = { text, amount: transactionAmount, date, paymentMethod, ...(type === 'expense' && { category }) };
        
        // Await the function call
        await addTransaction(dataToSend);

        // This will now only run after the transaction is submitted and you've navigated away
        setExpenseInfo({ amount: '', text: '', type: 'expense', category: 'Food', date: getTodayString(), paymentMethod: 'GPay' });
    };


    return (
        <div className='card expense-form'>
            <h2>Add New Transaction</h2>
            <form onSubmit={handleSubmit}>
                <label>Transaction Detail</label>
                <input onChange={handleChange} type='text' name='text' placeholder='e.g., Uber ride, Zomato order...' value={expenseInfo.text} required />

                <label>Amount (₹)</label>
                <input onChange={handleChange} type='number' name='amount' value={expenseInfo.amount} required />

                <label>Date</label>
                <input onChange={handleChange} type="date" name="date" value={expenseInfo.date} required />

                <label>Type</label>
                <select name="type" onChange={handleChange} value={expenseInfo.type}>
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>

                {expenseInfo.type === 'expense' && (
                    <>
                        <label>Category</label>
                        <select name="category" onChange={handleChange} value={expenseInfo.category} required>
                            {categories.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
                        </select>

                        <label>Payment Method</label>
                        <select name="paymentMethod" onChange={handleChange} value={expenseInfo.paymentMethod} required>
                            {paymentMethods.map((method) => (<option key={method} value={method}>{method}</option>))}
                        </select>
                    </>
                )}
                <button type='submit' className="btn-primary" style={{width: '100%', marginTop: '1rem'}}>Add Transaction</button>
            </form>
        </div>
    );
}

export default ExpenseForm;