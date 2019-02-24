import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

MapboxGL.setAccessToken('pk.eyJ1Ijoia2hhbGlkbWRldmVsb3BlciIsImEiOiJjanJqZndvcmwwYmFuNDRtbDhreGRvNmk5In0.ZQklzab4RPoGnq0RD_dTVQ');

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MapboxGL.MapView
            styleURL={MapboxGL.StyleURL.Street}
            zoomLevel={15}
            centerCoordinate={[11.256, 43.770]}
            style={styles.container}>
        </MapboxGL.MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});