import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, Linking, TouchableOpacity, TextInput, TouchableOpacityBase, ScrollView } from 'react-native';
import styles from './Styles';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Spacer, Link, Storage } from './Utilities';

export default function Destinations(props) {
  // 855c0da05ec2eb5b6b5a562be8cef164c96ef15cba68e497cbcd6691335c82fe

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.title}>Products</Text>
      <Spacer />
      <ScrollView>
        <TouchableOpacity onPress={() => props.nav.navigate('Apps')}>
          <Text style={styles.button}>Apps</Text>
        </TouchableOpacity>
        <View style={styles.spacer}></View>
        <TouchableOpacity onPress={() => props.nav.navigate('Droplets')}>
          <Text style={styles.button}>Droplets</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}