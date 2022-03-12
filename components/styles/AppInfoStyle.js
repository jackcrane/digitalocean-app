import { StyleSheet, Platform } from "react-native";

const colors = {
  doblue: "#0069ff",
  dogrey: "#dfdfdf",
  dogreen: "#15cd72",
  dored: "#CC2914",
  darkgrey: "#757575",
};

const defaults = {
  fontSize: 20,
};

const styles = StyleSheet.create({
  title: {
    fontSize: 48,
    fontFamily: "Epilogue_600SemiBold",
  },
  line: {
    borderBottomColor: colors.dogrey,
    borderBottomWidth: 2,
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 24,
    fontFamily: "Epilogue_600SemiBold",
    color: colors.darkgrey,
  },
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
    // monospace font
    fontFamily: "Epilogue_400Regular",
  },
});

export default styles;
export { colors };
