import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View
} from 'react-native';

import {
  Searchbar,
} from 'react-native-paper';

import SearchEventsAreas from '../components/SearchEventsAreas';


export default ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ paddingRight: 40 }}>
          <Searchbar
            placeholder="Pesquisar..."
            style={{ width: 300, height: 35, marginLeft: 20 }}
            inputStyle={{ padding: 0 }}
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        </View>
      ),
      // headerRight: () => (
      //   <Button
      //     onPress={() => navigation.navigate('Filtros Busca')}
      //     style={{
      //       paddingLeft: 10,
      //       paddingRight: 10,
      //       paddingTop: 5,
      //       paddingBottom: 5
      //     }}
      //   >
      //     <FeatherIcon
      //       name='sliders'
      //       size={24}
      //       style={{ color: '#fff' }}
      //     />
      //   </Button>
      // )
    });
  }, []);

  const navigateToStudyFieldEvents = async (studyFieldId) =>
    navigation.navigate('Resultados Pesquisa', { studyFieldId });


  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <ActivityIndicator animating={eventsLoading} style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} hidesWhenStopped /> */}

      <SearchEventsAreas navigateToStudyFieldEvents={navigateToStudyFieldEvents} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
});