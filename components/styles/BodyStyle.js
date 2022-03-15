import { StyleSheet, Platform } from "react-native";
import { Dimensions } from "react-native";

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
  header: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: colors.doblue,
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
    height: "85%",
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
    // marginLeft: 10,
    maxWidth: 0.9 * Dimensions.get("window").width - 50 - 40,
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
export { colors };
