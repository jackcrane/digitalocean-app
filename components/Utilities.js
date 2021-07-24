import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, Linking, TextInput, TouchableOpacity } from 'react-native';
import styles from './Styles';

import AsyncStorage from '@react-native-async-storage/async-storage';

export function Spacer() {
  return (
    <View style={{height:15}}></View>
  );
}

export function Link(props) {
  return (
    <Text onPress={() => {Linking.openURL(props.href)}} style={styles.link}>
      <Text>{props.children}</Text>
    </Text>
  )
}

export const Storage = {
  set:async (key, value) => {
    try {
      await AsyncStorage.setItem(`@${key}`, value)
    } catch (e) {
      console.error(e)
    }
  },
  get:async (key) => {
    try {
      const value = await AsyncStorage.getItem(`@${key}`)
      if(value !== null) {
        // value previously stored
      }
      // console.log(value)
      return(value);
    } catch(e) {
      console.error(e)
    }
  }
}