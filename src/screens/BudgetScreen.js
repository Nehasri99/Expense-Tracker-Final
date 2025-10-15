import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const BudgetScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerTitle}>My Budgets</Text>
            <View style={styles.card}>
                <Text style={styles.budgetLabel}>Monthly Budget</Text>
                <Text style={styles.budgetValue}>₹15,000 / ₹25,000</Text>
                {/* Progress Bar Component would go here */}
                <View style={styles.progressBarBackground}>
                    <View style={styles.progressBarFill}></View>
                </View>
            </View>
            {/* List of budgets by category would go here */}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
    headerTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
    card: { backgroundColor: '#fff', borderRadius: 20, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 2 },
    budgetLabel: { color: 'gray' },
    budgetValue: { fontSize: 24, fontWeight: 'bold', marginVertical: 8 },
    progressBarBackground: { height: 10, backgroundColor: '#eee', borderRadius: 5, marginTop: 10 },
    progressBarFill: { height: '100%', width: '60%', backgroundColor: '#5c6ef8', borderRadius: 5 },
});

export default BudgetScreen;
