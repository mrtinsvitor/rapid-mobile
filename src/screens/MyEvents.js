import tron from 'reactotron-react-native';
import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  RefreshControl
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
  const [refreshing, setRefreshing] = React.useState(false);

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
    if (user !== null) {
      getEnrollments();
    }
  }, [user]);

  React.useEffect(() => {
    // if (!activeEnrollments.length) return;

    const enrolledEvents = activeEnrollments.map((enrollment) => enrollment.event);
    setEvents(enrolledEvents);
  }, [activeEnrollments]);

  const getEnrollments = async () => {
    try {
      const enrollments = await api.get(`/students/find-all-enrollments/student/${user.id}`);

      setActiveEnrollments(enrollments.filter(enrollment => !enrollment.participationDate));
    } catch (error) {
      tron.log('{ERROR [getEnrollments]}', error)
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    getEnrollments().then(() => setRefreshing(false)).catch(err => tron.log('errr', err))
  }, [refreshing]);

  const goToEvent = (data) => {
    return navigation.navigate('Meu Evento', { data });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <ActivityIndicator animating={isLoading} style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} hidesWhenStopped /> */}

      {!isLoading &&
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

          {!events.length &&
            <Text style={{ textAlign: 'center', alignSelf: 'center', flex: 1, fontSize: 18, fontFamily: 'Roboto-Regular' }}>
              Você ainda não se inscreveu em nenhum evento.
            </Text>
          }

          <List.Section style={{ paddingTop: 15, paddingBottom: 15 }}>
            {events.map((event, i) => <EventCard key={i} event={event} presenceCheck goToEvent={goToEvent} />)}
          </List.Section>
        </ScrollView>
      }
    </SafeAreaView>
  );
}
