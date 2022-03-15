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
  row: {
    flexDirection: "row",
    width: "100%",
    borderWidth: 2,
    borderColor: colors.doblue,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  row__name: {
    fontSize: 26,
    fontFamily: "Epilogue_600SemiBold",
  },
  row_activity: {
    flexShrink: 1,
    borderRadius: 7.5,
    padding: 5,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  row__active: {
    backgroundColor: colors.dogreen,
  },
  row__inactive: {
    backgroundColor: colors.dored,
  },
});

export default styles;
