import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FirebaseWrapper } from "./firebase/firebase";
import { firebaseConfig } from "./firebase/config";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import LoginScreen from "./screens/LoginScreen";
import LoadingScreen from "./screens/LoadingScreen";
import DashboardScreen from "./screens/DashboardScreen";
import PlaidScreen from "./screens/PlaidScreen";

export default class App extends Component {
  render() {
    FirebaseWrapper.GetInstance().Initialize(firebaseConfig);
    return <AppNavigator />;
  }
}

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  DashboardScreen: DashboardScreen,
  PlaidScreen: PlaidScreen
});

const AppNavigator = createAppContainer(AppSwitchNavigator);

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
