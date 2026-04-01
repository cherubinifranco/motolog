import { StyleSheet, Text, View } from "react-native";

type Info = { data: number | string; description: string };

export default function InfoBlock({ data, description }: Info) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statNumber}>{data}</Text>
      <Text style={styles.statLabel}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  statCard: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111",
  },
  statLabel: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
    textAlign: "center",
  },
});
