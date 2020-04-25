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

import FilterPicker from '../FilterPicker';

export default ({ }) => {
  const [turnoSelect, setTurnoSelect] = React.useState({});
  const [dataSelect, setDataSelect] = React.useState({});
  const [pagamentoSelect, setPagamentoSelect] = React.useState({});

  return (
    <View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 7, paddingBottom: 7 }}>
      <View style={{ flexDirection: 'row' }}>
        <FilterPicker
          containerStyle={{ paddingRight: 15 }}
          placeholderText={turnoSelect.label || "Turno"}
          selectedValue={turnoSelect}
          onValueChange={setTurnoSelect}
          items={[
            { label: 'Manhã', value: 'm' },
            { label: 'Tarde', value: 't' },
            { label: 'Noite', value: 'n' },
          ]}
        />

        <FilterPicker
          containerStyle={{ paddingRight: 15 }}
          placeholderText={dataSelect.label || "Data"}
          selectedValue={dataSelect}
          onValueChange={setDataSelect}
          items={[
            { label: 'Essa Semana', value: 'semana' },
            { label: 'Esse Mês', value: 'mes' },
            { label: 'Esse Semestre', value: 'semestre' },
          ]}
        />

        <FilterPicker
          containerStyle={{ paddingRight: 15 }}
          placeholderText={pagamentoSelect.label || "Pagamento"}
          style={{ width: 120 }}
          selectedValue={pagamentoSelect}
          onValueChange={setPagamentoSelect}
          items={[
            { label: 'Grátis', value: 'gratis' },
            { label: 'Pago', value: 'pago' },
          ]}
        />
      </View>
    </View>
  );
}