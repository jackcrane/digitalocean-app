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
// import styles from "./styles/DropletsStyle";
import styles from "./styles/AppsStyle";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Spacer, Link, Storage } from "./Utilities";
import Body from "./Body";

export default function Droplets(props) {
  // 855c0da05ec2eb5b6b5a562be8cef164c96ef15cba68e497cbcd6691335c82fe

  const [droplets, setDroplets] = useState([]);
  const [dropletsLoading, setDropletsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [refreshTick, setRefreshTick] = useState(0);

  const onRefresh = () => {
    setRefreshing(true);
    setDropletsLoading(true);
    setRefreshTick(refreshTick + 1);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  useEffect(() => {
    Storage.get("do_key").then((e) => {
      fetch("https://api.digitalocean.com/v2/droplets", {
        headers: {
          Authorization: `Bearer ${e}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setDroplets(data.droplets);
          setDropletsLoading(false);
        });
    });
  }, [refreshTick]);

  return (
    <Body
      nav={props.nav}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      title="Your Droplets"
    >
      <>
        {dropletsLoading ? (
          // {true ? (
          <View
            style={{
              flexDirection: "column",
              height: "90%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator />
            <Text style={styles.loadingText}>Awesomeness is loading</Text>
          </View>
        ) : (
          droplets.map((e, i) => (
            <TouchableOpacity
              key={i}
              style={styles.row}
              onPress={() => {
                props.nav.navigate("Droplet", {
                  dropletid: e.id,
                });
              }}
            >
              <>
                <Image
                  source={require("../assets/icons/DO_Droplet_Platform.png")}
                  style={{
                    ...styles.icon,
                    width: 30,
                    height: 30,
                    resizeMode: "contain",
                  }}
                />
                <View
                  style={{
                    ...(e.status == "active"
                      ? styles.row__active
                      : styles.row__inactive),
                    ...styles.row_activity,
                  }}
                >
                  <Text style={{ color: "white" }}>{e.status}</Text>
                </View>
                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.row__name} numberOfLines={1}>
                    {e.name}
                  </Text>
                  <View style={styles.flex}>
                    <Text>
                      {e.vcpus} vCPU / {e.disk}GB Disk / {e.memory}MB Memory
                    </Text>
                  </View>
                </View>
              </>
            </TouchableOpacity>
          ))
        )}
        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            props.nav.navigate("New Droplet");
          }}
        >
          <>
            <Image
              source={require("../assets/icons/DO_Droplet_Platform.png")}
              style={{
                ...styles.icon,
                width: 30,
                height: 30,
                resizeMode: "contain",
              }}
            />
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{ ...styles.row__name, width: "100%" }}
                numberOfLines={1}
              >
                New droplet
              </Text>
              <View style={styles.flex}>
                <Text>Create a new Droplet</Text>
              </View>
            </View>
          </>
        </TouchableOpacity>
      </>
    </Body>
  );
}
