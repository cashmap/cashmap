import React, { Component } from 'react';
import firebase from 'firebase';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class contentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  navLink(nav, text) {
    return (
      <TouchableOpacity
        style={{ height: 50 }}
        onPress={() => this.props.navigation.navigate(nav)}
      >
        <Text style={styles.link}>{text}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scroller}>
          <View style={styles.topLinks}>
            <View style={styles.profile}>
              <View style={styles.imgView}>
                <Image
                  style={styles.img}
                  source={{
                    uri: firebase.auth().currentUser
                      ? firebase.auth().currentUser.photoURL
                      : 'https://thesocietypages.org/socimages/files/2009/05/nopic_192.gif',
                  }}
                />
              </View>
              <View style={styles.profileText}>
                <Text style={[styles.name, { color: 'white' }]}>
                  {firebase.auth().currentUser
                    ? firebase.auth().currentUser.displayName
                    : 'Alan Yoho'}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.bottomLinks}>
            {this.navLink('DashboardScreen', 'Map')}
            {this.navLink('PieChart', 'Pie')}
            {this.navLink('FusionBar', 'Bar')}
            {this.navLink('AccountScreen', 'Accounts')}
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <Text style={styles.description}>CashMap</Text>
          <Text style={styles.version}>v1.0</Text>
        </View>
      </View>
    );
  }
}

styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    width: '75%',
  },
  scroller: {
    flex: 1,
  },
  profile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 25,
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
  },
  profileText: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    paddingBottom: 5,
    color: 'white',
    textAlign: 'left',
  },
  imgView: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  img: {
    height: 70,
    width: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: 'white',
  },
  topLinks: {
    height: 160,
    backgroundColor: '#0d1627',
  },
  bottomLinks: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 450,
  },
  link: {
    flex: 1,
    fontSize: 24,
    padding: 20,
    paddingLeft: 14,
    margin: 0,
    textAlign: 'left',
    color: '#0d1627',
  },
  footer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
  },
  version: {
    flex: 1,
    textAlign: 'right',
    marginRight: 20,
    color: 'lightgray',
  },
  description: {
    flex: 1,
    marginLeft: 20,
    fontSize: 16,
    color: '#0d1627',
  },
});
