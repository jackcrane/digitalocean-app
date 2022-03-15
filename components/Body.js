import styles, { colors } from "./styles/BodyStyle";
import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  RefreshControl,
} from "react-native";

import { Spacer } from "./Utilities";

const Body = (props) => {
  const [color, setColor] = useState(colors.doblue);

  useEffect(() => {
    if (!props.nav) {
      setColor("red");
    }
  }, [props]);

  return (
    <View style={styles.container}>
      <View style={{ ...styles.header, backgroundColor: color }}>
        <TouchableOpacity onPress={() => props.nav.navigate("Destinations")}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/DO_Logo_icon_white.png")}
              style={styles.logo}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {props.title}
          </Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <ScrollView
          refreshControl={props.refreshControl}
          style={styles.innerContainer}
        >
          {props.children}
          <Spacer height={150} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Body;
