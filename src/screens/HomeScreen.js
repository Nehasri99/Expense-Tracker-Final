import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

// --- MOCK DATA (Replace with API call) ---
const mockTransactions = [
    { id: '1', category: 'Food', text: 'Groceries', amount: -1200, date: '2025-09-14' },
    { id: '2', category: 'Income', text: 'Salary', amount: 50000, date: '2025-09-01' },
    { id: '3', category: 'Shopping', text: 'New Jacket', amount: -4500, date: '2025-09-12' },
];

const TransactionItem = ({ item }) => {
    const isIncome = item.amount > 0;
    const categoryIcons = {
        'Food': 'shopping-cart',
        'Shopping': 'shopping-bag',
        'Income': 'dollar-sign',
        'Travel': 'map-pin',
    };

    return (
        <View style={styles.itemContainer}>
            <View style={[styles.iconContainer, { backgroundColor: isIncome ? '#e0f2f1' : '#ffebee' }]}>
                <Icon name={categoryIcons[item.category] || 'help-circle'} size={24} color={isIncome ? '#00796b' : '#c62828'} />
            </View>
            <View style={styles.itemDetails}>
                <Text style={styles.itemText}>{item.text}</Text>
                <Text style={styles.itemDate}>{item.date}</Text>
            </View>
            <Text style={[styles.itemAmount, { color: isIncome ? '#2e7d32' : '#c62828' }]}>
                {isIncome ? '+' : '-'}₹{Math.abs(item.amount).toLocaleString('en-IN')}
            </Text>
        </View>
    );
};


const HomeScreen = () => {
    const [transactions] = useState(mockTransactions);

    const { balance, income, expense } = useMemo(() => {
        const income = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
        const expense = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0);
        return { income, expense, balance: income + expense };
    }, [transactions]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Your Money Story</Text>
                </View>

                {/* Balance Card */}
                <View style={styles.balanceCard}>
                    <Text style={styles.balanceLabel}>TOTAL BALANCE</Text>
                    <Text style={styles.balanceAmount}>₹{balance.toLocaleString('en-IN')}</Text>
                    <View style={styles.summaryContainer}>
                        <View style={styles.summaryItem}>
                            <Icon name="arrow-up-circle" size={20} color="#2e7d32" />
                            <Text style={styles.summaryLabel}>Income</Text>
                            <Text style={styles.incomeText}>₹{income.toLocaleString('en-IN')}</Text>
                        </View>
                        <View style={styles.summaryItem}>
                            <Icon name="arrow-down-circle" size={20} color="#c62828" />
                            <Text style={styles.summaryLabel}>Expenses</Text>
                            <Text style={styles.expenseText}>₹{Math.abs(expense).toLocaleString('en-IN')}</Text>
                        </View>
                    </View>
                </View>
                
                {/* Recent Transactions List */}
                <Text style={styles.listHeader}>Recent Transactions</Text>
                <FlatList
                    data={transactions}
                    renderItem={({ item }) => <TransactionItem item={item} />}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#f3f4f6' },
    container: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
    header: { marginBottom: 20 },
    headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#111827' },
    balanceCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5 },
    balanceLabel: { fontSize: 14, color: '#6b7280', fontWeight: '500' },
    balanceAmount: { fontSize: 36, fontWeight: 'bold', color: '#111827', marginVertical: 8 },
    summaryContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, borderTopWidth: 1, borderTopColor: '#e5e7eb', paddingTop: 16 },
    summaryItem: { alignItems: 'center' },
    summaryLabel: { fontSize: 14, color: '#6b7280', marginTop: 4 },
    incomeText: { fontSize: 16, fontWeight: '600', color: '#2e7d32' },
    expenseText: { fontSize: 16, fontWeight: '600', color: '#c62828' },
    listHeader: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 10 },
    itemContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 10 },
    iconContainer: { padding: 12, borderRadius: 30 },
    itemDetails: { flex: 1, marginLeft: 15 },
    itemText: { fontSize: 16, fontWeight: '500', color: '#111827' },
    itemDate: { fontSize: 12, color: '#6b7280', marginTop: 2 },
    itemAmount: { fontSize: 16, fontWeight: 'bold' },
});

export default HomeScreen;
