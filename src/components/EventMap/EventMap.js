import React from 'react';

import { StyleSheet, Dimensions } from 'react-native'

import MapView, { Marker } from 'react-native-maps';

export default class EventMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mapRegion: {
        latitude: -22.789035,
        longitude: -43.306311,
        latitudeDelta: 0.00522,
        longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.00522,
      }
    };
  }


  render() {
    return (
      <MapView
        style={styles.map}
        initialRegion={this.state.mapRegion}
        zoomEnabled
        zoomTapEnabled
        showsBuildings={false}
        showsTraffic={false}
        showsIndoors={false}
      >
        <Marker
          coordinate={this.state.mapRegion}
        />
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    height: 200
  },
});