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
import styles from "./styles/DropletsStyle";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Spacer, Link, Storage } from "./Utilities";

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
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.nav.navigate("Destinations")}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/DO_Logo_icon_white.png")}
              style={styles.logo}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Your Droplets</Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <ScrollView
          style={styles.innerContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
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
              <TouchableOpacity key={i} style={styles.row}>
                <>
                  <Image
                    source={require("../assets/icons/DO_Droplet_Platform.png")}
                    style={styles.icon}
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
        </ScrollView>
      </View>
    </View>
  );
}
