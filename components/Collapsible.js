import Collapsible from "react-native-collapsible";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const _Collapsible = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <View>
      <TouchableOpacity onPress={() => setCollapsed(!collapsed)}>
        <Text>
          {props.title}
          {"  "}
          {collapsed ? props.openIcon : props.closeIcon}
        </Text>
      </TouchableOpacity>
      <Collapsible collapsed={collapsed}>{props.children}</Collapsible>
    </View>
  );
};

export default _Collapsible;
