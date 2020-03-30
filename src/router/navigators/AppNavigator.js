import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import HeaderBar from '../../components/HeaderBar';
import BottomTabBar from '../../components/BottomTabBar';

import Home from '../../screens/Home';
import Profile from '../../screens/Profile';
import Event from '../../screens/Event';
import Search from '../../screens/Search';
import MyEvents from '../../screens/MyEvents';
import Settings from '../../screens/Settings';

import { getLastRouteByName } from '../../utils/navigation';

const Tabs = createBottomTabNavigator();
export default ({ }) => {
  return (
    <Tabs.Navigator initialRouteName="Home" tabBar={props => <BottomTabBar {...props} />}>
      <Tabs.Screen name="Home" component={HomeStackScreen} options={{ tabBarIcon: 'home', }} />
      <Tabs.Screen name="Pesquisa" component={SearchStackScreen} options={{ tabBarIcon: 'search', }} />
      <Tabs.Screen name="Meus Eventos" component={MyEventsStackScreen} options={{ tabBarIcon: 'bookmark' }} />
      <Tabs.Screen name="Configurações" component={SettingsStackScreen} options={{ tabBarIcon: 'settings' }} />
    </Tabs.Navigator>
  );
};

const HomeStack = createStackNavigator();
const HomeStackScreen = ({ navigation, route }) => {
  if (route.state && getLastRouteByName(route, 'Event')) {
    navigation.setOptions({ tabBarVisible: false });
  } else {
    navigation.setOptions({ tabBarVisible: true });
  }

  return (
    <HomeStack.Navigator initialRouteName="Eventos" screenOptions={HeaderBar(navigation)}>
      <HomeStack.Screen name="Eventos" component={Home} />
      <HomeStack.Screen name="Event" component={Event} options={{ tabBarVisible: false }} />
      <HomeStack.Screen name="Profile" component={Profile} />
    </HomeStack.Navigator>
  );
}

const SearchStack = createStackNavigator();
const SearchStackScreen = ({ navigation }) => (
  <SearchStack.Navigator initialRouteName="Pesquisa" screenOptions={HeaderBar(navigation)}>
    <SearchStack.Screen name="Pesquisa" component={Search} />
  </SearchStack.Navigator>
);

const MyEventsStack = createStackNavigator();
const MyEventsStackScreen = ({ navigation }) => (
  <MyEventsStack.Navigator initialRouteName="Meus Eventos" screenOptions={HeaderBar(navigation)}>
    <MyEventsStack.Screen name="Meus Eventos" component={MyEvents} />
  </MyEventsStack.Navigator>
);

const SettingsStack = createStackNavigator();
const SettingsStackScreen = ({ navigation }) => (
  <SettingsStack.Navigator initialRouteName="Configurações" screenOptions={HeaderBar(navigation)}>
    <SettingsStack.Screen name="Configurações" component={Settings} />
  </SettingsStack.Navigator>
);