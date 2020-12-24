import React from 'react';
import {
    useColorScheme,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import BookmarksScreen from '../screens/BookmarksScreen';

import SignInScreen from '../screens/SignInScreen';
import ForgetPwdScreen from '../screens/ForgetPwdScreen';
import RegisterScreen from '../screens/RegisterScreen';

import getThemedColors from '../helpers/Theme';

import {translate} from "../helpers/i18n";

import BackButton from '../components/inners/BackButton';

import { useDispatch, useSelector } from "react-redux";


function BookmarksStack (){

    // const app = useSelector(state => state.app);
    const user = useSelector(state => state.user);
    const {isLoggedIn} = user
    const colors = getThemedColors(useColorScheme())
    return (
        <Stack.Navigator
            initialRouteName="Bookmarks"
            screenOptions={ ({navigation, route }) => {
                return { 
                    gestureEnabled: false,
                    // headerLeft: () => {
                    //     return <BackButton isBlack={true} onPress={navigation.goBack} style={{marginLeft: 10}}/>;
                    // },
                    headerStyle: colors.headerNavStyle,
                    headerTitleStyle: colors.headerTitleStyle,
                    headerTitleAlign: 'center',
                }
            } }
        >
            { isLoggedIn ? <>
                <Stack.Screen name="Bookmarks" options={ {title: translate('bm_screen')} }>
                    {props => <BookmarksScreen {...props} apColors={colors}/>}
                </Stack.Screen>

            </> : <>
                <Stack.Screen name="SignIn" options={{ headerShown: false }} initialParams={{ loggedInRoute: 'Bookmarks' }}>
                    {props => <SignInScreen {...props} apColors={colors}/>}
                </Stack.Screen>
                <Stack.Screen name="ForgetPwd" options={{ headerShown: false }}>
                    {props => <ForgetPwdScreen {...props} apColors={colors}/>}
                </Stack.Screen>
                <Stack.Screen name="Register" options={{ headerShown: false }}>
                    {props => <RegisterScreen {...props} apColors={colors}/>}
                </Stack.Screen>

            </> }

                
            
        </Stack.Navigator>
    );
}

export default BookmarksStack;
