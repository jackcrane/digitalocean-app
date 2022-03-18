import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Linking } from "react-native";
import Body from "./util/Body";
import styles from "./styles/FeedbackStyle";
import { Spacer, Line, ThinLine } from "./util/Utilities";
import { TouchableOpacity } from "react-native-gesture-handler";

const Feedback = (props) => {
  return (
    <Body title="Feedback" nav={props.nav}>
      <Text style={styles.title}>Send Beta Feedback</Text>
      <Line />
      <Text style={styles.text}>
        This app is very much in beta, and I have many things planned for the
        coming weeks.
      </Text>
      <ThinLine />
      <TouchableOpacity
        onPress={() =>
          Linking.openURL(
            "https://gist.github.com/jackcrane/d2ee56f549d05c78717ea192b8e310e7"
          )
        }
      >
        <Text style={styles.button}>Current Roadmap</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => Linking.openURL("mailto:jack@jackcrane.rocks")}
      >
        <Text style={styles.button}>
          Email me feedback at jack@jackcrane.rocks
        </Text>
      </TouchableOpacity>
    </Body>
  );
};

export default Feedback;