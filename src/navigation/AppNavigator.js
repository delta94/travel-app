import React from 'react';
import {
	useColorScheme,
} from 'react-native';
import { 
	NavigationContainer,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { navigationRef } from '../helpers/NavigationService';
const Tab = createBottomTabNavigator();

import MainStack from './MainStack';

import BookingsStack from './BookingsStack';
import BookmarksStack from './BookmarksStack';
import ProfileStack from './ProfileStack';

import {translate} from "../helpers/i18n";
import TextRegular from '../components/ui/TextRegular';

import getThemedColors from '../helpers/Theme';

import {ExploreSvg,BookingsSvg,BookmarksSvg,ProfileSvg} from '../components/icons/TabbarSvgIcons';

import { useDispatch, useSelector } from "react-redux";


function AppNavigator (){

  	// const app = useSelector(state => state.app);
  	const user = useSelector(state => state.user);
  	const {isLoggedIn} = user
  	const colors = getThemedColors(useColorScheme())
  	return (
	    <NavigationContainer ref={navigationRef}>
    		<Tab.Navigator
    			screenOptions={ ({ route }) => {
    				let tabBarVisible = true;
    				return {
    					tabBarVisible
    				}
    			} }
				tabBarOptions={colors.tabBarColors}
    		>
		        <Tab.Screen name="MainStack" component={MainStack} 
					options={({ route })=>{

						let tabBarVisible = true;
						if( null != route.state && null != route.state.index ){
							const {routes,index} = route.state;
							const childRoute = routes[index]
							if( null != childRoute.state && null != childRoute.state.index ){
								if( childRoute.state.index > 0 ){
									tabBarVisible = false;
								}else{
									if( null != childRoute.state.index && null != childRoute.state.routes ){
										if( 'Home' === childRoute.state.routes[childRoute.state.index]['name'] && null != childRoute.state.routes[childRoute.state.index]['params'] && null != childRoute.state.routes[childRoute.state.index]['params']['hideTabBar'] && true === childRoute.state.routes[childRoute.state.index]['params']['hideTabBar'] ){
						                    tabBarVisible = false;
						                }
									}
								}
							}
							if( index > 0 ) tabBarVisible = false;
							
						}
							
						return {
							tabBarIcon: ({ color }) => {
								return <ExploreSvg color={color}/>;
							},
							tabBarLabel: ({ color }) => {
								return <TextRegular style={{fontSize: 13,color:color}}>{translate('explore')}</TextRegular>
							},
							tabBarVisible
						}
					}}
		        />
		        <Tab.Screen name="BookingsStack" component={BookingsStack} 
					options={({ route })=>{
						let tabBarVisible = true;
						if( null != route.state && null != route.state.index ){
							const {routes,index} = route.state;
							if( index > 0 ) tabBarVisible = false;
							// show tab on bookings screen only
							const childRoute = routes[index]
							if( tabBarVisible && null != childRoute.name && 'Bookings' != childRoute.name ){
								tabBarVisible = false;
							}
						}
						// for login screen
						if( tabBarVisible && null == route.state && isLoggedIn == false ) tabBarVisible = false;
						return {
							tabBarIcon: ({ color }) => {
								return <BookingsSvg color={color}/>;
							},
							tabBarLabel: ({ color }) => {
								return <TextRegular style={{fontSize: 13,color:color}}>{translate('mybookings')}</TextRegular>
							},
							tabBarVisible
						}
					}}
		        />
		        <Tab.Screen name="BookmarksStack" component={BookmarksStack} 
					options={({ route })=>{
						let tabBarVisible = true;
						if( null != route.state && null != route.state.index ){
							const {routes,index} = route.state;
							if( index > 0 ) tabBarVisible = false;
							// show tab on bookings screen only
							const childRoute = routes[index]
							if( tabBarVisible && null != childRoute.name && 'Bookmarks' != childRoute.name ){
								tabBarVisible = false;
							}
							
							
						}
						if( tabBarVisible && null == route.state && isLoggedIn == false ) tabBarVisible = false;
						return {
							tabBarIcon: ({ color }) => {
								return <BookmarksSvg color={color}/>;
							},
							tabBarLabel: ({ color }) => {
								return <TextRegular style={{fontSize: 13,color:color}}>{translate('bookmarksTab')}</TextRegular>
							},
							tabBarVisible
						}
					}}
		        />
		        <Tab.Screen name="ProfileStack" component={ProfileStack} 
					options={({ route })=>{
						let tabBarVisible = true;
						if( null != route.state && null != route.state.index ){
							const {routes,index} = route.state;
							const childRoute = routes[index]
							
							// fix for chat then profile
							if( 'Profile' != childRoute.name ){
								// if( index > 0 ) 
									tabBarVisible = false;
							}
							
							// show tab on profile screen only
							
							// if( tabBarVisible && null != childRoute.name && 'Profile' != childRoute.name ){
							// 	tabBarVisible = false;
							// }
							
							
						}
						
						// sign in
						if( tabBarVisible && null == route.state ){
							if( isLoggedIn == false ){
								tabBarVisible = false;
							}else if( null != route.params && null != route.params.params && null != route.params.params.fromListing && route.params.params.fromListing ){
								tabBarVisible = false;
							}
							
						}
						return {
							tabBarIcon: ({ color }) => {
								return <ProfileSvg color={color}/>;
							},
							tabBarLabel: ({ color }) => {
								return <TextRegular style={{fontSize: 13,color:color}}>{translate('profileMenu')}</TextRegular>
							},
							tabBarVisible
						}
					}}
		        />
      		</Tab.Navigator>
    	</NavigationContainer>
  	);
};

export default AppNavigator;
