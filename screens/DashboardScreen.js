import React, { Component } from "react";
import firebase from "firebase";
import { Icon } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import PlaidAuthenticator from "react-native-plaid-link";
import getTransResult from "./PlaidScreen";
import Map from "./Map";
import DatePicker from "react-native-datepicker";
import MenuButton from "../components/MenuButton";
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
      this.setState({ transactions: getTransResult });
    }
  }

  async transUpdater(start, end) {
    console.log("start Date: ", start);
    console.log("end Date: ", end);
    const { data: getTransResult } = await firebase
      .functions()
      .httpsCallable("getTrans")({
      access_token: this.state.accesstoken,
      start_date: start,
      end_date: end
    });
    console.log("transUpdater is Running!");
    if (getTransResult) {
      this.setState({ transactions: getTransResult });
      console.log(
        "UPDATING STATE-------------------",
        this.state.transactions.transactions
      );
    }
  }

  render() {
    console.log("DASHBOARD SCREEN STATE------------", this.state.transactions);
    if (this.state.transactions.transactions) {
      return (
        <View style={styles.container}>
          <Text>Josh</Text>

          <MenuButton navigation={this.props.navigation} />

          <Map
            provider={PROVIDER_GOOGLE}
            customMapStyle={mapStyle}
            transactions={this.state.transactions.transactions}
            navigation={this.props.navigation}
          />
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

          <Button
            title="Submit"
            onPress={() =>
              this.transUpdater(this.state.startDate, this.state.endDate)
            }
          />
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
