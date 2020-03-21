import tron from 'reactotron-react-native';

import React from 'react';

import {
  View
} from 'react-native';

import {
  List,
  Card,
  Button,
  Title,
  Paragraph,
  Badge,
  Text,
  Chip,
  Divider,
  TouchableRipple
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { formatDateToDayMonth } from '../../utils/date';

export default ({ event }) => (
  <Card style={{ marginBottom: 10, borderTopLeftRadius: 25, borderBottomLeftRadius: 25, width: 395, alignSelf: 'flex-end' }}>
    <TouchableRipple
      onPress={() => tron.log('Pressed')}
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
            <Badge style={{ backgroundColor: '#007bff', fontFamily: 'Raleway-Regular', fontSize: 12 }} size={22}>Publicidade e Propaganda</Badge>
            <View style={{ marginLeft: 15 }}>
              <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 16 }}>de {event.openingHour.substring(0, event.openingHour.length - 3)} às {event.endingHour.substring(0, event.endingHour.length - 3)}</Text>
            </View>
          </View>

          <View>
            <Paragraph numberOfLines={2} style={{ marginLeft: 20, marginRight: 20, fontFamily: 'Poppins-Regular' }}>{event.description}</Paragraph>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10, paddingTop: 3 }}>
          <View style={{ paddingLeft: 15, flexDirection: 'row' }}>
            <Icon name="map-marker" size={20} />
            <Text style={{ fontFamily: 'Raleway-Regular', paddingLeft: 2, top: 3 }} adjustsFontSizeToFit>Cinema 2 - Shopping Unigranrio</Text>
          </View>

          <View style={{ backgroundColor: '#dddddd', borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }}>
            <Text style={{ color: '#000', fontWeight: "600", fontSize: 15, padding: 3, paddingLeft: 15, paddingRight: 10, fontFamily: 'Raleway-Medium' }}>
              {formatDateToDayMonth(event.eventDate)}
            </Text>
          </View>
        </View>

      </View>
    </TouchableRipple>
  </Card>
);
