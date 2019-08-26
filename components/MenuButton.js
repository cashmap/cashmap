import React, { Component } from "react";
import { StyleSheet, Platform, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { toggleDrawer } from "react-navigation";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class MenuButton extends Component {
  render() {
    return (
      <View style={styles.menuIcon}>
        <Ionicons
          name="md-menu"
          color="#000000"
          size={25}
          style={styles.icon}
          onPress={() => this.props.navigation.toggleDrawer()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menuIcon: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9,
    width: 40,
    height: 40,
    borderRadius: 20,
    position: "absolute",
    top: 40,
    left: 20,
    shadowColor: "black",
    borderColor: "white",
    backgroundColor: "white",
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.5
  }
});
