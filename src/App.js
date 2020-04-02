if (__DEV__) {
  import('./config/ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

import React from 'react';
import { ApplicationProvider as KittenProvider, IconRegistry } from '@ui-kitten/components';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, light } from '@eva-design/eva';
import FlashMessage from "react-native-flash-message";

import MainNavigator from './router/MainNavigator';

const App = () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <PaperProvider theme={paperTheme}>
      <KittenProvider mapping={mapping} theme={light}>
        <MainNavigator />
      </KittenProvider>
    </PaperProvider>
    <FlashMessage position="bottom" titleStyle={{ fontFamily: 'Raleway-Regular', fontSize: 16 }} />
  </>
);

const paperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'blue',
    accent: 'green',
  },
};


export default App;