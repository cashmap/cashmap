import React, { Component } from 'react';
import { StyleSheet, View, Text, Header } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import MenuButton from '../components/MenuButton';

export default class AccountScreen extends Component {
  render() {
    const items = [
      { name: 'CHECKING', amount: '$110', code: '#1B2E4B' },
      { name: 'SAVINGS', amount: '$2400', code: '#2F415B' },
      { name: 'BRONZE STANDARD CD', amount: '$43,200', code: '#44546B' },
      { name: 'SILVER CARD', amount: '$1000', code: '#59677C' },
      { name: 'DIAMOND CARD', amount: '$410', code: '#4AAEC8' },
      { name: 'PLATINUM MONEY MARKET', amount: '$320.76', code: '#5AB5CD' },
      { name: '401k', amount: '$23,631', code: '#6ABCD2' },
      { name: 'STUDENT LOAN', amount: '$65,263', code: '#7BC4D7' },
    ];

    return (
      <View style={styles.container}>
        <MenuButton navigation={this.props.navigation} />
        <FlatGrid
          itemDimension={130}
          items={items}
          style={styles.gridView}
          // staticDimension={300}
          // fixed
          // spacing={20}

          renderItem={({ item, index }) => (
            <View
              style={[styles.itemContainer, { backgroundColor: item.code }]}
            >
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCode}>{item.amount}</Text>
            </View>
          )}
          ListHeaderComponent={({ section }) => (
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                backgroundColor: '#000000',
                borderRadius: 5,
                overflow: 'hidden',
                padding: 25,
                marginBottom: 10,
                margin: 10,
              }}
            >
              FINANCIAL ACCOUNTS
            </Text>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});
