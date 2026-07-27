import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from './types'
import GoogleSignInScreen from '../screens/auth/GoogleSignInScreen'
import BottomTabNavigator from './BottomTabNavigator'

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthenticationRoute = () => {
    return (
        <Stack.Navigator initialRouteName="MainTabs">
            <Stack.Screen 
                name="MainTabs" 
                component={BottomTabNavigator} 
                options={{ headerShown: false }} 
            />
            <Stack.Screen 
                name="GoogleSignInScreen" 
                component={GoogleSignInScreen} 
                options={{ headerShown: false }} 
            />
        </Stack.Navigator>
    )
}

export default AuthenticationRoute