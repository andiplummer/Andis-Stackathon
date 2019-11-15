import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import RecipesScreen from '../screens/RecipesScreen';
import LoginScreen from '../screens/LoginScreen';
import CategoriesScreen from '../screens/CategoriesScreen'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Cuisines: CategoriesScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Cuisines',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios' ? 'ios-folder' : 'md-home'
      }
    />
  ),
};

HomeStack.path = '';

const RecipesStack = createStackNavigator(
  {
    Recipes: RecipesScreen,
  },
  config
);

RecipesStack.navigationOptions = {
  tabBarLabel: 'Recipes',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'} />
  ),
};

RecipesStack.path = '';

const LoginStack = createStackNavigator(
  {
    Login: LoginScreen,
  },
  config
);


LoginStack.navigationOptions = {
  tabBarLabel: 'Login',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
  ),
};

LoginStack.path = '';


const tabNavigator = createBottomTabNavigator({
  HomeStack,
  RecipesStack,
  LoginStack,
});

tabNavigator.path = '';

export default tabNavigator
