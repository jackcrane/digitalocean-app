import { View, ScrollView, Text, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import {
  VictoryChart,
  VictoryLine,
  VictoryZoomContainer,
} from "victory-native";
import { colors } from "../styles/Uts";
import { Storage } from "../util/Utilities";

const DropletGraphs = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      let stime = Math.floor(Date.now() / 1000);
      const f = await fetch(
        `https://api.digitalocean.com/v2/monitoring/metrics/droplet/load_1?host_id=${
          props.dropletId
        }&end=${stime}&start=${stime - 60 * 60 * 2}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await Storage.get("do_key")}`,
          },
        }
      );
      const data = await f.json();
      let o = [];
      data.data.result[0].values.forEach((e) => {
        o.push({
          x: stime - e[0],
          y: parseFloat(e[1]),
        });
      });
      setData(o);
    })();
  }, []);

  return (
    <View>
      <Text>{props.dropletId}</Text>
      <Text>{data.length}</Text>
      <VictoryChart
        domainPadding={{ y: 10 }}
        width={Dimensions.get("window").width - 50}
        containerComponent={<VictoryZoomContainer zoomDimension="x" />}
      >
        <VictoryLine
          width={100}
          style={{
            data: { stroke: colors.doblue },
            parent: { border: "1px solid #ccc" },
          }}
          data={data}
        />
      </VictoryChart>
    </View>
  );
};

export default DropletGraphs;
