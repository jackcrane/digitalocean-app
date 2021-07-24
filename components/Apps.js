import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, View, Linking, TouchableOpacity, TextInput, TouchableOpacityBase, ScrollView, ActivityIndicator } from 'react-native';
import styles from './Styles';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Spacer, Link, Storage } from './Utilities';

const Apps = (props) => {
  // 855c0da05ec2eb5b6b5a562be8cef164c96ef15cba68e497cbcd6691335c82fe

  const [apps, setApps] = useState([]);
  const [appsLoading, setAppsLoading] = useState(true);

  useEffect(() => {
    Storage.get('do_key').then((e) => {
      fetch("https://api.digitalocean.com/v2/apps", {
        headers: {
          Authorization: `Bearer ${e}`,
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => {
          setApps(data.apps);
          setAppsLoading(false);
        })
    })
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Apps</Text>
      <Spacer />
      <ScrollView>
        {appsLoading ? (<ActivityIndicator />) : (
          apps.map((e, i) => (
            <TouchableOpacity key={i} style={styles.row} onPress={() => props.nav.navigate('App Info', {
              appid:e.id
            })}>
              <View style={styles.flex}>
                <View style={e.active_deployment.phase == "ACTIVE" ? styles.row__active : styles.row__inactive}></View>
                <Text style={styles.row__name}>{e.active_deployment.spec.name}</Text>
                <Text style={styles.row__code}>{e.active_deployment.spec.region}</Text>
              </View>
              <View style={styles.flex}>
                <Text>{e.live_domain}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

export default Apps;