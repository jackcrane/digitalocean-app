import { StyleSheet, Platform, Dimensions } from "react-native";
import UtilityStyles, { colors, defaults } from "./Uts";

const styles = StyleSheet.create({
  ...UtilityStyles,
  label: {
    ...defaults,
    fontFamily: "Epilogue_600SemiBold",
  },
  row: {
    // flexDirection: "column",
  },
  disabled: {
    opacity: 0.5,
    position: "relative",
  },
  disabledText: {
    ...defaults,
    fontFamily: "Epilogue_600SemiBold",
    color: "white",
    backgroundColor: colors.dored,
    position: "absolute",
    height: "100%",
    left: 0,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    zIndex: 1,
  },
  datacenters: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  datacenter: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    margin: 5,
    backgroundColor: colors.dogrey,
  },
  button: {
    ...defaults,
    backgroundColor: colors.doblue,
    color: "white",
    padding: 13,
    borderRadius: 3,
  },
});

export default styles;
export { colors };
