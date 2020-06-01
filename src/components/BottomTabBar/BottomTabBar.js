import React from 'react';

import {
  View,
  TouchableWithoutFeedback
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

export default ({ state, descriptors, navigation }) => {
  return (
    <View style={{ flexDirection: 'row', height: 50, alignItems: 'center', justifyContent: 'space-around' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableWithoutFeedback
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <Icon
              name={options.tabBarIcon}
              theme={options.iconTheme}
              size={26}
              style={{ color: isFocused ? '#007bff' : '#868e96', paddingLeft: 40, paddingRight: 40 }}
            />
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};