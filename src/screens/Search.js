import tron from 'reactotron-react-native';
import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';

import {
  ActivityIndicator,
  Text,
  Searchbar,
  Button,
  List,
  Divider
} from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default ({ navigation }) => {
  const [eventsLoading, setEventsLoading] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ paddingRight: 40 }}>
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
      {/* <ActivityIndicator animating={eventsLoading} style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} hidesWhenStopped /> */}

      <ScrollView style={{ paddingTop: 15, paddingBottom: 15 }}>
        <Text style={styles.searchTitle}>Busque por área</Text>
        <List.Section style={{ paddingRight: 10, paddingLeft: 10 }}>
          <List.Item
            title="Ciências Agrárias"
            titleStyle={{ ...styles.itemText, color: '#fb7906' }}
            style={{ borderBottomColor: 'rgba(0, 0, 0, 0.1)', borderBottomWidth: 1 }}
            onPress={() => console.log('TO DO')}
            left={() => <FieldIcon containerStyle={{ backgroundColor: 'rgba(251,121,6, 0.3)' }} color='#fb7906' icon={require('../assets/img/fields/agraria.png')} />}
          />
          <List.Item
            title="Ciências Biológicas"
            titleStyle={{ ...styles.itemText, color: '#188c32' }}
            style={{ borderBottomColor: 'rgba(0, 0, 0, 0.1)', borderBottomWidth: 1 }}
            onPress={() => console.log('TO DO')}
            left={() => <FieldIcon containerStyle={{ backgroundColor: 'rgba(24, 140, 50, 0.3)' }} color='#188c32' icon={require('../assets/img/fields/biologicas.png')} />}
          />
          <List.Item
            title="Ciências da Saúde"
            titleStyle={{ ...styles.itemText, color: '#17c671' }}
            style={{ borderBottomColor: 'rgba(0, 0, 0, 0.1)', borderBottomWidth: 1 }}
            left={() => <FieldIcon containerStyle={{ backgroundColor: 'rgba(23,198,113,0.3)' }} color='#17c671' icon={require('../assets/img/fields/saude.png')} />}
          />
          <List.Item
            title="Ciências Exatas e da Terra"
            titleStyle={{ ...styles.itemText, color: '#007bff' }}
            style={{ borderBottomColor: 'rgba(0, 0, 0, 0.1)', borderBottomWidth: 1 }}
            left={() => <FieldIcon containerStyle={{ backgroundColor: 'rgba(0, 123, 255,0.3)' }} color='#007bff' icon={require('../assets/img/fields/exatas.png')} />}
          />
          <List.Item
            title="Ciências Humanas"
            titleStyle={{ ...styles.itemText, color: '#868e96' }}
            style={{ borderBottomColor: 'rgba(0, 0, 0, 0.1)', borderBottomWidth: 1 }}
            left={() => <FieldIcon containerStyle={{ backgroundColor: 'rgba(134, 142, 150, 0.3)' }} color='#868e96' icon={require('../assets/img/fields/humanas.png')} />}
          />
          <List.Item
            title="Ciências Sociais Aplicadas"
            titleStyle={{ ...styles.itemText, color: '#674eec' }}
            style={{ borderBottomColor: 'rgba(0, 0, 0, 0.1)', borderBottomWidth: 1 }}
            left={() => <FieldIcon containerStyle={{ backgroundColor: 'rgba(103, 78, 236,0.3)' }} color='#674eec' icon={require('../assets/img/fields/sociais.png')} />}
          />
          <List.Item
            title="Engenharias"
            titleStyle={{ ...styles.itemText, color: '#c4183c' }}
            style={{ borderBottomColor: 'rgba(0, 0, 0, 0.1)', borderBottomWidth: 1 }}
            left={() => <FieldIcon containerStyle={{ backgroundColor: 'rgba(196, 24, 60,0.3)' }} color='#c4183c' icon={require('../assets/img/fields/engenharia.png')} />}
          />
          <List.Item
            title="Linguística, Letras E Artes"
            titleStyle={{ ...styles.itemText, color: '#00b8d8' }}
            style={{ borderBottomColor: 'rgba(0, 0, 0, 0.1)', borderBottomWidth: 1 }}
            left={() => <FieldIcon containerStyle={{ backgroundColor: 'rgba(0, 184, 216,0.3)' }} color='#00b8d8' icon={require('../assets/img/fields/linguistica.png')} />}
          />
        </List.Section>
      </ScrollView>
    </SafeAreaView>
  );
}

const FieldIcon = ({ containerStyle, icon, color, size }) => (
  <View style={{ ...containerStyle, borderRadius: 4 }}>
    <List.Icon icon={icon} color={color} />
  </View>
);

const styles = StyleSheet.create({
  searchTitle: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    paddingLeft: 10,
    paddingRight: 10,
    color: '#212529',
  },
  itemText: {
    fontFamily: 'Raleway-Medium',
    fontSize: 16
  }
});