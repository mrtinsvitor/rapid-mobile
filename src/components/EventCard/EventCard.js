import tron from 'reactotron-react-native';

import React from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  View,
  TouchableHighlight
} from 'react-native';

import {
  Card,
  Title,
  Paragraph,
  Badge,
  Text,
  TouchableRipple,
  IconButton
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { formatDateToDayMonth } from '../../utils/date';

export default ({ event, presenceCheck, goToEvent }) => {
  const navigation = useNavigation();
  const { studyField, local } = event;
  tron.log('event card', event)

  return (
    <View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 7, paddingBottom: 7 }}>
      <Card style={{ borderRadius: 25 }}>
        <TouchableRipple
          onPress={() => goToEvent(event)}
          rippleColor="rgba(0, 0, 0, .32)"
          borderless
        >
          <View style={{ flex: 1 }}>
            <View style={{ paddingLeft: 5, paddingRight: 15 }}>

              <Title
                style={{ fontFamily: 'Poppins-Medium', lineHeight: 20, fontSize: 16, paddingLeft: 15, paddingRight: 15, paddingTop: 10, paddingBottom: 10 }}
              >
                {event.name}
              </Title>

              <View style={{ flexDirection: 'row', paddingLeft: 15, marginBottom: 5 }}>
                <Badge style={{ backgroundColor: '#007bff', fontFamily: 'Raleway-Regular', fontSize: 12, }} size={22}>{studyField.name}</Badge>
                <View style={{ marginLeft: 15 }}>
                  <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 16, }}>de {event.openingHour.substring(0, event.openingHour.length - 3)} às {event.endingHour.substring(0, event.endingHour.length - 3)}</Text>
                </View>
              </View>

              <View>
                <Paragraph numberOfLines={2} style={{ marginLeft: 20, marginRight: 20, fontFamily: 'Poppins-Regular' }}>{event.description}</Paragraph>
              </View>
            </View>


            <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'column', justifyContent: 'center', alignContent: 'center', paddingBottom: 10, paddingTop: 10, paddingLeft: 22, paddingRight: 22, width: '80%', }}>
                <View style={{ flexDirection: 'row' }}>
                  <Icon name="calendar" size={20} color="#007bff" />
                  <Text style={{ fontFamily: 'Raleway-Regular', paddingLeft: 2, top: 3 }}>
                    {formatDateToDayMonth(event.eventDate)}
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', width: '80%', paddingTop: 3 }}>
                  <Icon name="map-marker" size={20} color="#007bff" />
                  <Text style={{ fontFamily: 'Raleway-Regular', paddingLeft: 2, top: 3, }} numberOfLines={2} adjustsFontSizeToFit>{local.name}</Text>
                </View>
              </View>


              {presenceCheck &&
                <View>
                  <IconButton icon="qrcode-scan" color="#17c671" size={40} onPress={() => navigation.navigate('QRCode', { event })} borderless />
                </View>
              }
            </View>

          </View>
        </TouchableRipple>
      </Card>
    </View>
  );
}