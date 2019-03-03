import React, {Component} from 'react';
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Icon } from 'native-base';

export default class PrayerTimesTab extends Component {
    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-time" style={{ color: tintColor }} />
        )
    }
  render() {
    return (
  <View
    style={{
      width: '95%',
      paddingLeft: '5%',
      marginTop: 80,
      height: 800,
    }}>
    <View style={{ backgroundColor: 'white' }}>
      <Text>Some Text</Text>
    </View>
    
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
