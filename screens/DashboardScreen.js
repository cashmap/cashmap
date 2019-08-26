import React, { Component } from "react";
import firebase from "firebase";
import { Icon } from "react-native";
import MapView from "react-native-maps";
import PlaidAuthenticator from "react-native-plaid-link";
import getTransResult from "./PlaidScreen";
import Map from "./Map";
import MenuButton from "../components/MenuButton";

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
      access_token: this.state.accesstoken,
      start_date: "2017-01-01",
      end_date: "2019-01-01"
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
    console.log(
      "this.state.transactions.transactions",
      this.state.transactions
    );
    if (this.state.transactions.transactions) {
      console.log("if");

      return (
        <View style={styles.container}>
          <Text>Josh</Text>
          <MenuButton navigation={this.props.navigation} />

          <Map
            transactions={this.state.transactions.transactions}
            navigation={this.props.navigation}
          />
        </View>
      );
    } else {
      console.log("else");
      return <View style={{ backgroundColor: "red" }}></View>;
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
