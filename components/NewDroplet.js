import React, { useState, useEffect } from "react";
import {
  TextInput,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import styles, { colors } from "./styles/NewDropletStyle";
import Checkbox from "expo-checkbox";

import Collapsible from "./Collapsible";

import { Storage, Line, ThinLine, Spacer } from "./Utilities";

import Body from "./Body";

import Fuse from "fuse.js";
let fuse = new Fuse([], {
  keys: ["name", "distribution", "slug", "discription"],
  threshold: 0.2,
});

const NewDroplet = (props) => {
  const [images, setImages] = useState([]);
  const [imagesstage, setImagesStage] = useState(false);
  const [filteredImages, setFilteredImages] = useState([]);

  useEffect(() => {
    (async () => {
      setImages([]);
      setImagesStage("Fetching images");
      let key = await Storage.get("do_key");
      let running = true;
      let i = 0;
      let _images = [];
      while (running) {
        i++;
        let f = await fetch(
          `https://api.digitalocean.com/v2/images?per_page=200&page=${i}`,
          {
            headers: {
              Authorization: `Bearer ${key}`,
              "Content-Type": "application/json",
            },
          }
        );
        let json = await f.json();
        if (json.images.length === 0) {
          running = false;
        }
        _images.push(...json.images);
      }
      setImages(_images);
      setImagesStage("Building search indexes");
      fuse.setCollection(_images);
      setImagesStage("Ready");
    })();
  }, []);

  const [image, setImage] = useState({});

  const [sizes, _setSizes] = useState([]);
  const [sizesStage, _setSizesStage] = useState(false);

  const [_size, _setSize] = useState({});

  useEffect(() => {
    (async () => {
      _setSizes([]);
      _setSizesStage("Fetching sizes");
      const f = await fetch("https://api.digitalocean.com/v2/sizes", {
        headers: {
          Authorization: `Bearer ${await Storage.get("do_key")}`,
          "Content-Type": "application/json",
        },
      });
      const json = await f.json();
      _setSizes(json.sizes);
      _setSizesStage("Ready");
    })();
  }, []);

  const [datacenters, setDatacenters] = useState([]);

  const matchFlagToDatacenter = (flag) => {
    switch (flag) {
      case "nyc1":
        return {
          name: "New York 1",
          flag: "🇺🇸",
        };
      case "nyc2":
        return {
          name: "New York 2",
          flag: "🇺🇸",
        };
      case "nyc3":
        return {
          name: "New York 3",
          flag: "🇺🇸",
        };
      case "sfo1":
        return {
          name: "San Francisco 1",
          flag: "🇺🇸",
        };
      case "sfo2":
        return {
          name: "San Francisco 2",
          flag: "🇺🇸",
        };
      case "sfo3":
        return {
          name: "San Francisco 3",
          flag: "🇺🇸",
        };
      case "ams2":
        return {
          name: "Amsterdam 2",
          flag: "🇧🇪",
        };
      case "ams3":
        return {
          name: "Amsterdam 3",
          flag: "🇧🇪",
        };
      case "sgp1":
        return {
          name: "Singapore 1",
          flag: "🇸🇬",
        };
      case "lon1":
        return {
          name: "London 1",
          flag: "🇬🇧",
        };
      case "fra1":
        return {
          name: "Frankfurt 1",
          flag: "🇩🇪",
        };
      case "tor1":
        return {
          name: "Toronto 1",
          flag: "🇨🇦",
        };
      case "blr1":
        return {
          name: "Bangalore 1",
          flag: "🇮🇳",
        };
      case "iad1":
        return {
          name: "Iowa 1",
          flag: "🇺🇸",
        };
      default:
        return {
          name: "Unknown",
          flag: "🤷🏼‍♂️",
        };
    }
  };

  useEffect(() => {
    if (image.item?.slug && _size.slug) {
      const intersection = image.item.regions.filter((element) =>
        _size.regions.includes(element)
      );
      let _datacenters = [];
      intersection.forEach((element) => {
        _datacenters.push({
          slug: element,
          ...matchFlagToDatacenter(element),
        });
      });
      setDatacenters(_datacenters);
      console.log("INTERSECTION", intersection);
    }
  }, [image, _size]);

  const [datacenter, setDatacenter] = useState("");

  const [processing, setProcessing] = useState(false);

  const handleCreate = async () => {
    setProcessing(true);
    let key = await Storage.get("do_key");
    let f = await fetch(`https://api.digitalocean.com/v2/droplets`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        region: datacenter.slug,
        size: _size.slug,
        image: image.item.slug,
        ssh_keys: [],
        backups: backups,
        monitoring: monitoring,
        ipv6: ipv6,
        user_data: "",
        volumes: [],
        tags: [],
        private_networking: false,
      }),
    });
    let json = await f.json();
    console.log(f.status);
    console.log(json);
    if (f.status === 202) {
      Alert.alert(
        "Success",
        "Your droplet has been created. It may take a few minutes to be ready. You have been emailed IP and login information.",
        [
          {
            text: "OK",
            onPress: () => {
              props.nav.navigate("Droplets");
              setProcessing(false);
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert("Error", json.message, [
        {
          text: "OK",
          onPress: () => {
            setProcessing(false);
          },
        },
      ]);
    }
  };

  const [backups, setBackups] = useState(false);
  const [monitoring, setMonitoring] = useState(false);
  const [ipv6, setIpv6] = useState(false);

  const [name, setName] = useState("");

  return (
    <Body nav={props.nav} title="New Droplet">
      <Text style={styles.title}>Create A Droplet</Text>
      <Line />
      <>
        <>
          <Text style={styles.subtitle}>Hostname</Text>
          <Spacer />
          <Text style={styles.text}>
            Give your Droplets an identifying name you will remember them by.
            Your Droplet name can only contain alphanumeric characters, dashes,
            and periods.
          </Text>
          <Spacer />
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor={colors.darkgrey}
            value={name}
            onChangeText={(e) => setName(e)}
          />
        </>
        <Line />
        <>
          <Text style={styles.subtitle}>Pick an image</Text>
          <TextInput
            style={styles.input}
            placeholder="Search for..."
            placeholderTextColor={colors.darkgrey}
            onChangeText={(text) => {
              setImage({});
              let res = fuse.search(text);
              setFilteredImages(res);
            }}
          />
          {imagesstage === "Ready" ? (
            <>
              <ThinLine />
              {filteredImages.length === 0 ? (
                <Text style={styles.noResults}>No results</Text>
              ) : image.item ? (
                <View style={{ padding: 10, backgroundColor: colors.dogrey }}>
                  <Text style={styles.text}>
                    <Text style={{ fontWeight: "bold" }}>
                      {image.item.distribution}
                    </Text>{" "}
                    - {image.item.name}
                  </Text>
                </View>
              ) : (
                <ScrollView style={{ maxHeight: 300 }}>
                  {filteredImages.map((e, i) => (
                    <View key={i}>
                      <TouchableOpacity onPress={() => setImage(e)}>
                        <Text style={styles.text}>
                          <Text style={{ fontWeight: "bold" }}>
                            {e.item.distribution}
                          </Text>{" "}
                          - {e.item.name}
                        </Text>
                      </TouchableOpacity>
                      <ThinLine />
                    </View>
                  ))}
                </ScrollView>
              )}
            </>
          ) : (
            <View style={{ flexDirection: "row" }}>
              <ActivityIndicator />
              <Text style={{ marginLeft: 10 }}>{imagesstage}</Text>
            </View>
          )}
        </>
        <Line />
        <>
          <Text style={styles.subtitle}>Pick a size</Text>
          <View>
            {sizesStage === "Ready" ? (
              [...new Set(sizes.map((e) => e.description))].map((size, i) => (
                <View key={i}>
                  <Spacer />
                  <Collapsible
                    title={<Text style={styles.label}>{size}</Text>}
                    closeIcon="▵"
                    openIcon="▿"
                  >
                    <Spacer />
                    <View
                      style={{
                        paddingLeft: 20,
                        borderLeftColor: colors.dogrey,
                        borderLeftWidth: 1,
                      }}
                    >
                      {sizes
                        .filter((i) => i.description === size)
                        .sort((e) => e.price_hourly)
                        .map((e, i) => (
                          <View
                            key={i}
                            style={{
                              ...(_size.slug !== e.slug
                                ? {}
                                : { backgroundColor: colors.dogrey }),
                            }}
                          >
                            <TouchableOpacity onPress={() => _setSize(e)}>
                              <View style={styles.row}>
                                <Text
                                  style={{ ...styles.text, fontWeight: "bold" }}
                                >
                                  {e.slug}
                                </Text>
                                <Text style={styles.text}>
                                  CPU: {e.vcpus} core
                                  {parseInt(e.vcpus) > 1 && "s"}{" "}
                                  {e.description.includes("AMD") && (
                                    <View
                                      style={{
                                        padding: 1,
                                        paddingHorizontal: 5,
                                        backgroundColor: "#ED1C24",
                                        borderRadius: 2,
                                      }}
                                    >
                                      <Text
                                        style={{
                                          fontWeight: "bold",
                                          color: "white",
                                        }}
                                      >
                                        AMD
                                      </Text>
                                    </View>
                                  )}
                                  {e.description.includes("Intel") && (
                                    <View
                                      style={{
                                        padding: 1,
                                        paddingHorizontal: 5,
                                        backgroundColor: "#0071C5",
                                        borderRadius: 2,
                                      }}
                                    >
                                      <Text
                                        style={{
                                          fontWeight: "bold",
                                          color: "white",
                                        }}
                                      >
                                        Intel
                                      </Text>
                                    </View>
                                  )}
                                </Text>
                                <Text style={styles.text}>
                                  Memory: {e.memory} MB ({e.memory / 1024} GB)
                                </Text>
                                <Text style={styles.text}>
                                  Disk: {e.disk} GB
                                </Text>
                                <Text style={styles.text}>
                                  Price: ${e.price_monthly}/month
                                </Text>
                              </View>
                            </TouchableOpacity>
                            <ThinLine />
                          </View>
                        ))}
                    </View>
                  </Collapsible>
                </View>
              ))
            ) : (
              <View style={{ flexDirection: "row" }}>
                <ActivityIndicator />
                <Text style={{ marginLeft: 10 }}>{sizesStage}</Text>
              </View>
            )}
          </View>
          <ThinLine />

          {_size.slug && (
            <View
              style={{
                padding: 10,
                backgroundColor: colors.dogrey,
                width: "100%",
              }}
            >
              <Text style={{ ...styles.text, fontWeight: "bold" }}>
                {_size.slug}
              </Text>
              <Text style={styles.text}>
                CPU: {_size.vcpus} core
                {parseInt(_size.vcpus) > 1 && "s"}{" "}
                {_size.description.includes("AMD") && (
                  <View
                    style={{
                      padding: 1,
                      paddingHorizontal: 5,
                      backgroundColor: "#ED1C24",
                      borderRadius: 2,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      AMD
                    </Text>
                  </View>
                )}
                {_size.description.includes("Intel") && (
                  <View
                    style={{
                      padding: 1,
                      paddingHorizontal: 5,
                      backgroundColor: "#0071C5",
                      borderRadius: 2,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      Intel
                    </Text>
                  </View>
                )}
              </Text>
              <Text style={styles.text}>
                Memory: {_size.memory} MB ({_size.memory / 1024} GB)
              </Text>
              <Text style={styles.text}>Disk: {_size.disk} GB</Text>
              <Text style={styles.text}>
                Price: ${_size.price_monthly}/month
              </Text>
            </View>
          )}
        </>
        <Line />
        <>
          <Text style={styles.subtitle}>Pick a Datacenter</Text>
          <Spacer />
          <Text style={styles.text}>
            You may not see every datacenter on here because we check to verify
            that both the image and the vm size are availible in each region.
          </Text>
          <ThinLine />
          <View>
            {datacenters.length > 0 ? (
              <View style={styles.datacenters}>
                {datacenters.map((e, i) => (
                  <TouchableOpacity onPress={() => setDatacenter(e)} key={i}>
                    <View
                      style={{
                        ...styles.datacenter,
                        ...(datacenter.slug === e.slug && {
                          backgroundColor: colors.doblue,
                        }),
                      }}
                    >
                      <Text style={styles.text}>{e.flag} </Text>
                      <Text
                        style={{
                          ...styles.text,
                          ...(datacenter.slug === e.slug && {
                            color: "white",
                          }),
                        }}
                      >
                        {e.slug}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <Text style={styles.text}>Select an image and size first!</Text>
            )}
          </View>
        </>
        <Line />
        <>
          <Text style={styles.subtitle}>Auth</Text>
          <Spacer />
          <Text style={styles.text}>
            You will be emailed a temporary password by DigitalOcean.
          </Text>
        </>
        <Line />
        <>
          <Text style={styles.subtitle}>Features</Text>
          <Spacer />
          <Text style={styles.text}>
            Tap a feature to enable or disable the features on your VM
          </Text>
          <ThinLine />
          <View style={styles.datacenters}>
            <TouchableOpacity
              style={{
                ...styles.datacenter,
                ...(backups && {
                  backgroundColor: colors.doblue,
                }),
              }}
              onPress={() => setBackups(!backups)}
            >
              <Text
                style={{ ...styles.text, ...(backups && { color: "white" }) }}
              >
                Backups
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.datacenter,
                ...(monitoring && {
                  backgroundColor: colors.doblue,
                }),
              }}
              onPress={() => setMonitoring(!monitoring)}
            >
              <Text
                style={{
                  ...styles.text,
                  ...(monitoring && { color: "white" }),
                }}
              >
                Monitoring
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.datacenter,
                ...(ipv6 && {
                  backgroundColor: colors.doblue,
                }),
              }}
              onPress={() => setIpv6(!ipv6)}
            >
              <Text style={{ ...styles.text, ...(ipv6 && { color: "white" }) }}>
                IPv6
              </Text>
            </TouchableOpacity>
          </View>
        </>
        <Line />
        <>
          <Text style={styles.subtitle}>Confirm</Text>
          {_size.slug && datacenter.slug && image.item?.slug ? (
            <>
              <Spacer />
              <Text style={styles.text}>
                <Text style={{ fontWeight: "bold" }}>Name:</Text> {name}
              </Text>
              <Text style={styles.text}>
                <Text style={{ fontWeight: "bold" }}>Image Slug:</Text>{" "}
                {image.item.slug}
              </Text>
              <Text style={styles.text}>
                <Text style={{ fontWeight: "bold" }}>Size Slug:</Text>{" "}
                {_size.slug}
              </Text>
              <Text style={styles.text}>
                <Text style={{ fontWeight: "bold" }}>Datacenter:</Text>{" "}
                {datacenter.slug}
              </Text>
              <Text style={styles.text}>
                <Text style={{ fontWeight: "bold" }}>Backups:</Text>{" "}
                {backups ? "Enabled" : "Disabled"}
              </Text>
              <Text style={styles.text}>
                <Text style={{ fontWeight: "bold" }}>Monitoring:</Text>{" "}
                {monitoring ? "Enabled" : "Disabled"}
              </Text>
              <Text style={styles.text}>
                <Text style={{ fontWeight: "bold" }}>IPv6:</Text>{" "}
                {ipv6 ? "Enabled" : "Disabled"}
              </Text>
              <ThinLine />
              <Text style={styles.text}>
                <Text style={{ fontWeight: "bold" }}>VM Price:</Text> $
                {_size.price_monthly}/month
              </Text>
              {backups && (
                <Text style={styles.text}>
                  <Text style={{ fontWeight: "bold" }}>Backups:</Text> $
                  {_size.price_monthly * 0.2}/month
                </Text>
              )}
              <Spacer />
              <Text style={styles.text}>
                <Text style={{ fontWeight: "bold" }}>Total:</Text> $
                {_size.price_monthly +
                  (backups ? _size.price_monthly * 0.2 : 0)}
                /month
              </Text>
              <ThinLine />
              {!processing ? (
                <TouchableOpacity style={styles.button} onPress={handleCreate}>
                  <Text style={{ ...styles.text, color: "white" }}>Create</Text>
                </TouchableOpacity>
              ) : (
                <>
                  <ActivityIndicator size="large" color={colors.doblue} />
                  <Text style={styles.text}>Submitting...</Text>
                </>
              )}
            </>
          ) : (
            <Text style={styles.text}>
              Select an image, datacenter, and size first!
            </Text>
          )}
        </>
      </>
    </Body>
  );
};

export default NewDroplet;
