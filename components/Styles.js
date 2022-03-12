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
  logo: {
    width: "100%",
    resizeMode: "contain",
  },
  logoContainer: {
    backgroundColor: "black",
  },
  outer_container: {
    backgroundColor: "#fff",
    minHeight: "100%",
  },
  container: {
    backgroundColor: "#fff",
    paddingLeft: 20,
    marginRight: 20,
    minHeight: "100%",
  },
  bottompadded: {
    paddingBottom: 40,
  },
  loginContainer: {
    backgroundColor: "#fff",
    paddingLeft: 20,
    paddingRight: 20,
    minHeight: "100%",
    paddingTop: 75,
  },
  title: {
    fontSize: 48,
  },
  input: {
    ...defaults,
    padding: 13,
    borderColor: colors.doblue,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 3,
  },
  button: {
    ...defaults,
    backgroundColor: colors.doblue,
    color: "white",
    padding: 13,
    borderRadius: 3,
  },
  row: {
    ...defaults,
    marginBottom: 20,
  },
  flex: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  row__active: {
    height: 15,
    width: 15,
    borderRadius: 7.5,
    backgroundColor: colors.dogreen,
  },
  row__inactive: {
    height: 15,
    width: 15,
    borderRadius: 7.5,
    backgroundColor: colors.dored,
  },
  row__name: {
    ...defaults,
    paddingRight: 10,
    paddingLeft: 10,
  },
  row__code: {
    ...defaults,
    fontFamily: Platform.os === "android" ? "monospace" : "Courier New",
  },
  row__text: {
    ...defaults,
  },
  details__title: {
    ...defaults,
    fontSize: 32,
    textDecorationColor: colors.dogrey,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
  },
  details__subtitle: {
    ...defaults,
    fontSize: 24,
  },
  details__p: {
    ...defaults,
    marginBottom: 2,
  },
  details__detail: {
    color: colors.doblue,
  },
  details__link: {
    ...defaults,
    color: colors.doblue,
    textDecorationColor: colors.doblue,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    marginBottom: 10,
    marginTop: 10,
  },
  details__division: {
    borderTopColor: colors.dogrey,
    borderLeftColor: colors.dogrey,
    borderStyle: "solid",
    borderTopWidth: 2,
    borderLeftWidth: 2,
    padding: 5,
  },
  spacer: {
    height: 15,
  },
  subtle: {
    color: colors.darkgrey,
  },
  link: {
    color: colors.doblue,
  },
  badge: {
    color: colors.doblue,
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 5,
    borderStyle: "solid",
    borderRadius: 5,
  },
  cell: {
    // flex:1,
    // flexDirection:'row',
    // alignContent:'center',
    // alignItems:'center',
    padding: 10,
    borderColor: colors.doblue,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 3,
    marginBottom: 10,
  },
  cell_title: {
    fontSize: 25,
    color: colors.doblue,
  },
  cell_content_large: {
    fontSize: 40,
    // color:colors.doblue,
  },
});

export default styles;
