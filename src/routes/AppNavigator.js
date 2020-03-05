import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MainStackNavigator from './MainStackNavigator';

const AppNavigator = () => (
  <NavigationContainer>
    <MainStackNavigator />
  </NavigationContainer>
);

export default AppNavigator;