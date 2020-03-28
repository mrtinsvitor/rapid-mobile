import tron from 'reactotron-react-native';
import React from "react";
import {
  IconButton
} from 'react-native-paper';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTopBar from '../../components/BottomTabBar';

import Home from '../../screens/Home';
import Profile from '../../screens/Profile';
import Event from '../../screens/Event';

const Tabs = createBottomTabNavigator();
export default () => {
  return (
    <Tabs.Navigator initialRouteName="Home" tabBar={props => <BottomTopBar {...props} />}>
      <Tabs.Screen name="Home" component={HomeStackScreen} />
      <Tabs.Screen name="Perfil" component={ProfileStackScreen} />
      <Tabs.Screen name="Meus Eventos" component={ProfileStackScreen} />
      <Tabs.Screen name="Configurações" component={ProfileStackScreen} />
    </Tabs.Navigator>
  );
};

const HomeStack = createStackNavigator();
const HomeStackScreen = ({ navigation, route }) => {
  if (route.state && route.state.index === 1) {
    navigation.setOptions({ tabBarVisible: false });
  } else {
    navigation.setOptions({ tabBarVisible: true });
  }

  return (
    <HomeStack.Navigator initialRouteName="Eventos" screenOptions={{
      headerStyle: {
        backgroundColor: '#007bff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontFamily: 'Raleway-Bold',
      },
      headerTitleAlign: "center",
    }}
    >
      <HomeStack.Screen name="Eventos" component={Home} />
      <HomeStack.Screen name="Event" component={Event} />
    </HomeStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator initialRouteName="Perfil">
    <ProfileStack.Screen name="Perfil" component={Profile} />
  </ProfileStack.Navigator>
);