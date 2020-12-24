import React from 'react';
import {
    useColorScheme,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import HomeStack from './HomeStack';

// import SearchScreen from '../screens/SearchScreen';
import FilterScreen from '../screens/FilterScreen';

import SignInScreen from '../screens/SignInScreen';
import ForgetPwdScreen from '../screens/ForgetPwdScreen';
import RegisterScreen from '../screens/RegisterScreen';

import getThemedColors from '../helpers/Theme';

export default function MainStack() {
    const colors = getThemedColors(useColorScheme())
    return (
        <Stack.Navigator
            initialRouteName="HomeStack"
            screenOptions={{ 
                gestureEnabled: false,

            }}
            mode='modal'
            headerMode='none'
        >
            <Stack.Screen
                name="HomeStack"
                component={HomeStack}
            />
            <Stack.Screen name="Filter">
                {props => <FilterScreen {...props} apColors={colors}/>}
            </Stack.Screen>
            {/*<Stack.Screen name="Search">
                {props => <SearchScreen {...props} apColors={colors}/>}
            </Stack.Screen>*/}
            <Stack.Screen name="SignIn">
                {props => <SignInScreen {...props} apColors={colors}/>}
            </Stack.Screen>
            <Stack.Screen name="ForgetPwd">
                {props => <ForgetPwdScreen {...props} apColors={colors}/>}
            </Stack.Screen>
            <Stack.Screen name="Register">
                {props => <RegisterScreen {...props} apColors={colors}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
}