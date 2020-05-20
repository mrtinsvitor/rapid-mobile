import React from 'react';

import {
  View,
} from 'react-native';

import {
  Button
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import FilterPicker from '../FilterPicker';

export default ({ filterEvents, resetEvents }) => {
  const [turnoSelect, setTurnoSelect] = React.useState({});
  const [dateSelect, setDateSelect] = React.useState({});
  const [pagamentoSelect, setPagamentoSelect] = React.useState({});

  React.useEffect(() => {
    filterEvents({ shift: turnoSelect.value, date: dateSelect.value, payment: pagamentoSelect.value });
  }, [turnoSelect, dateSelect, pagamentoSelect])

  const clearFilters = () => {
    setTurnoSelect({});
    setDateSelect({});
    setPagamentoSelect({});

    return resetEvents();
  }

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
          placeholderText={dateSelect.label || "Data"}
          selectedValue={dateSelect}
          onValueChange={setDateSelect}
          items={[
            { label: 'Essa Semana', value: 'semana' },
            { label: 'Esse Mês', value: 'mes' },
            { label: 'Esse Semestre', value: 'semestre' },
          ]}
        />

        <FilterPicker
          containerStyle={{}}
          placeholderText={pagamentoSelect.label || "Pagamento"}
          style={{ width: 120 }}
          selectedValue={pagamentoSelect}
          onValueChange={setPagamentoSelect}
          items={[
            { label: 'Grátis', value: 'gratis' },
            { label: 'Pago', value: 'pago' },
          ]}
        />

        {turnoSelect.value || dateSelect.value || pagamentoSelect.value ?
          <View>
            <Button onPress={() => clearFilters()} style={{ bottom: 10 }}>
              <Icon
                name="filter-remove"
                size={26}
                style={{ color: '#007bff', }}
              />
            </Button>
          </View> : <></>
        }
      </View>
    </View>
  );
}