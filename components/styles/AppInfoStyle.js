import { StyleSheet, Platform } from "react-native";
import UtilityStyles, { colors, defaults } from "./Uts";

const styles = StyleSheet.create({
  ...UtilityStyles,
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    ...defaults,
    fontFamily: "Epilogue_600SemiBold",
  },
  value: {
    ...defaults,
    color: colors.darkgrey,
    fontFamily: "Epilogue_400Regular",
  },
});

export default styles;
export { colors };
