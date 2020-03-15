import tron from 'reactotron-react-native';

import AsyncStorage from '@react-native-community/async-storage';

export default {
  getItem: async (key) => {
    const item = await AsyncStorage.getItem(key);
    // tron.log(`(AsyncStorage.getItem(${key})): ${item}`);

    return item;
  },
  setItem: async (key, value) => {
    tron.log(`(AsyncStorage.setItem(${key})): ${JSON.stringify(value)}`);

    const item = await AsyncStorage.setItem(key, JSON.stringify(value));
    return item;
  },
  removeItem: async (key) => {
    tron.log(`(AsyncStorage.removeItem(${key}))`);

    await AsyncStorage.removeItem(key);
  },
  clear: async() => {
    tron.log('(AsyncStorage.clear())');

    await AsyncStorage.clear();
  }
}