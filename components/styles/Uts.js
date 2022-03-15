import { StyleSheet } from "react-native";

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
  text: {
    ...defaults,
  },
  link: {
    ...defaults,
    textDecorationColor: colors.doblue,
    textDecorationLine: "underline",
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
export { colors, defaults };
