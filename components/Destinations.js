import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import styles from "./styles/ListingStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Spacer, Link, Storage } from "./Utilities";
import Body from "./Body";

export default function Destinations(props) {
  const [refreshing, setRefreshing] = useState(false);
  const [refreshTick, setRefreshTick] = useState(0);

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshTick(refreshTick + 1);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  const [usage, setUsage] = useState(0);
  const [token, setToken] = useState("");

  useEffect(() => {
    Storage.get("do_key").then((value) => {
      setToken(value);
    });
  }, []);

  useEffect(() => {
    (async () => {
      setUsage(false);
      const value = await fetch(
        "https://api.digitalocean.com/v2/customers/my/balance",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      const json = await value.json();
      setUsage(json.month_to_date_usage);
    })();
  }, [token, refreshTick]);

  const navs = [
    {
      name: "Apps",
      icon: require("../assets/icons/DO_App_Platform.png"),
      route: "Apps",
    },
    {
      name: "Droplets",
      icon: require("../assets/icons/DO_Droplet_Platform.png"),
      route: "Droplets",
      iconStyle: {
        width: 30,
        resizeMode: "contain",
        height: 30,
        marginRight: 10,
      },
    },
    {
      name: "Kubernetes",
      icon: require("../assets/icons/DO_Kubernetes.png"),
      route: "Kubernetes",
    },
    {
      name: "Volumes",
      icon: require("../assets/icons/DO_Volumes.png"),
      route: "Volumes",
    },
    {
      name: "Databases",
      icon: require("../assets/icons/DO_Databases.png"),
      route: "Databases",
      iconStyle: {
        width: 30,
        resizeMode: "contain",
      },
    },
  ];

  return (
    <View style={styles.loginContainer}>
      <StatusBar style="light" />
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/DO_Logo_Horizontal_White.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Your Resources</Text>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Spacer />
          <View style={styles.innerContainer}>
            <TouchableOpacity
              style={styles.row}
              onPress={() => props.nav.navigate("Billing")}
            >
              <>
                <View style={styles.col}>
                  <Text style={styles.price}>${usage || " ..."}</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.row_title}>Billing</Text>
                  <></>
                </View>
              </>
            </TouchableOpacity>

            {navs.map((e, i) => (
              <TouchableOpacity
                key={i}
                style={styles.row}
                onPress={() => props.nav.navigate(e.route)}
              >
                <>
                  <View style={styles.col}>
                    <Image
                      source={e.icon}
                      style={{ ...styles.icon, ...e.iconStyle }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <>
                      <Text style={styles.row_title}>{e.name}</Text>
                    </>
                    <></>
                  </View>
                </>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.row}
              onPress={() => props.nav.navigate("Account")}
            >
              <>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <>
                    <View style={styles.flex}>
                      <Text style={styles.row_title}>Account</Text>
                    </View>
                  </>
                </View>
              </>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
