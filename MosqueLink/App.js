import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform} from 'react-native';
import { Icon } from 'native-base';
import {createSwitchNavigator,createAppContainer,createDrawerNavigator,createBottomTabNavigator,createStackNavigator} from 'react-navigation';

import MapTab from "./components/appTabNavigator/MapTab";
import PrayerTimesTab from "./components/appTabNavigator/PrayerTimesTab";
import SettingsTab from "./components/appTabNavigator/SettingsTab";

export default class App extends Component {
  render() {
    return <AppContainer/>;
  }
}

const DashboardTabNavigator = createBottomTabNavigator(
  {
    Map: MapTab,
    'Prayer Time': PrayerTimesTab,
    Settings: SettingsTab
  },
  {
    // headerMode: 'float',
    // navigationOptions: ({ navigation }) => {
    //   const { routeName } = navigation.state;
    //   return {
    //     // headerLeft: <Icon name="ios-home" style={{ paddingLeft:20 }}/>,
    //     headerTitle: 'MosqueLink',
    //     // headerRight: <Icon name="ios-map" style={{ paddingRight:20 }}/>,
    //     headerStyle: {
    //       backgroundColor: 'white'
    //     },
    //   };
    // },
    tabBarOptions: {
      activeTintColor: '#ff0000',
      inactiveTintColor: '#d1cece',
      showLabel: true,
      showIcon: true
  },
  },
);
const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: DashboardTabNavigator
  },
  {
    headerMode: 'none'
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
