
import React, { Component } from 'react';
import firebase from 'firebase';
import MapView from 'react-native-maps';
import PlaidAuthenticator from 'react-native-plaid-link';
import PlaidScreen from './PlaidScreen';
const education = require('../assets/education.png');

import {
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  NavigationEvents
} from "react-navigation";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button
} from "react-native";
export default class Map extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     data: "",
  //     status: ""
  //   };
  // }
  componentDidMount() {
    if (this.props.transactions) {
      for (let i = 0; i < this.props.transactions.length; i++) {
        console.log(
          'transaction category: ',
          this.props.transactions[i].category
        );
        // console.log('transaction amount: ', this.props.transactions[i].amount);
      }

    }
  }
  onNavigate = () => {
    this.props.navigation.navigate('FusionBar');
  };

  render() {

    // if (this.props.transactions) {

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: 40.705307,
            longitude: -74.009088,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          <MapView.Marker
            coordinate={{ latitude: 40.705307, longitude: -74.009088 }}
            title={'Fullstack'}
            image={education}
            style={styles.marker}
            description={this.props.transactions[0].name}
          />
        </MapView>
        <Button
          title="Pie"
          onPress={() => this.props.navigation.navigate('PieChart')}
        />
        <Button title="Bar Chart" onPress={() => this.onNavigate()} />
        <Button title="Sign Out" onPress={() => firebase.auth().signOut()} />
      </View>
    );
    // } else {
    //   return <View />;
    // }

  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end", //center
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,

    right: 0,
  },
  marker: {
    width: 40,
    height: 40,
  },

});
