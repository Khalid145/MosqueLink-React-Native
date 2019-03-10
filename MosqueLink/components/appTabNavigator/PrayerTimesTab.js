import React, {Component} from 'react';
import {Text, View, Dimensions, StyleSheet, Animated, Button} from 'react-native'

import { Icon } from 'native-base';


import SlidingUpPanel from 'rn-sliding-up-panel'

const {height} = Dimensions.get('window')


export default class PrayerTimesTab extends Component {
    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-time" style={{ color: tintColor }} />
        )
    }

    state = {
      count: 0
    }
    
    static defaultProps = {
      draggableRange: {
        top: height / 3.00,
        bottom: 50
      }
    }
  
    _draggedValue = new Animated.Value(0)

    _renderContent = () => {
      return (
        <View style={styles.panel}>
        <View style={styles.panelHeader}>
          <Text style={{color: '#FFF'}}>Bottom Sheet Peek {this.state.count}</Text>
        </View>
        <View style={styles.panelBody}>
          <Text>Bottom Sheet Content</Text>
        </View>
      </View>
      );
  };


    render() {
      return (
        <View style={styles.panelContainer}>
          <Text>Hello world</Text>
          <Button 
            title="Open modal" 
            onPress={(e) => {
              this.setState({ count: this.state.count + 1 });
              this._panel.show();
            }}/>
            <Button 
            title="Close modal" 
            onPress={(e) => {
              this.setState({ count: this.state.count + 1 });
              this._panel.hide();
            }}/>
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
      )
    }
}

const styles = StyleSheet.create({
  panelContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center'
  },
  panel: {
    flex: 1,
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

