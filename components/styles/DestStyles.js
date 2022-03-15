import { StyleSheet, Platform } from "react-native";
import UtilityStyles, { colors, defaults } from "./Uts";

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    resizeMode: "contain",
  },
  logoContainer: {
    backgroundColor: "black",
    minHeight: 250,
    height: "10%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
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
    transform: [{ translateY: -61 }],
    paddingHorizontal: 1,
    paddingTop: 1,
    paddingVertical: 40,
    borderRadius: 20,
    minHeight: "90%",
  },
  innerContainer: {
    paddingHorizontal: 19,
  },
  titleContainer: {
    backgroundColor: "black",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontFamily: "Epilogue_600SemiBold",
    color: "white",
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
    height: 60,
    alignItems: "center",
  },
  row_title: {
    fontSize: 32,
    fontFamily: "Epilogue_600SemiBold",
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  price: {
    color: colors.doblue,
    fontSize: 20,
    fontFamily: "Epilogue_600SemiBold",
    marginRight: 10,
  },
  col: {
    width: 75,
    alignItems: "center",
  },
});

export default styles;
