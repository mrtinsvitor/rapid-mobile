import tron from 'reactotron-react-native';

import React from 'react';

import {
  View,
  Text,
  Button
} from 'react-native';

import { capitalizeWords } from '../utils/string';

export default ({ route, navigation }) => {
  const { event, local, course } = route.params.data;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: capitalizeWords(event.name),
      headerTitleContainerStyle: { width: '70%' }
    });
  }, [navigation]);

  return (
    <View>
      <Text>{event.name}</Text>
    </View>
  );
}
