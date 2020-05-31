import React from 'react';

import {
  StyleSheet,
  View,
  ScrollView
} from 'react-native';

import {
  Text,
  List
} from 'react-native-paper';

const FieldIcon = ({ containerStyle, icon, color, size }) => (
  <View style={{ ...containerStyle, borderRadius: 4 }}>
    <List.Icon icon={icon} color={color} />
  </View>
);

export default ({ navigateToStudyFieldEvents }) => (
  <ScrollView style={{ paddingTop: 15, paddingBottom: 15 }}>
    <Text style={styles.searchTitle}>Busque por área</Text>
    <List.Section style={{ paddingRight: 10, paddingLeft: 10, paddingBottom: 20 }}>
      <List.Item
        title="Admnistração"
        titleStyle={{ ...styles.itemText, color: '#fb7906' }}
        style={{ borderBottomColor: 'rgba(0, 0, 0, 0.1)', borderBottomWidth: 1 }}
        onPress={() => navigateToStudyFieldEvents(1)}
        left={() => <FieldIcon containerStyle={{ backgroundColor: 'rgba(251,121,6, 0.3)' }} color='#fb7906' icon={require('../../assets/img/fields/administracao.png')} />}
      />
      <List.Item
        title="Educação"
        titleStyle={{ ...styles.itemText, color: '#188c32' }}
        style={{ borderBottomColor: 'rgba(0, 0, 0, 0.1)', borderBottomWidth: 1 }}
        onPress={() => navigateToStudyFieldEvents(2)}
        left={() => <FieldIcon containerStyle={{ backgroundColor: 'rgba(24, 140, 50, 0.3)' }} color='#188c32' icon={require('../../assets/img/fields/educacao.png')} />}
      />
      <List.Item
        title="Formação Geral"
        titleStyle={{ ...styles.itemText, color: '#17c671' }}
        style={{ borderBottomColor: 'rgba(0, 0, 0, 0.1)', borderBottomWidth: 1 }}
        onPress={() => navigateToStudyFieldEvents(3)}
        left={() => <FieldIcon containerStyle={{ backgroundColor: 'rgba(23,198,113,0.3)' }} color='#17c671' icon={require('../../assets/img/fields/formacao-geral.png')} />}
      />
      <List.Item
        title="Matemática"
        titleStyle={{ ...styles.itemText, color: '#007bff' }}
        style={{ borderBottomColor: 'rgba(0, 0, 0, 0.1)', borderBottomWidth: 1 }}
        onPress={() => navigateToStudyFieldEvents(4)}
        left={() => <FieldIcon containerStyle={{ backgroundColor: 'rgba(0, 123, 255,0.3)' }} color='#007bff' icon={require('../../assets/img/fields/matematica.png')} />}
      />
      <List.Item
        title="Nutrição"
        titleStyle={{ ...styles.itemText, color: '#868e96' }}
        style={{ borderBottomColor: 'rgba(0, 0, 0, 0.1)', borderBottomWidth: 1 }}
        onPress={() => navigateToStudyFieldEvents(5)}
        left={() => <FieldIcon containerStyle={{ backgroundColor: 'rgba(134, 142, 150, 0.3)' }} color='#868e96' icon={require('../../assets/img/fields/nutricao.png')} />}
      />
      <List.Item
        title="Odontologia"
        titleStyle={{ ...styles.itemText, color: '#674eec' }}
        style={{ borderBottomColor: 'rgba(0, 0, 0, 0.1)', borderBottomWidth: 1 }}
        onPress={() => navigateToStudyFieldEvents(6)}
        left={() => <FieldIcon containerStyle={{ backgroundColor: 'rgba(103, 78, 236,0.3)' }} color='#674eec' icon={require('../../assets/img/fields/odontologia.png')} />}
      />
      <List.Item
        title="Outros"
        titleStyle={{ ...styles.itemText, color: '#c4183c' }}
        style={{ borderBottomColor: 'rgba(0, 0, 0, 0.1)', borderBottomWidth: 1 }}
        onPress={() => navigateToStudyFieldEvents(7)}
        left={() => <FieldIcon containerStyle={{ backgroundColor: 'rgba(196, 24, 60,0.3)' }} color='#c4183c' icon={require('../../assets/img/fields/outros.png')} />}
      />
      <List.Item
        title="Psicologia"
        titleStyle={{ ...styles.itemText, color: '#00b8d8' }}
        style={{ borderBottomColor: 'rgba(0, 0, 0, 0.1)', borderBottomWidth: 1 }}
        onPress={() => navigateToStudyFieldEvents(8)}
        left={() => <FieldIcon containerStyle={{ backgroundColor: 'rgba(0, 184, 216,0.3)' }} color='#00b8d8' icon={require('../../assets/img/fields/psicologia.png')} />}
      />
      <List.Item
        title="Tecnologia e Produção"
        titleStyle={{ ...styles.itemText, color: '#674eec' }}
        style={{ borderBottomColor: 'rgba(0, 0, 0, 0.1)', borderBottomWidth: 1 }}
        onPress={() => navigateToStudyFieldEvents(9)}
        left={() => <FieldIcon containerStyle={{ backgroundColor: 'rgba(103, 78, 236,0.3)' }} color='#674eec' icon={require('../../assets/img/fields/tecnologia.png')} />}
      />
      <List.Item
        title="Recursos Humanos"
        titleStyle={{ ...styles.itemText, color: '#fb7906' }}
        style={{ borderBottomColor: 'rgba(0, 0, 0, 0.1)', borderBottomWidth: 1 }}
        onPress={() => navigateToStudyFieldEvents(10)}
        left={() => <FieldIcon containerStyle={{ backgroundColor: 'rgba(251,121,6, 0.3)' }} color='#fb7906' icon={require('../../assets/img/fields/recursos-humanos.png')} />}
      />
      <List.Item
        title="Serviço Social"
        titleStyle={{ ...styles.itemText, color: '#c4183c' }}
        style={{ borderBottomColor: 'rgba(0, 0, 0, 0.1)', borderBottomWidth: 1 }}
        onPress={() => navigateToStudyFieldEvents(11)}
        left={() => <FieldIcon containerStyle={{ backgroundColor: 'rgba(196, 24, 60,0.3)' }} color='#c4183c' icon={require('../../assets/img/fields/servico-social.png')} />}
      />
    </List.Section>
  </ScrollView>
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