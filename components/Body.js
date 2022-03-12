import styles from "./styles/BodyStyle";
import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  RefreshControl,
} from "react-native";

const Body = (props) => {
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
          <Text style={styles.title}>{props.title}</Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <ScrollView
          refreshControl={props.refreshControl}
          style={styles.innerContainer}
        >
          {props.children}
        </ScrollView>
      </View>
    </View>
  );
};

export default Body;
