import React, { Component } from "react";
import {
  StyleSheet,
  Platform,
  View,
  TouchableHighlight,
  Text
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { toggleDrawer } from "react-navigation";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class MenuHeader extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.buttonText}>TouchableHighlight</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "black",
    height: 10
  },

  buttonText: {
    color: "white",
    fontSize: 18
  }
});
