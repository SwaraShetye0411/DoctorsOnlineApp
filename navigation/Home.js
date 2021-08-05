import React, {useState,useEffect} from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import FirstPage from '../pages/FirstPage';
import Symptoms from '../pages/Symptoms';
import DoctorsPage from '../pages/DoctorsPage';
import Chat from '../pages/Chat';
import Tabs from './Tabs';

const Stack = createStackNavigator();

const Home = () => {
    return (
        <Stack.Navigator
                initialRouteName={"Tabs"}
                screenOptions={{
                    headerShown:false
                }}
            >
            <Stack.Screen 
                name="Tabs" 
                component={Tabs}
            />
            <Stack.Screen 
                name="Symptoms"
                component={Symptoms}
            />
            <Stack.Screen 
                name="DoctorsPage"
                component={DoctorsPage}
            />
            <Stack.Screen 
                name="Chat"
                component={Chat}
            />
            </Stack.Navigator>
    )
}

export default Home
