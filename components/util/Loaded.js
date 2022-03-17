import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import { useStopwatch } from "react-timer-hook";

const Loaded = () => {
  const { seconds, minutes, hours } = useStopwatch({ autoStart: true });

  return <Text>{hours * 3600 + minutes * 60 + seconds}</Text>;
};

export default Loaded;
