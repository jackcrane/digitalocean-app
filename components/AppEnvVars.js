import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, View, Linking, TouchableOpacity, TextInput, TouchableOpacityBase, ScrollView, ActivityIndicator, Alert } from 'react-native';
import styles from './Styles';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import { Spacer, Link, Storage } from './Utilities';

const AppEnvVars = (props) => {
  // 855c0da05ec2eb5b6b5a562be8cef164c96ef15cba68e497cbcd6691335c82fe

  const appid = props.route.appid;

  const [apikey, setApikey] = useState();

  const [app, setApp] = useState();
  const [appenvs, setAppEnv] = useState();
  const [appLoading, setAppLoading] = useState(true);
  const [inputValues, setInputValues] = useState([]);

  useEffect(() => {
    Storage.get('do_key').then((e) => {
      setApikey(e)
      fetch(`https://api.digitalocean.com/v2/apps/${appid}`, {
        headers: {
          Authorization: `Bearer ${e}`,
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => {
          setApp(data.app);
          setAppEnv(data.app.spec.envs);
          let newInputValues = [];
          data.app.spec.envs.forEach(e => {
            newInputValues.push(e.value);
          })
          console.log(newInputValues)
          setInputValues(newInputValues);
          setAppLoading(false);
        })
    })
  }, [])

  const removeKeyFromSpec = (key) => {
    Alert.alert(
      "Are you sure?", 
      `You are about to delete the environment variable '${key}'. Are you sure you are ready to do this?\n\nThis cannot be undone.`,
      [
        {
          text: 'No I want to keep this variable.',
          onPress: () => {}
        },
        {
          text: 'I\'m sure. Delete it!',
          onPress: () => {
            let appenvsclone = appenvs;
            appenvsclone = appenvsclone.filter(e => {
              return e.key != key
            });
            setAppEnv(appenvsclone)
          },
          style:'destructive'
        },
      ]
    )
  }

  const updateKeyFromSpec = (key, idx) => {
    // console.log(`${key}, ${inputValues[idx]}`);
    Alert.alert(
      "Are you sure?", 
      `You are about to change the environment variable '${key}'. Are you sure you are ready to do this?\n\nThis cannot be undone.`,
      [
        {
          text: 'No I want to keep this variable as it was.',
          onPress: () => {}
        },
        {
          text: 'I\'m sure. Change it!',
          onPress: () => {
            let appenvsclone = [];
            appenvs.forEach(e => {
              if(e.key != key) {
                appenvsclone.push(e);
              } else {
                appenvsclone.push({
                  key:e.key,
                  value:inputValues[idx],
                  scope:e.scope
                })
              }
            });
            setAppEnv(appenvsclone);
            submitNewAppSpec(appenvsclone)
          },
          style:'destructive'
        },
      ]
    )
  }

  const submitNewAppSpec = (envs) => {
    let appspec = app.spec;
    appspec.envs = envs;
    console.log(JSON.stringify(appspec));

    fetch(`https://api.digitalocean.com/v2/apps/${appid}`, {
      headers: {
        Authorization: `Bearer ${apikey}`,
        "Content-Type": "application/json"
      },
      body:appspec,
      method: "PUT"
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .error(error => console.log(error));
  }

  return (
    <View style={styles.outer_container}>
      <View style={styles.bottompadded}>
        {appLoading ? (<ActivityIndicator />) : (
          <KeyboardAwareScrollView scrollIndicatorInsets={{ right: 1 }}>
            <View style={styles.container}>
              <Text style={styles.title}>{app.spec.name}</Text>
              <Spacer />
              <View style={styles.spacer}></View>
              <View>
                <Text style={styles.details__title}>Environment Variables</Text>
                {
                  appenvs.map((e, i) => (
                    <View key={i} style={styles.row}>
                      <Text style={styles.details__p}>{e.key}</Text>
                      <TextInput style={styles.input} defaultValue={e.value} onChangeText={text => {let newInputValues = inputValues; newInputValues[i] = text; setInputValues(newInputValues)}} />
                      <Text>
                        <Text style={styles.details__link} onPress={() => removeKeyFromSpec(e.key)}>Delete</Text>
                        <Text>   </Text>
                        <Text style={styles.details__link} onPress={() => updateKeyFromSpec(e.key, i)}>Save</Text>
                      </Text>
                    </View>
                  ))
                }
              </View>
            </View>
          </KeyboardAwareScrollView>
        )}
      </View>
    </View>
  );
}

export default AppEnvVars;