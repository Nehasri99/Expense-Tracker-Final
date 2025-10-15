import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const categories = [
    { name: 'Food', icon: 'shopping-cart' },
    { name: 'Travel', icon: 'map-pin' },
    { name: 'Shopping', icon: 'shopping-bag' },
    { name: 'Bills', icon: 'file-text' },
    { name: 'Entertainment', icon: 'film' },
    { name: 'Other', icon: 'help-circle' },
];

const AddTransactionScreen = ({ navigation }) => {
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('expense'); // 'expense' or 'income'
    const [selectedCategory, setSelectedCategory] = useState('Food');

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header with close button */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Add Transaction</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="x" size={24} color="#111827" />
                    </TouchableOpacity>
                </View>

                {/* Amount Input */}
                <View style={styles.amountContainer}>
                    <Text style={styles.currencySymbol}>₹</Text>
                    <TextInput
                        style={styles.amountInput}
                        placeholder="0"
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                    />
                </View>

                {/* Type Selector (Income/Expense) */}
                <View style={styles.typeSelector}>
                    <TouchableOpacity 
                        style={[styles.typeButton, type === 'expense' && styles.typeButtonActive]}
                        onPress={() => setType('expense')}
                    >
                        <Text style={[styles.typeText, type === 'expense' && styles.typeTextActive]}>Expense</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.typeButton, type === 'income' && styles.typeButtonActive]}
                        onPress={() => setType('income')}
                    >
                         <Text style={[styles.typeText, type === 'income' && styles.typeTextActive]}>Income</Text>
                    </TouchableOpacity>
                </View>

                {/* Category Grid */}
                {type === 'expense' && (
                    <>
                        <Text style={styles.categoryHeader}>Select Category</Text>
                        <View style={styles.categoryGrid}>
                            {categories.map((cat) => (
                                <TouchableOpacity 
                                    key={cat.name} 
                                    style={[styles.categoryItem, selectedCategory === cat.name && styles.categoryItemActive]}
                                    onPress={() => setSelectedCategory(cat.name)}
                                >
                                    <Icon name={cat.icon} size={24} color={selectedCategory === cat.name ? '#fff' : '#3b82f6'} />
                                    <Text style={[styles.categoryText, selectedCategory === cat.name && styles.categoryTextActive]}>{cat.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </>
                )}
                
                {/* Save Button */}
                <TouchableOpacity style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Save Transaction</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#fff' },
    container: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    headerTitle: { fontSize: 22, fontWeight: 'bold' },
    amountContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 40 },
    currencySymbol: { fontSize: 48, color: '#9ca3af', marginRight: 10 },
    amountInput: { fontSize: 64, fontWeight: 'bold', color: '#111827', flex: 1, minWidth: 100 },
    typeSelector: { flexDirection: 'row', backgroundColor: '#f3f4f6', borderRadius: 30, padding: 4, marginBottom: 20 },
    typeButton: { flex: 1, paddingVertical: 12, borderRadius: 26, alignItems: 'center' },
    typeButtonActive: { backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
    typeText: { fontSize: 16, fontWeight: '600', color: '#6b7280' },
    typeTextActive: { color: '#3b82f6' },
    categoryHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    categoryItem: { width: '30%', alignItems: 'center', paddingVertical: 15, borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb', marginBottom: 10 },
    categoryItemActive: { backgroundColor: '#3b82f6', borderColor: '#3b82f6' },
    categoryText: { marginTop: 8, color: '#3b82f6', fontWeight: '500' },
    categoryTextActive: { color: '#fff' },
    saveButton: { backgroundColor: '#3b82f6', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 'auto', marginBottom: 20 },
    saveButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});


export default AddTransactionScreen;
