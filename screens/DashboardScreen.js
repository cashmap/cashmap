import React, { Component } from "react";
import firebase from "firebase";
import MapView from "react-native-maps";
import PlaidAuthenticator from "react-native-plaid-link";

import PlaidScreen from "./PlaidScreen";
import {
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  NavigationEvents
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
        <MapView
          style={styles.map}
          region={{
            latitude: 40.705307,
            longitude: -74.009088,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          }}
        >
          <MapView.Marker
            coordinate={{ latitude: 40.705307, longitude: -74.009088 }}
            title={"Fullstack"}
            description={"Academy of Code"}
          />
        </MapView>

        <Button title="Sign Out" onPress={() => firebase.auth().signOut()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end", //center
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
