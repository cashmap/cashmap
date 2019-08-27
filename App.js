import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FirebaseWrapper } from './firebase/firebase';
import { firebaseConfig } from './firebase/config';
import {
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
} from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';
import DashboardScreen from './screens/DashboardScreen';
import PlaidScreen from './screens/PlaidScreen';
import MapScreen from './screens/Map';
import PieChart from './screens/PieChart';
import FusionBar from './screens/FusionBar';
import { AppRegistry, Dimensions } from 'react-native';
import ContentComponent from './screens/contentComponent';

const AppDrawerNavigator = createDrawerNavigator(
  {
    LoadingScreen: {
      screen: LoadingScreen,
    },
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: { drawerLockMode: 'locked-closed' },
    },
    PlaidScreen: {
      screen: PlaidScreen,
      navigationOptions: { drawerLockMode: 'locked-closed' },
    },
    DashboardScreen: {
      screen: DashboardScreen,
    },
    FusionBar: {
      screen: FusionBar,
    },
    PieChart: {
      screen: PieChart,
    },
  },
  {
    initialRouteName: 'LoadingScreen',
    contentComponent: ContentComponent,
    drawerWidth: Dimensions.get('window').width,
    drawerPosition: 'left',
    drawerBackgroundColor: 'transparent',
  }
);

const AppDrawerNav = createAppContainer(AppDrawerNavigator);

export default class App extends Component {
  render() {
    FirebaseWrapper.GetInstance().Initialize(firebaseConfig);
    return <AppDrawerNav />;
  }
}

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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
