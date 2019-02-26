import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import { Icon } from 'native-base'

import {createSwitchNavigator,createAppContainer,createDrawerNavigator,createBottomTabNavigator,createStackNavigator} from 'react-navigation';

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

class Map extends Component {
  static navigationOptions = {

    tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-map" style={{ color: tintColor }} />
    )
}
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Map</Text>
      </View>
    );
  }
}

class PrayerTime extends Component {
  static navigationOptions = {

    tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-time" style={{ color: tintColor }} />
    )
}
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>PrayerTime</Text>
      </View>
    );
  }
}

class Settings extends Component {
  static navigationOptions = {

    tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-settings" style={{ color: tintColor }} />
    )
}
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Settings</Text>
      </View>
    );
  }
}

const DashboardTabNavigator = createBottomTabNavigator(
  {
    Map,
    PrayerTime,
    Settings
  },
  {
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: <Icon name="ios-home" style={{ paddingLeft:20 }}/>,
        headerTitle: 'MosqueLink',
        headerRight: <Icon name="ios-map" style={{ paddingRight:20 }}/>,
      };
    },
    tabBarOptions: {
      activeTintColor: '#ff0000',
      inactiveTintColor: '#d1cece',
      showLabel: true,
      showIcon: true
  }
  }
);
const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: DashboardTabNavigator
  }
);

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: DashboardStackNavigator
  }
});

const AppSwitchNavigator = createSwitchNavigator({
  Dashboard: { screen: AppDrawerNavigator }
});

const AppContainer = createAppContainer(AppSwitchNavigator);