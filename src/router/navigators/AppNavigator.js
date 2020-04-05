import React from "react";
import tron from 'reactotron-react-native';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import HeaderBar from '../../components/HeaderBar';
import HeaderRightButton from '../../components/HeaderBar/HeaderRightButton';
import BottomTabBar from '../../components/BottomTabBar';

import Home from '../../screens/Home';
import Profile from '../../screens/Profile';
import Event from '../../screens/Event';
import Search from '../../screens/Search';
import MyEvents from '../../screens/MyEvents';
import Settings from '../../screens/Settings';

import { getLastRouteByName } from '../../utils/navigation';

const Tabs = createBottomTabNavigator();
export default ({ }) => (
  <Tabs.Navigator initialRouteName="Home" tabBar={props => <BottomTabBar {...props} />}>
    <Tabs.Screen name="Home" component={HomeStackScreen} options={{ tabBarIcon: 'home', }} />
    <Tabs.Screen name="Pesquisa" component={SearchStackScreen} options={{ tabBarIcon: 'search', }} />
    <Tabs.Screen name="Meus Eventos" component={MyEventsStackScreen} options={{ tabBarIcon: 'bookmark' }} />
    <Tabs.Screen name="Configurações" component={SettingsStackScreen} options={{ tabBarIcon: 'settings' }} />
  </Tabs.Navigator>
);

const HomeStack = createStackNavigator();
const HomeStackScreen = ({ navigation, route }) => {
  if (route.state && getLastRouteByName(route, 'Evento')) {
    navigation.setOptions({ tabBarVisible: false });
  } else {
    navigation.setOptions({ tabBarVisible: true });
  }

  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={HeaderBar({ rightButton: () => navigation.navigate('Perfil'), rightIcon: 'user' })}
    >
      <HomeStack.Screen name="Home" component={Home} options={{ title: 'Eventos' }} />
      <HomeStack.Screen name="Evento" component={Event} />
      <HomeStack.Screen name="Perfil" component={Profile} />
    </HomeStack.Navigator >
  );
}

const SearchStack = createStackNavigator();
const SearchStackScreen = ({ navigation }) => (
  <SearchStack.Navigator initialRouteName="Pesquisa" screenOptions={HeaderBar(navigation)}>
    <SearchStack.Screen name="Pesquisa" component={Search} />
  </SearchStack.Navigator>
);

const MyEventsStack = createStackNavigator();
const MyEventsStackScreen = ({ navigation, route }) => {
  if (route.state && getLastRouteByName(route, 'Meu Evento')) {
    navigation.setOptions({ tabBarVisible: false });
  } else {
    navigation.setOptions({ tabBarVisible: true });
  }

  return (
    <MyEventsStack.Navigator initialRouteName="Meus Eventos" screenOptions={HeaderBar({ rightButton: () => navigation.navigate('Perfil'), rightIcon: 'user' })}>
      <MyEventsStack.Screen name="Meus Eventos" component={MyEvents} />
      <MyEventsStack.Screen name="Meu Evento" component={Event} />
    </MyEventsStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();
const SettingsStackScreen = ({ navigation }) => (
  <SettingsStack.Navigator initialRouteName="Configurações" screenOptions={HeaderBar(navigation)}>
    <SettingsStack.Screen name="Configurações" component={Settings} />
  </SettingsStack.Navigator>
);