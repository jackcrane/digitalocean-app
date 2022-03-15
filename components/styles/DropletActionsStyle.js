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
  title: {
    fontSize: 48,
    fontFamily: "Epilogue_600SemiBold",
  },
  text: {
    ...defaults,
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
  input: {
    ...defaults,
    width: "100%",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    color: "black",
    borderWidth: 2,
    borderColor: colors.doblue,
    borderRadius: 5,
  },
});

export default styles;
