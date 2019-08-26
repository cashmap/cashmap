import React, { Component } from 'react';
import firebase from 'firebase';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default class contentComponent extends Component {
  render() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.drawerTransparent}
        onPress={() => this.props.navigation.goBack()}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.drawer}
          disabled={false}
        >
          <ScrollView>
            <View style={styles.header}>
              <Text style={[styles.text, { color: 'white' }]}>User Name</Text>
            </View>

            <TouchableHighlight
              underlayColor={'rgba(0,0,0,0.2)'}
              onPress={() => this.props.navigation.navigate('DashboardScreen')}
            >
              <View style={styles.row}>
                <Text style={styles.text}>Map</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor={'rgba(0,0,0,0.2'}
              onPress={() => this.props.navigation.navigate('FusionBar')}
            >
              <View style={styles.row}>
                <Text style={styles.text}>Bar</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor={'rgba(0,0,0,0.2)'}
              onPress={() => this.props.navigation.navigate('PieChart')}
            >
              <View style={styles.row}>
                <Text style={styles.text}>Pie</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor={'rgba(0,0,0,0.2'}
              onPress={() => firebase.auth().signOut()}
            >
              <View style={styles.row}>
                <Text style={styles.textLog}>Log Out</Text>
              </View>
            </TouchableHighlight>
          </ScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  textLog: {
    color: '#111',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 390,
    marginLeft: 15,
  },
  text: {
    color: '#111',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  drawer: {
    flex: 1,
    backgroundColor: 'white',
    width: 200,
  },
  drawerTransparent: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    width: '100%',
    height: 200,
    backgroundColor: '#217393',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingLeft: 10,
  },
  menu: {
    width: 10,
    height: 10,
    backgroundColor: 'red',
    borderRadius: 50,
    alignSelf: 'center',
  },
});