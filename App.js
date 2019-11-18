import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState, Component } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { firebaseConfig } from "./firebase/config";

import { FirebaseWrapper } from "./firebase/firebase";
import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import WelcomeScreen from "./screens/WelcomeScreen";
import DashboardScreen from "./screens/DashboardScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import Categories from "./components/Categories";
import { Grocery } from "./components/Grocery";
import { Recipes } from "./components/Recipes";
import LogoutScreen from "./screens/LogoutScreen";
import { AddButton } from "./components/AddButton";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import { RecipeForm } from "./components/AddRecipeForm";
import {Profile} from './components/Profile'

import {
  RecipeScreen,
  GroceryScreen,
  FavoriteScreen,
  ProfileScreen,
  AddScreen
} from "./screens/index";
import { SingleRecipe } from "./components/SingleRecipe";
import RecipeCard from "./components/RecipeCard";

export default class App extends Component {
  render() {
    FirebaseWrapper.GetInstance().Initialize(firebaseConfig);
    return <AppContainer />;
  }
}

const RecipeStack = createStackNavigator({
  Recipes: {
    screen: RecipeScreen,
    path: 'recipes',
    navigationOptions: ({ navigation }) => ({
      header: null,
      navigation: navigation
    })
  },
  Recipe: {
    screen: SingleRecipe,
    path: 'recipes/:name',
    navigationOptions: ({ navigation }) => ({
      header: null,
      navigation: navigation
    })
  },
})



const DashboardTabNavigator = createBottomTabNavigator(
  {
    Recipes: {
      screen: RecipeStack,
      path: 'recipes',
      navigationOptions: {
        tabBarIcon: () => <Feather name="home" size={30} />
      }
    },
    // Favorites: {
    //   screen: FavoriteScreen,
    //   navigationOptions: {
    //     tabBarIcon: () => <FontAwesome5 name="heart" size={30} color="black" />
    //   }
    // },
    Add: {
      screen: AddScreen,
      navigationOptions: {
        // tabBarIcon: () => <AddButton />
        tabBarIcon: () => <FontAwesome5 name="plus" size={30} color="black" />
      }
    },
    // Grocery: {
    //   screen: GroceryScreen,
    //   navigationOptions: {
    //     tabBarIcon: () => <Feather name="shopping-cart" size={30} />
    //   }
    // },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: <Feather name="user" size={30} />
      },
    }
  },
  {
    tabBarOptions: {
      showLabel: false
    },
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName
      };
    }
  }
);

const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: DashboardTabNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerRight: (
          <Icon
            name="md-menu"
            size={30}
            style={{ paddingRight: 10 }}
            onPress={() => navigation.openDrawer()}
          />
        )
      };
    }
  }
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    Back: { screen: DashboardStackNavigator },
    Logout: { screen: LogoutScreen }
  },
  {
    drawerPosition: "right"
  }
);

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: { screen: WelcomeScreen },
  Login: { screen: LoginScreen },
  Signup: SignUpScreen,
  Dashboard: AppDrawerNavigator,
});

const AppContainer = createAppContainer(createSwitchNavigator({
  AppSwitchNavigator,
  Recipes: RecipeScreen,
  Recipe: SingleRecipe
}));
