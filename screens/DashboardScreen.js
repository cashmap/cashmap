import React from "react";
import firebase from "firebase";
import PlaidAuthenticator from "react-native-plaid-link";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button
} from "react-native";

export default function DashboardScreen() {
  this.state = {
    data: "",
    status: ""
  };
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

onMessage = data => {
  this.setState({ data });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
