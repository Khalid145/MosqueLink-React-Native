import React, {Component} from 'react';
import { View, Text, StyleSheet } from "react-native";
import { Icon } from 'native-base';

export default class PrayerTimesTab extends Component {
    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-time" style={{ color: tintColor }} />
        )
    }
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
