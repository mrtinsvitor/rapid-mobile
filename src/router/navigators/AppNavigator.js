import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Button
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/Feather';

import BottomTabBar from '../../components/BottomTabBar';

import Home from '../../screens/Home';
import Profile from '../../screens/Profile';
import Event from '../../screens/Event';
import Search from '../../screens/Search';

const Tabs = createBottomTabNavigator();
export default () => {
  return (
    <Tabs.Navigator initialRouteName="Home" tabBar={props => <BottomTabBar {...props} />}>
      <Tabs.Screen name="Home" component={HomeStackScreen} options={{ tabBarIcon: 'home', }} />
      <Tabs.Screen name="Pesquisa" component={Search} options={{ tabBarIcon: 'search' }} />
      <Tabs.Screen name="Meus Eventos" component={Search} options={{ tabBarIcon: 'bookmark' }} />
      <Tabs.Screen name="Configurações" component={Search} options={{ tabBarIcon: 'settings' }} />
    </Tabs.Navigator>
  );
};

const HomeStack = createStackNavigator()
const HomeStackScreen = ({ navigation, route }) => {
  if (route.state && getLastRouteByName(route, 'Event')) {
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
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('Profile')}
          style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5 }}
        >
          <Icon
            name="user"
            size={24}
            style={{ color: '#fff' }}
          />
        </Button>
      ),
    }}>
      <HomeStack.Screen name="Eventos" component={Home} />
      <HomeStack.Screen name="Event" component={Event} options={{ tabBarVisible: false }} />
      <HomeStack.Screen name="Profile" component={Profile} />
    </HomeStack.Navigator>
  );
}

const getLastRouteByName = (route, name) => route.state.routes[route.state.routes.length - 1].name === name;