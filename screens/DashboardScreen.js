import React from 'react';
import firebase from 'firebase';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
} from 'react-native';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Button title="Sign Out" onPress={() => firebase.auth().signOut()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
