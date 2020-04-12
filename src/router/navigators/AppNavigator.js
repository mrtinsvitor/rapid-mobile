import React from "react";
import tron from 'reactotron-react-native';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import {
  Button,
} from 'react-native-paper';


import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HeaderBar from '../../components/HeaderBar';
import BottomTabBar from '../../components/BottomTabBar';

import Home from '../../screens/Home';
import MyEvents from '../../screens/MyEvents';
import Event from '../../screens/Event';
import QRCode from '../../screens/QRCode';
import Profile from '../../screens/Profile';
import Search from '../../screens/Search';
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
  if (route.state && (getLastRouteByName(route, 'Evento') || getLastRouteByName(route, 'QRCode'))) {
    navigation.setOptions({ tabBarVisible: false });
  } else {
    navigation.setOptions({ tabBarVisible: true });
  }

  return (
    <HomeStack.Navigator screenOptions={HeaderBar(navigation, route)}>
      <HomeStack.Screen name="Eventos" component={Home} options={{
        title: 'Eventos',
        headerRight: () => (
          <Button
            onPress={() => navigation.navigate('Perfil')}
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 5,
              paddingBottom: 5
            }}
          >
            <FeatherIcon
              name='user'
              size={24}
              style={{ color: '#fff' }}
            />
          </Button>
        )
      }} />
      <HomeStack.Screen name="Evento" component={Event} />
      <HomeStack.Screen name="Perfil" component={Profile} />
      <HomeStack.Screen name="QRCode" component={QRCode} />
    </HomeStack.Navigator >
  );
}

const MyEventsStack = createStackNavigator();
const MyEventsStackScreen = ({ navigation, route }) => {
  if (route.state && (getLastRouteByName(route, 'Meu Evento') || getLastRouteByName(route, 'QRCode'))) {
    navigation.setOptions({ tabBarVisible: false });
  } else {
    navigation.setOptions({ tabBarVisible: true });
  }

  return (
    <MyEventsStack.Navigator screenOptions={HeaderBar(navigation, route)}>
      <MyEventsStack.Screen name="Meus Eventos" component={MyEvents} />
      <MyEventsStack.Screen name="Meu Evento" component={Event} />
      <MyEventsStack.Screen name="QRCode" component={QRCode} />
    </MyEventsStack.Navigator>
  );
}

const SearchStack = createStackNavigator();
const SearchStackScreen = ({ navigation, route }) => (
  <SearchStack.Navigator initialRouteName="Pesquisa" screenOptions={HeaderBar(navigation, route)}>
    <SearchStack.Screen name="Pesquisa" component={Search} />
  </SearchStack.Navigator>
);

const SettingsStack = createStackNavigator();
const SettingsStackScreen = ({ navigation, route }) => (
  <SettingsStack.Navigator initialRouteName="Configurações" screenOptions={HeaderBar(navigation, route)}>
    <SettingsStack.Screen name="Configurações" component={Settings} />
  </SettingsStack.Navigator>
);