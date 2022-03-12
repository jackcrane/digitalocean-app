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
  loginContainer: {
    backgroundColor: "#fff",
    minHeight: "100%",
  },
  logo: {
    width: "100%",
    resizeMode: "contain",
  },
  logoContainer: {
    backgroundColor: "black",
    minHeight: 300,
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  loginFieldsContainer: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    width: "90%",
    alignSelf: "center",
    transform: [{ translateY: -40 }],
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderRadius: 20,
  },
  title: {
    fontSize: 48,
    fontFamily: "Epilogue_600SemiBold",
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
