import React from "react";
import {
  View,
  Text
} from 'react-native';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  Layout,
} from '@ui-kitten/components';

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
const HomeStackScreen = () => (
  <HomeStack.Navigator initialRouteName="Home">
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen name="Event" component={Event} />
  </HomeStack.Navigator>
);

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator initialRouteName="Perfil">
    <ProfileStack.Screen name="Perfil" component={Profile} />
  </ProfileStack.Navigator>
);