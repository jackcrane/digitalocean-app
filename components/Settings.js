/*
components/Settings.js

This component is used to display a settings and diagnostics information page. It is not currently visible in the app, but is slated to replace the `components/Account.js` page. Like all other components, this takes the `nav` prop as a prop. Most of the user-facing UI is finished, but little work has been done on the UX and no debugging. I would like for this page to be like a settings page for the user's account and for their interactions with the app, like faceID, logouts, possible notifications, etc.
*/

import React, { useState, useEffect } from "react";
import { Text, View, Switch } from "react-native";
import Body from "./util/Body";
import styles from "./styles/SettingsStyle";
import { colors } from "./styles/Uts";
import { Line, Spacer, Storage, ThinLine } from "./util/Utilities";
import Collapsible from "./util/Collapsible";
import Constants from "expo-constants";
import * as LocalAuthentication from "expo-local-authentication";

/**
 * This component is used to display a settings and diagnostics information page. It is not currently visible in the app, but is slated to replace the `components/Account.js` page. Like all other components, this takes the `nav` prop as a prop.
 * @param {Object} props - The props to be passed to the component.
 * @param {Object} props.nav - The navigation object to be passed to the component.
 */
const Settings = (props) => {
  const [faceId, setFaceId] = useState(false);
  enableLocalAuthentication = async (auth) => {
    setFaceId(!faceId);
    if (auth) {
      let auth = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to use advanced authentication",
      });
      if (auth.success) {
        await Storage.set("SETTINGS-LOCALAUTH", "true");
      } else {
        await Storage.set("SETTINGS-LOCALAUTH", "false");
      }
      console.log(auth);
    } else {
      await Storage.set("SETTINGS-LOCALAUTH", "false");
    }
  };

  return (
    <>
      <Body title="Settings" nav={props.nav}>
        <>
          <Text style={styles.subtitle}>Account settings</Text>
          <ThinLine />
          <View style={styles.row}>
            <Text style={styles.text}>Biometric Auth</Text>
            <Switch
              value={faceId}
              onValueChange={enableLocalAuthentication}
              trackColor={{ false: colors.dogrey, true: colors.doblue }}
            />
          </View>
          <Line />
          <Collapsible
            title={<Text style={styles.subtitle}>App Constants</Text>}
            closeIcon="???"
            openIcon="???"
          >
            <ThinLine />
            <View style={styles.row}>
              <Text style={{ ...styles.text, fontWeight: "bold" }}>
                App State
              </Text>
              <Text style={styles.text}>
                {Constants.manifest.packagerOpts.dev
                  ? "Development"
                  : "Production"}
              </Text>
            </View>
            <ThinLine />
            <View style={styles.row}>
              <Text style={{ ...styles.text, fontWeight: "bold" }}>
                App Version
              </Text>
              <Text style={styles.text}>{Constants.manifest.version}</Text>
            </View>
            <ThinLine />
            <View style={styles.row}>
              <Text style={{ ...styles.text, fontWeight: "bold" }}>
                React Native version
              </Text>
              <Text style={styles.text}>{Constants.manifest.sdkVersion}</Text>
            </View>
            <ThinLine />
            <View style={styles.row}>
              <Text style={{ ...styles.text, fontWeight: "bold" }}>
                Expo version
              </Text>
              <Text style={styles.text}>{Constants.expoVersion}</Text>
            </View>
            <ThinLine />
            <View style={styles.row}>
              <Text style={{ ...styles.text, fontWeight: "bold" }}>
                Device Name
              </Text>
              <Text style={styles.text}>{Constants.deviceName}</Text>
            </View>
            <ThinLine />
            <View style={styles.row}>
              <Text style={{ ...styles.text, fontWeight: "bold" }}>
                Linking URI
              </Text>
              <Text style={styles.text}>{Constants.linkingUri}</Text>
            </View>
          </Collapsible>
          <Line />
          <></>
        </>
      </Body>
    </>
  );
};

export default Settings;
