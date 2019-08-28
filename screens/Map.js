
import React, { Component } from 'react';
import firebase from 'firebase';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import PlaidAuthenticator from 'react-native-plaid-link';
import PlaidScreen from './PlaidScreen';
import { Image } from 'react-native';
const mapIcon = require('../assets/testpin.png');
const mapStyle = require('./jsons/darkmap');

import {
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  NavigationEvents,
} from 'react-navigation';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,

} from 'react-native';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      allLocations: [],
    };
  }

  async componentDidMount() {
    let filteredLocations = this.generateLocations();
    console.log('filteredLocations: ', filteredLocations);
    await this.setState({
      locations: filteredLocations,
      allLocations: filteredLocations,
    });

    console.log('locations state: ', this.state.locations);
  }

  onNavigate = () => {
    this.props.navigation.navigate('FusionBar');
  };

  getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
  }

  generateLocations() {
    return this.props.transactions
      .filter(
        el =>
          el.category[0] === 'Food and Drink' ||
          el.category[0] === 'Shops' ||
          el.category[0] === 'Recreation'
      )
      .map(el => (
        <MapView.Marker
          coordinate={{
            latitude: this.getRandomInRange(40.605, 40.805, 3),
            longitude: this.getRandomInRange(-73.909, -74.109, 3),
          }}
          title={el.name}
          style={styles.marker}
          description={`$${el.amount}`}
          category={el.category[0]}
        >
          <Image source={mapIcon} style={{ height: 24, width: 24 }} />
        </MapView.Marker>
      ));
  }

  shopFilter() {
    let shops = this.state.locations.filter(
      el => el.props.category === 'Shops'
    );
    this.setState({ locations: shops });
  }

  foodFilter() {
    let foods = this.state.locations.filter(
      el => el.props.category === 'Food and Drink'
    );
    this.setState({ locations: foods });
  }

  recFilter() {
    let recs = this.state.locations.filter(
      el => el.props.category === 'Recreation'
    );
    this.setState({ locations: recs });
  }

  reset() {
    this.setState({ locations: this.state.allLocations });
  }

  render() {
    // if (this.props.transactions) {

    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          customMapStyle={mapStyle}
          region={{
            latitude: 40.705307,
            longitude: -74.009088,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          {this.state.locations.map(el => el)}
        </MapView>
        <Button title="Recreation" onPress={() => this.recFilter()} />
        <Button title="Food and Drink" onPress={() => this.foodFilter()} />
        <Button title="Shopping" onPress={() => this.shopFilter()} />
        <Button title="All Purchases" onPress={() => this.reset()} />
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
    alignItems: 'center',
    justifyContent: 'flex-end', //center
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,

    right: 0,
  },
});
