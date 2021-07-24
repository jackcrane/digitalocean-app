import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, View, Linking, TouchableOpacity, TextInput, TouchableOpacityBase, ScrollView, ActivityIndicator } from 'react-native';
import styles from './Styles';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Spacer, Link, Storage } from './Utilities';

export default function Droplets() {
  // 855c0da05ec2eb5b6b5a562be8cef164c96ef15cba68e497cbcd6691335c82fe

  const [droplets, setDroplets] = useState([]);
  const [dropletsLoading, setDropletsLoading] = useState(true);

  useEffect(() => {
    Storage.get('do_key').then((e) => {
      fetch("https://api.digitalocean.com/v2/droplets", {
        headers: {
          Authorization: `Bearer ${e}`,
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => {
          setDroplets(data.droplets);
          setDropletsLoading(false);
        })
    })
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Droplets</Text>
      <Spacer />
      <ScrollView>
        {dropletsLoading ? (<ActivityIndicator />) : (
          droplets.map((e, i) => (
            <TouchableOpacity key={i} style={styles.row}>
              <View style={styles.flex}>
                <View style={e.status == "active" ? styles.row__active : styles.row__inactive}></View>
                <Text style={styles.row__name}>{e.name}</Text>
                <Text style={styles.row__code}>{e.region.slug}</Text>
              </View>
              <View style={styles.flex}>
                <Text>{e.vcpus} vCPU / {e.disk}GB Disk / {e.memory}MB Memory</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}