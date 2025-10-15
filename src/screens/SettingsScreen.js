import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

const SettingsScreen = () => (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 22, fontWeight: 'bold'}}>Settings Screen</Text>
        <Text>Profile, dark mode, and export options.</Text>
    </SafeAreaView>
);

export default SettingsScreen;
