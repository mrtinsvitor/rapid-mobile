import tron from 'reactotron-react-native';
import React from 'react';

import {
  View,
  SafeAreaView,
  ScrollView
} from 'react-native';
import {
  ActivityIndicator,
  Text,
  List
} from 'react-native-paper';

import api from '../utils/api';
import storage from '../utils/storage';

import EventCard from '../components/EventCard';

export default ({ navigation }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);
  const [activeEnrollments, setActiveEnrollments] = React.useState([]);
  const [events, setEvents] = React.useState([]);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    async function getStorageUser() {
      const storageUser = await storage.getItem('@user');
      setUser(storageUser);
    }

    getStorageUser();
  }, []);

  React.useEffect(() => {
    async function getEnrollments() {
      try {
        const enrollments = await api.get(`/students/find-all-enrollments/student/${user.id}`);

        setActiveEnrollments(enrollments.filter(enrollment => !enrollment.participationDate));
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    if (user !== null) {
      getEnrollments();
    }
  }, [user]);

  React.useEffect(() => {
    if (!activeEnrollments.length) return;

    const enrolledEvents = activeEnrollments.map((enrollment) => enrollment.event);
    setEvents(enrolledEvents);

  }, [activeEnrollments]);

  const goToEvent = (data) => {
    return navigation.navigate('Meu Evento', { data, presenceCheck: true });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ActivityIndicator animating={isLoading} style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} hidesWhenStopped />

      {error && <Text style={{ textAlign: 'center', alignSelf: 'center', flex: 1, fontSize: 18, fontFamily: 'Roboto-Regular' }}>Ocorreu um erro</Text>}

      {!isLoading && !events.length &&
        <Text style={{ textAlign: 'center', alignSelf: 'center', flex: 1, fontSize: 18, fontFamily: 'Roboto-Regular' }}>
          Você ainda não se inscreveu em nenhum evento.
        </Text>
      }

      {!isLoading && events.length > 0 &&
        <ScrollView>
          <List.Section style={{ paddingTop: 15, paddingBottom: 15 }}>
            {events.map((event, i) => <EventCard key={i} event={event} presenceCheck goToEvent={goToEvent} />)}
          </List.Section>
        </ScrollView>
      }
    </SafeAreaView>
  );
}
