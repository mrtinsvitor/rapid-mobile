import React from 'react';

import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

export default (right) => (
  {
    headerStyle: {
      backgroundColor: '#007bff',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontFamily: 'Raleway-Bold',
    },
    headerTitleAlign: "center",
    headerRight: right ? () => (
      <Button
        onPress={right.rightButton}
        style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5 }}
      >
        <Icon
          name={right.rightIcon}
          size={24}
          style={{ color: '#fff' }}
        />
      </Button>
    ) : null
  }
)