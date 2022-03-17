import {
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  Modal,
  Pressable,
  TextInput,
  View,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Spacer } from "../util/Utilities";

import React, { useState, useEffect } from "react";

import Toast from "react-native-toast-message";

import styles, { colors } from "../styles/DropletActionsStyle";

const DropletActions = (props) => {
  const [shutdownModalVisible, setShutdownModalVisible] = useState(false);
  const [shutdownConfirmModalVisible, setShutdownConfirmModalVisible] =
    useState(false);

  const [shutdownType, setShutdownType] = useState("");

  const handleShutdown = () => {
    setShutdownModalVisible(true);
  };

  const handleGracefulShutdown = () => {
    setShutdownModalVisible(false);
    setShutdownConfirmModalVisible(true);
    setShutdownType("graceful");
    console.log(shutdownType);
  };
  const handleForceShutdown = () => {
    setShutdownModalVisible(false);
    setShutdownConfirmModalVisible(true);
    setShutdownType("force");
    console.log(shutdownType);
  };

  const sendShutdownCommand = async () => {
    setShutdownConfirmModalVisible(false);
    setShutdownModalVisible(false);
    console.log("send shutdown command");
    console.log(JSON.stringify(shutdownType));

    let f = await fetch(
      `https://api.digitalocean.com/v2/droplets/${props.dropletId}/actions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${props.dokey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: shutdownType === "graceful" ? "shutdown" : "power_off",
        }),
      }
    );

    Toast.show({
      type: "cinfo",
      text1: "Command sent!",
      text2: `We have sent '${
        shutdownType === "graceful" ? "shutdown" : "power_off"
      }' the command, check back in a few seconds!`,
    });
  };

  const sendPoweronCommand = async () => {
    let f = await fetch(
      `https://api.digitalocean.com/v2/droplets/${props.dropletId}/actions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${props.dokey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "power_on",
        }),
      }
    );

    Toast.show({
      type: "cinfo",
      text1: "Command sent!",
      text2: "We have sent the power_on command, check back in a few seconds!",
    });
  };

  const [rebootModalVisible, setrebootModalVisible] = useState(false);
  const [rebootConfirmModalVisible, setrebootConfirmModalVisible] =
    useState(false);

  const [rebootType, setrebootType] = useState("");

  const handleReboot = () => {
    setrebootModalVisible(true);
  };

  const handleGracefulreboot = () => {
    setrebootModalVisible(false);
    setrebootConfirmModalVisible(true);
    setrebootType("graceful");
    console.log(rebootType);
  };
  const handleForcereboot = () => {
    setrebootModalVisible(false);
    setrebootConfirmModalVisible(true);
    setrebootType("force");
    console.log(rebootType);
  };

  const sendrebootCommand = async () => {
    setrebootConfirmModalVisible(false);
    setrebootModalVisible(false);
    console.log("send reboot command");
    console.log(JSON.stringify(rebootType));

    let f = await fetch(
      `https://api.digitalocean.com/v2/droplets/${props.dropletId}/actions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${props.dokey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: rebootType === "graceful" ? "reboot" : "power_cycle",
        }),
      }
    );

    Toast.show({
      type: "cinfo",
      text1: "Command sent!",
      text2: `We have sent '${
        rebootType === "graceful" ? "reboot" : "power_cycle"
      }' the command, check back in a few seconds!`,
    });
  };

  const [snapshotModalVisible, setSnapshotModalVisible] = useState(false);

  const handleSnapshot = () => {
    setSnapshotModalVisible(true);
  };

  const sendSnapshotCommand = async () => {
    let f = await fetch(
      `https://api.digitalocean.com/v2/droplets/${props.dropletId}/actions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${props.dokey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "snapshot",
        }),
      }
    );
  };

  const [destroyModalVisible, setDestroyModalVisible] = useState(false);
  const handleDestroy = () => {
    setDestroyModalVisible(true);
  };

  const [destroyName, setDestroyName] = useState("");

  const sendDestroyCommand = async () => {
    const f = await fetch(
      `https://api.digitalocean.com/v2/droplets/${props.dropletId}/destroy_with_associated_resources/dangerous`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${props.dokey}`,
          "Content-Type": "application/json",
          "X-Dangerous": "true",
        },
      }
    );
    if (f.status === 202) {
      Toast.show({
        type: "cinfo",
        text1: "Command sent!",
        text2: "DO is destroying your droplet",
      });
      props.nav.navigate("Droplets");
    } else {
      Toast.show({
        type: "cinfo",
        text1: "Destruction failed",
        text2: "Check the DO online dashboard",
      });
    }
  };

  return (
    <>
      <Modal
        animationType="slide"
        visible={shutdownModalVisible}
        onRequestClose={() => {
          setShutdownModalVisible(false);
          setShutdownType("");
        }}
        presentationStyle="pageSheet"
        onDismiss={() => {
          setShutdownModalVisible(false);
          setShutdownType("");
        }}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.close}
            onPress={() => {
              setShutdownModalVisible(!shutdownModalVisible);
              setShutdownType("");
            }}
          >
            <Text style={styles.closeText}>Cancel</Text>
          </TouchableOpacity>
          <ScrollView>
            <Text style={styles.title}>Power off your droplet</Text>
            <Spacer />
            <Text style={styles.text}>
              There are 2 options to power off:{"\n\n"}
              <Text style={{ fontWeight: "bold" }}>Shutdown</Text>: Shutsdown a
              Droplet. A shutdown action is an attempt to shutdown the Droplet
              in a graceful way, similar to using the shutdown command from the
              console. Since a shutdown command can fail, this action guarantees
              that the command is issued, not that it succeeds.
              {"\n\n"}
              <Text style={{ fontWeight: "bold" }}>Power off</Text>: Powers off
              a Droplet. A power_off event is a hard shutdown and should only be
              used if the shutdown action is not successful. It is similar to
              cutting the power on a server and could lead to complications.
            </Text>
            <Spacer />
            <TouchableOpacity onPress={handleGracefulShutdown}>
              <Text style={styles.button}>Shutdown</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleForceShutdown}>
              <Text style={styles.button}>Power off</Text>
            </TouchableOpacity>
            <Spacer height={100} />
          </ScrollView>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        visible={shutdownConfirmModalVisible}
        onRequestClose={() => {
          setShutdownModalVisible(false);
          setShutdownConfirmModalVisible(false);
          setShutdownType("");
        }}
        presentationStyle="pageSheet"
        onDismiss={() => {
          setShutdownModalVisible(false);
          setShutdownConfirmModalVisible(false);
          setShutdownType("");
        }}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.close}
            onPress={() => {
              setShutdownModalVisible(false);
              setShutdownConfirmModalVisible(false);
              setShutdownType("");
            }}
          >
            <Text style={styles.closeText}>Cancel</Text>
          </TouchableOpacity>
          <ScrollView>
            <Text style={styles.title}>Are you sure?</Text>
            <Spacer />
            <Text style={styles.text}>
              You are about to turn off your droplet. Anything stored in memory
              will be lost. Its data and IP address are retained and its disk,
              CPU and RAM are reserved. You will still be charged for droplets
              that are off. To end billing, destroy the Droplet instead.
            </Text>
            <Spacer />
            <TouchableOpacity onPress={sendShutdownCommand}>
              <Text style={styles.button}>Yes, turn off</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShutdownModalVisible(false);
                setShutdownConfirmModalVisible(false);
                setShutdownType("");
              }}
            >
              <Text style={styles.button}>No, cancel</Text>
            </TouchableOpacity>
            <Spacer height={100} />
          </ScrollView>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        visible={rebootModalVisible}
        onRequestClose={() => {
          setrebootModalVisible(false);
          setrebootType("");
        }}
        presentationStyle="pageSheet"
        onDismiss={() => {
          setrebootModalVisible(false);
          setrebootType("");
        }}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.close}
            onPress={() => {
              setrebootModalVisible(!rebootModalVisible);
              setrebootType("");
            }}
          >
            <Text style={styles.closeText}>Cancel</Text>
          </TouchableOpacity>
          <ScrollView>
            <Text style={styles.title}>Reboot your droplet</Text>
            <Spacer />
            <Text style={styles.text}>
              There are 2 options to restart:{"\n\n"}
              <Text style={{ fontWeight: "bold" }}>Reboot</Text>: Reboots a
              Droplet. A reboot action is an attempt to reboot the Droplet in a
              graceful way, similar to using the reboot command from the
              console. Since a reboot command can fail, this action guarantees
              that the command is issued, not that it succeeds.
              {"\n\n"}
              <Text style={{ fontWeight: "bold" }}>Power cycle</Text>: Power
              cycles a Droplet. A powercycle action is similar to pushing the
              reset button on a physical machine, it's similar to booting from
              scratch. It is similar to cutting the power on a server and could
              lead to complications.
            </Text>
            <Spacer />
            <TouchableOpacity onPress={handleGracefulreboot}>
              <Text style={styles.button}>Reboot</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleForcereboot}>
              <Text style={styles.button}>Power cycle</Text>
            </TouchableOpacity>
            <Spacer height={100} />
          </ScrollView>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        visible={rebootConfirmModalVisible}
        onRequestClose={() => {
          setrebootModalVisible(false);
          setrebootConfirmModalVisible(false);
          setrebootType("");
        }}
        presentationStyle="pageSheet"
        onDismiss={() => {
          setrebootModalVisible(false);
          setrebootConfirmModalVisible(false);
          setrebootType("");
        }}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.close}
            onPress={() => {
              setrebootModalVisible(false);
              setrebootConfirmModalVisible(false);
              setrebootType("");
            }}
          >
            <Text style={styles.closeText}>Cancel</Text>
          </TouchableOpacity>
          <ScrollView>
            <Text style={styles.title}>Are you sure?</Text>
            <Spacer />
            <Text style={styles.text}>
              You are about to restart your droplet. Anything stored in memory
              will be lost. Its data and IP address are retained and its disk,
              CPU and RAM are reserved.
            </Text>
            <Spacer />
            <TouchableOpacity onPress={sendrebootCommand}>
              <Text style={styles.button}>Yes, restart</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setrebootModalVisible(false);
                setrebootConfirmModalVisible(false);
                setrebootType("");
              }}
            >
              <Text style={styles.button}>No, cancel</Text>
            </TouchableOpacity>
            <Spacer height={100} />
          </ScrollView>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        visible={snapshotModalVisible}
        onRequestClose={() => {
          setSnapshotModalVisible(false);
        }}
        presentationStyle="pageSheet"
        onDismiss={() => {
          setSnapshotModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.close}
            onPress={() => {
              setSnapshotModalVisible(false);
            }}
          >
            <Text style={styles.closeText}>Cancel</Text>
          </TouchableOpacity>
          <ScrollView>
            <Text style={styles.title}>Take a snapshot of your droplet</Text>
            <Spacer />
            <Text style={styles.text}>
              Snapshots are on-demand disk images of DigitalOcean Droplets and
              volumes saved to your account. Use them to create new Droplets and
              volumes with the same contents. {"\n\n"}Snapshots are charged at
              $0.05 GB per month for Droplets and $0.05 GiB per month for
              volumes. There is a minimum charge of $0.01, which may apply for
              very small snapshots or snapshots that exist only for a short
              time.
              {"\n\n"}
              <Text style={{ fontWeight: "bold" }}>
                It is suggested you shut down your droplet to ensure data
                consistency.
              </Text>
            </Text>
            <Spacer />
            <TouchableOpacity onPress={sendSnapshotCommand}>
              <Text style={styles.button}>Take Snapshot</Text>
            </TouchableOpacity>
            <Spacer height={100} />
          </ScrollView>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        visible={destroyModalVisible}
        onRequestClose={() => {
          setDestroyModalVisible(false);
        }}
        presentationStyle="pageSheet"
        onDismiss={() => {
          setDestroyModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.close}
            onPress={() => {
              setDestroyModalVisible(false);
            }}
          >
            <Text style={styles.closeText}>Cancel</Text>
          </TouchableOpacity>
          <KeyboardAwareScrollView>
            <Text style={styles.title}>
              Destroy your droplet and all of its resources
            </Text>
            <Spacer />
            <Text style={styles.text}>
              This action is irreversible. We will destroy your{" "}
              <Text style={{ fontWeight: "bold" }}>Droplet</Text>, any{" "}
              <Text style={{ fontWeight: "bold" }}>Floating IPs</Text>,{" "}
              <Text style={{ fontWeight: "bold" }}>Snapshots</Text>,{" "}
              <Text style={{ fontWeight: "bold" }}>Volumes</Text>, and{" "}
              <Text style={{ fontWeight: "bold" }}>Volume Snapshots</Text>. All
              data will be scrubbed and irretrievable.{"\n\n"}
              If you don't want to destroy everything, log into the DigitalOcean
              dashboard and delete your resources using the more refined tools.
              {"\n\n"}
              You will need to enter the name{" "}
              <Text style={{ fontStyle: "italic" }}>
                ({props.dropletName})
              </Text>{" "}
              of your droplet before you can destroy it.
            </Text>
            <Spacer />
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
              style={styles.input}
              placeholderTextColor={colors.darkgrey}
              placeholder={`Enter droplet name (${props.dropletName.substring(
                0,
                8
              )}...)`}
              onChangeText={(text) => setDestroyName(text)}
            />
            {destroyName === props.dropletName && (
              <>
                <Text style={styles.text}>
                  You will not be prompted again. This button will destroy your
                  droplet and all associated backups.
                </Text>
                <TouchableOpacity onPress={sendDestroyCommand}>
                  <Text style={styles.button}>Destroy</Text>
                </TouchableOpacity>
              </>
            )}
            <Spacer height={100} />
          </KeyboardAwareScrollView>
        </View>
      </Modal>

      <ScrollView horizontal={true} style={styles.actions}>
        {props.active ? (
          <TouchableOpacity
            onPress={handleShutdown}
            style={{ ...styles.btn, ...styles.shutdown }}
          >
            <Image
              style={styles.icon}
              source={require("../../assets/icons/tabler-icon-power.png")}
            />
            <Text>Shut Down</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ ...styles.btn, ...styles.boot }}
            onPress={sendPoweronCommand}
          >
            <Image
              style={styles.icon}
              source={require("../../assets/icons/tabler-icon-power.png")}
            />
            <Text>Power On</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={handleReboot}
          style={{ ...styles.btn, ...styles.restart }}
        >
          <Image
            style={styles.icon}
            source={require("../../assets/icons/tabler-icon-refresh.png")}
          />
          <Text>Reboot</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSnapshot}
          style={{ ...styles.btn, ...styles.snapshot }}
        >
          <Image
            style={styles.icon}
            source={require("../../assets/icons/tabler-icon-camera.png")}
          />
          <Text>Snapshot</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDestroy}
          style={{ ...styles.btn, ...styles.shutdown }}
        >
          <Image
            style={styles.icon}
            source={require("../../assets/icons/tabler-icon-trash.png")}
          />
          <Text>Destroy</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default DropletActions;
