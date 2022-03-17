import { StyleSheet, Platform } from "react-native";
import UtilityStyles, { colors, defaults } from "./Uts";

const styles = StyleSheet.create({
  ...UtilityStyles,
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  balance: {
    ...defaults,
    height: 75,
    width: 75,
    borderColor: colors.doblue,
    borderWidth: 2,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  balanceText: {
    ...defaults,
  },
  balanceExplanation: {
    ...defaults,
    flex: 1,
  },
  historyRow: {
    flexDirection: "column",
  },
  details: {
    fontSize: 18,
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
    backgroundColor: colors.doblue,
    color: "white",
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "Epilogue_600SemiBold",
  },
});

export default styles;
