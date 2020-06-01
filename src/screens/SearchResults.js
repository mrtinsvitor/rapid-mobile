import tron from 'reactotron-react-native';

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import {
  List,
  ActivityIndicator,
  Text,
  Searchbar,
} from 'react-native-paper';

import EventCard from '../components/EventCard';

import api from '../utils/api';

export default ({ navigation, route }) => {
  const studyFieldId = route.params.studyFieldId;

  const [error, setError] = React.useState(null);
  const [events, setEvents] = React.useState([]);
  const [eventsLoading, setEventsLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ paddingRight: 40 }}>
          <Searchbar
            placeholder="Pesquisar..."
            style={{ width: 280, height: 35, marginLeft: 50 }}
            inputStyle={{ padding: 0 }}
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        </View>
      ),
    });
  }, []);

  React.useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    try {
      const eventList = await api.get(`/events/find-by-field/${studyFieldId}/up-next`);

      if (eventList.length) {
        const sortedEventList = await eventList
          .filter(el => new Date(el.eventDate) >= new Date())
          .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));

        setEvents(sortedEventList);
      }

      setEventsLoading(false);
    } catch (e) {
      tron.log('[ERROR getEvents()]: ', e);
      setError(true);
    }
  }

  const goToEvent = (data) =>
    navigation.navigate('Evento', { data });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {eventsLoading &&
        <ActivityIndicator animating={eventsLoading} style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} hidesWhenStopped />}

      {!eventsLoading && events.length > 0 &&
        <ScrollView>
          <List.Section style={{ paddingTop: 15, paddingBottom: 15 }}>
            <Text style={styles.titleEvents}>Eventos em {events[0].studyField.name}</Text>

            {!eventsLoading && events.length === 0 ?
              <Text style={styles.errorMsg}>Não foi encontrado nenhum evento</Text> 
              :
              <View>
                {/* <EventFilters /> */}
                {events.map((event, i) => <EventCard key={i} event={event} goToEvent={goToEvent} presenceCheck={event.studentEventEnrollment ? true : false} />)}
              </View>
            }
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
    fontSize: 18,
    flex: 1,
    fontFamily: 'Roboto-Regular',
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