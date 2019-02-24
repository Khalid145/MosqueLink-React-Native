import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import { onSortOptions } from './utils';
import mosqueIcon from './mosque.png';

MapboxGL.setAccessToken('pk.eyJ1Ijoia2hhbGlkbWRldmVsb3BlciIsImEiOiJjanJqZndvcmwwYmFuNDRtbDhreGRvNmk5In0.ZQklzab4RPoGnq0RD_dTVQ');

export default class App extends Component {

  constructor(props) {
    super(props);

    this._trackingOptions = Object.keys(MapboxGL.UserTrackingModes)
      .map((key) => {
        return {
          label: key,
          data: MapboxGL.UserTrackingModes[key],
        };
      })
      .sort(onSortOptions);

    this.state = {
      showUserLocation: true,
      userSelectedUserTrackingMode: this._trackingOptions[0].data,
      currentTrackingMode: this._trackingOptions[0].data,
    };

    this.onTrackingChange = this.onTrackingChange.bind(this);
    this.onUserTrackingModeChange = this.onUserTrackingModeChange.bind(this);
    this.onToggleUserLocation = this.onToggleUserLocation.bind(this);
  }
  
  onTrackingChange(index, userTrackingMode) {
    this.setState({
      userSelectedUserTrackingMode: userTrackingMode,
      currentTrackingMode: userTrackingMode,
    });
  }

  onUserTrackingModeChange(e) {
    const userTrackingMode = e.nativeEvent.payload.userTrackingMode;
    this.setState({ currentTrackingMode: userTrackingMode });
  }

  onToggleUserLocation() {
    this.setState({ showUserLocation: !this.state.showUserLocation });
  }

  get userTrackingModeText() {
    return 'None';
    // switch (this.state.currentTrackingMode) {
    //   // case MapboxGL.UserTrackingModes.Follow:
    //   //   return 'Follow';
    //   // case MapboxGL.UserTrackingModes.FollowWithCourse:
    //   //   return 'FollowWithCourse';
    //   // case MapboxGL.UserTrackingModes.FollowWithHeading:
    //   //   return 'FolloWithHeading';
    //   // default:
    //   //   return 'None';
    // }
  }


  render() {
    return (
      <View style={styles.container}>
        <MapboxGL.MapView
        ref={(c) => this._map = c}
            styleURL={MapboxGL.StyleURL.Street}
            style={styles.container}
            // showUserLocation={true}
            // showUserLocation={this.state.showUserLocation}
            userTrackingMode={this.state.userSelectedUserTrackingMode}
            // onUserTrackingModeChange={this.onUserTrackingModeChange}
            >
            <MapboxGL.ShapeSource
            id="earthquakes"
            cluster
            clusterRadius={50}
            clusterMaxZoom={14}
            url="https://halftone-exceptions.000webhostapp.com/retrieveMosqueLocations.php"
            onPress={(e) => {
              const payload = { ...e.nativeEvent.payload };
              console.log(payload);
              if(payload.properties.cluster != undefined){
                const clusterCoordinates = payload.geometry.coordinates;
                alert(`This is a cluster: ${clusterCoordinates}`);
                this._map.flyTo(payload.geometry.coordinates, 1000);
              } else if (payload.properties.id != undefined){
                const mosqueID = payload.properties.id;
                alert(`Mosque ID: ${mosqueID}, ${payload.geometry.coordinates}`);
                this._map.flyTo(payload.geometry.coordinates, 1000);
              }
            }}>
            <MapboxGL.SymbolLayer
              id="pointCount"
              style={layerStyles.clusterCount}
            />

            <MapboxGL.CircleLayer
              id="clusteredPoints"
              belowLayerID="pointCount"
              filter={['has', 'point_count']}
              style={layerStyles.clusteredPoints}
            />

            <MapboxGL.SymbolLayer
              id="singlePoint"
              filter={['!has', 'point_count']}
              style={layerStyles.icon}
            />
          </MapboxGL.ShapeSource>
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

const layerStyles = MapboxGL.StyleSheet.create({
  singlePoint: {
    circleColor: 'green',
    circleOpacity: 0.84,
    circleStrokeWidth: 2,
    circleStrokeColor: 'white',
    circleRadius: 5,
    circlePitchAlignment: 'map',
  },

  clusteredPoints: {
    circlePitchAlignment: 'map',
    circleColor: MapboxGL.StyleSheet.source(
      [
        [25, 'yellow'],
        [50, 'red'],
        [75, 'blue'],
        [100, 'orange'],
        [300, 'pink'],
        [750, 'white'],
      ],
      'point_count',
      MapboxGL.InterpolationMode.Exponential,
    ),

    circleRadius: MapboxGL.StyleSheet.source(
      [[0, 15], [100, 20], [750, 30]],
      'point_count',
      MapboxGL.InterpolationMode.Exponential,
    ),

    circleOpacity: 0.84,
    circleStrokeWidth: 2,
    circleStrokeColor: 'white',
  },

  clusterCount: {
    textField: '{point_count}',
    textSize: 12,
    textPitchAlignment: 'map',
  },
  icon: {
    iconImage: mosqueIcon,
    iconAllowOverlap: true,
    iconSize: 1.0,
  },
});
