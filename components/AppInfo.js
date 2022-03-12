import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Linking,
  TouchableOpacity,
  TextInput,
  TouchableOpacityBase,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import styles, { colors } from "./styles/AppInfoStyle";
import Toast from "react-native-toast-message";

import { Spacer, Link, Storage } from "./Utilities";

import Body from "./Body";

const AppInfo = (props) => {
  // 855c0da05ec2eb5b6b5a562be8cef164c96ef15cba68e497cbcd6691335c82fe

  const appid = props.route.appid;

  const [app, setApp] = useState();
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    Storage.get("do_key").then((e) => {
      fetch(`https://api.digitalocean.com/v2/apps/${appid}`, {
        headers: {
          Authorization: `Bearer ${e}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setApp(data.app);
          setAppLoading(false);

          console.log(JSON.stringify(data.app));
        });
    });
  }, []);

  const Line = () => {
    return <View style={styles.line} />;
  };
  const ThinLine = () => {
    return <View style={{ ...styles.line, borderBottomWidth: 1 }} />;
  };

  return (
    <Body title={appLoading ? "..." : app.spec.name} nav={props.nav}>
      {appLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text style={styles.title} numberOfLines={1}>
            {app.spec.name}
          </Text>
          <Line />
          <Text style={styles.subtitle}>APP INFORMATION</Text>
          <ThinLine />
          <View style={styles.row}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{app.spec.name}</Text>
          </View>
          <ThinLine />
          <View style={styles.row}>
            <Text style={styles.label}>Location</Text>
            <Text style={styles.value}>{app.spec.region}</Text>
          </View>
          <Line />
          <Text style={styles.subtitle}>SERVICES</Text>
          <ThinLine />
          {app.spec.services.map((service, i) => (
            <>
              <Text style={styles.subtitle}>SERVICE / {service.name}</Text>
              <ThinLine />
              <View
                style={{
                  paddingLeft: 20,
                  borderLeftColor: colors.dogrey,
                  borderLeftWidth: 1,
                }}
              >
                <View style={styles.row}>
                  <Text style={styles.label}>GitHub</Text>
                  <Text style={styles.value}>
                    {app.spec.services[0].github.repo}@
                    {app.spec.services[0].github.branch}
                  </Text>
                </View>
                <ThinLine />
                <View style={styles.row}>
                  <Text style={styles.label}>Environment</Text>
                  <Text style={styles.value}>{service.environment_slug}</Text>
                </View>
                <ThinLine />
                <View style={styles.row}>
                  <Text style={styles.label}>Run Command</Text>
                  <Text style={styles.value}>{service.run_command}</Text>
                </View>
                <ThinLine />
                <View style={styles.row}>
                  <Text style={styles.label}>Size</Text>
                  <Text style={styles.value}>{service.instance_size_slug}</Text>
                </View>
                <ThinLine />
                <View style={styles.row}>
                  <Text style={styles.label}>Quantity</Text>
                  <Text style={styles.value}>{service.instance_count}</Text>
                </View>
                <ThinLine />
                <Text style={styles.subtitle}>
                  VARIABLES{" "}
                  <Text style={{ fontSize: 15 }}>(tap to reveal)</Text>
                </Text>
                <View
                  style={{
                    paddingLeft: 20,
                    borderLeftColor: colors.dogrey,
                    borderLeftWidth: 1,
                  }}
                >
                  <ThinLine />
                  {service.envs.map((env, i) => (
                    <View key={i}>
                      <View style={styles.row}>
                        <TouchableOpacity
                          onPress={() => {
                            Toast.show({
                              type: "cinfo",
                              text1: env.key,
                              text2: env.value,
                            });
                          }}
                        >
                          <Text style={styles.label}>{env.key}</Text>
                        </TouchableOpacity>
                      </View>
                      <ThinLine />
                    </View>
                  ))}
                </View>
              </View>
            </>
          ))}
        </>
      )}
    </Body>
  );

  // return (
  //   <View style={styles.outer_container}>
  //     {appLoading ? (
  //       <ActivityIndicator />
  //     ) : (
  //       <ScrollView scrollIndicatorInsets={{ right: 1 }}>
  //         <View style={styles.container}>
  //           <Text style={styles.title}>{app.spec.name}</Text>
  //           <Spacer />
  //           <View>
  //             <Text style={styles.details__title}>Operations</Text>
  //             <Text style={styles.details__link}>Force Rebuild and Deploy</Text>
  //             <Text
  //               style={styles.details__link}
  //               onPress={() =>
  //                 props.nav.navigate("App Environment Variables", {
  //                   appid: appid,
  //                 })
  //               }
  //             >
  //               Manage Env Variables
  //             </Text>
  //             <Text style={styles.details__link}>Manage Domains</Text>
  //             <Text style={styles.details__link}>Manage App Spec</Text>
  //             <Text
  //               style={{
  //                 ...styles.details__link,
  //                 ...{ color: "red", textDecorationColor: "red" },
  //               }}
  //             >
  //               Destroy App
  //             </Text>
  //           </View>
  //           <View style={styles.spacer}></View>
  //           <View>
  //             <Text style={styles.details__title}>General Information</Text>
  //             <Text style={styles.details__p}>
  //               App name:{" "}
  //               <Text style={styles.details__detail}>{app.spec.name}</Text>
  //             </Text>
  //             <Text style={styles.details__p}>
  //               Region:{" "}
  //               <Text style={styles.details__detail}>{app.region.label}</Text>
  //             </Text>
  //             <Text style={styles.details__p}>
  //               Datacenter(s):
  //               <Text style={styles.details__detail}>
  //                 {app.region.data_centers.map((e, i) => (
  //                   <Text key={i}>
  //                     {" "}
  //                     {e}
  //                     {i < app.region.data_centers.length - 1 ? "," : ""}
  //                   </Text>
  //                 ))}
  //               </Text>
  //             </Text>
  //             <Text style={styles.details__p}>
  //               URL: <Text style={styles.details__detail}>{app.live_url}</Text>
  //             </Text>
  //             <Text style={styles.details__p}>
  //               Language(s):
  //               <Text style={styles.details__detail}>
  //                 {app.spec.services.map((e, i) => (
  //                   <Text key={i}>
  //                     {" "}
  //                     {e.environment_slug}
  //                     {i < app.spec.services.environment_slug - 1 ? "," : ""}
  //                   </Text>
  //                 ))}
  //               </Text>
  //             </Text>
  //           </View>
  //           <View style={styles.spacer}></View>
  //           <View>
  //             <Text style={styles.details__title}>Active Deployment</Text>
  //             <Text style={styles.details__p}>
  //               Deployment UUID:{" "}
  //               <Text style={styles.details__detail}>
  //                 {app.active_deployment.id}
  //               </Text>
  //             </Text>
  //             <Text style={styles.details__p}>
  //               Last updated at:{" "}
  //               <Text style={styles.details__detail}>
  //                 {new Date(
  //                   app.active_deployment.phase_last_updated_at
  //                 ).toUTCString()}
  //               </Text>
  //             </Text>
  //           </View>
  //           <View style={styles.spacer}></View>
  //           <View>
  //             <Text style={styles.details__title}>Services</Text>
  //             <Text style={styles.details__p}>
  //               Service Count:{" "}
  //               <Text style={styles.details__detail}>
  //                 {app.spec.services.length}
  //               </Text>
  //             </Text>
  //             {app.spec.services.map((e, i) => (
  //               <View key={i}>
  //                 <Text style={styles.details__subtitle}>{e.name}</Text>
  //                 <View style={styles.details__division}>
  //                   <Text style={styles.details__p}>
  //                     Service name:{" "}
  //                     <Text style={styles.details__detail}>{e.name}</Text>
  //                   </Text>
  //                   <Text style={styles.details__p}>
  //                     GitHub Repo:{" "}
  //                     <Text style={styles.details__detail}>
  //                       {e.github.repo}
  //                     </Text>{" "}
  //                     branch:{" "}
  //                     <Text style={styles.details__detail}>
  //                       {e.github.branch}
  //                     </Text>
  //                   </Text>
  //                   <Text style={styles.details__p}>
  //                     Run Command:{" "}
  //                     <Text style={styles.details__detail}>
  //                       {e.run_command}
  //                     </Text>
  //                   </Text>
  //                   <Text style={styles.details__p}>
  //                     Environment Slug:{" "}
  //                     <Text style={styles.details__detail}>
  //                       {e.environment_slug}
  //                     </Text>
  //                   </Text>
  //                   <Text style={styles.details__p}>
  //                     Instance Size:{" "}
  //                     <Text style={styles.details__detail}>
  //                       {e.instance_size_slug}
  //                     </Text>
  //                   </Text>
  //                   <Text style={styles.details__p}>
  //                     Instance Count:{" "}
  //                     <Text style={styles.details__detail}>
  //                       {e.instance_count}
  //                     </Text>
  //                   </Text>
  //                 </View>
  //               </View>
  //             ))}
  //           </View>
  //           <View style={styles.spacer}></View>
  //           <Text style={styles.details__title}>Domains</Text>
  //           {app.spec.domains ? (
  //             <View>
  //               <Text style={styles.details__p}>
  //                 Domain Count:{" "}
  //                 <Text style={styles.details__detail}>
  //                   {app.spec.domains.length}
  //                 </Text>
  //               </Text>
  //               {app.spec.domains.map((e, i) => (
  //                 <View key={i}>
  //                   <Text style={styles.details__subtitle}>{e.domain}</Text>
  //                   <View style={styles.details__division}>
  //                     <Text style={styles.details__p}>
  //                       Type:{" "}
  //                       <Text style={styles.details__detail}>{e.type}</Text>
  //                     </Text>
  //                   </View>
  //                 </View>
  //               ))}
  //             </View>
  //           ) : (
  //             <Text>No Domains reported</Text>
  //           )}
  //         </View>
  //       </ScrollView>
  //     )}
  //   </View>
  // );
};

export default AppInfo;
