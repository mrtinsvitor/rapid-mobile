import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Home from '../../screens/Home';
import Profile from '../../screens/Profile';
import Event from '../../screens/Event';

const Tabs = createBottomTabNavigator();

export default () => (
  <Tabs.Navigator initialRouteName="Home">
    <Tabs.Screen name="Home" component={HomeStackScreen} />
    <Tabs.Screen name="Perfil" component={ProfileStackScreen} />
  </Tabs.Navigator>
);

const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator initialRouteName="Home">
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen name="Event" component={Event} />
  </HomeStack.Navigator>
);

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <HomeStack.Navigator initialRouteName="Perfil">
    <HomeStack.Screen name="Perfil" component={Profile} />
  </HomeStack.Navigator>
);