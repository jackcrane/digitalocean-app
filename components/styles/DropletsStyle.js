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
  loadingText: {
    ...defaults,
    color: colors.doblue,
    fontFamily: "Epilogue_600SemiBold",
    fontSize: 24,
    paddingTop: 60,
  },
  loginContainer: {
    backgroundColor: "#fff",
    minHeight: "100%",
  },
  header: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  logo: {
    width: 50,
    resizeMode: "contain",
  },
  contentContainer: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.75,
    width: "90%",
    alignSelf: "center",
    transform: [{ translateY: -31 }],
    paddingHorizontal: 1,
    paddingTop: 1,
    paddingVertical: 40,
    borderRadius: 20,
    minHeight: "90%",
  },
  innerContainer: {
    paddingHorizontal: 19,
    paddingVertical: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: "Epilogue_600SemiBold",
    color: "white",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    padding: 10,
  },
  button: {
    ...defaults,
    backgroundColor: colors.doblue,
    color: "white",
    padding: 13,
    borderRadius: 3,
  },
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
    width: 30,
    resizeMode: "contain",
    height: 30,
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
