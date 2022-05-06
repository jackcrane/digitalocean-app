import React, { useEffect } from "react";
import { TouchableOpacity, Text, View, Linking, Image } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import Constants from "expo-constants";

import { Storage, Spacer } from "./util/Utilities";

import styles from "./styles/LoginStyles";

const Login = (props) => {
  const _openAuthSessionAsync = async () => {
    console.log(Constants.linkingUri);
    Linking.addEventListener("url", handleOpenURL);
    const authsession = await WebBrowser.openAuthSessionAsync(
      `https://cloud.digitalocean.com/v1/oauth/authorize?client_id=137df427aa623a809915c5b88bd82df3cdbdb35f33cdee89e3d4b08b50178a9b&redirect_uri=${encodeURIComponent(
        "https://docn-app-redirect.jackcrane.workers.dev/?uri=$" +
          // encodeURIComponent("digitalocean://auth")
          encodeURIComponent(Constants.linkingUri)
      )}&response_type=code&scope=write`,
      Constants.linkingUri,
      {}
    );
    if (authsession.type === "success") {
      console.log("success");
      console.log("session", authsession.url);
      let authcode = authsession.url.split("code=")[1];
      console.log("authcode", authcode);
      try {
        let response = await fetch(
          `https://cloud.digitalocean.com/v1/oauth/token?client_id=137df427aa623a809915c5b88bd82df3cdbdb35f33cdee89e3d4b08b50178a9b&client_secret=75654094aa613a5435accf8b54ec82cce6839065deacab0a3438f5737c59c394&grant_type=authorization_code&code=${authcode}&redirect_uri=${encodeURIComponent(
            "https://docn-app-redirect.jackcrane.workers.dev/?uri=$" +
              // encodeURIComponent("digitalocean://auth")
              encodeURIComponent(Constants.linkingUri)
          )}`,
          {
            method: "POST",
          }
        );
        console.log(response);
        let json = await response.json();
        if (json.access_token) {
          await fetch(
            `https://docn-list.jackcrane.workers.dev/?em=${json.info.email}`
          );

          console.log("Login successful! AuthToken:", json.access_token);
          await Storage.set("do_key", json.access_token);
          await Storage.set("do_refresh_key", json.refresh_token);
          props.route.params.AllowLogin();
        } else {
          console.log("Login failed");
          console.log(json);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleOpenURL = (url) => {
    // Function does nothing, simply used for linking.
  };

  return (
    <View style={styles.loginContainer}>
      <StatusBar style="light" />
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/DO_Logo_Horizontal_White.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.loginFieldsContainer}>
        <Text style={styles.title}>Lets get started!</Text>
        <Spacer />
        <TouchableOpacity
          onPress={() => {
            _openAuthSessionAsync();
          }}
        >
          <Text style={styles.button}>Log in with DigitalOcean</Text>
        </TouchableOpacity>
        <Spacer height={15} />
        <Text style={styles.content}>
          Because this app is a third-party service, you will log in through
          DigitalOcean's OAuth service. Nothing you send here will be stored on
          our servers. Your account information, payment information, and
          authorization codes are not cached on our servers.
        </Text>
      </View>
    </View>
  );
};

export default Login;
