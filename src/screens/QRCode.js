import tron from 'reactotron-react-native';
import React from 'react';

import {
  View,
  StyleSheet,
} from 'react-native';
import {
  IconButton,
  Text
} from 'react-native-paper';

import QRCodeScanner from 'react-native-qrcode-scanner';

export default ({ navigation, route }) => {
  const event = route.params.event;

  const onSuccess = e => {
    tron.log('success', event);
    return navigation.goBack();
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err)
    // );
  }

  return (
    <View style={{ flex: 1 }}>
      <QRCodeScanner
        onRead={onSuccess}
        showMarker
        topContent={
          <Text style={styles.centerText}>
            Go to{' '}
            <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
            your computer and scan the QR code.
          </Text>
        }
        bottomContent={
          <IconButton icon="camera" color="#fff" size={34} onPress={() => onSuccess()} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
});