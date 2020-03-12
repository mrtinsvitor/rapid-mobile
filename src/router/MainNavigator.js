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
import OverlaySpinner from 'react-native-loading-spinner-overlay';

import AuthContext from '../context/AuthContext';

import AppNavigator from './navigators/AppNavigator';
import AuthStackNavigator from './navigators/AuthStackNavigator';

import api from '../utils/api';

export default () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadingAuth, setIsLoadingAuth] = React.useState(false);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const getUser = async () => {
      const subscriber = auth().onAuthStateChanged(firebaseUser => {
        if (!firebaseUser) {
          console.warn('[NÃO POSSUI FIREBASE USER]: ', firebaseUser);
          setUser(null);
          return;
        }

        let user = AsyncStorage.getItem('@user');
        if (!user) {
          console.warn('[NÃO POSSUI USUÁRIO NO STORAGE]: ', user);
          user = getUserByEmail(firebaseUser.email);
        }

        setUser(user);
      });

      setIsLoading(false);
      return subscriber; // unsubscribe on unmount
    }

    getUser();
  }, []);

  const authContext = React.useMemo(() => {
    return {
      signIn: async (email, password) => {
        setIsLoadingAuth(true);
        try {
          const user = await api.get('/students/find-by-email', { email });
          if (!user) {
            return Alert.alert(
              'Usuário ou senha incorretos',
              'Tente novamente',
              [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
              ],
              { cancelable: true },
            );
          }

          const firebaseUser = await auth().signInWithEmailAndPassword(email, password);
          console.debug('[[GET USER FIREBASE]]', firebaseUser);

          setIsLoadingAuth(false);
          setUser(firebaseUser);
        } catch (error) {
          console.warn('[ERROR signIn]: ', error);
        }
      },
      signUp: () => {
        setIsLoading(false);
        setUserToken("asdf");
      },
      signOut: async () => {
        await authSignOut();
        setIsLoading(false);
      }
    };
  }, []);

  const authSignOut = async () => {
    await auth().signOut();
    await AsyncStorage.clear();

    setUser(null);
  }

  const getUserByEmail = async (email) => {
    try {
      const user = await api.get('/students/find-by-email', { email });
      if (!user) {
        return authSignOut();
      }

      await AsyncStorage.setItem('@user', user);

      return user;
    } catch (error) {
      console.log('[ERROR getUserByEmail] ', error);
      return null;
    }
  }

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
        {user ?
          (<AppNavigator />) :
          (
            <>
              {isLoadingAuth && 
                <OverlaySpinner
                  visible={true}
                  textContent={'Loading...'}
                />
              }
              <AuthStackNavigator />
            </>
          )
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
