import React from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';
import {
  TouchableRipple,
  Dialog,
  Portal,
  Text,
  RadioButton
} from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';

const FilterPicker = ({
  containerStyle,
  style,
  placeholderText,
  placeholderTextStyle,
  icon,
  iconStyle,
  iconSize,
  dialogTitle,
  radioButtonColor,
  items,
  selectedValue,
  onValueChange
}) => {
  const [dialogVisible, setDialogVisible] = React.useState(false);

  const radioChangeValue = (value) => {
    onValueChange(value);
    return setDialogVisible(false);
  }

  return (
    <View style={containerStyle}>
      <View style={[style, styles.container]}>
        <TouchableRipple
          onPress={() => setDialogVisible(true)}
          rippleColor="rgba(0, 0, 0, .32)"
        >
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', padding: 5 }}>
            <Text style={{ ...placeholderTextStyle, fontSize: 16, color: '#fff', fontFamily: 'Raleway-Regular', paddingRight: 3 }}>
              {placeholderText}
            </Text>
            {icon ? icon :
              <FeatherIcon
                name='chevron-down'
                size={iconSize || 18}
                style={{ ...iconStyle, color: '#fff' }}
              />
            }
          </View>
        </TouchableRipple>
        <Portal>
          <Dialog
            visible={dialogVisible}
            onDismiss={() => setDialogVisible(false)}
          >
            <Dialog.Title style={{ fontFamily: 'Raleway-Bold', }}>{dialogTitle || "Selecione uma opção"}</Dialog.Title>
            <Dialog.Content>
              {items.map((item, i) => (
                <TouchableRipple
                  key={i}
                  onPress={() => radioChangeValue(item)}
                  rippleColor="rgba(0, 0, 0, .32)"
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton
                      value={item.value}
                      status={selectedValue.value === item.value ? "checked" : "unchecked"}
                      color={radioButtonColor || '#007bff'}
                    />
                    <Text style={{ fontSize: 18, color: '#212529', fontFamily: 'Roboto-Regular' }}>{item.label}</Text>
                  </View>
                </TouchableRipple>
              ))}
            </Dialog.Content>
          </Dialog>
        </Portal>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#007bff',
    borderRadius: 3,
  }
});

export default FilterPicker;
