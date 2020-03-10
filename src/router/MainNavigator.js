import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  View
} from 'react-native';
import {
  Layout,
  Spinner,
} from '@ui-kitten/components';

import AuthContext from '../context/AuthContext';

import AppNavigator from './navigators/AppNavigator';
import AuthStackNavigator from './navigators/AuthStackNavigator';

import api from '../utils/api';

export default () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const getUser = async () => {
      const subscriber = auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
          setUser(firebaseUser);
        }

        setIsLoading(false);
      });

      return subscriber; // unsubscribe on unmount
    }

    getUser();
  }, []);

  const authContext = React.useMemo(() => {
    return {
      signIn: async (email, password) => {
        console.log(email)
        try {
          const firebaseUser = await auth().signInWithEmailAndPassword(email, password);
          console.log('[[GET USER FIREBASE]]', firebaseUser);
          // const user = await api.get('/students/find-by-email', { email: firebaseUser.user.email });
          console.log('{USER}: ', user);

          setUser(firebaseUser);
        } catch (error) {
          console.warn('[ERROR]: ', error);
        }

        setIsLoading(false);
      },
      signUp: () => {
        setIsLoading(false);
        setUserToken("asdf");
      },
      signOut: async () => {
        setIsLoading(true);
        await auth().signOut();
        setUser(null);
        await AsyncStorage.clear();
        setIsLoading(false);
      }
    };
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
        {user ? (<AppNavigator />) : (<AuthStackNavigator />)}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
