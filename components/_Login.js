import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Linking,
  TouchableOpacity,
  TextInput,
  TouchableOpacityBase,
  ActivityIndicator,
} from "react-native";
import styles from "./Styles";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Spacer, Link, Storage } from "./Utilities";

// export default function Login(props) {
const Login = (props) => {
  // ef9edb9d370dfb06d027c5ca4295bc07badceccdac1a9f4beab4a095502dbb07
  const [bearerToken, setBearerToken] = useState("");
  const [tokenInputValue, setTokenInputValue] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [submitBtnVal, setSubmitBtnVal] = useState("Connect to your account!");

  const [checkingAccount, setCheckingAccount] = useState(true);

  useEffect(() => {
    async function AsynchronouslyGetDoKeyFromStorage() {
      try {
        let tok = await Storage.get("do_key");

        fetch("https://api.digitalocean.com/v2/account", {
          headers: {
            Authorization: `Bearer ${tok}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.account) {
              console.log(data);
              // Login successful!
              props.nav.navigate("Destinations");
            } else {
              // Login unsuccessful. Try again
              setCheckingAccount(false);
              setErrorMessage(
                "You had a key saved, but DigitalOcean rejected it. Please create a new key or try again"
              );
            }
          });
      } catch {
        console.log("Error loading from AsyncStorage, asking for key again");
        setCheckingAccount(false);
      }
    }
    AsynchronouslyGetDoKeyFromStorage();
  });

  const handleConnectBtnPress = () => {
    if (submitBtnVal == "Connect to your account!") {
      setErrorMessage("");
      let tout = setTimeout(function () {
        setSubmitBtnVal("Connect to your account!");
        alert(
          "Something has gone wrong. Please check your token and try again."
        );
      }, 2000);
      console.log(tokenInputValue);
      setSubmitBtnVal("Loading...");
      fetch("https://api.digitalocean.com/v2/account", {
        headers: {
          Authorization: `Bearer ${tokenInputValue}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          if (data.account) {
            // Login successful!
            console.log(data);
            await Storage.set("do_key", tokenInputValue);
            clearTimeout(tout);
            props.nav.navigate("Destinations");
          } else {
            // Login unsuccessful. Try again
            setCheckingAccount(false);
            setErrorMessage(
              "DigitalOcean did not recognize your key. Please try again."
            );
          }
        })
        .then(function () {
          clearTimeout(tout);
          setSubmitBtnVal("Connect to your account!");
        });
    }
  };

  return (
    <View style={styles.loginContainer}>
      {checkingAccount ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Text style={styles.title}>Lets get started!</Text>
          <Spacer />
          <Text style={{ color: "red", fontWeight: "bold" }}>
            {errorMessage}
          </Text>
          <TextInput
            placeholder="Your digitalocean token"
            style={styles.input}
            onChangeText={(t) => setTokenInputValue(t)}
          />
          <Spacer />
          <TouchableOpacity onPress={handleConnectBtnPress}>
            <Text style={styles.button}>{submitBtnVal}</Text>
          </TouchableOpacity>
          <Spacer />
          <Text style={styles.subtle}>
            Visit{" "}
            <Link href="https://cloud.digitalocean.com/account/api/tokens">
              https://cloud.digitalocean.com/account/api/tokens
            </Link>{" "}
            to generate a new Personal Access Token.
            {"\n\n"}
            Enter any name you would like, and give the token write access. Copy
            & paste your token into the input above.
          </Text>
          <TouchableOpacity
            onPress={async () => console.log(await Storage.get("do_key"))}
          >
            <Text>Show</Text>
          </TouchableOpacity>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
};

export default Login;
