import React, {Component} from 'react';
import { View, Text, StyleSheet } from "react-native";

export default class PrayerTimesTab extends Component {


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Prayer Times Tab</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
