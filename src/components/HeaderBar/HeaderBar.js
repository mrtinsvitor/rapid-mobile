import tron from 'reactotron-react-native';
import React from 'react';

import { Platform, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default (navigation, route, right) => {
  const backButtonVisible = route.state && route.state.index > 0;

  return (
    {
      headerStyle: {
        backgroundColor: '#007bff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontFamily: 'Raleway-Bold',
      },
      headerTitleAlign: "center",
      // headerLeft: backButtonVisible ? () => (
      //   <Button
      //     onPress={() => navigation.goBack()}
      //     style={styles.headerLeftButton}
      //   >
      //     <Ionicons
      //       name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
      //       size={26}
      //       style={{ color: '#fff' }}
      //     />
      //   </Button>
      // ) : null,
      headerRight: right ? () => (
        <Button
          onPress={right.rightButton}
          style={styles.headerRightButton}
        >
          <FeatherIcon
            name={right.rightIcon}
            size={24}
            style={{ color: '#fff' }}
          />
        </Button>
      ) : null
    }
  );
}

const styles = StyleSheet.create({
  headerLeftButton: {
    paddingLeft: 0,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
  headerRightButton: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5
  }
});