import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabBar from '../../components/BottomTabBar';

import Home from '../../screens/Home';
import Profile from '../../screens/Profile';
import Event from '../../screens/Event';

const Tabs = createBottomTabNavigator();
export default () => {
  return (
    <Tabs.Navigator initialRouteName="Home" tabBar={props => <BottomTabBar {...props} />}>
      <Tabs.Screen name="Home" component={HomeStackScreen} options={{ tabBarIcon: 'home', }} />
      <Tabs.Screen name="Pesquisa" component={ProfileStackScreen} options={{ tabBarIcon: 'search' }} />
      <Tabs.Screen name="Meus Eventos" component={ProfileStackScreen} options={{ tabBarIcon: 'bookmark' }} />
      <Tabs.Screen name="Configurações" component={ProfileStackScreen} options={{ tabBarIcon: 'settings' }} />
    </Tabs.Navigator>
  );
};

const HomeStack = createStackNavigator()
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