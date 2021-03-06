import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Text, View, Linking, TouchableOpacity, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./components/Login";
import Destinations from "./components/Destinations";
import Droplets from "./components/droplets/Droplets";
import Droplet from "./components/droplets/Droplet";
import Apps from "./components/apps/Apps";
import AppInfo from "./components/apps/AppInfo";
import Account from "./components/Account";
import Billing from "./components/Billing";
import Settings from "./components/Settings";

import { Storage } from "./components/util/Utilities";
import AppLoading from "expo-app-loading";

import * as LocalAuthentication from "expo-local-authentication";

import NewDroplet from "./components/droplets/NewDroplet";

import Toast, { BaseToast } from "react-native-toast-message";

import { colors } from "./components/styles/AppInfoStyle";

import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

import * as Sentry from "sentry-expo";

Sentry.init({
  dsn: "https://4841c1d6e7e04048843a1514c9e2dbdc@o1104565.ingest.sentry.io/6264820",
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  enableInExpoDevelopment: true,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

import {
  useFonts,
  Epilogue_600SemiBold,
  Epilogue_400Regular,
} from "@expo-google-fonts/epilogue";
import Feedback from "./components/Feedback";

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

function DropletIdx({ route, navigation }) {
  return <Droplet nav={navigation} route={route.params} />;
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

function NewDropletIdx({ navigation }) {
  return <NewDroplet nav={navigation} />;
}

function BillingIdx({ navigation }) {
  return <Billing nav={navigation} />;
}

function FeedbackIdx({ navigation }) {
  return <Feedback nav={navigation} />;
}

function SettingsIdx({ navigation }) {
  return <Settings nav={navigation} />;
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
    console.log("Getting key information");
    if (key && key !== "") {
      console.log("key");
      let headers = new Headers();
      headers.append("Authorization", `Bearer ${key}`);
      let response = await fetch("https://api.digitalocean.com/v2/account", {
        headers: headers,
      });
      let json = await response.json();
      if (json.account) {
        console.log("Account successfully resumed");
        setLoggedIn(true);
        setCheckingLogin(false);
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
    } else {
      console.log("setting key");
      await Storage.set("do_key", "");
      setLoggedIn(false);
      setCheckingLogin(false);
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

  if (checkingLogin) {
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
                options={{ headerShown: true }}
                initialParams={{ DisallowLogin: DisallowLogin }}
              />

              <Stack.Screen
                name="App Info"
                component={AppInfoIdx}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Droplet"
                component={DropletIdx}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="New Droplet"
                component={NewDropletIdx}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Billing"
                component={BillingIdx}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Settings"
                component={SettingsIdx}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Feedback"
                component={FeedbackIdx}
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
                style={{
                  borderColor: colors.doblue,
                  borderWidth: 5,
                  borderLeftColor: colors.doblue,
                }}
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
