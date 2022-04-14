import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Modal,
} from "react-native";
import Body from "./util/Body";
// TODO: Change styles path. Should be named to "{Component}Style", E.G. "BillingStyle"
import styles from "./styles/_____";
import { colors } from "./styles/Uts";
import { Line, Spacer, Storage, ThinLine } from "./util/Utilities";

const Billing = (props) => {
  const [loading, setLoading] = useState(true);
  // TODO: Rename state variables
  const [state, setBalance] = useState();
  useEffect(() => {
    (async () => {
      const do_key = await Storage.get("do_key");
      const response = await fetch(
        // TODO: Change API endpoint for the correct information
        "https://api.digitalocean.com/v2/customers/my/balance",
        {
          headers: {
            Authorization: `Bearer ${do_key}`,
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      setBalance(json);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      // TODO: Rename body title
      <Body title="Billing" nav={props.nav}>
        {!loading ? (
          <>
            // TODO: Change subtitle
            <Text style={styles.subtitle}>Subtitle</Text>
            <ThinLine />
            <>// TODO: Add display here</>
          </>
        ) : (
          <ActivityIndicator />
        )}
      </Body>
    </>
  );
};

export default Billing;
