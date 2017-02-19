/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

export default class client extends Component {
  constructor(props){
    super();

    this.state = {
      initialPosition: 'unknown',
      lastPosition: 'unknown',
      watchID: null
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition: lastPosition});
    });
  }

  clear(){
    navigator.geolocation.clearWatch(this.watchID);
  }

  render(){
      return (
        <View style={styles.view}>
          <TouchableHighlight style={styles.view}>
            <Text style={styles.title}>Current position:
              {this.state.lastPosition}
            </Text>
          </TouchableHighlight>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    textAlign: 'center'
  }
});

AppRegistry.registerComponent('client', () => client);
