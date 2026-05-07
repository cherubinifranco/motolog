import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  value: string | number;
  label: string;
};

export default function StatCard({ icon, color, value, label }: Props) {
  return (
    <View style={styles.card}>
      <Ionicons name={icon} size={28} color={color} />

      <Text style={styles.value}>{value}</Text>

      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
  },

  value: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111",
    marginTop: 8,
  },

  label: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    marginTop: 4,
  },
});
