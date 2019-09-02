import React from "react";
import { Text, View, Dimensions, Animated } from "react-native";

import SlidingUpPanel from "rn-sliding-up-panel";

const { height } = Dimensions.get("window");

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center"
  },
  panel: {
    flex: 1,
    backgroundColor: "white",
    position: "relative"
  },
  panelHeader: {
    height: 50,
    backgroundColor: "#b197fc",
    justifyContent: "flex-end",
    padding: 24
  },
  textHeader: {
    fontSize: 28,
    color: "#FFF"
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -24,
    right: 18,
    width: 48,
    height: 48,
    zIndex: 1
  },
  iconBg: {
    backgroundColor: "#2b8a3e",
    position: "absolute",
    top: -24,
    right: 18,
    width: 48,
    height: 48,
    borderRadius: 24,
    zIndex: 1
  }
};

class SliderScreen extends React.Component {
  static defaultProps = {
    draggableRange: { top: height + 10 - 64, bottom: 30 }
  };

  _draggedValue = new Animated.Value(180);

  render() {
    return (
      <View style={styles.container}>
        <Text onPress={() => this._panel.show(360)}>Show panel</Text>
        <SlidingUpPanel
          ref={c => (this._panel = c)}
          draggableRange={this.props.draggableRange}
          animatedValue={this._draggedValue}
          snappingPoints={[10]}
          height={height + 10}
          friction={0.5}
        >
          <View style={styles.panel}>
            <View style={styles.panelHeader}>
              <Text style={styles.textHeader}>Sliding Up Panel</Text>
            </View>
            <View style={styles.container}>
              <Text>Bottom sheet content</Text>
            </View>
          </View>
        </SlidingUpPanel>
      </View>
    );
  }
}

export default SliderScreen;
