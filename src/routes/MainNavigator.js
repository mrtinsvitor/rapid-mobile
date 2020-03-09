import React from 'react';
import {
  Layout,
  Spinner,
} from '@ui-kitten/components';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthContext from '../context/AuthContext';

import AppNavigator from './navigators/AppNavigator';
import AuthStackNavigator from './navigators/AuthStackNavigator';

const RootStack = createStackNavigator();

export default () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  const authContext = React.useMemo(() => {
    return {
      signIn: () => {
        setIsLoading(false);
        setUserToken("asdf");
      },
      signUp: () => {
        setIsLoading(false);
        setUserToken("asdf");
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      }
    };
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Spinner size='giant' />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStack.Navigator>
          {userToken ? (
            <RootStack.Screen
              name="App"
              component={AppNavigator}
              screenOptions={{}}
              options={{
                headerShown: false
              }}
            />
          ) : (
              <RootStack.Screen
                name="Auth"
                component={AuthStackNavigator}
                options={{
                  headerShown: false,
                  animationEnabled: false
                }}
              />
            )}
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
