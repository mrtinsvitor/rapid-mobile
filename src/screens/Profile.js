import React from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {
  Button,
  Avatar,
  Text,
  ProgressBar,
  Title,
  Badge,
} from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';

import AuthContext from '../context/AuthContext';

import api from '../utils/api';
import storage from '../utils/storage';
import { formatDateToDayMonth } from '../utils/date';

import defaultAvatar from '../assets/img/avatar_placeholder.png';

export default ({ route }) => {
  const { signOut } = React.useContext(AuthContext);
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);
  const [lastEvents, setLastEvents] = React.useState([]);
  const [hoursProgress, setHoursProgress] = React.useState(0);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        elevation: 0,
        backgroundColor: '#007bff',
      },
      headerLeft: () => (
        <Button
          onPress={() => signOut()}
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 5,
            paddingBottom: 5
          }}
        >
          <FeatherIcon
            name='log-out'
            size={22}
            style={{ color: '#fff' }}
          />
        </Button>
      ),
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('Editar Perfil')}
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 5,
            paddingBottom: 5
          }}
        >
          <FeatherIcon
            name='edit-2'
            size={22}
            style={{ color: '#fff' }}
          />
        </Button>
      )
    });
  }, []);

  React.useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const storageUser = await storage.getItem('@user');

    const user = await api.get('/students/find-by-email', { email: storageUser.email });
    // storage.setItem(user);

    setUser(user);
  }

  React.useEffect(() => {
    if (user === null) return;
    getLastEvents();
  }, [user]);

  React.useEffect(() => {
    if (user === null) return;

    setHoursProgress(((user.complementaryHours || 0) / 100 * 100) / 200);
  }, [user]);

  const getLastEvents = async () => {
    const events = await api.get(`/students/find-last-events/checked/student/${user.id}`);
    setLastEvents(events);

    setLoading(false);
    setRefreshing(false);
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    getUser()
      .then(getLastEvents()
        .then(() => setRefreshing(false))
      );

  }, [refreshing]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!loading &&
        <View>
          <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

            <View style={{ backgroundColor: '#007bff', paddingTop: 40, paddingBottom: 20 }}>
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <View style={{ flexDirection: 'column', top: -20 }}>
                  <Avatar.Image size={68} source={user.profilePhoto !== null ? user.profilePhoto : defaultAvatar} />
                </View>
                <View style={{ flexDirection: 'column' }}>
                  <View>
                    <Text style={[styles.textInfo, styles.colorLight]}>{user.firstName} {user.lastName}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.textInfo, styles.colorSecondary]}>{user.course.name}</Text>
                    <Text style={[styles.textInfo, styles.colorSecondary]}> | </Text>
                    <Text style={[styles.textInfo, styles.colorSecondary]}>{user.term.name}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ marginTop: 25, paddingLeft: 20, paddingRight: 20 }}>
              <Text style={{ color: '#343a40', fontFamily: 'Poppins-Medium', fontSize: 16 }}>Horas Complementares</Text>
              <Text style={{ color: '#212529', fontFamily: 'Roboto-Regular', alignSelf: 'flex-end' }}>{user.complementaryHours || 0} / 200</Text>
              <ProgressBar progress={hoursProgress} color='#007bff' style={{ height: 25 }} />
            </View>

            <View style={{ marginTop: 30, paddingLeft: 20, paddingRight: 20 }}>
              <Text style={{ color: '#343a40', fontFamily: 'Poppins-Medium', fontSize: 16, marginBottom: 10 }}>Eventos Recentes</Text>
              {lastEvents.map((el, i) => (
                <View key={i} style={styles.recentEventCard}>
                  <Title style={styles.titleEvent}>{el.event.name}</Title>

                  <Badge style={{ backgroundColor: '#007bff', fontFamily: 'Raleway-Regular', fontSize: 12, alignSelf: 'flex-start', marginBottom: 10 }} size={22}>{el.event.studyField.name}</Badge>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontFamily: 'Raleway-Regular' }}>{el.event.complementaryHours} horas compl.</Text>
                    <Text style={{ fontFamily: 'Raleway-Regular' }}>{formatDateToDayMonth(el.event.eventDate)} às {el.event.openingHour.substring(0, el.event.openingHour.length - 3)}</Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textInfo: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'center'
  },
  colorLight: {
    color: '#FBFBFB',
  },
  colorSecondary: {
    color: '#c9c9c9',
  },
  titleEvent: {
    fontFamily: 'Poppins-Medium',
    lineHeight: 20,
    fontSize: 16,
    paddingBottom: 5
  },
  recentEventCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 5
  }
})