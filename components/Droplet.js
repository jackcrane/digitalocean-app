import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Linking,
  TouchableOpacity,
  RefreshControl,
  TouchableOpacityBase,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import styles, { colors } from "./styles/AppInfoStyle";
import Toast from "react-native-toast-message";
import Collapsible from "./Collapsible";

import { Spacer, Link, Storage } from "./Utilities";

import DropletActions from "./DropletActions";

import Body from "./Body";
import Loaded from "./Loaded";

const DropletInfo = (props) => {
  const dropletid = props.route.dropletid;

  const [droplet, setDroplet] = useState();
  const [dropletLoading, setDropletLoading] = useState(true);

  const [dokey, setDoKey] = useState("");

  const [refreshing, setRefreshing] = useState(false);
  const [refreshTick, setRefreshTick] = useState(0);

  const onRefresh = () => {
    setRefreshing(true);
    setDropletLoading(true);
    setRefreshTick(refreshTick + 1);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  useEffect(() => {
    Storage.get("do_key").then((e) => {
      setDoKey(e);
      fetch(`https://api.digitalocean.com/v2/droplets/${dropletid}`, {
        headers: {
          Authorization: `Bearer ${e}`,
          "Content-Type": "dropletlication/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setDroplet(data.droplet);
          setDropletLoading(false);
        });
    });
  }, [refreshTick]);

  const [backupsReady, setBackupsReady] = useState(false);
  const [backups, setBackups] = useState([]);

  useEffect(() => {
    Storage.get("do_key").then((e) => {
      fetch(`https://api.digitalocean.com/v2/droplets/${dropletid}/backups`, {
        headers: {
          Authorization: `Bearer ${e}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setBackupsReady(true);
          setBackups(data.backups);
        });
    });
  }, [refreshTick]);

  const [snapshotsReady, setSnapshotsReady] = useState(false);
  const [snapshots, setSnapshots] = useState([]);

  useEffect(() => {
    Storage.get("do_key").then((e) => {
      fetch(`https://api.digitalocean.com/v2/droplets/${dropletid}/snapshots`, {
        headers: {
          Authorization: `Bearer ${e}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setSnapshotsReady(true);
          setSnapshots(data.snapshots);
        });
    });
  }, [refreshTick]);

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
    <Body
      title={dropletLoading ? "..." : droplet.name}
      nav={props.nav}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {dropletLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text style={styles.title} numberOfLines={1}>
            {droplet.name}
          </Text>
          <Spacer height={10} />
          <Text style={styles.value}>
            This data is <Loaded /> seconds old.
          </Text>
          <Spacer height={10} />
          <Link
            href={`https://cloud.digitalocean.com/droplets/${droplet.id}/graphs`}
            style={styles.value}
          >
            View in dashboard
          </Link>
          <Line />
          <DropletActions
            active={droplet.status === "active"}
            dokey={dokey}
            dropletId={droplet.id}
            dropletName={droplet.name}
            nav={props.nav}
          />
          <Line />
          <Text style={styles.subtitle}>DROPLET INFORMATION</Text>
          <ThinLine />
          <View style={styles.row}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{droplet.name}</Text>
          </View>
          <ThinLine />
          <View style={styles.row}>
            <Text style={styles.label}>Status</Text>
            <Text style={styles.value}>{droplet.status}</Text>
          </View>
          <ThinLine />
          <View style={styles.row}>
            <Text style={styles.label}>Price</Text>
            <Text style={styles.value}>
              ${droplet.size.price_monthly}/mo, ${droplet.size.price_hourly}/hr.
            </Text>
          </View>
          <ThinLine />
          <View style={styles.row}>
            <Text style={styles.label}>Memory</Text>
            <Text style={styles.value}>{droplet.size.memory} MB</Text>
          </View>
          <ThinLine />
          <View style={styles.row}>
            <Text style={styles.label}>CPU Cores</Text>
            <Text style={styles.value}>{droplet.size.vcpus}</Text>
          </View>
          <ThinLine />
          <View style={styles.row}>
            <Text style={styles.label}>Disk</Text>
            <Text style={styles.value}>{droplet.size.disk} GB</Text>
          </View>
          <ThinLine />
          <View style={styles.row}>
            <Text style={styles.label}>Transfer</Text>
            <Text style={styles.value}>{droplet.size.transfer} TB</Text>
          </View>
          <ThinLine />
          <View style={styles.row}>
            <Text style={styles.label}>Size Slug</Text>
            <Text style={styles.value}>{droplet.size.slug}</Text>
          </View>
          <ThinLine />
          <View style={styles.row}>
            <Text style={styles.label}>Location</Text>
            <Text style={styles.value}>{droplet.region.name}</Text>
          </View>
          <ThinLine />
          <View style={styles.row}>
            <Text style={styles.label}>Locked</Text>
            <Text style={styles.value}>
              {droplet.locked ? "Locked" : "Unlocked"}
            </Text>
          </View>
          <Line />
          <Text style={styles.subtitle}>IMAGE</Text>
          <ThinLine />
          <View style={styles.row}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{droplet.image.name}</Text>
          </View>
          <ThinLine />
          <View style={styles.row}>
            <Text style={styles.label}>Distribution</Text>
            <Text style={styles.value}>{droplet.image.distribution}</Text>
          </View>
          <Line />
          <Text style={styles.subtitle}>NETWORK</Text>
          <ThinLine />
          <View style={styles.row}>
            <Text style={styles.label}>IPv4</Text>
          </View>
          <ThinLine />
          {droplet.networks.v4.length > 0 ? (
            <View
              style={{
                paddingLeft: 20,
                borderLeftColor: colors.dogrey,
                borderLeftWidth: 1,
              }}
            >
              {droplet.networks.v4.map((network, index) => (
                <View key={index}>
                  <Collapsible
                    title={
                      <Text style={styles.label}>{network.ip_address}</Text>
                    }
                    closeIcon="▵"
                    openIcon="▿"
                  >
                    <Line />
                    <View style={styles.row}>
                      <Text style={styles.label}>Type</Text>
                      <Text style={styles.value}>{network.type}</Text>
                    </View>
                    <ThinLine />
                    <View style={styles.row}>
                      <Text style={styles.label}>Netmask</Text>
                      <Text style={styles.value}>{network.netmask}</Text>
                    </View>
                    <ThinLine />
                    <View style={styles.row}>
                      <Text style={styles.label}>Gateway</Text>
                      <Text style={styles.value}>{network.gateway}</Text>
                    </View>
                  </Collapsible>
                  <ThinLine />
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.value}>No IPv4 addresses reported.</Text>
          )}
          <ThinLine />
          <Text style={styles.label}>IPv6</Text>
          <ThinLine />

          {droplet.networks.v6.length > 0 ? (
            <View
              style={{
                paddingLeft: 20,
                borderLeftColor: colors.dogrey,
                borderLeftWidth: 1,
              }}
            >
              {droplet.networks.v6.map((network, index) => (
                <View key={index}>
                  <Collapsible
                    title={
                      <Text style={styles.label}>{network.ip_address}</Text>
                    }
                    closeIcon="▵"
                    openIcon="▿"
                  >
                    <Line />
                    <View style={styles.row}>
                      <Text style={styles.label}>Type</Text>
                      <Text style={styles.value}>{network.type}</Text>
                    </View>
                    <ThinLine />
                    <View style={styles.row}>
                      <Text style={styles.label}>Netmask</Text>
                      <Text style={styles.value}>{network.netmask}</Text>
                    </View>
                    <ThinLine />
                    <View style={styles.row}>
                      <Text style={styles.label}>Gateway</Text>
                      <Text style={styles.value}>{network.gateway}</Text>
                    </View>
                  </Collapsible>
                  <ThinLine />
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.value}>No IPv6 reported.</Text>
          )}
          <Line />
          {backupsReady ? (
            <Collapsible
              title={<Text style={styles.subtitle}>BACKUPS</Text>}
              closeIcon="▵"
              openIcon="▿"
            >
              <ThinLine />
              {backups.length > 0 ? (
                <>
                  {backups.map((backup, index) => (
                    <Collapsible
                      key={index}
                      title={<Text style={styles.value}>{backup.name}</Text>}
                      closeIcon="▵"
                      openIcon="▿"
                    >
                      <ThinLine />
                      <View style={styles.row}>
                        <Text style={styles.label}>Name</Text>
                        <Text style={styles.value}>{snapshot.name}</Text>
                      </View>
                      <ThinLine />
                      <View style={styles.row}>
                        <Text style={styles.label}>Created</Text>
                        <Text style={styles.value}>{snapshot.created_at}</Text>
                      </View>
                      <ThinLine />
                      <View style={styles.row}>
                        <Text style={styles.label}>Size</Text>
                        <Text style={styles.value}>
                          {snapshot.size_gigabytes} GB
                        </Text>
                      </View>
                    </Collapsible>
                  ))}
                </>
              ) : (
                <Text style={styles.value}>No backups reported.</Text>
              )}
            </Collapsible>
          ) : (
            <></>
          )}
          <Line />
          {snapshotsReady ? (
            <Collapsible
              title={<Text style={styles.subtitle}>SNAPSHOTS</Text>}
              closeIcon="▵"
              openIcon="▿"
            >
              <ThinLine />
              {snapshots.length > 0 ? (
                <>
                  {snapshots.map((snapshot, index) => (
                    <Collapsible
                      key={index}
                      title={<Text style={styles.value}>{snapshot.name}</Text>}
                      closeIcon="▵"
                      openIcon="▿"
                    >
                      <ThinLine />
                      <View style={styles.row}>
                        <Text style={styles.label}>Name</Text>
                        <Text style={styles.value}>{snapshot.name}</Text>
                      </View>
                      <ThinLine />
                      <View style={styles.row}>
                        <Text style={styles.label}>Created</Text>
                        <Text style={styles.value}>{snapshot.created_at}</Text>
                      </View>
                      <ThinLine />
                      <View style={styles.row}>
                        <Text style={styles.label}>Size</Text>
                        <Text style={styles.value}>
                          {snapshot.size_gigabytes} GB
                        </Text>
                      </View>
                    </Collapsible>
                  ))}
                </>
              ) : (
                <Text style={styles.value}>No snapshots reported.</Text>
              )}
            </Collapsible>
          ) : (
            <></>
          )}
        </>
      )}
    </Body>
  );
};

export default DropletInfo;
