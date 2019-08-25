import React, { Component } from "react";
import { StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { toggleDrawer } from "react-navigation";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class MenuButton extends Component {
  render() {
    return (
      <Ionicons
        name="md-more"
        color="#000000"
        size={32}
        style={styles.menuIcon}
        borderRadius={800}
        onPress={() => this.props.navigation.toggleDrawer()}
      />
    );
  }
}

const styles = StyleSheet.create({
  menuIcon: {
    zIndex: 9,
    position: "absolute",
    top: 40,
    left: 20,
    shadowColor: "black",
    borderColor: "white",
    backgroundColor: "white",
    padding: 15
  }
});
