import React, { Component } from "react";
import firebase from "firebase";
import PlaidAuthenticator from "react-native-plaid-link";
import PlaidScreen from "./PlaidScreen";
import {
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator
} from "react-navigation";

import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button
} from "react-native";

export default class DashboardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      status: ""
    };
  }
  onMessage = data => {
    this.setState({ data });
  };
  render() {
    return (
      <View style={styles.container}>
        <PlaidAuthenticator
          onMessage={this.onMessage}
          publicKey="24f3ac429bf9317300cffa9d81e452"
          env="sandbox"
          product="auth,transactions"
          clientName="CashMap"
          selectAccount={false}
        />
        <Button title="Sign Out" onPress={() => firebase.auth().signOut()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
