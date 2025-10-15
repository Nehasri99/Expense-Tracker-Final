import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { PieChart, BarChart } from "react-native-gifted-charts"; // A great library for charts

// --- MOCK DATA (Replace with API call and processing) ---
const pieData = [
    { value: 54, color: '#6366f1', text: '54%' },
    { value: 30, color: '#3b82f6', text: '30%' },
    { value: 26, color: '#10b981', text: '26%' },
];

const barData = [
    { value: 230, label: 'Jan' },
    { value: 180, label: 'Feb' },
    { value: 195, label: 'Mar' },
    { value: 250, label: 'Apr' },
    { value: 320, label: 'May' },
];


const AnalyticsScreen = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Analytics</Text>
                </View>

                {/* Pie Chart Card */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Spending by Category</Text>
                    <View style={styles.pieChartContainer}>
                       <PieChart
                            data={pieData}
                            donut
                            radius={90}
                            innerRadius={60}
                            centerLabelComponent={() => {
                                return <Text style={{fontSize: 22, fontWeight: 'bold'}}>₹1,250</Text>;
                            }}
                        />
                    </View>
                    {/* You can map over categories to create the legend */}
                </View>

                {/* Bar Chart Card */}
                <View style={styles.card}>
                     <Text style={styles.cardTitle}>Monthly Spending</Text>
                     <BarChart
                        data={barData}
                        barWidth={22}
                        barBorderRadius={4}
                        frontColor="#3b82f6"
                        yAxisTextStyle={{color: '#6b7280'}}
                        xAxisTextStyle={{color: '#6b7280'}}
                     />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#f3f4f6' },
    container: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
    header: { marginBottom: 20 },
    headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#111827' },
    card: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5 },
    cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 15 },
    pieChartContainer: { alignItems: 'center' }
});

export default AnalyticsScreen;
