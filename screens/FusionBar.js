import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import FusionCharts from "react-native-fusioncharts";
import firebase from "firebase";
import MenuButton from "../components/MenuButton";
export default class PlainColumn2D extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transactions: {},
      access_token: "",
      type: "column2d",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource: {
        chart: {
          caption: "Spending by Category: January 2017 to January 2019",

          xAxisName: "Category",
          yAxisName: "Dollars",
          numberSuffix: "",
          numberPrefix: "$",
          theme: "fusion"
        },
        data: [
          {
            label: "Payments",
            // value: `${this.state.transactions.transactions[4].amount}`,
            value: "300"
          },
          {
            label: "Travel",
            value: "260"
          },
          {
            label: "Transfer",
            value: "180"
          },
          {
            label: "Recreation",
            value: "140"
          },
          {
            label: "Food and Drink",
            value: "115"
          },
          {
            label: "Shopping",
            value: "100"
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
      access_token: this.state.accesstoken
    });
    console.log("getTrans is Running!");
    if (getTransResult) {
      this.setState({ transactions: getTransResult });
    }
    console.log(
      "transGetter says: ",
      this.state.transactions.transactions[4].amount
    );
    this.transFilter(this.state.transactions.transactions);
  }

  transFilter(transactions) {
    let foodAndDrink = transactions.filter(
      el => el.category[0] === "Food and Drink"
    );
    let foodAmounts = [];
    for (let i = 0; i < foodAndDrink.length; i++) {
      console.log("foodAndDrink Amounts: ", foodAndDrink[i].amount);
      foodAmounts.push(Math.abs(foodAndDrink[i].amount));
    }
    console.log("foodAmounts: ", foodAmounts);

    const foodSummer = foodAmounts => foodAmounts.reduce((a, b) => a + b, 0);
    let foodSum = foodSummer(foodAmounts);
    console.log("foodSum: ", foodSum);

    let travel = transactions.filter(el => el.category[0] === "Travel");
    let travelAmounts = [];
    for (let i = 0; i < travel.length; i++) {
      console.log("travel Amounts: ", travel[i].amount);
      travelAmounts.push(Math.abs(travel[i].amount));
    }
    console.log("travelAmounts: ", travelAmounts);

    let travelSum = foodSummer(travelAmounts);
    console.log("travelSum: ", travelSum);

    let transfer = transactions.filter(el => el.category[0] === "Transfer");
    let transferAmounts = [];
    for (let i = 0; i < transfer.length; i++) {
      console.log("transfer Amounts: ", travel[i].amount);
      transferAmounts.push(Math.abs(transfer[i].amount));
    }
    console.log("transferAmounts: ", transferAmounts);

    let transferSum = foodSummer(transferAmounts);
    console.log("transferSum: ", transferSum);

    let recreation = transactions.filter(el => el.category[0] === "Recreation");
    let recreationAmounts = [];
    for (let i = 0; i < recreation.length; i++) {
      console.log("recreation Amounts: ", recreation[i].amount);
      recreationAmounts.push(Math.abs(recreation[i].amount));
    }
    console.log("recreationAmounts: ", recreationAmounts);

    let recreationSum = foodSummer(recreationAmounts);
    console.log("recreationSum: ", recreationSum);

    let payments = transactions.filter(el => el.category[0] === "Payment");
    let paymentsAmounts = [];
    for (let i = 0; i < payments.length; i++) {
      console.log("payments Amounts: ", payments[i].amount);
      paymentsAmounts.push(Math.abs(payments[i].amount));
    }
    console.log("paymentsAmounts: ", paymentsAmounts);

    let paymentsSum = foodSummer(paymentsAmounts);
    console.log("paymentsSum: ", paymentsSum);

    let shopping = transactions.filter(el => el.category[0] === "Shops");
    let shoppingAmounts = [];
    for (let i = 0; i < shopping.length; i++) {
      console.log("shopping Amounts: ", shopping[i].amount);
      shoppingAmounts.push(Math.abs(shopping[i].amount));
    }
    console.log("shoppingAmounts: ", shoppingAmounts);

    let shoppingSum = foodSummer(shoppingAmounts);
    console.log("shoppingSum: ", shoppingSum);

    this.setState({
      dataSource: {
        chart: {
          caption: "Spending by Category: January 2017 to January 2019",

          xAxisName: "Category",

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
        <Text style={styles.header} />
        <View style={styles.chartContainer}>
          <MenuButton navigation={this.props.navigation} />
          <FusionCharts
            type={this.state.type}
            width={this.state.width}
            height={this.state.height}
            dataFormat={this.state.dataFormat}
            dataSource={this.state.dataSource}
            libraryPath={this.libraryPath} // set the libraryPath property
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
