import 'react-native-gesture-handler';

import React, { useState } from 'react';
import { 
    Platform, 
    StatusBar, 
    StyleSheet, 
    View, 
    Text,
    Image,
    BackHandler ,
    Appearance,
    LogBox
} from 'react-native';

// Ignore log notification by message:
LogBox.ignoreLogs([
  'Calling `getNode()` on the ref of an Animated component is no longer necessary. You can now directly use the ref instead.',
]);
// Ignore all log notifications:
// LogBox.ignoreAllLogs();

import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import SiteDetails from './src/constants/SiteDetails';

axios.defaults.baseURL = `${SiteDetails.url}/wp-json/cththemes/v1/listings`;
axios.defaults.headers.common['Authorization'] = SiteDetails.app_key;

// redux
import { Provider } from 'react-redux';
import store from './src/store';
// localization config
import getThemedColors from './src/helpers/Theme';

import {setI18nConfig} from './src/helpers/i18n';
import { getSiteDatas, getCurrencyAttrs } from './src/helpers/store';
import { getUserDatas, getLanguageAsync } from './src/helpers/user';


// navigations
import AppNavigator from './src/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default class App extends React.Component{
    constructor(props){
        super(props)
        getLanguageAsync().then(lang => {
            if( null != lang.code && lang.rtl != null )
                setI18nConfig(lang.code, lang.rtl); // set initial config
            else
                setI18nConfig(); // set initial config
        });
        this.state = { isLoading: true, theme: Appearance.getColorScheme() }
    }
    performTimeConsumingTask = async() => {
        return await Promise.all([
            getUserDatas(),
            getCurrencyAttrs(),
            getSiteDatas(),
        ]);
    }
    async componentDidMount() {
        
        // Preload data from an external API
        // Preload data using AsyncStorage
        const data = await this.performTimeConsumingTask();
        if (data !== null) {
            this.setState({ isLoading: false });
        }

        // RNLocalize.addEventListener("change", this.handleLocalizationChange);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        Appearance.addChangeListener(this._handleAppearanceChange);
    }
    componentWillUnmount() {
        // RNLocalize.removeEventListener("change", this.handleLocalizationChange);
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        Appearance.removeChangeListener(this._handleAppearanceChange);
    }
    _handleAppearanceChange = (preferences) => {
        
        if( null != preferences && null != preferences.colorScheme ){
            this.setState({theme: preferences.colorScheme});
        }
    }
    handleBackButton() {
        return false;
        if ( null != this.props.navigation && !this.props.navigation.isFocused()) {
            // The screen is not focused, so don't do anything
            return false;
        }
        if (this.isSelectionModeEnabled()) {
            this.disableSelectionMode();

            // We have handled the back button
            // Return `true` to prevent react-navigation from handling it
            return true;
        } else {
            return false;
        }
    }
    clearAsyncStorage = async () => {
        try {
            await AsyncStorage.clear()
        } catch(e) {
            // clear error
        }
    }
    render() {
        const colors = getThemedColors(this.state.theme)
        return (
            <Provider store={store}>
                <SafeAreaProvider>
                    
                        <View style={[styles.container,{backgroundColor: colors.appBg,}]}>
                        { this.state.isLoading ? 
                            <SplashScreen /> : 
                            <View style={{flex: 1}}>
                                {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                                <AppNavigator/>
                            </View>
                        }
                        </View>
                    
                </SafeAreaProvider>
            </Provider>
        );
    }
}

class SplashScreen extends React.Component {
    render() {
        return (
            <View style={styles.viewStyles}>
                <Image
                    source={require('./assets/images/logo-120.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewStyles: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        marginTop: -50
    },
});

