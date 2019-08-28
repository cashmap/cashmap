import React, { Component } from "react";
import { StyleSheet, Platform, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { toggleDrawer } from "react-navigation";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class Filter extends Component {
  render() {
    return (
      <View style={this.props.sty}>
        <Ionicons
          name={this.props.icon}
          color="#0d1627"
          size={25}
          style={styles.icon}
          onPress={() => {
            this.props.filter();
          }}
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
    zIndex: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    position: "absolute",
    top: 100,
    left: 20,
    shadowColor: "black",
    borderColor: "white",
    backgroundColor: "white",
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.5
  },
  menuIcon2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    position: "absolute",
    top: 130,
    left: 20,
    shadowColor: "black",
    borderColor: "white",
    backgroundColor: "white",
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.5
  },
  menuIcon3: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    position: "absolute",
    top: 160,
    left: 20,
    shadowColor: "black",
    borderColor: "white",
    backgroundColor: "white",
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.5
  },
  menuIcon4: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    position: "absolute",
    top: 190,
    left: 20,
    shadowColor: "black",
    borderColor: "white",
    backgroundColor: "white",
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.5
  },
  menuIcon5: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    position: "absolute",
    top: 210,
    left: 20,
    shadowColor: "black",
    borderColor: "white",
    backgroundColor: "white",
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.5
  }
});
