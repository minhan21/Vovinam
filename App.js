import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack';
import Welcome from './Screen/Welcome';
import Login from './Screen/Login';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

const StackNav = createSwitchNavigator({
  Welcome: Welcome,
  Login: Login
})
const App = createAppContainer(StackNav);
export default App;