import React, {useState,useEffect} from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import PhoneOtp from '../pages/PhoneOtp';
import SignUp from '../pages/SignUp';
import EmailLogin from '../pages/EmailLogin';

const Stack = createStackNavigator();

const LoginPageNavigation = () => {
    return (
        <Stack.Navigator
                initialRouteName={"PhoneOtp"}
                screenOptions={{
                    headerShown:false
                }}
            >
            <Stack.Screen 
                name="PhoneOtp" 
                component={PhoneOtp}
            />
            <Stack.Screen 
                name="EmailLogin" 
                component={EmailLogin}
            />
            <Stack.Screen 
                name="SignUp"
                component={SignUp}
            />
            </Stack.Navigator>
    )
}

export default LoginPageNavigation
