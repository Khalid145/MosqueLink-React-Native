import React, {Component} from 'react';
import { View, Text, StyleSheet } from "react-native";

import { Icon } from 'native-base';
import { TabNavigator } from 'react-navigation';

export default class App extends Component {

    static navigationOptions = {
        headerLeft: <Icon name="ios-camera-outline" style={{ paddingLeft:20 }}/>,
        title: "MosqueLink",
        headerRight: <Icon name="ios-camera-outline" style={{ paddingRight:20 }}/>
    }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
      </View>
    );
  }
}

const AppTabNavigator = TabNavigator({
    MapTab: {
        screen: MapTab
    },
    PrayerTimesTab: {
        screen: PrayerTimesTab
    },
    SettingsTab: {
        screen: SettingsTab
    },
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});




// import React, {Component} from 'react';
// import { View, Text, StyleSheet } from "react-native";

// export default class MapTab extends Component {


//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>Map Tab</Text>
//       </View>
//     );
//   }
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   }
// });
