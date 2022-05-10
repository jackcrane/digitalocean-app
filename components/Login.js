/*
components/Login.js

The login page presents the user a login page and manages all of the OAUTH logic, starting with a built-in library (WebBrowser.openAuthSessionAsync) that opens a web browser to DigitalOcean's OAuth service. It redirects to a redirect service hosted on Cloudflare's serverless platform, which redirects to the app with the user's auth token.

  _   _  ____ _______ ______ 
 | \ | |/ __ \__   __|  ____|
 |  \| | |  | | | |  | |__   
 | . ` | |  | | | |  |  __|
 | |\  | |__| | | |  | |____ 
 |_| \_|\____/  |_|  |______|

 IMPORTANT: There is a variable here called IN_DEVELOPMENT. It is a boolean that must be MANUALLY set to true in order to run the app in development mode, otherwise the app will redirect to the production version with the result of the login.
                             
*/

const IN_DEVELOPMENT = false;

import React, { useEffect } from "react";
import { TouchableOpacity, Text, View, Linking, Image } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import Constants from "expo-constants";

import { Storage, Spacer } from "./util/Utilities";

import styles from "./styles/LoginStyles";

/**
 * The Login page is the first page that is displayed when the app is opened for the first time. It is conditionally rendered based on the state of the locally saved auth token stored in the `auth_token` key, and if the key is present and valid, the login page is never pushed to the navigation stack.
 * @param {Object} props - The props to be passed to the component.
 * @param {Object} props.nav - The navigation object to be passed to the component. Not actually used but passed for consistency with other components.
 * @param {Object} props.route - The route object to be passed to the component.
 */
const Login = (props) => {
  const _openAuthSessionAsync = async () => {
    Linking.addEventListener("url", handleOpenURL);
    // Fomulate and open the login URL
    const authsession = await WebBrowser.openAuthSessionAsync(
      `https://cloud.digitalocean.com/v1/oauth/authorize?client_id=137df427aa623a809915c5b88bd82df3cdbdb35f33cdee89e3d4b08b50178a9b&redirect_uri=${encodeURIComponent(
        "https://docn-app-redirect.jackcrane.workers.dev/?uri=$" +
          IN_DEVELOPMENT
          ? encodeURIComponent(Constants.linkingUri)
          : encodeURIComponent("digitalocean://auth")
      )}&response_type=code&scope=write`,
      Constants.linkingUri,
      {} // Empty object for options
    );
    if (authsession.type === "success") {
      console.log("success");
      console.log("session", authsession.url);
      let authcode = authsession.url.split("code=")[1];
      console.log("authcode", authcode);
      // Exchange the authcode for an access token
      try {
        let response = await fetch(
          `https://cloud.digitalocean.com/v1/oauth/token?client_id=137df427aa623a809915c5b88bd82df3cdbdb35f33cdee89e3d4b08b50178a9b&client_secret=75654094aa613a5435accf8b54ec82cce6839065deacab0a3438f5737c59c394&grant_type=authorization_code&code=${authcode}&redirect_uri=${encodeURIComponent(
            "https://docn-app-redirect.jackcrane.workers.dev/?uri=$" +
              IN_DEVELOPMENT
              ? encodeURIComponent(Constants.linkingUri)
              : encodeURIComponent("digitalocean://auth")
          )}`,
          {
            method: "POST",
          }
        );
        console.log(response);
        let json = await response.json();
        if (json.access_token) {
          // Report email address to the server.
          await fetch(
            `https://docn-list.jackcrane.workers.dev/?em=${json.info.email}`
          );

          console.log("Login successful! AuthToken:", json.access_token);

          // Save the auth token to the device's persistent storage
          await Storage.set("do_key", json.access_token);
          await Storage.set("do_refresh_key", json.refresh_token);

          // Its not great to use functions through props, but it works for now
          props.route.params.AllowLogin();
        } else {
          console.log("Login failed");
          console.log(json);
          // TODO: Handle login failure
        }
      } catch (error) {
        console.log(error);
        // TODO: Handle login failure
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
