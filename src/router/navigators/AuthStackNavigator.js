import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from '../../screens/Login';

const AuthStack = createStackNavigator();

export default () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen
      name="SignIn"
      component={Login}
      options={{ title: "Sign In" }}
    />
  </AuthStack.Navigator>
);