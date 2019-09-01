import React, { Component } from "react";
import { SectionGrid } from "react-native-super-grid";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Button,
  Text
} from "react-native";
export default class Grid extends Component {
  render() {
    return (
      <SectionGrid
        itemDimension={130}
        sections={[
          {
            title: "Numbers",
            data: [1, 2, 3, 4, 5, 6]
          },
          {
            title: "Albhabets",
            data: ["A", "B", "C", "D", "E"]
          }
        ]}
        renderItem={({ item }) => <Text>{item}</Text>}
        renderSectionHeader={({ section }) => (
          <Text style={{ fontSize: 20 }}>{section.title}</Text>
        )}
      />
    );
  }
}
