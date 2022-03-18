import { StyleSheet, Platform } from "react-native";
import UtilityStyles, { colors, defaults } from "./Uts";

const styles = StyleSheet.create({
  ...UtilityStyles,
  button: {
    ...defaults,
    width: "100%",
    padding: 15,
    marginVertical: 10,
    backgroundColor: colors.doblue,
    color: "white",
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "Epilogue_600SemiBold",
  },
});

export default styles;
