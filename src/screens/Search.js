import tron from 'reactotron-react-native';
import React from 'react';

import {
  SafeAreaView,
  View
} from 'react-native';

import {
  ActivityIndicator,
  Text,
  Searchbar,
  Button
} from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default ({ navigation }) => {
  const [eventsLoading, setEventsLoading] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{paddingRight: 40}}>
          <Searchbar
            placeholder="Search"
            style={{ width: 300, height: 35 }}
            inputStyle={{ padding: 0 }}
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        </View>
      ),
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('Filtros Busca')}
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 5,
            paddingBottom: 5
          }}
        >
          <FeatherIcon
            name='sliders'
            size={24}
            style={{ color: '#fff' }}
          />
        </Button>
      )
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ActivityIndicator animating={eventsLoading} style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} hidesWhenStopped />

    </SafeAreaView>
  );
}
