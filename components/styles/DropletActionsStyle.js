import { StyleSheet, Platform } from "react-native";
import UtilityStyles, { colors, defaults } from "./Uts";

const styles = StyleSheet.create({
  ...UtilityStyles,
  actions: {
    flexDirection: "row",
  },
  btn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    marginRight: 10,
    width: 100,
    height: 100,
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  shutdown: {
    borderColor: colors.dored,
  },
  boot: {
    borderColor: colors.dogreen,
  },
  restart: {
    borderColor: colors.doblue,
  },
  snapshot: {
    borderColor: colors.dogreen,
  },
  modalContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  close: {
    color: colors.doblue,
    marginBottom: 20,
  },
  closeText: {
    ...defaults,
    color: colors.doblue,
  },
  button: {
    ...defaults,
    width: "100%",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "red",
    color: "white",
    fontFamily: "Epilogue_600SemiBold",
  },
});

export default styles;
export { colors };
