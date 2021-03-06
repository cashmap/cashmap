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
import SliderScreen from "./screens/SliderScreen";
import MapScreen from "./screens/Map";
import PieChart from "./screens/PieChart";
import AccountScreen from "./screens/accountScreen";
import FusionBar from "./screens/FusionBar";
import { AppRegistry, Dimensions } from "react-native";
import ContentComponent from "./screens/contentComponent";

const AppDrawerNavigator = createDrawerNavigator(
  {
    LoadingScreen: {
      screen: LoadingScreen
    },
    LoginScreen: {
      screen: LoginScreen
    },
    PlaidScreen: {
      screen: PlaidScreen
      // navigationOptions: { drawerLockMode: "locked-closed" }
    },
    DashboardScreen: {
      screen: DashboardScreen
    },
    AccountScreen: {
      screen: AccountScreen
    },
    FusionBar: {
      screen: FusionBar
    },
    PieChart: {
      screen: PieChart
    },
    SliderScreen: {
      screen: SliderScreen
    }
  },
  {
    initialRouteName: "LoadingScreen",
    contentComponent: ContentComponent,
    drawerWidth: Dimensions.get("window").width,
    drawerPosition: "left",
    drawerBackgroundColor: "transparent"
  }
);

const AppDrawerNav = createAppContainer(AppDrawerNavigator);

export default class App extends Component {
  render() {
    FirebaseWrapper.GetInstance().Initialize(firebaseConfig);
    return <AppDrawerNav />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
