import React, {Component} from 'react';
import {Text, View, Dimensions, StyleSheet, Animated, Button} from 'react-native'

import { Icon } from 'native-base';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import SlidingUpPanel from 'rn-sliding-up-panel'

const {height} = Dimensions.get('window')


MapboxGL.setAccessToken('pk.eyJ1Ijoia2hhbGlkbWRldmVsb3BlciIsImEiOiJjanJqZndvcmwwYmFuNDRtbDhreGRvNmk5In0.ZQklzab4RPoGnq0RD_dTVQ');

export default class MapTab extends Component {

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-map" style={{ color: tintColor }} />
    )}  

    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            dataSource: null,
            latitude: null,
            longitude: null,
            error: null,
            count: 0,
            mosqueid: null,
        };

    this.state = {
      showUserLocation: true,
    };
    this.onToggleUserLocation = this.onToggleUserLocation.bind(this);
    }

    static defaultProps = {
      draggableRange: {
        top: height / 2.50,
        bottom: 50
      }
    }
  
    _draggedValue = new Animated.Value(0);

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

      _renderContent = () => {
        return (
          <View style={styles.panel}>
          <View style={styles.panelHeader}>
            <Text style={{color: '#FFF'}}>Mosque ID: {this.state.mosqueid}</Text>
          </View>
          <View style={styles.panelBody}>
            <Text>Mosque ID: {this.state.mosqueid}</Text>
          </View>
        </View>
        );
    };

    render() {
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
            showUserLocation={this.state.showUserLocation}>
            <MapboxGL.ShapeSource
            id="earthquakes"
            cluster={false}
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
                this.setState({ mosqueid: mosqueID});
                var pointCoor = [payload.geometry.coordinates[0], payload.geometry.coordinates[1]];
                console.log(pointCoor);
                // this._map.setCamera({
                //   centerCoordinate: pointCoor,
                //   zoom: 13,
                //   duration: 2000,
                //   mode: MapboxGL.CameraModes.Flight,
                // });
                this._panel.show();

                this._map.setCamera({
                  duration: 1000,
                  mode: MapboxGL.CameraModes.Flight,
                  bounds: {
                    paddingTop: 100,
                    paddingRight: 50,
                    paddingBottom: 300,
                    paddingLeft: 50,
                    ne: pointCoor,
                    sw: [Number(this.state.longitude), Number(this.state.latitude)],
                  },
                })


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
        <SlidingUpPanel
            showBackdrop={false}
            ref={c => (this._panel = c)}
            draggableRange={this.props.draggableRange}
            animatedValue={this._draggedValue}>
            <View>
            {this._renderContent()}
            </View>
          </SlidingUpPanel>
          </View>
        );
        
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1
      },
      panel: {
        flex: 1,
        paddingRight: 20,
        paddingLeft: 20,
        backgroundColor: 'white',
        position: 'relative',
        backgroundColor: '#b197fc',
      },
      panelHeader: {
        height: 100,
        backgroundColor: '#b197fc',
        alignItems: 'center',
        justifyContent: 'center'
      },
      panelBody: {
        height: 90,
        backgroundColor: '#D3D3D3',
        alignItems: 'center',
        justifyContent: 'center'
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