import tron from 'reactotron-react-native';

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from 'react-native';

import {
  List,
  ActivityIndicator,
  Text
} from 'react-native-paper';

import api from '../utils/api';
import storage from '../utils/storage';

import EventCard from '../components/EventCard/EventCard';

const Home = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const [events, setEvents] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [eventsLoading, setEventsLoading] = React.useState(true);

  React.useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    try {
      const user = await storage.getItem('@user');

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

      {error && <Text style={{ textAlign: 'center', alignSelf: 'center', flex: 1, fontSize: 18, fontFamily: 'Roboto-Regular' }}>Ocorreu um erro</Text>}

      {!eventsLoading && !events.length &&
        <Text style={{ textAlign: 'center', alignSelf: 'center', flex: 1, fontSize: 18, fontFamily: 'Roboto-Regular' }}>Não existem eventos</Text>
      }

      {!eventsLoading && events.length > 0 &&
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <List.Section style={{ paddingTop: 15, paddingBottom: 15 }}>
            {events.map((event, i) => <EventCard key={i} event={event} goToEvent={goToEvent} presenceCheck={event.studentEventEnrollment ? true : false} />)}
          </List.Section>
        </ScrollView>
      }
    </SafeAreaView>
  );
}

export default Home;