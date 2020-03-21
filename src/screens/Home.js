import tron from 'reactotron-react-native';

import React from 'react';

import {
  View,
  Text,
  SafeAreaView,
  ScrollView
} from 'react-native';

import {
  List,
  TouchableRipple
} from 'react-native-paper';

import api from '../utils/api';
import EventCard from '../components/EventCard/EventCard';

const Home = ({ navigation }) => {
  const [events, setEvents] = React.useState(null);
  const [eventsLoading, setEventsLoading] = React.useState(true);

  React.useEffect(() => {
    async function getEvents() {
      const eventList = await api.get('/events');
      setEvents(eventList);
      setEventsLoading(false);
    }

    getEvents();
  }, []);

  return (
    <SafeAreaView>
      {!eventsLoading &&
        <ScrollView>
          <List.Section style={{ paddingTop: 15, paddingBottom: 15 }}>
            {events.map((event, i) => <EventCard key={i} event={event} />)}
          </List.Section>
        </ScrollView>
      }
    </SafeAreaView>
  );
}

export default Home;
