import React, { Component } from 'react';
import PlaidAuthenticator from 'react-native-plaid-link';
import firebase from 'firebase';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
} from 'react-native';

class PlaidScreen extends Component() {
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

onMessage = data => {
  this.setState({ data });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PlaidScreen;