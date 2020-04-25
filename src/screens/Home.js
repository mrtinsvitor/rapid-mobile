import tron from 'reactotron-react-native';

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from 'react-native';

import {
  List,
  ActivityIndicator,
  Text,
  Button
} from 'react-native-paper';

import FeatherIcon from 'react-native-vector-icons/Feather';

import api from '../utils/api';
import storage from '../utils/storage';

import EventCard from '../components/EventCard/EventCard';
import EventFilters from '../components/EventFilters/EventFilters';

const Home = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const [user, setUser] = React.useState(null);
  const [events, setEvents] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [eventsLoading, setEventsLoading] = React.useState(true);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Eventos',
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('Perfil', { user })}
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 5,
            paddingBottom: 5
          }}
        >
          <FeatherIcon
            name='sliders'
            size={24}
            style={{ color: '#fff' }}
          />
        </Button>
      )
    });
  }, []);

  React.useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    try {
      const user = await storage.getItem('@user');
      setUser(user);

      const eventList = await api.get(`/events/find-by-field/${user.course.studyFieldId}/student-enrollment/${user.id}`);
      const sortedEventList = await eventList
        .filter(el => new Date(el.eventDate) >= new Date())
        .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));

      setEvents(sortedEventList);
      setEventsLoading(false);
    } catch (e) {
      tron.log('[ERROR getEvents()]: ', e);
      setError(true);
    }
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    getEvents().then(() => setRefreshing(false));
  }, [refreshing]);

  const goToEvent = (data) => {
    return navigation.navigate('Evento', { data });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ActivityIndicator animating={eventsLoading} style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} hidesWhenStopped />

      {error && <Text style={styles.errorMsg}>Ocorreu um erro</Text>}

      {!eventsLoading && !events.length &&
        <Text tyle={styles.errorMsg}>Não existem eventos</Text>
      }

      {!eventsLoading && events.length > 0 &&
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <List.Section style={{ paddingTop: 15, paddingBottom: 15 }}>
            <Text style={styles.titleEvents}>Eventos na sua área</Text>
            <EventFilters />
            {events.map((event, i) => <EventCard key={i} event={event} goToEvent={goToEvent} presenceCheck={event.studentEventEnrollment ? true : false} />)}
          </List.Section>
        </ScrollView>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  errorMsg: {
    textAlign: 'center',
    alignSelf: 'center',
    flex: 1,
    fontSize: 18,
    fontFamily: 'Roboto-Regular'
  },
  titleEvents: {
    textAlign: 'left',
    flex: 1,
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    paddingLeft: 10,
    paddingRight: 10,
    color: '#212529'
  }
});

export default Home;