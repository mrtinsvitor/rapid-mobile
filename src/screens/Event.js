import tron from 'reactotron-react-native';

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
} from 'react-native';

import {
  Caption,
  Title,
  Text,
  Badge,
  Avatar,
  Divider
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
      headerTitleContainerStyle: { width: '70%' }
    });
  }, [navigation]);

  return (
    <SafeAreaView>
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


            <Divider style={{ marginTop: 10, marginBottom: 10 }} />

            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', left: -5 }}>
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
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}