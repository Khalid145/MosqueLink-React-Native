import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import MainScreen from "./components/MainScreen.js";

const MainNavigator = createStackNavigator({
  Home: {screen: MainScreen},
});

const App = createAppContainer(MainNavigator);

export default App;