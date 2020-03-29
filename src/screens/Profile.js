import React from 'react';

import {
  View,
} from 'react-native';
import {
  Button,
} from 'react-native-paper';

import AuthContext from '../context/AuthContext';

export default ({ }) => {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View>
      <Button mode="contained" onPress={signOut}>Desconectar</Button>
    </View>
  );
}
