import React from "react";
import { View, Button, Text, Dimensions } from "react-native";

import SlidingUpPanel from "rn-sliding-up-panel";

export default class MapFilters extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SlidingUpPanel
          ref={c => (this._panel = c)}
          draggableRange={{ top: height / 1.75, bottom: 120 }}
          animatedValue={this._draggedValue}
          showBackdrop={false}
        >
          <View style={styles.panel}>
            <View style={styles.panelHeader}>
              <Text style={{ color: "#FFF" }}>Filters</Text>
            </View>
            <View style={styles.container}>
              <Text>Bottom Sheet Content</Text>
            </View>
          </View>
        </SlidingUpPanel>
      </View>
    );
  }
}

const { height } = Dimensions.get("window");

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  panel: {
    flex: 1,
    backgroundColor: "white",
    position: "relative"
  },
  panelHeader: {
    height: 120,
    backgroundColor: "#b197fc",
    alignItems: "center",
    justifyContent: "center"
  },
  favoriteIcon: {
    position: "absolute",
    top: -24,
    right: 24,
    backgroundColor: "#2b8a3e",
    width: 48,
    height: 48,
    padding: 8,
    borderRadius: 24,
    zIndex: 1
  }
};
