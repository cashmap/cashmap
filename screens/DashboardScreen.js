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
import FilterButton from "./FilterButton";
import SlidingUpPanel from "rn-sliding-up-panel";
import { Ionicons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

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
  Button,
  Dimensions,
  Animated
} from "react-native";
import MapFilters from "./MapFilters";

export default class DashboardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      status: "",
      accesstoken: "",
      transactions: {},
      allLocations: [],
      dateLocations: null,
      locations: null,
      startDate: "2017-01-01",
      endDate: "2019-01-01"
    };
    this.recFilter = this.recFilter.bind(this);
    this.foodFilter = this.foodFilter.bind(this);
    this.shopFilter = this.shopFilter.bind(this);
    this.reset = this.reset.bind(this);
    this.recFilter = this.recFilter.bind(this);
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
      console.log(this.state.getTransResult);
      await this.setState({ transactions: getTransResult });
      let filteredLocations = this.generateLocations();

      await this.setState({
        locations: filteredLocations,
        allLocations: filteredLocations,
        dateLocations: filteredLocations
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
      let transactionIds = [];
      for (let i = 0; i < getTransResult.transactions.length; i++) {
        transactionIds.push(getTransResult.transactions[i].transaction_id);
      }

      this.setState({
        transactions: getTransResult,
        dateLocations: this.state.allLocations.filter(el =>
          transactionIds.includes(el.key)
        )
      });
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
    let shops = this.state.dateLocations.filter(
      el => el.props.category === "Shops"
    );
    this.setState({ locations: shops });
  }

  foodFilter() {
    let foods = this.state.dateLocations.filter(
      el => el.props.category === "Food and Drink"
    );
    this.setState({ locations: foods });
  }

  recFilter() {
    let recs = this.state.dateLocations.filter(
      el => el.props.category === "Recreation"
    );
    this.setState({ locations: recs });
  }

  reset() {
    this.setState({
      locations: null,
      dateLocations: this.state.allLocations
    });
  }

  checkState = () => {
    if (
      this.state.allLocations &&
      this.state.locations &&
      this.state.dateLocations
    ) {
      console.log("locations firing");
      return this.state.locations;
    } else if (this.state.allLocations && this.state.dateLocations) {
      console.log("dateLocations firing");
      return this.state.dateLocations;
    } else {
      console.log("allLocations firing");
      return this.state.allLocations;
    }
  };

  render() {
    if (this.state.transactions.transactions) {
      return (
        <View style={styles.container}>
          <Text onPress={() => this._panel.show(360)}>Show panel</Text>

          <MenuButton navigation={this.props.navigation} />
          {/* <View style={styles.balance}>
            <Text>
              {this.state.}
            </Text>
          </View> */}
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
            {this.checkState().map(el => el)}
          </MapView>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          ></View>
          <FilterButton
            filter={this.recFilter}
            icon={"md-bicycle"}
            sty={styles.menuIcon}
          />
          <FilterButton
            filter={this.foodFilter}
            icon={"ios-beer"}
            sty={styles.menuIcon2}
          />
          <FilterButton
            filter={this.shopFilter}
            icon={"ios-pricetag"}
            sty={styles.menuIcon3}
          />
          <FilterButton
            filter={this.reset}
            icon={"ios-infinite"}
            sty={styles.menuIcon4}
          />

          <View style={styles.DatePicker}>
            <DatePicker
              customStyles={{
                width: 150,
                dateInput: {
                  color: "white",
                  borderColor: "rgba(52, 52, 52, 0)"
                },
                dateTouchBody: {
                  color: "white",
                  borderColor: "white",
                  borderWidth: 1,
                  borderRadius: 10,
                  margin: 10,
                  backgroundColor: "white",
                  shadowColor: "black",
                  shadowOffset: { width: 2, height: 2 },
                  shadowColor: "black",
                  shadowOpacity: 0.5
                },
                placeholderText: {
                  color: "white",
                  fontSize: 20
                },
                margin: 10
              }}
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
              customStyles={{
                width: 150,
                dateInput: {
                  color: "white",
                  borderColor: "rgba(52, 52, 52, 0)"
                },
                dateTouchBody: {
                  color: "white",
                  borderColor: "white",
                  borderWidth: 1,
                  borderRadius: 10,
                  margin: 10,
                  backgroundColor: "white",
                  shadowColor: "black",
                  shadowOffset: { width: 2, height: 2 },
                  shadowColor: "black",
                  shadowOpacity: 0.5
                },
                placeholderText: {
                  color: "white",
                  fontSize: 20
                },
                margin: 10
              }}
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
            <View style={styles.refresh}>
              <Ionicons
                name="ios-refresh"
                color="#0d1627"
                size={18}
                onPress={this.transUpdater}
              />
            </View>
          </View>
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
    backgroundColor: "#1c2c4d",
    alignItems: "center",
    justifyContent: "center"
  },
  refresh: {
    padding: 10,
    color: "white",
    width: 38,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 19,
    margin: 10,
    borderColor: "white",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.5
  },
  DatePicker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    height: "10%",
    margin: 15,

    width: "100%"
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
  submit: {
    width: 20,
    borderRadius: 3,
    backgroundColor: "#fff"
  },
  map: {
    position: "absolute",
    height: "100%",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
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
    top: 160,
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
    top: 220,
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
    top: 280,
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
    top: 340,
    left: 20,
    shadowColor: "black",
    borderColor: "white",
    backgroundColor: "white",
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.5
  }
});
