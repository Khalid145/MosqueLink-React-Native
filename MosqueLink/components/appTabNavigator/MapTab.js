import React, {Component} from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Icon } from 'native-base';
import MapboxGL from '@mapbox/react-native-mapbox-gl';


MapboxGL.setAccessToken('pk.eyJ1Ijoia2hhbGlkbWRldmVsb3BlciIsImEiOiJjanJqZndvcmwwYmFuNDRtbDhreGRvNmk5In0.ZQklzab4RPoGnq0RD_dTVQ');

export default class MapTab extends Component {

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-map" style={{ color: tintColor }} />
    )
}  

    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            dataSource: null,
            latitude: null,
            longitude: null,
            error: null,
        };

    this.state = {
      showUserLocation: true,
    };
    this.onToggleUserLocation = this.onToggleUserLocation.bind(this);
    }

    componentDidMount() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
    }

      onToggleUserLocation() {
        this.setState({ showUserLocation: !this.state.showUserLocation });
      }

    render() {

        if(this.state.isLoading) {
            return(
                <View style={styles.loadingIndicator}>
                <ActivityIndicator/>
                <Text>Loading...</Text>
                </View>
            )
        } else {
            return (
            <View style={styles.container}>
           <MapboxGL.MapView
           ref={(c) => this._map = c}
            styleURL={MapboxGL.StyleURL.Street}
            style={styles.container}
            // zoomLevel={1.00}
            // centerCoordinate={[114.139249, 22.3827448]}
            zoomLevel={15.00}
            centerCoordinate={[Number(this.state.longitude), Number(this.state.latitude)]}
            showUserLocation={this.state.showUserLocation}
            >
            <MapboxGL.ShapeSource
            id="earthquakes"
            cluster
            clusterRadius={50}
            clusterMaxZoom={5}
            url="https://halftone-exceptions.000webhostapp.com/retrieveMosqueLocations.php"
            onPress={(e) => {
              const payload = { ...e.nativeEvent.payload };
              console.log(payload);
              if(payload.properties.cluster != undefined){
                const clusterCoordinates = payload.geometry.coordinates;
                var clusterCoor = [payload.geometry.coordinates[0], payload.geometry.coordinates[1]];
                this._map.getZoom().then((zoom) => {
                  var zoomLevel = zoom + 0.5;
                  console.log(`Original: ${zoom}`);
                  console.log(`Updated: ${zoomLevel}`);
                  console.log(`${Number(this.state.longitude)} - ${Number(this.state.latitude)}`)
                  this._map.setCamera({
                    centerCoordinate: clusterCoor,
                    zoom: zoomLevel,
                    duration: 2000,
                    mode: MapboxGL.CameraModes.Flight,
                  });
                })
              } else if (payload.properties.id != undefined){
                const mosqueID = payload.properties.id;
                var pointCoor = [payload.geometry.coordinates[0], payload.geometry.coordinates[1]];
                console.log(pointCoor);
                this._map.setCamera({
                  centerCoordinate: pointCoor,
                  zoom: 13,
                  duration: 2000,
                  mode: MapboxGL.CameraModes.Flight,
                });
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
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      }
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