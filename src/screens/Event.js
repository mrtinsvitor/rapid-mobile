import tron from 'reactotron-react-native';

import React from 'react';

import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Alert
} from 'react-native';

import {
  Title,
  Text,
  Badge,
  Avatar,
  Divider,
  Button,
  ActivityIndicator,
  IconButton
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { showMessage } from "react-native-flash-message";

import EventMap from '../components/EventMap';

import eventPlaceholder from '../assets/img/event_placeholder.png';
import avatarPlaceholder from '../assets/img/avatar_placeholder.png';

import api from '../utils/api';
import storage from '../utils/storage';
import { capitalizeWords } from '../utils/string';
import { formatDateToDayMonth } from '../utils/date';

export default ({ route, navigation }) => {
  const event = route.params.data;
  const { studyField, local } = event;

  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);
  const [isLoadingEnrollment, setIsLoadingEnrollment] = React.useState(false);
  const [isEnrolled, setIsEnrolled] = React.useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: capitalizeWords(event.name),
      headerTitleContainerStyle: { width: '70%', paddingRight: 5 },
      headerRight: isEnrolled ? () => (
        <Button
          onPress={() => navigation.navigate('QRCode')}
          style={{ paddingLeft: 10, paddingRight: 5, paddingTop: 5, paddingBottom: 5 }}
        >
          <Icon
            name="qrcode"
            size={32}
            style={{ color: '#fff' }}
          />
        </Button>
      ) : null,
    });
  }, [isEnrolled]);

  React.useEffect(() => {
    async function getStorageUser() {
      const storageUser = await storage.getItem('@user');
      setUser(storageUser);
    }

    getStorageUser();
  }, []);

  React.useEffect(() => {
    async function getEnrollment() {
      if (!user) return;

      try {
        const enrollment = await api.get(`/events/find-one/event/${event.id}/student/${user.id}`);

        setIsEnrolled(enrollment ? true : false);
      } catch (error) {
        tron.log('error', error)
      } finally {
        setIsLoading(false);
      }
    }

    getEnrollment();
  }, [user])

  const enrollEvent = async () => {
    setIsLoadingEnrollment(true);
    try {
      const enrollment = await api.post('/events/enroll', { studentId: user.id, eventId: event.id });

      showMessage({
        message: 'Inscrito com sucesso',
        type: 'success',
        duration: 2500,
      });

      setIsEnrolled(true);

      return setTimeout(function () { return navigation.navigate('Eventos'); }, 2800)
    } catch (error) {
      tron.log('error enrollment', error);

      let errorMsg;
      if (error.code && error.code === '001') {
        errorMsg = 'Você já está inscrito neste evento.';
      }

      return showMessage({
        message: errorMsg || 'Ocorreu um erro, tente novamente.',
        type: errorMsg ? 'warning' : 'danger',
        duration: 2500,
      });
    } finally {
      return setIsLoadingEnrollment(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ActivityIndicator animating={isLoading} style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} hidesWhenStopped />

      {!isLoading &&
        <ScrollView>
          <View>
            <View>
              <Image source={event.coverPhoto || eventPlaceholder} style={{ width: '100%', height: 225, borderBottomLeftRadius: 80 }} />
            </View>

            <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 25 }}>
              <View>
                <Title style={{ fontFamily: 'Raleway-Bold', fontSize: 26 }}>{capitalizeWords(event.name)}</Title>
              </View>

              <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                <Badge style={{ backgroundColor: '#0063CC', fontFamily: 'Raleway-Regular', fontSize: 12 }} size={22}>{studyField.name}</Badge>
                <View style={{ marginLeft: 15 }}>
                  <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 16 }}>de {event.openingHour.substring(0, event.openingHour.length - 3)} às {event.endingHour.substring(0, event.endingHour.length - 3)}</Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10 }}>
                <Avatar.Image size={30} source={avatarPlaceholder} style={{ marginRight: 10 }} />
                <Avatar.Image size={30} source={avatarPlaceholder} style={{ marginRight: 10 }} />
                <Avatar.Image size={30} source={avatarPlaceholder} style={{ marginRight: 10 }} />
                <Text style={{ fontSize: 16, fontFamily: 'Roboto-Medium', color: '#007bff' }}>+8</Text>
              </View>

              <View style={{ paddingTop: 10 }}>
                <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 16, color: '#6d6d6d' }}>
                  {event.description}
                </Text>
              </View>


              <Divider style={{ marginTop: 20, marginBottom: 15 }} />

              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', left: -5 }}>
                  <Icon name="clock-outline" size={30} style={{ color: '#0063CC' }} />
                  <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 18, paddingLeft: 5, }}>
                    {`${event.complementaryHours} horas complementares`}
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', left: -5, paddingTop: 5 }}>
                  <Icon name="calendar" size={30} style={{ color: '#0063CC' }} />
                  <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 18, paddingLeft: 5, }}>
                    {formatDateToDayMonth(event.eventDate)}
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingTop: 5, left: -5 }}>
                  <Icon name="map-marker" size={30} style={{ color: '#0063CC' }} />
                  <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 18, paddingLeft: 5 }} numberOfLines={2} adjustsFontSizeToFit>
                    {local.name || 'Sem local cadastrado'}
                  </Text>
                </View>

                <View style={styles.mapContainer}>
                  <EventMap local={local} />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      }

      {!isLoading &&
        <View style={styles.bottomBar}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{}}>
              <Text style={{ color: '#000', fontFamily: 'Roboto-Medium', fontSize: 16, textTransform: 'uppercase' }}>{event.enrollmentValue > 0 ? `R$ ${event.enrollmentValue}` : 'Grátis'}</Text>
            </View>

            <View>
              {!isEnrolled ?
                <Button
                  style={{ backgroundColor: '#007bff', borderRadius: 0, }}
                  labelStyle={{ fontFamily: 'Roboto-Medium', fontSize: 14, color: '#fff' }}
                  icon="check-bold"
                  loading={isLoadingEnrollment}
                  disabled={isLoadingEnrollment}
                  uppercase
                  mode="contained"
                  onPress={() => enrollEvent()}
                >
                  Inscreva-se
                </Button>
                :
                <Button
                  style={{ backgroundColor: '#17c671', borderRadius: 0, }}
                  labelStyle={{ fontFamily: 'Roboto-Medium', fontSize: 14, color: '#fff' }}
                  icon="check-bold"
                  uppercase
                  mode="contained"
                >
                  Inscrito
                </Button>
              }
            </View>

          </View>
        </View>
      }

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    paddingTop: 20,
    paddingBottom: 20
  },
  bottomBar: {
    // height: 65,
    backgroundColor: '#FBFBFB',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 20,
    paddingRight: 20
  }
});