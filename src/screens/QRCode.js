import tron from 'reactotron-react-native';
import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';

import {
  View,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {
  IconButton,
  Text
} from 'react-native-paper';

import { showMessage } from "react-native-flash-message";

import api from '../utils/api';
import storage from '../utils/storage';

export default ({ navigation, route }) => {
  const event = route.params.event;

  React.useLayoutEffect(() => {
    headerRight: null
  }, []);

  const onSuccess = async (e) => {
    tron.log('success', e);

    try {
      const storageUser = await storage.getItem('@user');

      const completition = await api.post('/events/participation-check', { studentId: storageUser.id, eventId: event.id });
      showMessage({
        message: 'Presença confirmada com sucesso',
        type: 'success',
        duration: 2500,
      });
    } catch (err) {
      tron.log('[Error Reading QR Code', err);
      if (err.code === '002') {
        showMessage({
          message: err.error,
          type: 'warning',
          duration: 2500,
        });
      }

    } finally {
      return setTimeout(function () { return navigation.goBack(); }, 2800)
    }
  }

  return (
    <View>
      <QRCodeScanner
        onRead={onSuccess}
        showMarker
        markerStyle={{ marginBottom: 100, height: 220, borderWidth: 1 }}
        cameraStyle={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width, zIndex: 1 }}
        topContent={
          <View style={{ zIndex: 2, paddingTop: 15, width: '100%' }}>
            <View style={{right: 0, top: 15, position: 'absolute'}}>
              <IconButton icon="flash" color="#868e96" size={34} style={{ paddingRight: 10 }} onPress={() => tron.log('flash on')} />
            </View>

            <View style={{ paddingTop: 20, alignItems: 'center' }}>
              <Image source={require('../assets/img/rappid-logo.png')} style={{}} width={50} height={50} />
            </View>
          </View>
        }
        bottomContent={
          <View style={{ paddingTop: 100, alignItems: 'center' }}>
            <Text style={styles.centerText}>
              Posicione a câmera em frente ao código QR
            </Text>

            <IconButton icon="camera" color="#fff" size={42} onPress={() => onSuccess()} />
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centerText: {
    fontSize: 18,
    color: '#fff',
    justifyContent: 'center',
    alignContent: 'center',
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
});