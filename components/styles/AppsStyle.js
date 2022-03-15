import { StyleSheet, Platform } from "react-native";
import UtilityStyles, { colors, defaults } from "./Uts";

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
    overflow: "hidden",
    position: "relative",
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  row__name: {
    fontSize: 26,
    fontFamily: "Epilogue_600SemiBold",
    flex: 1,
    width: "80%",
  },
  row_activity: {
    borderRadius: 7.5,
    padding: 5,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 3,
    right: 3,
    zIndex: 5,
  },
  row__active: {
    backgroundColor: colors.dogreen,
  },
  row__inactive: {
    backgroundColor: colors.dored,
  },
});

export default styles;
