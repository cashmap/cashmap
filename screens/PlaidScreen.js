import React, { Component } from "react";
import PlaidAuthenticator from "react-native-plaid-link";
import firebase from "firebase";
import { AppNavigator } from "../App";

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
      status: ""
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


        console.log('RESULT::::::', result.data.access_token);
        //
        const {
          data: getTransResult,
        } = await firebase.functions().httpsCallable('getTrans')({
          access_token: result.data.access_token,
        });

        console.log('getTrans RESULT::::::', getTransResult);

      } catch (error) {
        console.log(error);
      }
    }
  };
  render() {
    // const {navigate} = this.props.navigation;
    return (
      <PlaidAuthenticator
        onMessage={this.onMessage}
        publicKey="24f3ac429bf9317300cffa9d81e452"
        env="sandbox"
        product="auth,transactions"
        clientName="CashMap"
        selectAccount={false}
      />
      // <Button title="Map" onPress={() => navigate('DashboardScreen')} />
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
