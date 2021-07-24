import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, View, Linking, TouchableOpacity, TextInput, TouchableOpacityBase, ScrollView, ActivityIndicator } from 'react-native';
import styles from './Styles';

import { Spacer, Link, Storage } from './Utilities';

const AppInfo = (props) => {
  // 855c0da05ec2eb5b6b5a562be8cef164c96ef15cba68e497cbcd6691335c82fe

  const appid = props.route.appid

  const [app, setApp] = useState();
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    Storage.get('do_key').then((e) => {
      fetch(`https://api.digitalocean.com/v2/apps/${appid}`, {
        headers: {
          Authorization: `Bearer ${e}`,
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => {
          setApp(data.app);
          setAppLoading(false);
        })
    })
  }, [])

  return (
    <View style={styles.container}>
        {appLoading ? (<ActivityIndicator />) : (
          <ScrollView scrollIndicatorInsets={{ right: 1 }}>
            <Text style={styles.title}>{app.spec.name}</Text>
            <Spacer />
            <View>
              <Text style={styles.details__title}>Operations</Text>
              <Text style={styles.details__link}>Force Rebuild and Deploy</Text>
              <Text style={styles.details__link}>Manage Env Variables</Text>
              <Text style={styles.details__link}>Manage Domains</Text>
              <Text style={styles.details__link}>Manage App Spec</Text>
              <Text style={{...styles.details__link, ...{color:'red',textDecorationColor:'red'}}}>Destroy App</Text>
            </View>
            <View style={styles.spacer}></View>
            <View>
              <Text style={styles.details__title}>General Information</Text>
              <Text style={styles.details__p}>App name: <Text style={styles.details__detail}>{app.spec.name}</Text></Text>
              <Text style={styles.details__p}>Region: <Text style={styles.details__detail}>{app.region.label}</Text></Text>
              <Text style={styles.details__p}>
                Datacenter(s): 
                <Text style={styles.details__detail}>
                  {
                    app.region.data_centers.map((e, i) => (
                      <Text key={i}> {e}{
                        i < app.region.data_centers.length - 1 ? ',' : ''
                      }</Text>
                    ))
                  }
                </Text>
              </Text>
              <Text style={styles.details__p}>URL: <Text style={styles.details__detail}>{app.live_url}</Text></Text>
              <Text style={styles.details__p}>
                Language(s): 
                <Text style={styles.details__detail}>
                  {
                    app.spec.services.map((e, i) => (
                      <Text key={i}> {e.environment_slug}{
                        i < app.spec.services.environment_slug - 1 ? ',' : ''
                      }</Text>
                    ))
                  }
                </Text>
              </Text>
            </View>
            <View style={styles.spacer}></View>
            <View>
              <Text style={styles.details__title}>Services</Text>
              <Text style={styles.details__p}>Service Count: <Text style={styles.details__detail}>{app.spec.services.length}</Text></Text>
              {
                app.spec.services.map((e, i) => (
                  <View key={i}>
                    <Text style={styles.details__subtitle}>{e.name}</Text>
                    <View style={styles.details__division}>
                      <Text style={styles.details__p}>Service name: <Text style={styles.details__detail}>{e.name}</Text></Text>
                      <Text style={styles.details__p}>GitHub Repo: <Text style={styles.details__detail}>{e.github.repo}</Text> branch <Text style={styles.details__detail}>{e.github.branch}</Text></Text>
                      <Text style={styles.details__p}>Run Command: <Text style={styles.details__detail}>{e.run_command}</Text></Text>
                      <Text style={styles.details__p}>Environment Slug: <Text style={styles.details__detail}>{e.environment_slug}</Text></Text>
                      <Text style={styles.details__p}>Instance Size: <Text style={styles.details__detail}>{e.instance_size_slug}</Text></Text>
                      <Text style={styles.details__p}>Instance Count: <Text style={styles.details__detail}>{e.instance_count}</Text></Text>

                    </View>
                  </View>
                ))
              }
            </View>
            <View style={styles.spacer}></View>
            <View>
              <Text style={styles.details__title}>Domains</Text>
              <Text style={styles.details__p}>Domain Count: <Text style={styles.details__detail}>{app.spec.domains.length}</Text></Text>
              {
                app.spec.domains.map((e, i) => (
                  <View key={i}>
                    <Text style={styles.details__subtitle}>{e.domain}</Text>
                    <View style={styles.details__division}>
                      <Text style={styles.details__p}>Type: <Text style={styles.details__detail}>{e.type}</Text></Text>
                    </View>
                  </View>
                ))
              }
            </View>
          </ScrollView>
        )}
    </View>
  );
}

export default AppInfo;