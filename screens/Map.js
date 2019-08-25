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
export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      status: ""
    };
  }
  componentDidMount() {
    if (this.props.transactions) {
      console.log("Map.js Props", this.props.transactions[0].name);
    }
  }

  render() {
    if (this.props.transactions) {
      console.log("rendering props: ", this.props);
      return (
        <View style={styles.container}>
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
              description={this.props.transactions[0].name}
            />
          </MapView>
          <Button title="Sign Out" onPress={() => firebase.auth().signOut()} />
        </View>
      );
    } else {
      return <View />;
    }
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
