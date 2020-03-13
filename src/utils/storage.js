import AsyncStorage from '@react-native-community/async-storage';

export default {
  getItem: async (key) => {
    const item = await AsyncStorage.getItem(key);
    console.debug(`(AsyncStorage.getItem(${key})): ${JSON.stringify(item)}`);

    return item;
  },
  setItem: async (key, value) => {
    console.debug(`(AsyncStorage.setItem(${key})): ${JSON.stringify(value)}`);

    const item = await AsyncStorage.setItem(key, JSON.stringify(value));
    return item;
  },
  removeItem: async (key) => {
    console.debug(`(AsyncStorage.removeItem(${key}))`);

    await AsyncStorage.removeItem(key);
  },
  clear: async() => {
    console.debug('(AsyncStorage.clear())');

    await AsyncStorage.clear();
  }
}