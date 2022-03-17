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
import styles, { colors } from "../styles/AppInfoStyle";
import Toast from "react-native-toast-message";
import Collapsible from "../util/Collapsible";

import { Spacer, Link, Storage } from "../util/Utilities";

import Body from "../util/Body";

const AppInfo = (props) => {
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
        });
    });
  }, []);

  const Line = () => {
    return <View style={styles.line} />;
  };
  const ThinLine = () => {
    return <View style={{ ...styles.line, borderBottomWidth: 1 }} />;
  };

  const Link = (props) => {
    return (
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(props.href);
        }}
      >
        <Text style={{ ...styles.link, ...props.style }}>{props.children}</Text>
      </TouchableOpacity>
    );
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
          <Spacer height={10} />
          <Link
            href={`https://cloud.digitalocean.com/apps/${app.id}/overview`}
            style={styles.value}
          >
            View in dashboard
          </Link>
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
          <View>
            <Text style={styles.subtitle}>DOMAINS</Text>
            {app.spec.domains.map((domain, i) => (
              <View key={i}>
                <ThinLine />
                <View style={styles.row}>
                  <Text style={styles.label}>{domain.type}</Text>
                  <Link href={"http://" + domain.domain} style={styles.value}>
                    {domain.domain}
                  </Link>
                </View>
              </View>
            ))}
          </View>
          <Line />
          <Text style={styles.subtitle}>SERVICES</Text>
          <Text>Tap each service to see more information</Text>
          <ThinLine />
          {app.spec.services.map((service, i) => (
            <View key={i}>
              <Collapsible
                title={
                  <Text style={styles.label}>SERVICE / {service.name}</Text>
                }
                closeIcon="▵"
                openIcon="▿"
              >
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
                    <Link
                      href={`https://github.com/${service.github.repo}/tree/${service.github.branch}`}
                      style={styles.value}
                    >
                      {service.github.repo}@{service.github.branch}
                    </Link>
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
                    <Text style={styles.value}>
                      {service.instance_size_slug}
                    </Text>
                  </View>
                  <ThinLine />
                  <View style={styles.row}>
                    <Text style={styles.label}>Quantity</Text>
                    <Text style={styles.value}>{service.instance_count}</Text>
                  </View>
                  <ThinLine />
                  <View style={styles.row}>
                    <Text style={styles.label}>HTTP Port</Text>
                    <Text style={styles.value}>{service.http_port}</Text>
                  </View>
                  <ThinLine />
                  <Collapsible
                    title={<Text style={styles.subtitle}>VARIABLES</Text>}
                    closeIcon="▵"
                    openIcon="▿"
                  >
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
                  </Collapsible>
                </View>
              </Collapsible>
            </View>
          ))}
          <Line />
          <Collapsible
            title={<Text style={styles.subtitle}>VARIABLES</Text>}
            closeIcon="▵"
            openIcon="▿"
          >
            {app.spec.envs.map((env, i) => (
              <View key={i}>
                <ThinLine />
                <View style={styles.row}>
                  <TouchableOpacity
                    onPress={() => {
                      Toast.show({
                        type: "cinfo",
                        text1: env.key,
                        text2:
                          (env.type == "SECRET" ? "(ENCRYPTED) " : "") +
                          env.value,
                      });
                    }}
                  >
                    <Text style={styles.label}>{env.key}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </Collapsible>
        </>
      )}
    </Body>
  );
  // );
};

export default AppInfo;
