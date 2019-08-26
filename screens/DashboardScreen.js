import React, { Component } from "react";
import firebase from "firebase";
import { Icon } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import PlaidAuthenticator from "react-native-plaid-link";
import getTransResult from "./PlaidScreen";
import Map from "./Map";
import MenuButton from "../components/MenuButton";
const mapStyle = require("./jsons/darkmap");

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
      status: "",
      accesstoken: "",
      transactions: {}
    };
  }

  async componentDidMount() {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.providerData[0].uid)
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          let userAccessToken = doc.data().accesstoken;
          this.setState({
            accesstoken: userAccessToken
          });
          console.log(this.state.accesstoken);
          this.transGetter();
        }
      })
      .catch(err => {
        console.log("Error getting document", err);
      });
  }

  async transGetter() {
    const { data: getTransResult } = await firebase
      .functions()
      .httpsCallable("getTrans")({
      access_token: this.state.accesstoken
    });
    console.log("getTrans is Running!");
    if (getTransResult) {
      this.setState({ transactions: getTransResult });

      console.log(
        "Dashboard Screen Transactions",
        this.state.transactions.transactions[0].name
      );
    }
  }

  render() {
    if (this.state.transactions.transactions) {
      return (
        <View style={styles.container}>
          <MenuButton navigation={this.props.navigation} />

          <Map
            provider={PROVIDER_GOOGLE}
            customMapStyle={mapStyle}
            transactions={this.state.transactions.transactions}
            navigation={this.props.navigation}
          />
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
