import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthenticationRoute from './AuthenticationRoute'

const Route = () => {
    return (
        <NavigationContainer>
            <AuthenticationRoute />
        </NavigationContainer>
    )
}

export default Route
