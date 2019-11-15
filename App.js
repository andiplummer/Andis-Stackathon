import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState, Component } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { firebaseConfig } from './firebase/config'

import { FirebaseWrapper } from './firebase/firebase';
import { createSwitchNavigator, createAppContainer, createDrawerNavigator, createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import WelcomeScreen from './screens/WelcomeScreen'
import DashboardScreen from './screens/DashboardScreen'
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen'
import Categories from './components/Categories';
import {Grocery} from './components/Grocery'
import {Add} from './components/Add'
import {Recipes} from './components/Recipes'
import LogoutScreen from './screens/LogoutScreen';

export default class App extends Component {
  render() {
    FirebaseWrapper.GetInstance().Initialize(firebaseConfig)
    return (
      <AppContainer />
    )
  }
}


const DashboardTabNavigator = createBottomTabNavigator({
  Recipes,
  Add,
  Grocery,
}, {
  navigationOptions: ({ navigation }) => {
    const {routeName} = navigation.state.routes[navigation.state.index]
    return {
      headerTitle: routeName
    }
  }
})

const DashboardStackNavigator = createStackNavigator({
  DashboardTabNavigator: DashboardTabNavigator
}, {
  defaultNavigationOptions: ({navigation}) => {
    return {
      headerRight: (
        <Icon name='md-menu' 
          size={30} 
          style={{ paddingRight: 10 }}
          onPress={() => navigation.openDrawer()}
        />
      )
    }
  }
})

const AppDrawerNavigator = createDrawerNavigator({
  Home: { screen: DashboardStackNavigator },
  Logout: { screen: LogoutScreen } 
}, {
  drawerPosition: 'right'
})

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: {screen: WelcomeScreen},
  Login: {screen: LoginScreen},
  Signup: SignUpScreen,
  Dashboard: AppDrawerNavigator
})

const AppContainer = createAppContainer(AppSwitchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
