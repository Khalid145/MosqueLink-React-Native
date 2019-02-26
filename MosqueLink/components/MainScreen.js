import React, {Component} from 'react';
import { View, Text, StyleSheet } from "react-native";

import MapTab from "./appTabNavigator/MapTab";
import PrayerTimesTab from "./appTabNavigator/PrayerTimesTab";
import SettingsTab from "./appTabNavigator/SettingsTab";

import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

export default createBottomTabNavigator(
  {
    Map: MapTab,
    'Prayer Times': PrayerTimesTab,
    Settings: SettingsTab
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Map') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;

        } else if (routeName === 'Settings') {
            iconName = `ios-options${focused ? '' : '-outline'}`;
            
        } else if (routeName === 'Settings') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);