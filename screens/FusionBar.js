import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import FusionCharts from "react-native-fusioncharts";
import firebase from "firebase";
import MenuHeader from "./MenuHeader";
import DatePicker from "react-native-datepicker";
import { Button } from "react-native-elements";

export default class PlainColumn2D extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transactions: {},

      access_token: "",
      startDate: "2017-01-01",
      endDate: "2019-01-01",
      type: "column2d",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource: {
        chart: {
          caption: "Spending by Category",

          numberSuffix: "",
          numberPrefix: "$",
          theme: "fusion"
        },
        data: [
          {
            label: "",

            value: "0"
          },
          {
            label: "",
            value: "0"
          },
          {
            label: "",
            value: "0"
          },
          {
            label: "",
            value: "0"
          },
          {
            label: "",
            value: "0"
          },
          {
            label: "",
            value: "0"
          }
        ]
      }
    };
    this.libraryPath = Platform.select({
      // Specify fusioncharts.html file location
      android: {
        uri: "file:///android_asset/fusioncharts.html"
      },
      ios: require("../assets/fusioncharts.html")
    });
  }

  async componentDidMount() {
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

    if (getTransResult) {
      this.setState({
        transactions: getTransResult
      });
    }

    this.transFilter(this.state.transactions.transactions);
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
      console.log("getTransResult from updater: ", getTransResult);
      this.transFilter(getTransResult.transactions);
    }
    console.log(
      "transUpdater says: ",

      this.state.transactions.transactions[4].amount
    );
  }

  transFilter(transactions) {
    let foodAndDrink = transactions.filter(
      el => el.category[0] === "Food and Drink"
    );
    let foodAmounts = [];
    for (let i = 0; i < foodAndDrink.length; i++) {
      foodAmounts.push(Math.abs(foodAndDrink[i].amount));
    }

    const foodSummer = foodAmounts => foodAmounts.reduce((a, b) => a + b, 0);
    let foodSum = foodSummer(foodAmounts);

    let travel = transactions.filter(el => el.category[0] === "Travel");
    let travelAmounts = [];
    for (let i = 0; i < travel.length; i++) {
      travelAmounts.push(Math.abs(travel[i].amount));
    }

    let travelSum = foodSummer(travelAmounts);

    let transfer = transactions.filter(el => el.category[0] === "Transfer");
    let transferAmounts = [];
    for (let i = 0; i < transfer.length; i++) {
      transferAmounts.push(Math.abs(transfer[i].amount));
    }

    let transferSum = foodSummer(transferAmounts);

    let recreation = transactions.filter(el => el.category[0] === "Recreation");
    let recreationAmounts = [];
    for (let i = 0; i < recreation.length; i++) {
      recreationAmounts.push(Math.abs(recreation[i].amount));
    }

    let recreationSum = foodSummer(recreationAmounts);

    let payments = transactions.filter(el => el.category[0] === "Payment");
    let paymentsAmounts = [];
    for (let i = 0; i < payments.length; i++) {
      paymentsAmounts.push(Math.abs(payments[i].amount));
    }

    let paymentsSum = foodSummer(paymentsAmounts);

    let shopping = transactions.filter(el => el.category[0] === "Shops");
    let shoppingAmounts = [];
    for (let i = 0; i < shopping.length; i++) {
      shoppingAmounts.push(Math.abs(shopping[i].amount));
    }

    let shoppingSum = foodSummer(shoppingAmounts);

    this.setState({
      transactions: transactions,
      dataSource: {
        chart: {
          caption: "Spending by Category",
          subCaption: `${this.state.startDate} - ${this.state.endDate}`,

          numberPrefix: "$",
          numberSuffix: "",
          theme: "fusion"
        },
        data: [
          {
            label: "Payments",
            // value: `${this.state.transactions.transactions[4].amount}`,
            value: paymentsSum
          },
          {
            label: "Travel",
            value: travelSum
          },
          {
            label: "Transfer",
            value: transferSum
          },
          {
            label: "Recreation",
            value: recreationSum
          },
          {
            label: "Food and Drink",
            value: foodSum
          },
          {
            label: "Shopping",
            value: shoppingSum
          }
        ]
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MenuHeader />
        <Text style={styles.header} />
        <View style={styles.chartContainer}>
          <FusionCharts
            type={this.state.type}
            width={this.state.width}
            height={this.state.height}
            dataFormat={this.state.dataFormat}
            dataSource={this.state.dataSource}
            libraryPath={this.libraryPath} // set the libraryPath property
          />
          <DatePicker
            style={{ width: 200 }}
            date={this.state.startDate} //initial date from state
            mode="date" //The enum of date, datetime and time
            placeholder="select start date"
            format="YYYY-MM-DD"
            minDate="2016-01-01"
            maxDate="2019-01-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            onDateChange={date => {
              this.setState({ startDate: date });
            }}
          />
          <DatePicker
            style={{ width: 200 }}
            date={this.state.endDate} //initial date from state
            mode="date" //The enum of date, datetime and time
            placeholder="select end date"
            format="YYYY-MM-DD"
            minDate="2016-01-01"
            maxDate="2019-01-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            onDateChange={date => {
              this.setState({ endDate: date });
            }}
          />
          <Button
            title="Refresh Chart"
            onPress={() =>
              this.transUpdater(this.state.startDate, this.state.endDate)
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  header: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    paddingBottom: 10
  },
  chartContainer: {
    height: 400,

    fontSize: 4
  }
});
