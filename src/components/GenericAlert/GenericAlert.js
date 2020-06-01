import React from 'react';
import {
  Alert,
} from 'react-native';

export default ({ title, msg }) => {
  
  Alert.alert(
    { title },
    { msg },
    [
      { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
      // {
      //   text: 'Cancel',
      //   onPress: () => console.log('Cancel Pressed'),
      //   style: 'cancel',
      // },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ],
    { cancelable: false },
  );
}