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
import styles from "../styles/AppsStyle";

import { Droplets as DropletsHandler } from "../util/APIHandler";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Spacer, Link, Storage } from "../util/Utilities";
import Body from "../util/Body";

export default function Droplets(props) {
  useEffect(() => {
    DropletsHandler.List();
  }, []);

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
    (async () => {
      let droplets = await DropletsHandler.List();
      setDroplets(droplets);
      setDropletsLoading(false);
    })();
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
                  source={require("../../assets/icons/DO_Droplet_Platform.png")}
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
              source={require("../../assets/icons/DO_Droplet_Platform.png")}
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
