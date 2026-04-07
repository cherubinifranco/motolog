import { StyleSheet } from "react-native";

export const BASIC = StyleSheet.create({
  littleShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  titleBold: {
    color: "#111",
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitleSubtle: {
    color: "#666",
    fontSize: 14,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
  },
  optional: {
    fontSize: 13,
    color: "#666",
  },
});
