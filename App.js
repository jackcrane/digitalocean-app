import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Text, View, Linking, TouchableOpacity, TextInput } from "react-native";
// import styles from './components/Styles';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./components/Login";
import Destinations from "./components/Destinations";
import Droplets from "./components/Droplets";
import Apps from "./components/Apps";
import AppInfo from "./components/AppInfo";
import Account from "./components/Account";

import AppEnvVars from "./components/AppEnvVars";

import { Storage } from "./components/Utilities";
import AppLoading from "expo-app-loading";

import Toast, { BaseToast } from "react-native-toast-message";

import { colors } from "./components/styles/AppInfoStyle";

import {
  useFonts,
  Epilogue_600SemiBold,
  Epilogue_400Regular,
} from "@expo-google-fonts/epilogue";

const Stack = createStackNavigator();

function LoginIdx({ route, navigation }) {
  return <Login nav={navigation} route={route} />;
}

function DestinationsIdx({ navigation }) {
  return <Destinations nav={navigation} />;
}

function DropletsIdx({ navigation }) {
  return <Droplets nav={navigation} />;
}

function AppsIdx({ navigation }) {
  return <Apps nav={navigation} />;
}

function AccountIdx({ route, navigation }) {
  return <Account nav={navigation} route={route} />;
}

function AppInfoIdx({ route, navigation }) {
  return <AppInfo nav={navigation} route={route.params} />;
}

function AppEnvVarsIdx({ route, navigation }) {
  return <AppEnvVars nav={navigation} route={route.params} />;
}

export default function App() {
  let [fontsLoaded] = useFonts({
    Epilogue_600SemiBold,
    Epilogue_400Regular,
  });

  const [LoggedIn, setLoggedIn] = useState(false);
  const [checkingLogin, setCheckingLogin] = useState(true);

  const AsynchronouslyGetDoKeyFromStorage = async () => {
    let key = await Storage.get("do_key");
    if (key) {
      let headers = new Headers();
      headers.append("Authorization", `Bearer ${key}`);
      let response = await fetch("https://api.digitalocean.com/v2/account", {
        headers: headers,
      });
      let json = await response.json();
      if (json.account) {
        console.log("Account successfully resumed");
        setLoggedIn(true);
        // props.AllowLogin();
      } else {
        console.log("Account not rejoined, attempting to find refresh token");
        let refresh_key = await Storage.get("do_refresh_key");
        if (refresh_key) {
          const headers = new Headers();
          let response = await fetch(
            `https://cloud.digitalocean.com/v1/oauth/token?grant_type=refresh_token&refresh_token=${refresh_key}`,
            {
              method: "POST",
            }
          );
          let json = await response.json();
          if (json.access_token) {
            console.log(
              "Refresh token successful! AuthToken:",
              json.access_token
            );
            await Storage.set("do_key", json.access_token);
            await Storage.set("do_refresh_key", json.refresh_token);
            setLoggedIn(true);
            setCheckingLogin(false);
            // props.AllowLogin();
          } else {
            setLoggedIn(false);
            setCheckingLogin(false);
          }
        }
      }
    }
  };

  useEffect(() => {
    AsynchronouslyGetDoKeyFromStorage();
  }, []);

  const AllowLogin = () => {
    setLoggedIn(true);
  };

  const DisallowLogin = () => {
    setLoggedIn(false);
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  if (!checkingLogin) {
    return <AppLoading />;
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          {!LoggedIn ? (
            <>
              <Stack.Screen
                name="Login"
                component={LoginIdx}
                options={{ headerShown: false }}
                initialParams={{ AllowLogin: AllowLogin }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Destinations"
                component={DestinationsIdx}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Droplets"
                component={DropletsIdx}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Apps"
                component={AppsIdx}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Account"
                component={AccountIdx}
                options={{ headerShown: false }}
                initialParams={{ DisallowLogin: DisallowLogin }}
              />

              <Stack.Screen
                name="App Info"
                component={AppInfoIdx}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="App Environment Variables"
                component={AppEnvVarsIdx}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast
        position="bottom"
        config={{
          cinfo: (props) => {
            return (
              <BaseToast
                {...props}
                style={{ borderLeftColor: colors.doblue }}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                text1Style={{
                  fontSize: 20,
                  fontWeight: "400",
                  fontFamily: "Epilogue_600SemiBold",
                }}
                text2Style={{
                  fontSize: 15,
                  fontWeight: "400",
                  color: "black",
                }}
              />
            );
          },
        }}
      />
    </>
  );
}
