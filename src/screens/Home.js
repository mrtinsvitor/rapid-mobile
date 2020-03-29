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
  ActivityIndicator
} from 'react-native-paper';

import { eventPlaceholder } from '../assets/img/login-background2.jpeg';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../utils/api';
import storage from '../utils/storage';

import EventCard from '../components/EventCard/EventCard';

const Home = ({ navigation }) => {
  const [events, setEvents] = React.useState(null);
  const [eventsLoading, setEventsLoading] = React.useState(true);

  React.useEffect(() => {
    async function getEvents() {
      try {
        const user = await storage.getItem('@user');
        tron.log('user', user)

        const eventList = await api.get(`/events/find-by-study-field/${user.course.studyFieldId}`);
        setEvents(eventList);
        setEventsLoading(false);
      } catch (e) {
        tron.log('[ERROR getEvents()]: ', e);
      }
    }

    getEvents();
  }, []);

  const goToEvent = (data) => {
    return navigation.navigate('Event', { data });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ActivityIndicator animating={eventsLoading} style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} hidesWhenStopped />

      {!eventsLoading &&
        <ScrollView>
          <List.Section style={{ paddingTop: 15, paddingBottom: 15 }}>
            {events.map((event, i) => <EventCard key={i} data={event} goToEvent={goToEvent} />)}
          </List.Section>
        </ScrollView>
      }
    </SafeAreaView>
  );
}

export default Home;
