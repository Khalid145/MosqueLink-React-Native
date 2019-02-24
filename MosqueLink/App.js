import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

MapboxGL.setAccessToken('pk.eyJ1Ijoia2hhbGlkbWRldmVsb3BlciIsImEiOiJjanJqZndvcmwwYmFuNDRtbDhreGRvNmk5In0.ZQklzab4RPoGnq0RD_dTVQ');

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        alert(position);
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }
  
  render() {
    return (
      <View style={styles.container}>
        <MapboxGL.MapView
            styleURL={MapboxGL.StyleURL.Dark}
            zoomLevel={15}
            centerCoordinate={[11.256, 43.770]}
            style={styles.container}
            showUserLocation={true}>
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
              } else if (payload.properties.id != undefined){
                const mosqueID = payload.properties.id;
                alert(`Mosque ID: ${mosqueID}`);
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

            <MapboxGL.CircleLayer
              id="singlePoint"
              filter={['!has', 'point_count']}
              style={layerStyles.singlePoint}
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
});


// import React, { Component } from 'react';
// import { StyleSheet, View } from 'react-native';
// import MapboxGL from '@mapbox/react-native-mapbox-gl';

// MapboxGL.setAccessToken('pk.eyJ1Ijoia2hhbGlkbWRldmVsb3BlciIsImEiOiJjanJqZndvcmwwYmFuNDRtbDhreGRvNmk5In0.ZQklzab4RPoGnq0RD_dTVQ');

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// const layerStyles = MapboxGL.StyleSheet.create({
//   singlePoint: {
//     circleColor: 'green',
//     circleOpacity: 0.84,
//     circleStrokeWidth: 2,
//     circleStrokeColor: 'white',
//     circleRadius: 5,
//     circlePitchAlignment: 'map',
//   },

//   clusteredPoints: {
//     circlePitchAlignment: 'map',
//     circleColor: MapboxGL.StyleSheet.source(
//       [
//         [25, 'yellow'],
//         [50, 'red'],
//         [75, 'blue'],
//         [100, 'orange'],
//         [300, 'pink'],
//         [750, 'white'],
//       ],
//       'point_count',
//       MapboxGL.InterpolationMode.Exponential,
//     ),

//     circleRadius: MapboxGL.StyleSheet.source(
//       [[0, 15], [100, 20], [750, 30]],
//       'point_count',
//       MapboxGL.InterpolationMode.Exponential,
//     ),

//     circleOpacity: 0.84,
//     circleStrokeWidth: 2,
//     circleStrokeColor: 'white',
//   },

//   clusterCount: {
//     textField: '{point_count}',
//     textSize: 12,
//     textPitchAlignment: 'map',
//   },
// });

// export default class App extends Component {

//   render() {

// //https://github.com/mapbox/react-native-mapbox-gl/issues/918
//     return (
//       <View style={styles.container}>
//         <MapboxGL.MapView
//             style={styles.container}
//             styleURL={MapboxGL.StyleURL.Dark}>
//             <MapboxGL.ShapeSource
//             id="earthquakes"
//             cluster
//             clusterRadius={50}
//             clusterMaxZoom={14}
//             url="https://halftone-exceptions.000webhostapp.com/retrieveMosqueLocations.php"
//             onPress={(e) => {
//               const payload = { ...e.nativeEvent.payload };
//               console.log(payload);
//               if(payload.properties.cluster != undefined){
//                 const clusterCoordinates = payload.geometry.coordinates;
//                 alert(`This is a cluster: ${clusterCoordinates}`);
//               } else if (payload.properties.id != undefined){
//                 const mosqueID = payload.properties.id;
//                 alert(`Mosque ID: ${mosqueID}`);
//               }
//             }}>
//             <MapboxGL.SymbolLayer
//               id="pointCount"
//               style={layerStyles.clusterCount}
//             />

//             <MapboxGL.CircleLayer
//               id="clusteredPoints"
//               belowLayerID="pointCount"
//               filter={['has', 'point_count']}
//               style={layerStyles.clusteredPoints}
//             />

//             <MapboxGL.CircleLayer
//               id="singlePoint"
//               filter={['!has', 'point_count']}
//               style={layerStyles.singlePoint}
//             />
//           </MapboxGL.ShapeSource>
//         </MapboxGL.MapView>
//       </View>
//     );
//   }
// }

