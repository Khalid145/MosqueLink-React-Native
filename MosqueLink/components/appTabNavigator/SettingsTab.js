import React, {Component} from 'react';
import { View, Text, StyleSheet } from "react-native";

export default class SettingsTab extends Component {


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Settings Tab</Text>
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
