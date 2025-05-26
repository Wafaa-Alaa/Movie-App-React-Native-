import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomePage from './HomePage';
import MovieDetailsPage from './task/MovieDetailsPage';

const Stack = createNativeStackNavigator();

const HomeDetailPage = () => {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#121212',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                contentStyle: {
                    backgroundColor: '#121212',
                }
            }}
        >
            <Stack.Screen
                name="Home"
                component={HomePage}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="MovieDetails"
                component={MovieDetailsPage}
                options={{
                    headerBackTitleVisible: false
                }}
            />
        </Stack.Navigator>
    );
}

export default HomeDetailPage;