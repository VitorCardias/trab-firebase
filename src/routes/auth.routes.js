import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '../pages/login';
import SignUp from '../pages/cadastro';

const AuthStack = createNativeStackNavigator();

function AuthRoutes() {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                name="Login"
                component={SignIn}
                options={{
                    headerShown: false,
                }}
            />
            <AuthStack.Screen
                name="Cadastro"
                component={SignUp}
                options={{
                    headerShown: false,
                }}
            />
        </AuthStack.Navigator>
    )
}

export default AuthRoutes;