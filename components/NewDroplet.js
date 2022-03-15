import React, { useState, useEffect } from "react";
import { TextInput, Text, View, ActivityIndicator } from "react-native";
import styles, { colors } from "./styles/NewDropletStyle";

import { Storage, Line, ThinLine } from "./Utilities";

import Body from "./Body";

import Fuse from "fuse.js";
let fuse = new Fuse([], {
  keys: ["name", "distribution", "slug", "discription"],
  threshold: 0.2,
});

const NewDroplet = (props) => {
  const [images, setImages] = useState([]);
  const [stage, setStage] = useState(false);
  const [filteredImages, setFilteredImages] = useState([]);

  useEffect(() => {
    (async () => {
      setImages([]);
      setStage("Fetching images");
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
      setStage("Building search indexes");
      fuse.setCollection(_images);
      setStage("Ready");
      console.log(fuse.search("ubuntu")[0]);
    })();
  }, []);

  return (
    <Body nav={props.nav} title="New Droplet">
      <Text style={styles.title}>Create A Droplet</Text>
      <Line />
      <>
        <Text style={styles.subtitle}>Pick an image</Text>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          placeholderTextColor={colors.darkgrey}
          onChangeText={(text) => {
            let res = fuse.search(text);
            console.log(res);
            setFilteredImages(res);
          }}
        />
        {stage === "Ready" ? (
          <>
            <ThinLine />
            {filteredImages.length === 0 ? (
              <Text style={styles.noResults}>No results</Text>
            ) : (
              filteredImages.map((e, i) => (
                <View key={i}>
                  <Text style={styles.text}>
                    {e.item.name} - {e.item.distribution}
                    {e.item.description}
                    {/* {highlight(e.item.slug, e.matches)} */}
                    {/* {highlight(e)} */}
                  </Text>
                  <ThinLine />
                </View>
              ))
            )}
          </>
        ) : (
          <View style={{ flexDirection: "row" }}>
            <ActivityIndicator />
            <Text style={{ marginLeft: 10 }}>{stage}</Text>
          </View>
        )}
      </>
    </Body>
  );
};

export default NewDroplet;
