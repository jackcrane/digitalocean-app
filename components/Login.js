import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, View, Linking, TouchableOpacity, TextInput, TouchableOpacityBase } from 'react-native';
import styles from './Styles';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Spacer, Link, Storage } from './Utilities';

// export default function Login(props) {
const Login = (props) => {
  // 855c0da05ec2eb5b6b5a562be8cef164c96ef15cba68e497cbcd6691335c82fe
  const [bearerToken, setBearerToken] = useState('');
  const [tokenInputValue, setTokenInputValue] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const [submitBtnVal, setSubmitBtnVal] = useState('Connect to your account!');

  useEffect(() => {
    try {
      const value = AsyncStorage.getItem('@do_keyd').then((e) => {
        if(e == null) {

        } else {
          fetch("https://api.digitalocean.com/v2/account", {
            headers: {
              Authorization: `Bearer ${e}`,
              "Content-Type": "application/json"
            }
          })
            .then(response => response.json())
            .then(data => {
              if(data.account) {
                console.log(data)
                // Login successful!
                props.nav.navigate('Destinations')
              } else {
                // Login unsuccessful. Try again
                setErrorMessage('You had a key saved, but DigitalOcean rejected it. Please create a new key or try again')
              }
            })
        }
      })
    } catch(e) {
      // error reading value
    }
  }, [])

  const handleConnectBtnPress = () => {
    if(submitBtnVal == 'Connect to your account!') {
      setErrorMessage('')
      let tout = setTimeout(function() {
        setSubmitBtnVal('Connect to your account!');
        alert('Something has gone wrong. Please check your token and try again.')
      }, 2000)
      console.log(tokenInputValue);
      setSubmitBtnVal('Loading...');
      fetch("https://api.digitalocean.com/v2/account", {
        headers: {
          Authorization: `Bearer ${tokenInputValue}`,
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => {
          if(data.account) {
            // Login successful!
            console.log(data)
            Storage.set('do_key', tokenInputValue);
            clearTimeout(tout)
            props.nav.navigate('Destinations')
          } else {
            // Login unsuccessful. Try again
            setErrorMessage('DigitalOcean did not recognize your key. Please try again.')
          }
        })
        .then(function() {
          clearTimeout(tout);
          setSubmitBtnVal('Connect to your account!');
        })
    }
  }

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.title}>Lets get started!</Text>
      <Spacer />
      <Text style={{color:'red', fontWeight:'bold'}}>{errorMessage}</Text>
      <TextInput placeholder="Your digitalocean token" style={styles.input} onChangeText={t => setTokenInputValue(t)} />
      <Spacer />
      <TouchableOpacity onPress={handleConnectBtnPress}>
        <Text style={styles.button}>{submitBtnVal}</Text>
      </TouchableOpacity>
      <Spacer />
      <Text style={styles.subtle}>
        Visit <Link href="https://cloud.digitalocean.com/account/api/tokens">https://cloud.digitalocean.com/account/api/tokens</Link> to generate a new Personal Access Token.
        {"\n\n"}
        Enter any name you would like, and give the token write access. Copy & paste your token into the input above.
      </Text>
      <TouchableOpacity onPress={async() => console.log(await Storage.get('do_key'))}><Text>Show</Text></TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

export default Login;