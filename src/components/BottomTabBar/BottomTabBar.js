import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  Layout
} from '@ui-kitten/components';

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
        <BottomNavigationTab icon={PersonIcon} />
        <BottomNavigationTab icon={BookIcon} />
        <BottomNavigationTab icon={SettingsIcon} />
      </BottomNavigation>
    </Layout>
  );
};

const HomeIcon = (style) => (
  <Icon {...style} name='home-outline' />
);

const PersonIcon = (style) => (
  <Icon {...style} name='person-outline' />
);

const BookIcon = (style) => (
  <Icon {...style} name='book-open-outline' />
);

const SettingsIcon = (style) => (
  <Icon {...style} name='settings-2-outline' />
);

const styles = StyleSheet.create({
  bottomNavigation: {
    marginVertical: 1,
  },
});