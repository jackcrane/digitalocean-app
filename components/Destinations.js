/*

This is the homepage of the logged in app. It handles routing to each of the other sections. In an effort to reduce the amount of boilerplate in this page, there is a variable called `navs` that is used to list the navigation links, route, icon, and any custom styling to apply to the icon.

*/

import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from "react-native";
import styles from "./styles/DestStyles";
import { Billing as BillingHandler } from "./util/APIHandler";

import { Spacer, Storage } from "./util/Utilities";

/**
 * The page that handles routing to the main pages like droplets and appps.
 * @param {Object} props.nav - The navigation object to be passed to the component.
 * @returns
 */
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

  useEffect(() => {
    (async () => {
      setUsage(false);
      let d = (await BillingHandler.Balance()).month_to_date_usage;
      setUsage(d);
    })();
  }, [refreshTick]);

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
    // {
    //   name: "Kubernetes",
    //   icon: require("../assets/icons/DO_Kubernetes.png"),
    //   route: "Kubernetes",
    // },
    // {
    //   name: "Spaces",
    //   icon: require("../assets/icons/DO_Spaces.png"),
    //   route: "Spaces",
    //   iconStyle: {
    //     height: 40,
    //     resizeMode: "contain",
    //   },
    // },
    // {
    //   name: "Networking",
    //   icon: require("../assets/icons/DO_Networking.png"),
    //   route: "Networking",
    //   iconStyle: {
    //     height: 40,
    //     resizeMode: "contain",
    //   },
    // },
    // {
    //   name: "Databases",
    //   icon: require("../assets/icons/DO_Databases.png"),
    //   route: "Databases",
    //   iconStyle: {
    //     width: 30,
    //     resizeMode: "contain",
    //   },
    // },
    {
      name: "Account",
      icon: require("../assets/icons/DO_Teams.png"),
      route: "Account",
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
              style={{ ...styles.row, borderColor: "red" }}
              onPress={() => props.nav.navigate("Feedback")}
            >
              <>
                <View style={styles.col}>
                  <Text style={{ ...styles.price, color: "red" }}>!</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.row_title}>Feedback</Text>
                  <></>
                </View>
              </>
            </TouchableOpacity>
          </View>
          <Spacer height={500} />
        </ScrollView>
      </View>
    </View>
  );
}
