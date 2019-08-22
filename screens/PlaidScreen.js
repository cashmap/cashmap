import React, { Component } from "react";
import { connect } from "react-redux";
import { setAccessToken } from "../redux/reducers/index";
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
        this.props.setAccessTokens(data.metadata.access_token);

        console.log(
          "RESULT::::::",
          result.data.access_token,
          ":::::::::::END::::::::::"
        );
        //
        const {
          data: getTransResult
        } = await firebase.functions().httpsCallable("getTrans")({
          access_token: result.data.access_token
        });
        if (getTransResult) {
          this.props.navigation.navigate("DashboardScreen");
          this.setState({ transactions: getTransResult });
          console.log("TRANSACTIONS::::::", state.transactions);
        }
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

const mapStateToProps = state => {
  return {
    accessToken: state.accessToken
  };
};
const mapStateToDispatch = dispatch => {
  return {
    setAccessTokens: token => {
      dispatch(setAccessToken(token));
    }
  };
};

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(PlaidScreen);
