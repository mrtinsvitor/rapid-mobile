import React from 'react';
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
import storage from '../utils/storage';

export default () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadingAuth, setIsLoadingAuth] = React.useState(false);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const getUser = async () => {
      const subscriber = await auth().onAuthStateChanged(async firebaseUser => {
        if (!firebaseUser) {
          setUser(null);
          setIsLoading(false);
          return;
        }

        let user = await storage.getItem('@user');
        if (!user) {
          user = await getUserByEmail(firebaseUser.email);
        }
        
        setIsLoading(false);
        setUser(user);
      });

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
    await storage.clear();

    setUser(null);
  }

  const getUserByEmail = async (email) => {
    try {
      const user = await api.get('/students/find-by-email', { email });
      if (!user) {
        return authSignOut();
      }

      await storage.setItem('@user', user);

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
