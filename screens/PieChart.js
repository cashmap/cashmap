import React, { Component } from 'react';
import FusionCharts from 'react-native-fusioncharts';
import { View, Text, StyleSheet, Platform } from 'react-native';

export default class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'pie3d',
      width: '100%',
      height: '100%',
      dataFormat: 'json',
      dataSource: {
        chart: {
          caption: 'Recommended Portfolio Split',
          subCaption: 'For a net-worth of $1M',
          showValues: '1',
          showPercentInTooltip: '0',
          numberPrefix: '$',
          enableMultiSlicing: '1',
          theme: 'fusion',
        },
        data: [
          {
            label: 'Equity',
            value: '300000',
          },
          {
            label: 'Debt',
            value: '230000',
          },
          {
            label: 'Bullion',
            value: '180000',
          },
          {
            label: 'Real-estate',
            value: '270000',
          },
          {
            label: 'Insurance',
            value: '20000',
          },
        ],
      },
    };
    this.libraryPath = Platform.select({
      android: { uri: 'file:///android_asset/fusioncharts.html' },
      ios: require('../assets/fusioncharts.html'),
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>A 3D Pie Chart</Text>
        <View style={styles.chartContainer}>
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
    padding: 10,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 16,
  },
  chartContainer: {
    height: 400,
    borderColor: '#000',
    borderWidth: 2,
  },
});
