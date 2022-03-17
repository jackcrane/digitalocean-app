import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

import { Spacer, Storage } from "./util/Utilities";

const Account = (props) => {
  // const [token, setToken] = useState("");

  // useEffect(() => {
  //   Storage.get("do_key").then((token) => {
  //     setToken(token);
  //   });
  // }, []);

  // const AsynchronouslyUnlinkDigitalOceanAccount = async () => {
  //   // alert('For some mysterious reason this does not work. You can revoke this app\'s access from your account settings. Sorry.')
  //   try {
  //     let headers = new Headers();
  //     let token = await Storage.get("do_key");
  //     headers.append("Authorization", "Bearer " + token);
  //     console.log(token);
  //     let request = await fetch(
  //       `https://cloud.digitalocean.com/v1/oauth/revoke`,
  //       {
  //         body: `token=${token}`,
  //         method: "POST",
  //         headers: headers,
  //       }
  //     );
  //     let response = await request.json();
  //     console.log(response);

  //     headers = new Headers();
  //     token = await Storage.get("do_refresh_key");
  //     headers.append("Authorization", "Bearer " + token);
  //     console.log(token);
  //     request = await fetch(`https://cloud.digitalocean.com/v1/oauth/revoke`, {
  //       body: `token=${token}`,
  //       method: "POST",
  //       headers: headers,
  //     });
  //     response = await request.json();
  //     console.log(response);

  //     Storage.set("do_key", "");
  //     Storage.set("do_refresh_key", "");
  //     props.route.params.DisallowLogin();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <></>
    // <View style={styles.container}>
    //   <StatusBar style="auto" />
    //   <Text style={styles.title}>Account</Text>
    //   <Spacer />
    //   <TouchableOpacity
    //     onPress={() => AsynchronouslyUnlinkDigitalOceanAccount()}
    //   >
    //     <Text style={{ ...styles.button, backgroundColor: "red" }}>
    //       Expire token
    //     </Text>
    //   </TouchableOpacity>
    //   <Spacer />
    //   <Text>Current token: {token}</Text>
    // </View>
  );
};

export default Account;
