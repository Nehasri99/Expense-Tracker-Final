import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Feather';

// Screens
import HomeScreen from '../screens/HomeScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import AddTransactionScreen from '../screens/AddTransactionScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Placeholder for unbuilt screens
const PlaceholderScreen = () => null;

const AppNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') iconName = 'home';
                    else if (route.name === 'Analytics') iconName = 'bar-chart-2';
                    else if (route.name === 'Add') iconName = 'plus-circle';
                    else if (route.name === 'Categories') iconName = 'grid';
                    else if (route.name === 'Settings') iconName = 'settings';

                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#3b82f6',
                tabBarInactiveTintColor: '#6b7280',
                headerShown: false,
                tabBarStyle: { backgroundColor: '#fff', borderTopWidth: 0, elevation: 10 },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Analytics" component={AnalyticsScreen} />

            <Tab.Screen
                name="Add"
                component={PlaceholderScreen} // keep placeholder here
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        e.preventDefault();
                        navigation.navigate('AddTransactionModal');
                    },
                })}
            />

            <Tab.Screen name="Categories" component={PlaceholderScreen} />
            <Tab.Screen name="Settings" component={PlaceholderScreen} />
        </Tab.Navigator>
    );
};

const RootNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="MainApp" component={AppNavigator} />
                <Stack.Screen
                    name="AddTransactionModal"
                    component={AddTransactionScreen}
                    options={{ presentation: 'modal' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;
