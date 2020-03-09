import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import {
  View
} from 'react-native';
import {
  Layout,
  Spinner,
} from '@ui-kitten/components';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthContext from '../context/AuthContext';

import AppNavigator from './navigators/AppNavigator';
import AuthStackNavigator from './navigators/AuthStackNavigator';

import api from '../utils/api';

export default () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  const authContext = React.useMemo(() => {
    return {
      signIn: async (email, password) => {
        try {
          const user = await api.get('/students/find-by-email', { email });

          if (user) {
            await AsyncStorage.setItem('@user', JSON.stringify(user));
            setUserToken(user);
          }

        } catch (error) {
          console.log('[ERROR]: ', error);
        }

        setIsLoading(false);
      },
      signUp: () => {
        setIsLoading(false);
        setUserToken("asdf");
      },
      signOut: async () => {
        setIsLoading(true);
        setUserToken(null);
        await AsyncStorage.clear();
        setIsLoading(false);
      }
    };
  }, []);

  React.useEffect(() => {
    const getUserFromStorage = async () => {
      const user = await AsyncStorage.getItem('@user');

      if (user) {
        setUserToken(user);
      }

      setIsLoading(false);
    }

    getUserFromStorage();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignSelf: 'center' }}>
        <Spinner size='giant' />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userToken ? (<AppNavigator />) : (<AuthStackNavigator />)}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
