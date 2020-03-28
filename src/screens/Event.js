import tron from 'reactotron-react-native';

import React from 'react';

import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  View,
} from 'react-native';

import {
  Title,
  Text,
  Badge,
  Avatar,
  Divider,
  Button,
  IconButton
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import EventMap from '../components/EventMap';

import eventPlaceholder from '../assets/img/event_placeholder.png';
import avatarPlaceholder from '../assets/img/avatar_placeholder.png';

import { capitalizeWords } from '../utils/string';
import { formatDateToDayMonth } from '../utils/date';

export default ({ route, navigation }) => {
  const { event, course } = route.params.data;
  const { local } = event;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: capitalizeWords(event.name),
      headerTitleContainerStyle: { width: '70%' },
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
              <Badge style={{ backgroundColor: '#0063CC', fontFamily: 'Raleway-Regular', fontSize: 12 }} size={22}>{course.studyField.name}</Badge>
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

      <View style={styles.bottomBar}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{   }}>
            <Text style={{ color: '#000', fontFamily: 'Roboto-Medium', fontSize: 16, textTransform: 'uppercase' }}>{event.enrollmentValue > 0 ? `R$ ${event.enrollmentValue}` : 'Grátis'}</Text>
          </View>

          <View style={{}}>
            <Button
              style={{ backgroundColor: '#007bff', borderRadius: 0 }}
              labelStyle={{fontFamily: 'Roboto-Medium', fontSize: 14}}
              icon="check-bold"
              uppercase
              mode="contained"
              onPress={() => tron.log('click')}
            >
              Inscreva-se
            </Button>
          </View>

        </View>
      </View>

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