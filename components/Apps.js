import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  RefreshControl,
  TouchableOpacityBase,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Body from "./Body";
import styles from "./styles/AppsStyle";

import { Spacer, Link, Storage } from "./Utilities";

const Apps = (props) => {
  const [apps, setApps] = useState([]);
  const [appsLoading, setAppsLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);
  const [refreshTick, setRefreshTick] = useState(0);

  const onRefresh = () => {
    setRefreshing(true);
    setAppsLoading(true);
    setRefreshTick(refreshTick + 1);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  useEffect(() => {
    setAppsLoading(true);
    Storage.get("do_key").then((e) => {
      fetch("https://api.digitalocean.com/v2/apps", {
        headers: {
          Authorization: `Bearer ${e}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setApps(data.apps);
          setAppsLoading(false);
        });
    });
  }, [refreshTick]);

  return (
    <Body
      title="Your Apps"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <>
        {appsLoading ? (
          <ActivityIndicator />
        ) : (
          apps.map((e, i) => (
            <TouchableOpacity
              key={i}
              style={styles.row}
              onPress={() =>
                props.nav.navigate("App Info", {
                  appid: e.id,
                })
              }
            >
              <>
                <Image
                  source={require("../assets/icons/DO_App_Platform.png")}
                  style={styles.icon}
                />
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <>
                    <View style={styles.flex}>
                      <Text style={styles.row__name}>
                        {e.active_deployment.spec.name}
                      </Text>
                      <Text style={styles.row__code}>
                        {e.active_deployment.tier_slug} • {e.live_domain}
                      </Text>
                    </View>
                  </>
                  <View
                    style={{
                      ...(e.active_deployment.phase == "ACTIVE"
                        ? styles.row__active
                        : styles.row__inactive),
                      ...styles.row_activity,
                    }}
                  >
                    <Text style={{ color: "white" }}>
                      {e.active_deployment.phase.toLowerCase()}
                    </Text>
                  </View>
                </View>
              </>
            </TouchableOpacity>
          ))
        )}
      </>
    </Body>
  );
};

export default Apps;
