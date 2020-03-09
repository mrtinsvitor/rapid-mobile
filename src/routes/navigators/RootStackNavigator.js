import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import AuthStackNavigator from './AuthStackNavigator';
import AppNavigator from './AppNavigator';

const RootStack = createStackNavigator();

export default ({ userToken }) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={AppNavigator}
        options={{
          animationEnabled: false
        }}
      />
    ) : (
        <RootStack.Screen
          name="Auth"
          component={AuthStackNavigator}
          options={{
            animationEnabled: false
          }}
        />
      )}
  </RootStack.Navigator>
);