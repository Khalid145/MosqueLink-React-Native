import React, {Component} from 'react';
import { View, Text, StyleSheet } from "react-native";
import { Icon } from 'native-base';

export default class SettingsTab extends Component {
    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-settings" style={{ color: tintColor }} />
        )
    }
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
