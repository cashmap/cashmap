import React, { Component } from "react";
import firebase from "firebase";
import { Icon } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import PlaidAuthenticator from "react-native-plaid-link";
import getTransResult from "./PlaidScreen";
import Map from "./Map";
import { Image } from "react-native";
import DatePicker from "react-native-datepicker";
import MenuButton from "../components/MenuButton";
const mapIcon = require("../assets/testpin.png");
const mapStyle = require("./jsons/darkmap");

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

export default class DashboardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      status: "",
      accesstoken: "",
      transactions: {},
      allLocations: [],
      locations: [],
      startDate: "2017-01-01",
      endDate: "2019-01-01"
    };
  }

  componentDidMount() {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.providerData[0].uid)
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          let userAccessToken = doc.data().accesstoken;
          this.setState({
            accesstoken: userAccessToken
          });
          console.log(this.state.accesstoken);
          this.transGetter();
        }
      })
      .catch(err => {
        console.log("Error getting document", err);
      });
  }

  async transGetter() {
    const { data: getTransResult } = await firebase
      .functions()

      .httpsCallable("getTrans")({
      access_token: this.state.accesstoken,
      start_date: "2017-01-01",
      end_date: "2019-01-01"
    });
    console.log("getTrans is Running!");
    if (getTransResult) {
      await this.setState({ transactions: getTransResult });
      let filteredLocations = this.generateLocations();

      await this.setState({
        locations: filteredLocations,
        allLocations: filteredLocations
      });
    }
  }

  transUpdater = async () => {
    console.log("start Date: ", this.state.startDate);
    console.log("end Date: ", this.state.endDate);
    const { data: getTransResult } = await firebase
      .functions()
      .httpsCallable("getTrans")({
      access_token: this.state.accesstoken,
      start_date: this.state.startDate,
      end_date: this.state.endDate
    });
    console.log("transUpdater is Running!");
    if (getTransResult) {
      this.setState({ transactions: getTransResult });
      let transactionIds = [];
      for (let i = 0; i < getTransResult.transactions.length; i++) {
        transactionIds.push(getTransResult.transactions[i].transaction_id);
      }
      console.log("getTransResult:", getTransResult);
      console.log("testing transactionIDs array:", transactionIds);
      console.log("has allLocations changed pt1: ", this.state.allLocations);
      this.setState({
        locations: this.state.allLocations.filter(el =>
          transactionIds.includes(el.key)
        )
      });
      console.log("has allLocations changed pt2: ", this.state.allLocations);
    }
  };

  getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
  }

  generateLocations() {
    return this.state.transactions.transactions
      .filter(
        el =>
          el.category[0] === "Food and Drink" ||
          el.category[0] === "Shops" ||
          el.category[0] === "Recreation"
      )
      .map(el => (
        <MapView.Marker
          coordinate={{
            latitude: this.getRandomInRange(40.605, 40.805, 3),
            longitude: this.getRandomInRange(-73.909, -74.109, 3)
          }}
          key={el.transaction_id}
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
    let shops = this.state.allLocations.filter(
      el => el.props.category === "Shops"
    );
    this.setState({ locations: shops });
  }

  foodFilter() {
    let foods = this.state.allLocations.filter(
      el => el.props.category === "Food and Drink"
    );
    this.setState({ locations: foods });
  }

  recFilter() {
    let recs = this.state.allLocations.filter(
      el => el.props.category === "Recreation"
    );
    this.setState({ locations: recs });
  }

  reset() {
    this.setState({ locations: this.state.allLocations });
  }

  render() {
    // console.log(
    //   "DASHBOARD SCREEN STATE------------",
    //   this.state.transactions.transactions
    // );
    if (this.state.transactions.transactions) {
      return (
        <View style={styles.container}>
          <Text>Josh</Text>

          <MenuButton navigation={this.props.navigation} />

          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            customMapStyle={mapStyle}
            region={{
              latitude: 40.705307,
              longitude: -74.009088,
              latitudeDelta: 0.25,
              longitudeDelta: 0.25
            }}
          >
            {this.state.locations.map(el => el)}
          </MapView>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <DatePicker
              style={{ width: 150 }}
              date={this.state.startDate} //initial date from state
              mode="date" //The enum of date, datetime and time
              placeholder="select start date"
              format="YYYY-MM-DD"
              minDate="2016-01-01"
              maxDate="2019-01-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              onDateChange={date => {
                this.setState({ startDate: date });
              }}
            />
            <DatePicker
              style={{ width: 150 }}
              date={this.state.endDate} //initial date from state
              mode="date" //The enum of date, datetime and time
              placeholder="select end date"
              format="YYYY-MM-DD"
              minDate="2016-01-01"
              maxDate="2019-01-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              onDateChange={date => {
                this.setState({ endDate: date });
              }}
            />
          </View>

          <Button title="Submit" onPress={this.transUpdater} />
          <Button title="Recreation" onPress={() => this.recFilter()} />
          <Button title="Food and Drink" onPress={() => this.foodFilter()} />
          <Button title="Shopping" onPress={() => this.shopFilter()} />
          <Button title="All Purchases" onPress={() => this.reset()} />
        </View>
      );
    } else {
      return <View style={{ backgroundColor: "red" }} />;
    }
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
    right: 0
  }
});
