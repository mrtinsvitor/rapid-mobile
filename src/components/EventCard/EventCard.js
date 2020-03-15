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

export default ({ event }) => (
  <Card style={{ marginBottom: 10, borderTopLeftRadius: 25, borderBottomLeftRadius: 25, }}>
    <TouchableRipple
      onPress={() => tron.log('Pressed')}
      rippleColor="rgba(0, 0, 0, .32)"
      borderless
    >
      <View style={{ height: 160, flex: 1 }}>

        <View style={{ backgroundColor: '#d6d6d6', borderTopLeftRadius: 15, borderBottomLeftRadius: 15, top: 15, marginBottom: 10, alignSelf: 'flex-end' }}>
          <Text style={{ color: '#000', fontWeight: "600", fontSize: 15, padding: 3, paddingLeft: 20 }}>{event.eventDate}</Text>
        </View>

        <Card.Title title={event.name} style={{}} />

        <View style={{ flexDirection: 'row', paddingLeft: 15 }}>
          <Badge style={{ backgroundColor: '#007bff' }}>Publicidade e Propaganda</Badge>
          <View style={{ marginLeft: 15 }}>
            <Text>de {event.openingHour.substring(0, event.openingHour.length - 3)} às {event.endingHour.substring(0, event.endingHour.length - 3)}</Text>
          </View>
        </View>

        <View>
          <Paragraph numberOfLines={2} style={{ marginLeft: 20, marginRight: 20 }}>{event.description}</Paragraph>
        </View>



      </View>
    </TouchableRipple>
  </Card>
)