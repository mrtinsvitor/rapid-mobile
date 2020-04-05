import tron from 'reactotron-react-native';

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';

import {
  List,
  TouchableRipple,
  IconButton,
  Button,
  ActivityIndicator,
  Text
} from 'react-native-paper';

import { eventPlaceholder } from '../assets/img/login-background2.jpeg';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../utils/api';
import storage from '../utils/storage';

import EventCard from '../components/EventCard/EventCard';

const Home = ({ navigation }) => {
  const [events, setEvents] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [eventsLoading, setEventsLoading] = React.useState(true);

  React.useEffect(() => {
    async function getEvents() {
      try {
        const user = await storage.getItem('@user');

        const eventList = await api.get(`/events/find-by-field/${user.course.studyFieldId}/up-next`);
        setEvents(eventList);
        setEventsLoading(false);
      } catch (e) {
        tron.log('[ERROR getEvents()]: ', e);
        setError(true);
      }
    }

    getEvents();
  }, []);

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
        <ScrollView>
          <List.Section style={{ paddingTop: 15, paddingBottom: 15 }}>
            {events.map((event, i) => <EventCard key={i} event={event} goToEvent={goToEvent} />)}
          </List.Section>
        </ScrollView>
      }
    </SafeAreaView>
  );
}

export default Home;
