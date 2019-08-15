import React, { Component } from "react";
import Expo from "expo";
// import { Google } from "expo";
import * as Google from "expo-google-app-auth";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button
} from "react-native";

class LoginScreen extends Component {
  signInWithGoogleAsync = async () => {
    try {
      console.log("davey wavey");
      const result = await Google.logInAsync({
        // androidClientId: YOUR_CLIENT_ID_HERE,
        behavior: "web",
        iosClientId:
          "852373338559-hruf8q1h26u6s3lpmuhiu7ob30o1273n.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });
      console.log(result.user);
      if (result.type === "success") {
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Sign In With Google"
          onPress={() => this.signInWithGoogleAsync()}
        />
      </View>
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
