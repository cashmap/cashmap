import React, { Component } from "react";
import PlaidAuthenticator from "react-native-plaid-link";
import firebase from "firebase";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button
} from "react-native";

class PlaidScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      status: "",
      transactions: {}
    };
  }

  onMessage = async data => {
    // console.log('DATA:::::', data.metadata.public_token);
    this.setState({ data });

    if (data && data.metadata && data.metadata.public_token) {
      try {
        console.log("DATA:::::", data.metadata.public_token);
        const result = await firebase.functions().httpsCallable("exchange")({
          public_token: data.metadata.public_token
        });

        console.log("RESULT::::::", result.data.access_token);
        let currentUser = firebase.auth().currentUser;

        if (result.data.access_token) {
          firebase
            .firestore()
            .collection("users")
            .doc(currentUser.providerData[0].uid)
            .update({
              accesstoken: result.data.access_token
            });
          this.props.navigation.navigate("DashboardScreen");
        }
        console.log("plaid screen says: ", firebase.auth().currentUser);
      } catch (error) {
        console.log(error);
      }
    }
  };
  render() {
    return (
      <PlaidAuthenticator
        onMessage={this.onMessage}
        publicKey="24f3ac429bf9317300cffa9d81e452"
        env="sandbox"
        product="auth,transactions"
        clientName="CashMap"
        selectAccount={false}
      />
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

export default PlaidScreen;
