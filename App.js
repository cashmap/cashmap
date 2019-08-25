import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FirebaseWrapper } from "./firebase/firebase";
import { firebaseConfig } from "./firebase/config";
import {
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator
} from "react-navigation";
import LoginScreen from "./screens/LoginScreen";
import LoadingScreen from "./screens/LoadingScreen";
import DashboardScreen from "./screens/DashboardScreen";
import PlaidScreen from "./screens/PlaidScreen";
import MapScreen from "./screens/Map";
import { AppRegistry, Dimensions } from "react-native";

export default class App extends Component {
  render() {
    FirebaseWrapper.GetInstance().Initialize(firebaseConfig);
    return <AppDrawerNav />;
  }
}
const AppDrawerNavigator = createDrawerNavigator({
  Loading: {
    screen: LoadingScreen
  },
  LoginScreen: {
    screen: LoginScreen
  },
  DashboardScreen: {
    screen: DashboardScreen
  },
  PlaidScreen: {
    screen: PlaidScreen
  },
  MapScreen: {
    screen: MapScreen
  }
});

const AppDrawerNav = createAppContainer(AppDrawerNavigator);

// const AppSwitchNavigator = createSwitchNavigator({
//   LoadingScreen: LoadingScreen,
//   LoginScreen: LoginScreen,
//   DashboardScreen: DashboardScreen,
//   PlaidScreen: PlaidScreen,
//   MapScreen: MapScreen
// });

// const AppNavigator = createAppContainer(AppSwitchNavigator);

// const AppDrawerNavigator = createDrawerNavigator({
//   PlaidScreen: PlaidScreen
// });
// const Apps = createAppContainer(AppDrawerNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
