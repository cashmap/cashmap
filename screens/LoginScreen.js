import React, { Component } from "react";
import Expo from "expo";
// import { Google } from "expo";
import * as Google from "expo-google-app-auth";
import firebase from "firebase";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button
} from "react-native";

class LoginScreen extends Component {
  isUserEqual = (googleUser, firebaseUser) => {
    console.log("isUserEqual Ran");
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };
  onSignIn = googleUser => {
    console.log("on sign in Ran");
    console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function(firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(function(result) {
              console.log("googleUser.user: ", googleUser.user);
              if (result.additionalUserInfo.isNewUser) {
                firebase
                  .firestore()
                  .collection("users")
                  .doc(googleUser.user.id)
                  .set({
                    gmail: googleUser.user.email,
                    profile_picture: googleUser.user.photoUrl,
                    first: googleUser.user.givenName,
                    last_name: googleUser.user.familyName,
                    created_at: Date.now(),
                    id: result.user.uid
                  })
                  .then(function(snapshot) {
                    console.log("Snapshot", snapshot);
                  });
              } else {
                firebase
                  .firestore()
                  .collection("users")
                  .doc(googleUser.user.id)
                  .update({
                    last_logged_in: Date.now()
                  });
              }
            })
            .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
              console.log(error);
            });
        } else {
          console.log("User already signed-in Firebase.");
        }
      }.bind(this)
    );
  };

  signInWithGoogleAsync = async () => {
    try {
      console.log("davey wavey");
      const result = await Google.logInAsync({
        // androidClientId: YOUR_CLIENT_ID_HERE,
        behavior: "web",
        iosClientId:
          "852373338559-hruf8q1h26u6s3lpmuhiu7ob30o1273n.apps.googleusercontent.com",
        androidClientId:
          "852373338559-lufn0g0ebig1b0mqk29e6e9l6bimccqo.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });
      console.log(result);
      if (result.type === "success") {
        this.onSignIn(result);
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
