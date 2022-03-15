import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text, View, Linking, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles/Uts";

import AsyncStorage from "@react-native-async-storage/async-storage";

export function Spacer(props) {
  return <View style={{ height: props.height || 15 }}></View>;
}

export function Link(props) {
  return (
    <TouchableOpacity
      onPress={() => {
        Linking.openURL(props.href);
      }}
    >
      <Text style={{ ...styles.link, ...props.style }}>{props.children}</Text>
    </TouchableOpacity>
  );
}

export function Line() {
  return <View style={styles.line} />;
}
export function ThinLine() {
  return <View style={{ ...styles.line, borderBottomWidth: 1 }} />;
}

export const Storage = {
  set: async (key, value) => {
    try {
      await AsyncStorage.setItem(`@${key}`, value);
    } catch (e) {
      console.error(e);
    }
  },
  get: async (key) => {
    try {
      const value = await AsyncStorage.getItem(`@${key}`);
      if (value !== null) {
        // value previously stored
      }
      // console.log(value)
      return value;
    } catch (e) {
      console.error(e);
    }
  },
};
