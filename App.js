import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, Linking, TouchableOpacity, TextInput } from 'react-native';
// import styles from './components/Styles';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './components/Login';
import Destinations from './components/Destinations';
import Droplets from './components/Droplets';
import Apps from './components/Apps';
import AppInfo from './components/AppInfo';

const Stack = createStackNavigator();

function LoginIdx({navigation}) {
  return (
    <Login nav={navigation} />
  )
}

function DestinationsIdx({navigation}) {
  return (
    <Destinations nav={navigation} />
  )
}

function DropletsIdx({navigation}) {
  return (
    <Droplets nav={navigation} />
  )
}

function AppsIdx({navigation}) {
  return (
    <Apps nav={navigation} />
  )
}

function AppInfoIdx({route, navigation}) {
  return (
    <AppInfo nav={navigation} route={route.params} />
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginIdx} options={{ headerShown:false }} />
        <Stack.Screen name="Destinations" component={DestinationsIdx} options={{ headerShown:false }} />
        <Stack.Screen name="Droplets" component={DropletsIdx} options={{ headerShown:true }} />
        <Stack.Screen name="Apps" component={AppsIdx} options={{ headerShown:true }} />

        <Stack.Screen name="App Info" component={AppInfoIdx} options={{ headerShown:true }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}