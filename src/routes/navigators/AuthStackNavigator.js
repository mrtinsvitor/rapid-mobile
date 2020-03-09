import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignIn from '../../screens/SignIn';

const AuthStack = createStackNavigator();

export default () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen
      name="SignIn"
      component={SignIn}
      options={{ title: "Sign In" }}
    />
  </AuthStack.Navigator>
);