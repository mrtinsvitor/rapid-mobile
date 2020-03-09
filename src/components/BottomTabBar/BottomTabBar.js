import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  Layout
} from '@ui-kitten/components';

import {
  HomeIcon,
  PersonOutlineIcon,
  BookIcon,
  SettingsIcon
} from '../Utils/Icons';

export default ({ navigation, state }) => {
  const onSelect = (index) => {
    navigation.navigate(state.routeNames[index]);
  };

  return (
    <Layout>
      <BottomNavigation
        style={styles.bottomNavigation}
        selectedIndex={state.index}
        onSelect={onSelect}>
        <BottomNavigationTab icon={HomeIcon} />
        <BottomNavigationTab icon={PersonOutlineIcon} />
        <BottomNavigationTab icon={BookIcon} />
        <BottomNavigationTab icon={SettingsIcon} />
      </BottomNavigation>
    </Layout>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    marginVertical: 1,
  },
});